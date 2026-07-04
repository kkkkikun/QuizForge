"""解析层：Block 流 → Quiz JSON。

管线：segment(分节) → 各节按类型解析(choice/blank) → 滤噪 → LLM 兜底 → 组装 Quiz。
真实样本驱动的关键策略：
- 不依赖题号；以「题干 + 紧跟的 A./B./C./D. 选项块」为选择题主信号
- 选项按 OPTION_START_RE 切分，跨行/Tab 合并
"""

from __future__ import annotations

import json
import re
from dataclasses import dataclass, field

from .model import Block, Question, Quiz
from .patterns import (
    ANSWER_LINE_RE,
    BLANK_RE,
    EXPLAIN_RE,
    OPTION_START_RE,
    PAREN_ANSWER_RE,
    QUESTION_NUM_RE,
    SCORE_RE,
    SECTION_HEADER_RE,
)

# 章节标题 → 节类型
_TYPE_MAP = {
    "选择题": "choice", "单选题": "choice", "多选题": "choice", "判断题": "choice",
    "填空题": "blank",
    "简答题": "essay", "计算题": "essay", "应用题": "essay", "综合题": "essay",
}


@dataclass
class Section:
    type: str          # preamble | choice | blank | essay | unknown
    title: str
    blocks: list = field(default_factory=list)


@dataclass
class ChoiceCandidate:
    section: str
    stem: str
    options: dict[str, str]


def _section_type(title: str) -> str:
    t = title.strip()
    if t in _TYPE_MAP:
        return _TYPE_MAP[t]
    for k, v in _TYPE_MAP.items():
        if k in t:
            return v
    return "unknown"


def segment(blocks: list[Block]) -> list[Section]:
    """按 Heading 样式 / 章节标题文本切分节。"""
    sections: list[Section] = [Section("preamble", "", [])]
    for b in blocks:
        is_header = b.kind == "heading" or (
            b.kind == "para" and SECTION_HEADER_RE.match(b.text.strip())
        )
        if is_header:
            sections.append(Section(_section_type(b.text), b.text.strip(), []))
        else:
            sections[-1].blocks.append(b)
    if sections[0].type == "preamble" and sections[0].blocks:
        sections[0].title = sections[0].blocks[0].text.strip()
    return [s for s in sections if s.blocks]


def _scan_options(text: str) -> list[tuple[str, str]]:
    """扫描文本中的 A./B./C./D. 选项，返回 [(letter, content)]。"""
    markers = list(OPTION_START_RE.finditer(text))
    opts: list[tuple[str, str]] = []
    for i, m in enumerate(markers):
        letter = m.group(1)
        start = m.end()
        end = markers[i + 1].start() if i + 1 < len(markers) else len(text)
        content = text[start:end].strip().rstrip("，,。;；.　")
        if content:
            opts.append((letter, content))
    return opts


def _strip_number(text: str) -> str:
    return QUESTION_NUM_RE.sub("", text, count=1).strip()


def _detect_choice(section: Section) -> tuple[list[ChoiceCandidate], list[str]]:
    """在 choice 节内，以选项块为锚吸附题干，识别选择题候选。

    返回 (候选列表, 未匹配的题干文本列表)。连续选项块（一行多选项 / 一行一选项）
    合并为一个选项集；其前累积的 para 作为题干。
    """
    cands: list[ChoiceCandidate] = []
    pending: list[str] = []
    blocks = section.blocks
    n = len(blocks)
    j = 0
    while j < n:
        opts = _scan_options(blocks[j].text)
        if opts:
            merged = list(opts)
            k = j + 1
            while k < n and _scan_options(blocks[k].text):
                merged.extend(_scan_options(blocks[k].text))
                k += 1
            options: dict[str, str] = {}
            for letter, content in merged:
                options.setdefault(letter, content)
            stem = _strip_number(" ".join(pending))
            cands.append(ChoiceCandidate(section.title, stem, options))
            pending = []
            j = k
        else:
            if blocks[j].kind == "para":
                t = blocks[j].text.strip()
                if t:
                    pending.append(t)
            j += 1
    return cands, pending


def detect_choice_questions(section: Section) -> list[ChoiceCandidate]:
    """公开接口：仅返回选择题候选（忽略 leftover 统计）。"""
    return _detect_choice(section)[0]


