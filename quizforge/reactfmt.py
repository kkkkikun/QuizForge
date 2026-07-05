"""QuizForge Quiz → React 前端数据格式（生成 frontend/src/data.ts）。

React Question（见 frontend/src/types.ts）：
  { id, type:'choice'|'multiple'|'blank', question, options?:string[], answer:string|string[], explanation?, tags:string[] }
"""

from __future__ import annotations

import json
import os
import re

from .model import Question, Quiz

# QuizForge 填空空位标记（___ / ＿＿＿ / （ ） / ( ) / 〔〕）
_BLANK_MARK = re.compile(r"_{2,}|＿{2,}|[（(]\s*[)）]|〔\s*〕]")
_TYPE_MAP = {"single": "choice", "multiple": "multiple", "blank": "blank"}


def _inject_blanks(stem: str, answers: list[str]) -> str:
    """把题干中的空位标记替换为 [答案]，供 React renderQuestionStem 揭示。"""
    if not _BLANK_MARK.search(stem):
        return stem
    if not answers:
        return _BLANK_MARK.sub("[ ]", stem)
    it = iter(answers)

    def repl(_m):
        try:
            return f"[{next(it)}]"
        except StopIteration:
            return "[ ]"

    return _BLANK_MARK.sub(repl, stem)


def _blank_answers(q: Question) -> list[str]:
    """填空：把 answer + accepted 合并成单空的备选答案（用 / 连接，靠 React 容错）。"""
    acc: list[str] = []
    for a in list(q.answer) + list(q.accepted):
        s = str(a).strip()
        if s and s not in acc:
            acc.append(s)
    return ["/".join(acc)] if acc else []


def _tags(q: Question) -> list[str]:
    t: list[str] = []
    if q.section:
        t.append(q.section)
    if q.source == "llm":
        t.append("LLM")
    if not t:
        t.append("题目")
    return t


def _explanation(q: Question) -> str:
    parts: list[str] = []
    if q.note:
        parts.append(str(q.note))
    if q.low_confidence:
        parts.append("解析存疑，请核对")
    return "；".join(parts)


def to_react_questions(quiz: Quiz) -> list[dict]:
    """Quiz → React Question[] 字典列表。"""
    out: list[dict] = []
    for q in quiz.questions:
        rtype = _TYPE_MAP.get(q.type, "choice")
        item: dict = {"id": q.id, "type": rtype}
        if rtype == "blank":
            ans = _blank_answers(q)
            item["question"] = _inject_blanks(q.stem, ans)
            item["answer"] = ans
        else:
            item["question"] = q.stem
            item["options"] = [f"{k}. {v}" for k, v in sorted((q.options or {}).items())]
            if rtype == "choice":
                item["answer"] = q.answer[0] if q.answer else ""
            else:  # multiple
                item["answer"] = list(q.answer)
        item["tags"] = _tags(q)
        exp = _explanation(q)
        if exp:
            item["explanation"] = exp
        out.append(item)
    return out


def _slug(s: str) -> str:
    stem = os.path.splitext((s or "").strip())[0].lower()
    slug = re.sub(r"[^a-zA-Z0-9一-鿿]+", "-", stem).strip("-")
    return slug or "quiz"


def to_react_quiz(quiz: Quiz, qid: str | None = None) -> dict:
    """Quiz → React Quiz {id, title, questions}。"""
    return {
        "id": qid or _slug(quiz.source_file or quiz.title or "quiz"),
        "title": quiz.title or "题库",
        "questions": to_react_questions(quiz),
    }


def write_quizzes_ts(quizzes: list[dict], path: str) -> None:
    """写出 frontend/src/data.ts（QUIZZES）。"""
    content = (
        "import { Quiz } from './types';\n\n"
        f"export const QUIZZES: Quiz[] = "
        f"{json.dumps(quizzes, ensure_ascii=False, indent=2)};\n"
    )
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)


def write_data_ts(quiz: Quiz, path: str) -> None:
    """单题库 → data.ts（写成单元素 QUIZZES，与多题库格式统一）。"""
    write_quizzes_ts([to_react_quiz(quiz)], path)


def load_manifest(path: str) -> list[dict]:
    """读取 quizzes.yaml → [{id, title, source}, ...]。"""
    import yaml

    with open(path, encoding="utf-8") as f:
        data = yaml.safe_load(f) or {}
    return [
        {"id": e.get("id"), "title": e.get("title", ""), "source": e.get("source")}
        for e in (data.get("quizzes") or [])
    ]


def _load_quiz(src: str) -> Quiz:
    """加载一个题库：.json → dict_to_quiz；docx/pdf/txt → ingest+parse（无 LLM）。"""
    if src.lower().endswith(".json"):
        with open(src, encoding="utf-8") as f:
            data = json.load(f)
        from .parse import dict_to_quiz
        return dict_to_quiz(data)
    from . import ingest, parse
    blocks = ingest.load(src)
    return parse.parse_blocks(blocks, source_file=os.path.basename(src))


def build_react_quizzes(manifest_path: str) -> list[dict]:
    """读 manifest，逐个加载源题库 → React Quiz 列表。"""
    base = os.path.dirname(os.path.abspath(manifest_path))
    out: list[dict] = []
    for e in load_manifest(manifest_path):
        src = os.path.join(base, e["source"])
        out.append(to_react_quiz(_load_quiz(src), qid=e.get("id")))
    return out
