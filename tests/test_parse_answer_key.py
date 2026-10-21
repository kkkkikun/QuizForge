"""答案 key 区映射：文档末尾独立答案区 → 按题号回填（免 LLM）。"""

from quizforge.model import Block, Question
from quizforge.parse import apply_answer_key, parse_answer_key, parse_blocks


def _blocks(*texts):
    return [Block("docx", "Normal", t, "para") for t in texts]


def test_parse_answer_key_pair_form():
    """「1.B 2、AC 3．D」点号/顿号混排，一题多答。"""
    key = parse_answer_key(_blocks("1.B 2、AC", "3．D"))
    assert key == {1: "B", 2: "AC", 3: "D"}


def test_parse_answer_key_range_form():
    """「1-5 BCADC」/「6—7 AB」区间 + 逐字母映射；字母数与区间长度须一致。"""
    key = parse_answer_key(_blocks("1-5 BCADC", "6—7 AB"))
    assert key == {1: "B", 2: "C", 3: "A", 4: "D", 5: "C", 6: "A", 7: "B"}
    # 畸形区间（5 个题号只配 2 个字母）整行拒读，不产生误映射
    assert 6 not in parse_answer_key(_blocks("6—10 AB"))


def test_parse_answer_key_text_values():
    """非字母值（填空文本答案）原样保留。"""
    key = parse_answer_key(_blocks("17. 拥塞控制", "18、星形拓扑"))
    assert key == {17: "拥塞控制", 18: "星形拓扑"}


def test_answer_key_section_not_residual():
    """「参考答案」识别为 answer_key 节，内容不进 LLM 残留/噪声计数。"""
    blocks = [
        Block("docx", "Heading 1", "单选题", "heading"),
        Block("docx", "Normal", "1. 数据库技术的核心是", "para"),
        *[
            Block("docx", "Normal", f"{L}、选项{L}", "para")
            for L in "ABCD"
        ],
        Block("docx", "Heading 1", "参考答案", "heading"),
        Block("docx", "Normal", "1.B", "para"),
    ]
    quiz = parse_blocks(blocks, source_file="x.docx")
    assert len(quiz.questions) == 1
    q = quiz.questions[0]
    assert q.answer == ["B"]
    assert not q.low_confidence
    assert "knowledge" not in quiz.ignored_summary  # 答案区未计为噪声


def test_apply_answer_key_end_to_end_choice_and_blank():
    """无内联答案的选择/填空题按题号回填；类型/置信度随之修正。"""
    blocks = [
        Block("docx", "Heading 1", "单选题", "heading"),
        Block("docx", "Normal", "1. 数据库技术的核心是", "para"),
        *[
            Block("docx", "Normal", f"{L}、选项{L}", "para")
            for L in "ABCD"
        ],
        Block("docx", "Normal", "2. 事务的ACID特性是指", "para"),
        *[
            Block("docx", "Normal", f"{L}、选项{L}", "para")
            for L in "ABCD"
        ],
        Block("docx", "Heading 1", "填空题", "heading"),
        Block("docx", "Normal", "17. 数据库系统的三级模式结构是指____", "para"),
        Block("docx", "Heading 1", "参考答案", "heading"),
        Block("docx", "Normal", "1.B 2.AC", "para"),
        Block("docx", "Normal", "17. 外模式/模式/内模式", "para"),
    ]
    quiz = parse_blocks(blocks, source_file="x.docx")
    by_num = {}
    for q in quiz.questions:
        by_num.setdefault(q.type, []).append(q)
    single = by_num["single"][0]
    multi = by_num["multiple"][0]
    blank = by_num["blank"][0]
    assert single.answer == ["B"] and not single.low_confidence
    assert multi.answer == ["A", "C"] and not multi.low_confidence
    assert blank.answer == ["外模式/模式/内模式"] and not blank.low_confidence


def test_answer_key_value_not_in_options_stays_conflicted():
    """key 值不在选项中 → 不回填，维持存疑（交 LLM/人工）。"""
    blocks = [
        Block("docx", "Heading 1", "单选题", "heading"),
        Block("docx", "Normal", "1. 数据库技术的核心是", "para"),
        *[
            Block("docx", "Normal", f"{L}、选项{L}", "para")
            for L in "ABC"  # 无 D 选项
        ],
        Block("docx", "Heading 1", "参考答案", "heading"),
        Block("docx", "Normal", "1.D", "para"),
    ]
    quiz = parse_blocks(blocks, source_file="x.docx")
    q = quiz.questions[0]
    assert q.answer == []
    assert q.low_confidence


def test_apply_answer_key_direct():
    """apply_answer_key 只回填无答案且带题号的题，返回回填数。"""
    q1 = Question(id=1, type="single", stem="题一",
                  options={"A": "x", "B": "y", "C": "z", "D": "w"}, answer=[], num=1)
    q2 = Question(id=2, type="single", stem="题二",
                  options={"A": "x", "B": "y", "C": "z", "D": "w"}, answer=["A"], num=2)
    n = apply_answer_key([q1, q2], {1: "B", 2: "C"})
    assert n == 1
    assert q1.answer == ["B"] and not q1.low_confidence
    assert q2.answer == ["A"]  # 已有答案不动
