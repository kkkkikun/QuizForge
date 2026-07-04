"""结构校验 + 来源(source)标记测试。"""

from quizforge.model import Question
from quizforge.parse import validate_question


def test_question_source_default():
    q = Question(1, "single", stem="x")
    assert q.source == "rule"


def test_valid_single():
    q = Question(1, "single", stem="题干", options={"A": "1", "B": "2"}, answer=["A"])
    assert validate_question(q) is None


def test_valid_multiple():
    q = Question(1, "multiple", stem="题干", options={"A": "1", "B": "2"}, answer=["A", "B"])
    assert validate_question(q) is None


def test_empty_stem():
    q = Question(1, "single", stem="", options={"A": "1", "B": "2"}, answer=["A"])
    assert validate_question(q) and "题干" in validate_question(q)


def test_options_too_few():
    q = Question(1, "single", stem="题干", options={"A": "1"}, answer=["A"])
    assert validate_question(q) and "选项" in validate_question(q)


def test_answer_not_in_options():
    q = Question(1, "single", stem="题干", options={"A": "1", "B": "2"}, answer=["C"])
    assert validate_question(q) and "答案" in validate_question(q)


def test_choice_no_answer():
    q = Question(1, "single", stem="题干", options={"A": "1", "B": "2"}, answer=[])
    assert validate_question(q) and "答案" in validate_question(q)


def test_blank_no_answer():
    q = Question(1, "blank", stem="___ 是 OS", options=None, answer=[])
    assert validate_question(q) and "答案" in validate_question(q)


def test_unknown_type():
    q = Question(1, "weird", stem="题干", options={"A": "1"}, answer=["A"])
    assert validate_question(q) is not None
