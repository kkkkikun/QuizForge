"""model.py 数据类：构造、默认值、可空性与 Quiz JSON 数据契约。"""

from quizforge.model import Block, Question, Quiz
from quizforge.parse import dict_to_quiz, quiz_to_dict


# ---------------- Block（摄取层中间表示）----------------


def test_block_defaults():
    b = Block("docx", "Normal", "hello")
    assert (b.source, b.style, b.text) == ("docx", "Normal", "hello")
    assert b.kind == "para"
    assert b.highlight == ""
    assert b.images == []


def test_block_kind_and_highlight():
    b = Block("docx", "Heading 1", "题", kind="heading", highlight="B")
    assert b.kind == "heading"
    assert b.highlight == "B"


# ---------------- Question（解析层题目）----------------


def test_question_defaults():
    q = Question(1)
    assert q.id == 1
    assert q.type == ""
    assert q.section == ""
    assert q.stem == ""
    assert q.options is None          # 填空题没有选项 → None
    assert q.answer == []
    assert q.accepted == []
    assert q.tolerant is False
    assert q.low_confidence is False
    assert q.note is None
    assert q.source == "rule"
    assert q.sub_questions == []
    assert q.num is None
    assert q.images == []


def test_question_answer_always_list():
    """answer 恒为数组（数据契约要求），不因只给一个字母而变成 str。"""
    q = Question(1, "single", "选", "题干", {"A": "1"}, answer=["B"])
    assert q.answer == ["B"]
    assert isinstance(q.answer, list)


def test_question_options_dict_for_choice():
    q = Question(1, "single", "选", "题干", {"A": "1", "B": "2"}, answer=["B"])
    assert q.options == {"A": "1", "B": "2"}


def test_default_containers_not_shared():
    """dataclass 的可变默认值必须走 default_factory，否则实例之间会串数据。"""
    assert Block("a", "b", "c").images is not Block("d", "e", "f").images
    assert Question(1).answer is not Question(2).answer
    assert Question(1).accepted is not Question(2).accepted
    assert Question(1).sub_questions is not Question(2).sub_questions
    assert Question(1).images is not Question(2).images
    assert Quiz().questions is not Quiz().questions
    assert Quiz().ignored_summary is not Quiz().ignored_summary


# ---------------- Quiz ----------------


def test_quiz_defaults():
    z = Quiz()
    assert z.title == ""
    assert z.source_file == ""
    assert z.questions == []
    assert z.ignored_summary == {}


# ---------------- Quiz JSON 数据契约 ----------------


def test_quiz_to_dict_contract():
    """Quiz → dict 的字段名/类型/可空性（对外 JSON 数据契约）。"""
    z = Quiz(
        title="T",
        source_file="t.docx",
        questions=[Question(1, "single", "选", "题干", {"A": "1", "B": "2"},
                            answer=["B"], num=3)],
        ignored_summary={"fill": 2},
    )
    d = quiz_to_dict(z)
    assert set(d) == {"title", "source_file", "questions", "ignored_summary"}
    q = d["questions"][0]
    assert set(q) == {
        "id", "type", "section", "stem", "options", "answer", "accepted",
        "tolerant", "low_confidence", "note", "source", "sub_questions",
        "num", "images",
    }
    assert q["options"] == {"A": "1", "B": "2"}
    assert q["answer"] == ["B"]
    assert q["accepted"] == []
    assert q["tolerant"] is False
    assert q["low_confidence"] is False
    assert q["note"] is None          # 可空
    assert q["num"] == 3
    assert q["source"] == "rule"
    assert q["images"] == []
    assert d["ignored_summary"] == {"fill": 2}


def test_blank_question_options_nullable_in_contract():
    """填空题在 JSON 里 options 为 null（不是 {}），与 Question.options=None 对齐。"""
    z = Quiz(questions=[Question(1, "blank", "填", "____")])
    q = quiz_to_dict(z)["questions"][0]
    assert q["options"] is None
    assert q["accepted"] == []


def test_quiz_json_round_trip():
    """quiz_to_dict → dict_to_quiz 往返无损（普通题）。"""
    z = Quiz(
        title="T",
        source_file="t.docx",
        questions=[Question(1, "single", "选", "题干", {"A": "1", "B": "2"},
                            answer=["B"], num=3, low_confidence=True)],
        ignored_summary={"fill": 2},
    )
    back = dict_to_quiz(quiz_to_dict(z))
    assert back.title == z.title
    assert back.source_file == z.source_file
    assert back.ignored_summary == z.ignored_summary
    assert back.questions == z.questions


def test_group_sub_questions_restore_subset_of_fields():
    """group 子题在 dict_to_quiz 里只还原 id/type/stem/options/answer/images 等字段。

    accepted / tolerant / low_confidence / note / source / num 不被还原，
    子题的 section 取的是父题 section——这是当前 JSON 契约的既有行为，
    这里钉住它以免无意漂移。
    """
    sub = Question(2, "single", "子题", "题干", {"A": "x", "B": "y"},
                   answer=["B"], accepted=["Z"], tolerant=True, num=7)
    g = Question(1, "group", "选", "Unit 1", sub_questions=[sub])
    back = dict_to_quiz(quiz_to_dict(Quiz(questions=[g])))
    s = back.questions[0].sub_questions[0]
    assert s.id == 2
    assert s.type == "single"
    assert s.stem == "题干"
    assert s.answer == ["B"]
    assert s.section == "选"          # 取父题 section
    assert s.accepted == []           # 未还原
    assert s.tolerant is False        # 未还原
    assert s.num is None              # 未还原
