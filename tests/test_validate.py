"""生成物校验关卡（发布前质量门禁）：validate_quiz 跨题校验 + 真实数据门禁。"""

import json
from pathlib import Path

import pytest

from quizforge.model import Question, Quiz
from quizforge.validate import Issue, QuizValidationError, has_errors, validate_quiz

DATA = Path(__file__).resolve().parent.parent / "data"


def _single(qid=1, stem="数据库技术的核心是", options=None, answer=None):
    return Question(
        id=qid, type="single", section="单选题", stem=stem,
        options=options or {"A": "数据", "B": "数据库管理系统", "C": "操作系统", "D": "应用程序"},
        answer=["B"] if answer is None else answer,
    )


def test_valid_quiz_no_issues():
    quiz = Quiz(questions=[_single(), _single(2, "事务的ACID特性是指", answer=["A"])])
    assert validate_quiz(quiz) == []


def test_error_choice_answer_not_in_options():
    q = _single(answer=["E"])
    issues = validate_quiz(Quiz(questions=[q]))
    assert has_errors(issues)
    assert any("不在选项" in i.message for i in issues)


def test_error_empty_stem():
    issues = validate_quiz(Quiz(questions=[_single(stem=" ")]))
    assert has_errors(issues)


def test_error_duplicate_question():
    issues = validate_quiz(Quiz(questions=[_single(), _single(2)]))
    assert has_errors(issues)
    assert any("重复" in i.message for i in issues)


def test_warning_choice_without_answer():
    q = _single(answer=[])
    q.low_confidence = True
    issues = validate_quiz(Quiz(questions=[q]))
    assert not has_errors(issues), "无答案选择题走存疑流程，不应阻断发布"
    assert any(i.level == "warning" for i in issues)


def test_warning_few_options():
    q = _single(options={"A": "x", "B": "y"}, answer=["A"])
    issues = validate_quiz(Quiz(questions=[q]))
    assert not has_errors(issues)
    assert any("选项" in i.message for i in issues)


def test_error_empty_group():
    g = Question(id=1, type="group", stem="Unit 1 · Passage", sub_questions=[])
    assert has_errors(validate_quiz(Quiz(questions=[g])))


def test_warning_group_duplicate_sub_numbering():
    def sub(n):
        return Question(id=n, type="single", stem=f"第 {n} 题",
                        options={"A": "a", "B": "b", "C": "c", "D": "d"}, answer=["A"])
    g = Question(id=1, type="group", stem="Unit 1 · Conversation",
                 sub_questions=[sub(1), sub(2), sub(2)])
    issues = validate_quiz(Quiz(questions=[g]))
    assert not has_errors(issues), "子题编号重复是提示级，不阻断"
    assert any("编号重复" in i.message for i in issues)


def test_warning_matching_answer_duplicate_tokens():
    q = Question(id=1, type="blank", stem="文章+陈述", answer=["3 7 3"], tolerant=True)
    issues = validate_quiz(Quiz(questions=[q]))
    assert not has_errors(issues)
    assert any("重复" in i.message for i in issues)


def test_real_data_gates_no_errors():
    """CI 门禁：三个真实题库经真实管线（解析/加载+去重）后不得有 ERROR。"""
    from quizforge.ingest import load_docx
    from quizforge.parse import dedup_questions, dict_to_quiz, parse_blocks

    db = parse_blocks(load_docx(str(DATA / "数据库原理题库.docx")), source_file="db.docx")
    cet = parse_blocks(load_docx(str(DATA / "大英四.docx")), source_file="cet.docx")
    net_data = json.loads((DATA / "2026年重点复习题库.json").read_text(encoding="utf-8"))
    net = dict_to_quiz(net_data)
    net.questions, _ = dedup_questions(net.questions)

    for quiz in (db, cet, net):
        issues = validate_quiz(quiz)
        errs = [i for i in issues if i.level == "error"]
        assert not errs, f"{quiz.source_file}: {errs}"


def test_issue_levels_only_error_or_warning():
    assert Issue("error", 1, "x").level == "error"
    with pytest.raises(ValueError):
        Issue("fatal", 1, "x")
