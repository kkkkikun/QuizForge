"""生成物校验关卡（发布前质量门禁，关④）。

单题结构问题由 parse.validate_question 就地标存疑；本模块做发布级跨题校验：
- error：结构性错误（空题干、答案越界、空组、完全重复题）→ 阻断生成
- warning：可疑数据（无答案存疑题、选项过少、子题编号重复、匹配答案序号重复）→ 仅提示
reactfmt.build_react_quizzes / cli 在写出前调用；有 error 时拒绝生成（CLI 退出码 4）。
"""

from __future__ import annotations

from dataclasses import dataclass

from .model import Question, Quiz


@dataclass
class Issue:
    """一条校验结论。level 限定 error（阻断）/ warning（提示）。"""

    level: str
    question_id: int | None
    message: str

    def __post_init__(self):
        if self.level not in ("error", "warning"):
            raise ValueError(f"非法 Issue level: {self.level!r}")


class QuizValidationError(Exception):
    """题库未通过发布校验（存在 error 级问题）。"""


def _choice_issues(q: Question, out: list[Issue]) -> None:
    if not q.options or len(q.options) < 2:
        out.append(Issue("error", q.id, f"选项不足（{len(q.options or {})} 个）"))
        return
    if len(q.options) < 3:
        out.append(Issue("warning", q.id, f"仅 {len(q.options)} 个选项，疑似源文档缺项"))
    bad = [k for k in q.options if not (len(k) == 1 and k.isupper())]
    if bad:
        out.append(Issue("error", q.id, f"选项键非法 {bad}"))
        return
    if not q.answer:
        out.append(Issue("warning", q.id, "无答案（存疑题，需 --review / LLM 核对）"))
    elif not set(q.answer) <= set(q.options):
        out.append(Issue("error", q.id, f"答案 {q.answer} 不在选项 {sorted(q.options)} 中"))


def _group_issues(q: Question, out: list[Issue]) -> None:
    if not q.sub_questions:
        out.append(Issue("error", q.id, "空组题（无子题）"))
        return
    seen: set[str] = set()
    for s in q.sub_questions:
        if s.stem in seen:
            out.append(Issue("warning", q.id, f"子题编号重复：{s.stem}"))
        seen.add(s.stem)


def _blank_issues(q: Question, out: list[Issue]) -> None:
    if not any(str(a).strip() for a in list(q.answer) + list(q.accepted)):
        out.append(Issue("warning", q.id, "填空无答案（存疑题，需 --review / LLM 核对）"))
        return
    ans = str(q.answer[0])
    tokens = ans.split()
    if len(tokens) >= 2 and len(tokens) != len(set(tokens)):
        out.append(Issue("warning", q.id, f"匹配答案序号重复：{ans}"))


def validate_quiz(quiz: Quiz) -> list[Issue]:
    """发布级校验：返回 Issue 列表（可能为空）。"""
    issues: list[Issue] = []
    seen: set = set()
    for q in quiz.questions:
        if q.type == "group":
            _group_issues(q, issues)
            continue
        if len(q.stem.strip()) < 2:
            issues.append(Issue("error", q.id, f"题干为空或过短：{q.stem!r}"))
            continue
        key = (q.type, q.stem, tuple(sorted((q.options or {}).items())), tuple(q.answer))
        if key in seen:
            issues.append(Issue("error", q.id, f"与前面题目完全重复：{q.stem[:40]}"))
            continue
        seen.add(key)
        if q.type in ("single", "multiple"):
            _choice_issues(q, issues)
        elif q.type == "blank":
            _blank_issues(q, issues)
        else:
            issues.append(Issue("error", q.id, f"未知题型 {q.type!r}"))
    return issues


def has_errors(issues: list[Issue]) -> bool:
    return any(i.level == "error" for i in issues)


def format_issues(issues: list[Issue]) -> str:
    """Issue 列表 → 人类可读多行报告。"""
    return "\n".join(
        f"  {'❌' if i.level == 'error' else '⚠️'} "
        + (f"题 {i.question_id}: " if i.question_id is not None else "")
        + i.message
        for i in issues
    )
