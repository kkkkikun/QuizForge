"""LLM 结构化：兜底恢复 + --llm-parse 整节提取（fake LLM）。"""

from quizforge.model import Block
from quizforge.parse import parse_blocks


def test_llm_fallback_recovers_residual_question():
    """填空节的「已填陈述」规则无法成题 → LLM 兜底恢复为填空题。"""
    blocks = [
        Block("docx", "Normal", "填空题", "heading"),
        Block("docx", "Normal", "16.主键约束的关键字是PRIMARY KEY", "para"),
    ]

    class FakeLLM:
        def adjudicate(self, text):
            return {"is_question": True, "type": "blank",
                    "stem": "主键约束的关键字是＿＿＿", "options": None,
                    "answer": ["PRIMARY KEY"]}

        def extract_questions(self, text):
            return []

    quiz = parse_blocks(blocks, source_file="x", llm=FakeLLM())
    llm_qs = [q for q in quiz.questions if q.source == "llm"]
    assert len(llm_qs) == 1
    assert llm_qs[0].type == "blank"
    assert llm_qs[0].answer == ["PRIMARY KEY"]
    assert llm_qs[0].low_confidence is True  # llm 产出默认存疑


def test_llm_fallback_non_question_counted():
    """LLM 判定不是题 → 计入噪声。"""
    blocks = [
        Block("docx", "Normal", "填空题", "heading"),
        Block("docx", "Normal", "这是一段纯知识点说明文字", "para"),
    ]

    class FakeLLM:
        def adjudicate(self, text):
            return {"is_question": False, "category": "knowledge"}

        def extract_questions(self, text):
            return []

    quiz = parse_blocks(blocks, source_file="x", llm=FakeLLM())
    assert not any(q.source == "llm" for q in quiz.questions)
    assert quiz.ignored_summary.get("fill", 0) >= 1  # 残留归 fill/knowledge


def test_llm_parse_mode_replaces_rules():
    """--llm-parse：整节交 LLM，规则题被替换。"""
    blocks = [
        Block("docx", "Normal", "选择题", "heading"),
        Block("docx", "Normal", "1.题干(B)", "para"),
        Block("docx", "Normal", "A.甲", "para"),
        Block("docx", "Normal", "B.乙", "para"),
    ]

    class FakeLLM:
        def adjudicate(self, text):
            return None

        def extract_questions(self, text):
            return [{"type": "single", "stem": "LLM题",
                     "options": {"A": "x", "B": "y"}, "answer": ["A"]}]

    quiz = parse_blocks(blocks, source_file="x", llm=FakeLLM(), llm_parse=True)
    assert len(quiz.questions) == 1
    assert all(q.source == "llm" for q in quiz.questions)
    assert quiz.questions[0].stem == "LLM题"
    assert quiz.questions[0].low_confidence is True


def test_no_llm_residual_still_counted():
    """无 LLM 时，填空节残留仍计入 fill（保持原行为）。"""
    blocks = [
        Block("docx", "Normal", "填空题", "heading"),
        Block("docx", "Normal", "16.主键约束的关键字是PRIMARY KEY", "para"),
    ]
    quiz = parse_blocks(blocks, source_file="x")  # 无 llm
    assert quiz.ignored_summary.get("fill", 0) >= 1
    assert not any(q.source == "llm" for q in quiz.questions)


def test_dict_to_question_normalizes_stringified_list():
    """LLM 偶尔返回字符串化列表答案 → 应展平。"""
    from quizforge.parse import _dict_to_question

    q = _dict_to_question(
        {"type": "blank", "stem": "x", "options": None, "answer": ["['save']"]}, 1, "填空"
    )
    assert q.answer == ["save"]
    q2 = _dict_to_question(
        {"type": "blank", "stem": "x", "options": None,
         "answer": ["['S/N', '信噪比']"]}, 2, "填空"
    )
    assert q2.answer == ["S/N", "信噪比"]


def test_dict_to_question_single_multi_answer_upgrades():
    """single 给多答案 → 升级 multiple。"""
    from quizforge.parse import _dict_to_question

    q = _dict_to_question(
        {"type": "single", "stem": "x", "options": {"A": "1", "B": "2", "C": "3"},
         "answer": ["A", "C"]}, 1, "选"
    )
    assert q.type == "multiple"


def test_llm_refine_normalizes_nested_answers():
    """_llm_refine 补答案时，嵌套/字符串化列表要被展平（NET 实测出现的 bug）。"""
    from quizforge.model import Question
    from quizforge.parse import _llm_refine

    q = Question(1, "blank", stem="x ___", options=None, answer=[], low_confidence=True, source="rule")

    class FakeLLM:
        def adjudicate(self, text):
            return {"is_question": True, "type": "blank", "answer": [["S/N"], ["信噪比"]]}

    _llm_refine(q, FakeLLM())
    assert q.answer == ["S/N", "信噪比"]


def test_llm_refine_upgrades_single_to_multiple():
    """_llm_refine 给 single 题补出多答案 → 升级 multiple。"""
    from quizforge.model import Question
    from quizforge.parse import _llm_refine

    q = Question(1, "single", stem="x", options={"A": "1", "B": "2", "C": "3"},
                 answer=[], low_confidence=True, source="rule")

    class FakeLLM:
        def adjudicate(self, text):
            return {"is_question": True, "answer": ["A", "C"]}

    _llm_refine(q, FakeLLM())
    assert q.type == "multiple"
    assert q.answer == ["A", "C"]
