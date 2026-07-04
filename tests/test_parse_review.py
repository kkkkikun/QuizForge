"""--review 交互审校测试（prompt_fn 注入，免真实 stdin）。"""

from quizforge.model import Question, Quiz
from quizforge.parse import review_quiz


def _quiz() -> Quiz:
    return Quiz(title="t", source_file="t", questions=[
        Question(1, "single", stem="q1", options={"A": "x", "B": "y"},
                 answer=[], low_confidence=True, source="llm"),
        Question(2, "blank", stem="q2 ___", options=None,
                 answer=[], low_confidence=True, source="llm"),
        Question(3, "single", stem="q3", options={"A": "x", "B": "y"},
                 answer=["A"], low_confidence=False, source="rule"),
    ])


def test_review_confirm_and_skip():
    qz = _quiz()
    cmds = iter(["y", "s"])  # q1 确认，q2 跳过
    review_quiz(qz, prompt_fn=lambda _: next(cmds))
    assert qz.questions[0].low_confidence is False
    assert qz.questions[1].low_confidence is True
    assert len(qz.questions) == 3


def test_review_change_answer():
    qz = _quiz()
    cmds = iter(["a", "B", "y"])  # q1 改答案 B；q2 确认
    review_quiz(qz, prompt_fn=lambda _: next(cmds))
    assert qz.questions[0].answer == ["B"]
    assert qz.questions[0].low_confidence is False


def test_review_delete():
    qz = _quiz()
    cmds = iter(["d", "d"])  # 删 q1、q2
    review_quiz(qz, prompt_fn=lambda _: next(cmds))
    assert len(qz.questions) == 1
    assert qz.questions[0].id == 3


def test_review_quit():
    qz = _quiz()
    cmds = iter(["q"])  # 立即结束
    review_quiz(qz, prompt_fn=lambda _: next(cmds))
    assert len(qz.questions) == 3
    assert qz.questions[0].low_confidence is True


def test_review_blank_change_answer():
    qz = _quiz()
    cmds = iter(["a", "内核", "s"])  # q2(blank) 改答案
    # 先跳过 q1
    cmds = iter(["s", "a", "内核"])
    review_quiz(qz, prompt_fn=lambda _: next(cmds))
    assert qz.questions[1].answer == ["内核"]
    assert qz.questions[1].low_confidence is False


def test_review_no_low_conf_is_noop():
    qz = Quiz(questions=[
        Question(1, "single", stem="q", options={"A": "x", "B": "y"}, answer=["A"])
    ])

    def boom(_):
        raise AssertionError("无存疑题不应调用 prompt")

    review_quiz(qz, prompt_fn=boom)  # 不抛即通过
