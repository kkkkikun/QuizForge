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
    ANSWER_KEY_RE,
    ANSWER_LINE_RE,
    EN_SECTION_HEADER_RE,
    ANSWER_SEQ_RE,
    BLANK_RE,
    CET_SECTION_RE,
    CET_SUBCONTEXT_RE,
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
    answer_letter: str | None = None   # 高亮标记的答案字母（CET）
    group: str | None = None           # 子分组上下文（Unit·Passage），有则归组
    group_ctx: bool = False            # True=CET 显式上下文组；False=回退段落组（受 ≥2 门槛）
    num: int | None = None             # 文档中的题号（答案 key 区映射用）
    images: list = field(default_factory=list)  # 题干附近的配图（base64）


def _section_type(title: str) -> str:
    t = title.strip()
    if t in _TYPE_MAP:
        return _TYPE_MAP[t]
    if ANSWER_KEY_RE.match(t):
        return "answer_key"
    if CET_SECTION_RE.match(t):
        return "choice"
    if EN_SECTION_HEADER_RE.match(t):
        if "blank" in t.lower() or "fill" in t.lower():
            return "blank"
        return "choice"
    for k, v in _TYPE_MAP.items():
        if k in t:
            return v
    return "unknown"


def segment(blocks: list[Block]) -> list[Section]:
    """按 Heading 样式 / 章节标题文本切分节。"""
    sections: list[Section] = [Section("preamble", "", [])]
    for b in blocks:
        is_header = (
            b.kind == "heading"
            or (b.kind == "para" and SECTION_HEADER_RE.match(b.text.strip()))
            or (b.kind == "para" and CET_SECTION_RE.match(b.text.strip()))
            or (b.kind == "para" and ANSWER_KEY_RE.match(b.text.strip()))
            or (b.kind == "para" and EN_SECTION_HEADER_RE.match(b.text.strip()))
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


# 组名候选：题前 leading 短段落视为标题行（整行取用）；超过则按词边界截断
_GROUP_TITLE_MAX = 60


def _truncate_name(text: str, limit: int = 30) -> str:
    if len(text) <= limit:
        return text
    cut = text[:limit]
    if text[limit] != " " and " " in cut:
        cut = cut[:cut.rfind(" ")]
    return cut.rstrip(" ,.;:") + "…"


def _pick_group_name(pending: list[str]) -> str:
    """组名：题前第一个长段落之前的最后一个短段落（标题行）整行取用；无则首段截断。"""
    name = ""
    for t in pending:
        if len(t) > _GROUP_TITLE_MAX:
            break
        name = t
    return name or _truncate_name(pending[0])


def _detect_choice(section: Section) -> tuple[list[ChoiceCandidate], list[str]]:
    """在 choice 节内识别选择题候选。

    - 选项块为锚吸附题干；高亮(hl=yellow)的选项 → answer_letter（CET）
    - 子分组(Unit/News report/Passage) 与纯题号(N、) 不计入题干，单独跟踪
    - 听力等无文字题干 → 题干合成为「Unit · Passage · 第N题」
    返回 (候选列表, 未匹配题干文本列表)。
    """
    cands: list[ChoiceCandidate] = []
    pending: list[str] = []
    pending_images: list[str] = []
    cur_unit = None
    cur_passage = None
    cur_num: int | None = None
    current_group: str | None = None
    current_group_ctx = False
    blocks = section.blocks
    n = len(blocks)
    j = 0
    while j < n:
        b = blocks[j]
        t = b.text.strip()
        opts = _scan_options(t)
        if opts:
            merged = list(opts)
            k = j + 1
            while k < n and _scan_options(blocks[k].text):
                merged.extend(_scan_options(blocks[k].text))
                k += 1
            # PPT 转换修复：首选项非 A 时，首个选项块标记前的残留文本——
            # 短（≤40）是丢失标签的 A 选项内容；长则是与选项同块的内联题干
            inline_stem = ""
            if merged[0][0] != "A":
                first_markers = list(OPTION_START_RE.finditer(blocks[j].text))
                if first_markers:
                    pre = blocks[j].text[: first_markers[0].start()].strip().rstrip("。，,；.")
                    if 0 < len(pre) <= 40:
                        merged.insert(0, ("A", pre))
                    elif len(pre) > 40:
                        inline_stem = pre
            options: dict[str, str] = {}
            for letter, content in merged:
                options.setdefault(letter, content)
            hl = None
            for bi in range(j, k):
                if blocks[bi].highlight:
                    bo = _scan_options(blocks[bi].text)
                    if bo:
                        hl = bo[0][0]
                        break
            real_stem_raw = pending[-1] if pending else inline_stem
            real_stem = _strip_number(real_stem_raw).strip() if real_stem_raw else ""
            mnum = re.match(r"\s*(\d+)", real_stem_raw) if real_stem_raw else None
            num = int(mnum.group(1)) if mnum else None
            ctx = " · ".join(x for x in (cur_unit, cur_passage) if x)
            if ctx:
                # CET 听力等：子分组上下文 → 组名=ctx
                npart = f"第 {cur_num} 题" if cur_num else "未编号题"
                stem = real_stem if real_stem else npart
                current_group = ctx
                current_group_ctx = True
            else:
                stem = real_stem or (f"第 {cur_num} 题" if cur_num else "")
                # 段落中断：题前累积 ≥2 段非选项文本（文章正文）→ 开新组，组名取标题行
                if len(pending) >= 2:
                    current_group = _pick_group_name(pending[:-1])
                    current_group_ctx = False
            cands.append(ChoiceCandidate(section.title, stem, options, answer_letter=hl,
                                         group=current_group, group_ctx=current_group_ctx,
                                         num=num, images=pending_images))
            pending = []
            pending_images = []
            cur_num = None
            j = k
        else:
            if b.kind == "image":
                pending_images.extend(b.images)   # 题干/题间配图，成题时挂到该题
            elif CET_SUBCONTEXT_RE.match(t):
                if t.startswith("Unit"):
                    cur_unit, cur_passage = t, None
                else:
                    cur_passage = t
            elif re.match(r"^\d+[、.]?$", t):
                cur_num = int(re.match(r"(\d+)", t).group(1))
            elif b.kind == "para" and t:
                pending.append(t)
            j += 1
    return cands, pending, pending_images


def detect_choice_questions(section: Section) -> list[ChoiceCandidate]:
    """公开接口：仅返回选择题候选（忽略 leftover 统计）。"""
    return _detect_choice(section)[0]
def _detect_matching(section: Section) -> list[tuple[str, str]]:
    """检测匹配题：一篇文章 + 连续「N、陈述」+ 结尾答案序列 → **一整道题**。

    题面 = 文章 + 全部陈述；答案 = 完整数字串（空格分隔）。
    返回 [(stem, answer_string), ...]，每篇文章一道题。
    """
    out: list[tuple[str, str]] = []
    blocks = section.blocks
    n = len(blocks)
    cur_unit = None
    cur_passage = None
    passage_buf: list[str] = []   # 累积文章正文
    i = 0
    while i < n:
        t = blocks[i].text.strip()
        if CET_SUBCONTEXT_RE.match(t):
            if t.startswith("Unit"):
                cur_unit, cur_passage = t, None
            else:
                cur_passage = t
            passage_buf = []
            i += 1
            continue
        if re.match(r"^\d+、", t):
            stmts: list[str] = []
            j = i
            while j < n and re.match(r"^\d+、", blocks[j].text.strip()):
                stmts.append(blocks[j].text.strip())
                j += 1
            if j < n and ANSWER_SEQ_RE.match(blocks[j].text.strip()):
                seq = blocks[j].text.strip().split()
                if stmts and len(seq) >= len(stmts):
                    face = "\n".join(passage_buf + [""] + stmts).strip()
                    out.append((face, " ".join(seq)))
                    passage_buf = []
                    i = j + 1
                    continue
            i = j
        else:
            passage_buf.append(t)
            i += 1
    return out


def _is_rescuable_blank(text: str) -> bool:
    """choice 节残留里可救回的填空句：带空位标记且空位不在句尾（句尾空括号多为选择题残干）。"""
    t = text.strip()
    if len(t) <= 4 or _scan_options(t):
        return False
    m = BLANK_RE.search(t)
    return bool(m) and m.end() < len(t) - 2 and re.search(r"[\u4e00-\u9fffa-zA-Z]", t[m.end():])


def _is_unrenderable(q: Question) -> bool:
    """无法作答的废题：空题干 / 选择题无选项。组装时丢弃而非标存疑（--review 也救不了它们）。"""
    if len(q.stem.strip()) < 2:
        return True
    return q.type in ("single", "multiple") and (not q.options or len(q.options) < 2)


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
    key_map: dict[int, str] = {}               # 答案 key 区：题号 → 答案
    qid = 0

    for sec in sections:
        if sec.type == "preamble":
            title = title or sec.title
            extra = [
                b for b in sec.blocks
                if b.kind != "image" and b.text.strip() and b.text.strip() != sec.title.strip()
            ]
            n_img = sum(1 for b in sec.blocks if b.kind == "image")
            if n_img:
                ignored["image"] = ignored.get("image", 0) + n_img
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

        if sec.type == "answer_key":
            key_map.update(parse_answer_key(sec.blocks))
            continue
        if sec.type == "choice":
            cands, leftover_texts, leftover_imgs = _detect_choice(sec)
            if leftover_imgs:
                ignored["image"] = ignored.get("image", 0) + len(leftover_imgs)
            # 单选节里混的填空题（无选项、带空位标记，thermal 题 12 形态）→ 救回为存疑 blank；
            # 节内残留图挂到第一道（扁平化后无精确归属，近似可接受）
            rescued_imgs = list(leftover_imgs)
            for t in leftover_texts:
                if _is_rescuable_blank(t):
                    qid += 1
                    mnum = re.match(r"\s*(\d+)", t)
                    questions.append(
                        Question(
                            id=qid, type="blank", section=sec.title,
                            stem=_strip_number(t), options=None, answer=[],
                            tolerant=True, low_confidence=True,
                            num=int(mnum.group(1)) if mnum else None,
                            images=rescued_imgs,
                        )
                    )
                    rescued_imgs = []
                    if leftover_imgs:
                        ignored["image"] = ignored.get("image", 0) - len(leftover_imgs)
                        leftover_imgs = []
            # 有 group 的候选按连续同组聚合成 group 题（≥2 道才成组，孤立候选解散为普通题）
            i = 0
            nc = len(cands)
            while i < nc:
                c = cands[i]
                if c.group:
                    gk = c.group
                    j2 = i
                    while j2 < nc and cands[j2].group == gk:
                        j2 += 1
                    if j2 - i >= 2 or c.group_ctx:
                        qid += 1
                        gid = qid
                        subs: list[Question] = []
                        for kk in range(i, j2):
                            qid += 1
                            subs.append(choice_candidate_to_question(cands[kk], qid))
                        questions.append(
                            Question(id=gid, type="group", section=sec.title,
                                     stem=gk, sub_questions=subs)
                        )
                    else:
                        qid += 1
                        questions.append(choice_candidate_to_question(cands[i], qid))
                    i = j2
                else:
                    qid += 1
                    questions.append(choice_candidate_to_question(c, qid))
                    i += 1
            rescued = {_strip_number(t) for t in leftover_texts if _is_rescuable_blank(t)}
            residual.extend(
                (t, sec.title, "knowledge") for t in leftover_texts
                if _strip_number(t) not in rescued
            )
            # 匹配题：陈述 + 结尾答案序列
            for stem, ans in _detect_matching(sec):
                qid += 1
                questions.append(
                    Question(
                        id=qid, type="blank", section=sec.title, stem=stem,
                        options=None, answer=[ans], tolerant=True, low_confidence=False,
                    )
                )
            continue
        if sec.type == "blank":
            blank_imgs: list[str] = []
            for b in sec.blocks:
                if b.kind == "image":
                    blank_imgs.extend(b.images)   # 挂到下一道填空题
                    continue
                if b.kind != "para":
                    continue
                t = b.text.strip()
                if not t:
                    continue
                if BLANK_RE.search(t) and not _scan_options(t):
                    qid += 1
                    mnum = re.match(r"\s*(\d+)", t)
                    questions.append(
                        Question(
                            id=qid, type="blank", section=sec.title,
                            stem=_strip_number(t), options=None, answer=[],
                            tolerant=True, low_confidence=True,
                            num=int(mnum.group(1)) if mnum else None,
                            images=blank_imgs,
                        )
                    )
                    blank_imgs = []
                else:
                    residual.append((t, sec.title, "fill"))
            if blank_imgs:
                ignored["image"] = ignored.get("image", 0) + len(blank_imgs)
            continue
        # unknown 节 → 残留（可能被 LLM 兜底救回）；图片直接计丢弃
        for b in sec.blocks:
            if b.kind == "image":
                ignored["image"] = ignored.get("image", 0) + 1
            elif b.kind == "para" and b.text.strip():
                residual.append((b.text, sec.title, "knowledge"))

    # 答案 key 区回填（确定性来源，优先于 LLM 兜底）
    if key_map:
        apply_answer_key(questions, key_map)

    if llm is not None and not llm_parse:
        # 1) 优先：给规则产出的低置信题补答案（保证已有题先拿到答案）
        for q in questions:
            if q.source == "rule" and q.low_confidence:
                _llm_refine(q, llm)
            if q.type == "group":
                for s in q.sub_questions:
                    if s.low_confidence:
                        _llm_refine(s, llm)
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

    unrenderable = [q for q in questions if _is_unrenderable(q)]
    if unrenderable:
        ignored["invalid"] = ignored.get("invalid", 0) + len(unrenderable)
        drop = {id(q) for q in unrenderable}
        questions = [q for q in questions if id(q) not in drop]

    questions, dup = dedup_questions(questions)
    if dup:
        ignored["duplicate"] = ignored.get("duplicate", 0) + dup

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


# ---------------- 答案 key 区（文档末尾独立答案区）----------------

# 区间字母序列：1-5 BCADC / 6—10 AB
_KEY_RANGE_RE = re.compile(r"^\s*(\d{1,3})\s*[-—~～]\s*(\d{1,3})\s*([A-D]{1,4}(?:\s*[A-D]{1,4})*)\s*$")
# 题号-字母对：1.B / 2、AC / 3．D（一行可连排多对）
_KEY_PAIR_RE = re.compile(r"(\d{1,3})\s*[.、．)）:：]?\s*([A-D]{1,4})(?![A-D])")
# 题号-文本值：17. 拥塞控制（填空答案）
_KEY_TEXT_RE = re.compile(r"^\s*(\d{1,3})\s*[.、．)）:：]\s*(\S.*)$")


def parse_answer_key(blocks: list[Block]) -> dict[int, str]:
    """答案 key 区内容 → {题号: 答案}。字母值为选择/多选，文本值为填空。"""
    key: dict[int, str] = {}
    for b in blocks:
        t = b.text.strip()
        if not t:
            continue
        m = _KEY_RANGE_RE.match(t)
        if m:
            start, end = int(m.group(1)), int(m.group(2))
            letters = re.sub(r"\s+", "", m.group(3))
            if start <= end and end - start + 1 == len(letters):
                for i, ch in enumerate(letters):
                    key[start + i] = ch
            continue  # 区间形无论成败都不再按题号对解析（避免截断区间误读）
        pairs = _KEY_PAIR_RE.findall(t)
        if pairs:
            for num_s, val in pairs:
                key.setdefault(int(num_s), val)
            continue
        m = _KEY_TEXT_RE.match(t)
        if m:
            key.setdefault(int(m.group(1)), m.group(2).strip())
    return key


def apply_answer_key(questions: list[Question], key_map: dict[int, str]) -> int:
    """按题号把答案 key 回填到无答案的题；返回回填题数。

    确定性文档来源（与高亮同级别），回填后提升置信。
    选择题答案不在选项中时不回填（维持存疑，交 LLM/人工）。
    """
    applied = 0
    for q in questions:
        if q.answer or q.num is None:
            continue
        val = key_map.get(q.num)
        if not val:
            continue
        if q.type in ("single", "multiple"):
            letters = list(val)
            if not set(letters) <= set(q.options or {}):
                continue
            q.answer = letters
            if len(letters) > 1:
                q.type = "multiple"
            q.low_confidence = False
            q.note = None
            applied += 1
        elif q.type == "blank":
            q.answer = [val]
            q.low_confidence = False
            q.note = None
            applied += 1
    return applied


def infer_choice_type(section_title: str, answer: list[str] | None) -> str:
    """推断选择题类型：多选题标题或答案>1 → multiple，否则 single。"""
    if "多选" in section_title:
        return "multiple"
    if answer and len(answer) > 1:
        return "multiple"
    return "single"


def choice_candidate_to_question(cand: "ChoiceCandidate", qid: int) -> Question:
    """选择题候选 → Question。高亮答案(CET)优先；否则抽内联答案、推断类型、标低置信。"""
    if cand.answer_letter:
        return Question(
            id=qid, type="single", section=cand.section, stem=cand.stem,
            options=dict(cand.options), answer=[cand.answer_letter],
            low_confidence=False, num=cand.num, images=list(cand.images),
        )
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
        num=cand.num,
        images=list(cand.images),
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
    """滤除噪声块，返回 (保留块, 各类计数)。解析文字/带数据的图片保留；解析/分值大题丢弃；
    无数据的图片占位（wmf 公式图等）丢弃。未挂到题目的图片由 parse 层计入 ignored。"""
    kept: list[Block] = []
    ignored: dict[str, int] = {}
    for b in blocks:
        if b.kind == "image":
            if b.images:
                kept.append(b)          # 题目配图（base64），交给 parse 关联
            else:
                ignored["image"] = ignored.get("image", 0) + 1
            continue
        cat = is_noise_block(b.text) if b.kind == "para" else None
        if cat:
            ignored[cat] = ignored.get(cat, 0) + 1
        else:
            kept.append(b)
    return kept, ignored


def diagnose_blocks(blocks: list[Block]) -> str:
    """解析诊断：结构识别报告（0 题或题量异常时帮用户定位文档形态问题）。"""
    kept, ignored = filter_blocks(blocks)
    sections = segment(kept)
    lines = [f"识别到 {len(sections)} 个章节："]
    total_cands = 0
    for s in sections:
        note = ""
        if s.type == "choice":
            cands, _leftover, _imgs = _detect_choice(s)
            total_cands += len(cands)
            note = f"，识别选择题 {len(cands)} 道"
        lines.append(f"  · [{s.type}] {s.title!r}（{len(s.blocks)} 块{note}）")
    noise = "、".join(f"{k}×{v}" for k, v in ignored.items()) or "无"
    lines.append(f"滤噪：{noise}")
    if total_cands == 0:
        lines.append(
            "未识别到选择题候选。支持的文档形态：题干 + A./B./C./D. 选项；"
            "答案可为内联 (B)、「答案：B」、黄色高亮或文末「参考答案」区。"
        )
    return "\n".join(lines)


# ---------------- 组装辅助 ----------------


def quiz_to_dict(quiz: Quiz) -> dict:
    """Quiz → 可 JSON 序列化的 dict（数据契约对外形态）。"""
    import dataclasses

    return dataclasses.asdict(quiz)


def dedup_questions(questions: list[Question]) -> tuple[list[Question], int]:
    """去除完全重复的题（题型+题干+选项+答案全等）；group 不参与。返回 (保留列表, 重复数)。"""
    seen: set = set()
    out: list[Question] = []
    dup = 0
    for q in questions:
        if q.type == "group":
            out.append(q)
            continue
        key = (q.type, q.stem, tuple(sorted((q.options or {}).items())), tuple(q.answer))
        if key in seen:
            dup += 1
            continue
        seen.add(key)
        out.append(q)
    return out, dup


def dict_to_quiz(d: dict) -> Quiz:
    """quiz_to_dict 的逆：dict → Quiz（用于从已留存的 JSON 重新渲染）。"""
    qs = []
    for qd in d.get("questions", []):
        subs = [
            Question(
                id=sd.get("id", 0),
                type=sd.get("type", "single"),
                section=qd.get("section", ""),
                stem=sd.get("stem", ""),
                options=sd.get("options"),
                answer=list(sd.get("answer") or []),
                images=list(sd.get("images") or []),
            )
            for sd in qd.get("sub_questions") or []
        ]
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
                sub_questions=subs,
                num=qd.get("num"),
                images=list(qd.get("images") or []),
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
    if q.type == "group":
        return None if q.sub_questions else "空组题"
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