def parse_blocks(
    blocks: list[Block],
    source_file: str = "",
    llm: "object | None" = None,
    llm_parse: bool = False,
) -> Quiz:
    """编排：Block 流 → Quiz。

    管线：filter_blocks(滤噪) → segment(分节) → 按节类型解析(choice/blank) →
    essay 整节丢弃 → LLM（可选：低置信补答案 / 残留兜底 / --llm-parse 整节）→ 结构校验。
    """
    kept, ignored = filter_blocks(blocks)
    sections = segment(kept)
    title = ""
    questions: list[Question] = []
    residual: list[tuple[str, str, str]] = []  # (text, section, 归类) 规则未成题的残留
    qid = 0

    for sec in sections:
        if sec.type == "preamble":
            title = title or sec.title
            extra = [
                b for b in sec.blocks
                if b.text.strip() and b.text.strip() != sec.title.strip()
            ]
            if extra:
                ignored["knowledge"] = ignored.get("knowledge", 0) + len(extra)
            continue
        if sec.type == "essay":
            n = sum(1 for b in sec.blocks if QUESTION_NUM_RE.match(b.text.strip()))
            ignored["essay"] = ignored.get("essay", 0) + (n or len(sec.blocks))
            continue

        # --llm-parse：整节交 LLM 批量结构化（规则旁路）
        if llm_parse and llm is not None:
            text = "\n".join(b.text for b in sec.blocks if b.text.strip())
            for d in llm.extract_questions(text):
                qid += 1
                questions.append(_dict_to_question(d, qid, sec.title))
            continue

        if sec.type == "choice":
            cands, leftover_texts = _detect_choice(sec)
            for c in cands:
                qid += 1
                questions.append(choice_candidate_to_question(c, qid))
            residual.extend((t, sec.title, "knowledge") for t in leftover_texts)
            continue
        if sec.type == "blank":
            for b in sec.blocks:
                if b.kind != "para":
                    continue
                t = b.text.strip()
                if not t:
                    continue
                if BLANK_RE.search(t) and not _scan_options(t):
                    qid += 1
                    questions.append(
                        Question(
                            id=qid, type="blank", section=sec.title,
                            stem=_strip_number(t), options=None, answer=[],
                            tolerant=True, low_confidence=True,
                        )
                    )
                else:
                    residual.append((t, sec.title, "fill"))
            continue
        # unknown 节 → 残留（可能被 LLM 兜底救回）
        residual.extend(
            (b.text, sec.title, "knowledge")
            for b in sec.blocks if b.kind == "para" and b.text.strip()
        )

    if llm is not None and not llm_parse:
        # 1) 优先：给规则产出的低置信题补答案（保证已有题先拿到答案）
        for q in questions:
            if q.source == "rule" and q.low_confidence:
                _llm_refine(q, llm)
        # 2) 残留兜底：逐块 adjudicate（是题→入库 source=llm，否则计噪声）
        for text, section, cat in residual:
            d = llm.adjudicate(text)
            if d and d.get("is_question"):
                qid += 1
                questions.append(_dict_to_question(d, qid, section))
            else:
                ignored[cat] = ignored.get(cat, 0) + 1
    else:
        for _t, _s, cat in residual:
            ignored[cat] = ignored.get(cat, 0) + 1

    for q in questions:
        _apply_validation(q)

    return Quiz(
        title=title or _guess_title(source_file),
        source_file=source_file,
        questions=questions,
        ignored_summary=ignored,
    )


def _normalize_llm_answers(vals) -> list[str]:
    """规整 LLM 答案：递归展平嵌套列表 / 字符串化列表（LLM 偶尔返回 [['x']] 或 "['x']"）。"""
    out: list[str] = []
    for v in vals or []:
        if isinstance(v, list):
            out.extend(_normalize_llm_answers(v))
            continue
        s = str(v).strip().strip('"').strip("'")
        if not s:
            continue
        if s.startswith("[") and s.endswith("]"):
            try:
                parsed = json.loads(s.replace("'", '"'))
                if isinstance(parsed, list):
                    out.extend(_normalize_llm_answers(parsed))
                    continue
            except json.JSONDecodeError:
                pass
        out.append(s)
    return out


def _dict_to_question(d: dict, qid: int, section: str) -> Question:
    """LLM 抽取 dict → Question（source=llm，默认存疑）。"""
    opts = d.get("options")
    if opts == {}:
        opts = None
    answer = _normalize_llm_answers(d.get("answer") or [])
    qtype = d.get("type") or "single"
    # single 却给多答案 → 升级为 multiple（否则单选 UI 永远判错）
    if qtype == "single" and len(answer) > 1:
        qtype = "multiple"
    return Question(
        id=qid,
        type=qtype,
        section=section,
        stem=(d.get("stem") or "").strip(),
        options=opts,
        answer=answer,
        low_confidence=True,
        source="llm",
    )


