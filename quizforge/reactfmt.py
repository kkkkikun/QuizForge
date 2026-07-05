"""QuizForge Quiz → React 前端数据格式（生成 frontend/src/data.ts）。

React Question（见 frontend/src/types.ts）：
  { id, type:'choice'|'multiple'|'blank', question, options?:string[], answer:string|string[], explanation?, tags:string[] }
"""

from __future__ import annotations

import json
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


def write_data_ts(quiz: Quiz, path: str) -> None:
    """写出 frontend/src/data.ts（TITLE + QUESTIONS）。"""
    questions = to_react_questions(quiz)
    title = quiz.title or "题库"
    content = (
        "import { Question } from './types';\n\n"
        f"export const TITLE: string = {json.dumps(title, ensure_ascii=False)};\n\n"
        f"export const QUESTIONS: Question[] = "
        f"{json.dumps(questions, ensure_ascii=False, indent=2)};\n"
    )
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
