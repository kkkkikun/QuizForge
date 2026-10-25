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


def test_error_group_sub_answer_out_of_options():
    """组题子题答案不在选项中 → error（关卡盲区修复）。"""
    def sub(n, answer, options):
        return Question(id=n, type="single", stem=f"第 {n} 题",
                        options=options, answer=answer)
    g = Question(id=1, type="group", stem="Unit 1 · Conversation", sub_questions=[
        sub(2, ["A"], {"A": "a", "B": "b", "C": "c", "D": "d"}),
        sub(3, ["E"], {"A": "a", "B": "b", "C": "c"}),   # 越界
    ])
    issues = validate_quiz(Quiz(questions=[g]))
    errs = [i for i in issues if i.level == "error"]
    assert errs and "不在选项" in errs[0].message


def test_error_group_sub_few_options():
    """组题子题选项不足 → error。"""
    g = Question(id=1, type="group", stem="G", sub_questions=[
        Question(id=2, type="single", stem="子题", options={"A": "x"}, answer=["A"]),
    ])
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


def _all_real_quizzes():
    """data/ 下全部真实样本（docx 规则解析 / json 加载+去重）→ [(名称, Quiz)]。"""
    from quizforge.ingest import load_docx
    from quizforge.parse import dedup_questions, dict_to_quiz, parse_blocks

    quizzes = []
    for p in sorted(DATA.glob("*.docx")):
        quizzes.append((p.name, parse_blocks(load_docx(str(p)), source_file=p.name)))
    for p in sorted(DATA.glob("*.json")):
        data = json.loads(p.read_text(encoding="utf-8"))
        quiz = dict_to_quiz(data)
        quiz.questions, _ = dedup_questions(quiz.questions)
        quizzes.append((p.name, quiz))
    return quizzes


def test_real_data_gates_no_errors():
    """CI 门禁：data/ 全部真实题库经真实管线后不得有 ERROR（新样本入库即受检）。"""
    problems = []
    for name, quiz in _all_real_quizzes():
        errs = [i for i in validate_quiz(quiz) if i.level == "error"]
        if errs:
            problems.append(f"{name}: {errs}")
    assert not problems, "真实样本未通过发布校验：" + "；".join(problems)


def test_issue_levels_only_error_or_warning():
    assert Issue("error", 1, "x").level == "error"
    with pytest.raises(ValueError):
        Issue("fatal", 1, "x")