# ---------------- 交互审校（--review）----------------


def review_quiz(quiz: Quiz, prompt_fn=input) -> Quiz:
    """逐题核对 low_confidence 题目：y 确认 / a 改答案 / s 跳过 / d 删除 / q 结束。"""
    low = [q for q in quiz.questions if q.low_confidence]
    if not low:
        return quiz
    print(f"\n📋 共 {len(low)} 道存疑题目（规则未能确定 / LLM 产出），逐题核对。")
    print("   [y]确认正确  [a]改答案  [s]跳过  [d]删除  [q]结束审校\n")
    del_ids: set[int] = set()
    for i, q in enumerate(low, 1):
        if q.id in del_ids:
            continue
        _print_for_review(i, len(low), q)
        cmd = (prompt_fn("[y/a/s/d/q]: ") or "").strip().lower()
        if cmd == "y":
            q.low_confidence = False
            q.note = None
        elif cmd == "a":
            new = (prompt_fn("  新答案（选择填字母如 AC，填空填文本）: ") or "").strip()
            q.answer = _parse_answer_input(new, q)
            q.low_confidence = False
            q.note = None
        elif cmd == "d":
            del_ids.add(q.id)
            print("   → 已标记删除")
        elif cmd == "q":
            break
        # s / 其它 → 跳过（保留存疑）
    if del_ids:
        quiz.questions = [q for q in quiz.questions if q.id not in del_ids]
    print(f"\n审校完成：保留 {len(quiz.questions)} 题。\n")
    return quiz


def _parse_answer_input(s: str, q: Question) -> list[str]:
    if q.type == "blank":
        return [s] if s else []
    return [c for c in s.upper() if "A" <= c <= "Z"]


def _print_for_review(i: int, n: int, q: Question) -> None:
    src = "LLM" if q.source == "llm" else "规则"
    print(f"[{i}/{n}] (来源:{src} | {q.type} | {q.section}) {q.stem}")
    if q.options:
        for k in sorted(q.options):
            mark = " ✓" if k in (q.answer or []) else ""
            print(f"       {k}. {q.options[k]}{mark}")
    if q.note:
        print(f"       ⚠ {q.note}")


# ---------------- 答案抽取（多策略）+ 题型推断 ----------------


def extract_inline_answer(text: str) -> tuple[str, list[str] | None]:
    """从题干抽取括号内联答案 (B)/(AC)。

    - 恰好 1 处 → 返回 (清洗后题干, 字母)；末尾答案直接删，中段答案用「＿＿＿」占位保语法。
    - 0 处或多处 → 歧义，返回 (原文, None)。
    """
    matches = list(PAREN_ANSWER_RE.finditer(text))
    if len(matches) != 1:
        return text, None
    m = matches[0]
    letters = list(m.group(1))
    tail = text[m.end():]
    if tail.strip() == "":
        clean = text[:m.start()]
    else:
        clean = text[:m.start()] + "＿＿＿" + tail
    clean = re.sub(r"\s+", " ", clean).strip().rstrip("。.，,")
    return clean, letters


def extract_answer_line(text: str) -> list[str] | None:
    """从「答案：B / 正确答案：AC」行抽取字母。"""
    m = ANSWER_LINE_RE.search(text)
    return list(m.group(1)) if m else None


def infer_choice_type(section_title: str, answer: list[str] | None) -> str:
    """推断选择题类型：多选题标题或答案>1 → multiple，否则 single。"""
    if "多选" in section_title:
        return "multiple"
    if answer and len(answer) > 1:
        return "multiple"
    return "single"


def choice_candidate_to_question(cand: "ChoiceCandidate", qid: int) -> Question:
    """选择题候选 → Question：抽内联答案、清题干、推断类型、标低置信。"""
    stem, letters = extract_inline_answer(cand.stem)
    answer = letters or []
    qtype = infer_choice_type(cand.section, letters)
    low = (not answer) or (not set(answer) <= set(cand.options))
    return Question(
        id=qid,
        type=qtype,
        section=cand.section,
        stem=stem,
        options=dict(cand.options),
        answer=answer,
        low_confidence=low,
    )


# ---------------- 滤噪（R10）----------------


def is_noise_block(text: str) -> str | None:
    """判断段落是否为噪声；返回类别或 None。

    - explanation：解析/解答/分析说明
    - essay：带分值（N分）的大题/计算题特征
    """
    t = text.strip()
    if EXPLAIN_RE.search(t):
        return "explanation"
    if SCORE_RE.search(t):
        return "essay"
    return None


def filter_blocks(blocks: list[Block]) -> tuple[list[Block], dict[str, int]]:
    """滤除噪声块，返回 (保留块, 各类计数)。图片/解析/分值大题被丢弃。"""
    kept: list[Block] = []
    ignored: dict[str, int] = {}
    for b in blocks:
        if b.kind == "image":
            ignored["image"] = ignored.get("image", 0) + 1
            continue
        cat = is_noise_block(b.text) if b.kind == "para" else None
        if cat:
            ignored[cat] = ignored.get(cat, 0) + 1
        else:
            kept.append(b)
    return kept, ignored


# ---------------- 组装辅助 ----------------


def quiz_to_dict(quiz: Quiz) -> dict:
    """Quiz → 可 JSON 序列化的 dict（数据契约对外形态）。"""
    import dataclasses

    return dataclasses.asdict(quiz)


def dict_to_quiz(d: dict) -> Quiz:
    """quiz_to_dict 的逆：dict → Quiz（用于从已留存的 JSON 重新渲染）。"""
    qs = []
    for qd in d.get("questions", []):
        qs.append(
            Question(
                id=qd.get("id", 0),
                type=qd.get("type", ""),
                section=qd.get("section", ""),
                stem=qd.get("stem", ""),
                options=qd.get("options"),
                answer=list(qd.get("answer") or []),
                accepted=list(qd.get("accepted") or []),
                tolerant=bool(qd.get("tolerant", False)),
                low_confidence=bool(qd.get("low_confidence", False)),
                note=qd.get("note"),
                source=qd.get("source", "rule"),
            )
        )
    return Quiz(
        title=d.get("title", ""),
        source_file=d.get("source_file", ""),
        questions=qs,
        ignored_summary=dict(d.get("ignored_summary") or {}),
    )


def _guess_title(source_file: str) -> str:
    import os

    return os.path.splitext(os.path.basename(source_file))[0] or "题库"


# ---------------- 结构校验（关①：自动）----------------


def validate_question(q: Question) -> str | None:
    """结构校验：合规返回 None，否则返回原因字符串。"""
    if not q.stem or len(q.stem.strip()) < 2:
        return "题干为空或过短"
    if q.type in ("single", "multiple"):
        if not q.options or len(q.options) < 2:
            return "选项不足"
        bad = [k for k in (q.options or {}) if not (len(k) == 1 and k.isupper())]
        if bad:
            return f"选项键非法 {bad}"
        if not q.answer:
            return "无答案"
        if not set(q.answer) <= set(q.options or {}):
            return f"答案 {q.answer} 不在选项 {list(q.options)} 中"
    elif q.type == "blank":
        if not q.answer:
            return "填空无答案"
    else:
        return f"未知题型 {q.type!r}"
    return None


def _apply_validation(q: Question) -> None:
    reason = validate_question(q)
    if reason:
        q.low_confidence = True
        if not q.note:
            q.note = reason


def _question_to_block_text(q: Question) -> str:
    parts = [q.stem]
    if q.options:
        for letter, content in q.options.items():
            parts.append(f"{letter}. {content}")
    return "\n".join(parts)


def _llm_refine(q: Question, llm) -> None:
    """用 LLM 结果就地补全/修正低置信题目；能确定答案则提升置信。"""
    result = llm.adjudicate(_question_to_block_text(q))
    if not result or not result.get("is_question"):
        return
    if result.get("answer") and not q.answer:
        q.answer = _normalize_llm_answers(result["answer"])
    # single 却补出多答案 → 升级 multiple（否则单选 UI 永远判错）
    if q.type == "single" and len(q.answer) > 1:
        q.type = "multiple"
    if result.get("type") and not q.type:
        q.type = result["type"]
    if result.get("stem") and len(q.stem) < 4:
        q.stem = result["stem"]
    if result.get("options"):
        q.options = q.options or {}
        q.options.update(result["options"])
    if q.answer and (not q.options or set(q.answer) <= set(q.options or {})):
        q.low_confidence = False
