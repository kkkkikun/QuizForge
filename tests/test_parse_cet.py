"""CET 题库解析：高亮答案 + 匹配题 + 模块分节 + 子分组上下文。"""

from quizforge.model import Block
from quizforge.parse import parse_blocks


def test_cet_highlight_answer_and_context():
    """听力：高亮选项=答案；题干合成「Unit · News report · 第N题」。"""
    blocks = [
        Block("docx", "Normal", "听力", "heading"),
        Block("docx", "Normal", "Unit 1", "para"),
        Block("docx", "Normal", "News report 1", "para"),
        Block("docx", "Normal", "1、", "para"),
        Block("docx", "Normal", "A、aa", "para"),
        Block("docx", "Normal", "B、bb", "para", highlight="B、bb"),
        Block("docx", "Normal", "C、cc", "para"),
        Block("docx", "Normal", "D、dd", "para"),
    ]
    quiz = parse_blocks(blocks, source_file="cet.docx")
    assert len(quiz.questions) == 1
    q = quiz.questions[0]
    assert q.section == "听力"
    assert q.type == "single"
    assert q.answer == ["B"]
    assert not q.low_confidence
    assert "Unit 1" in q.stem and "News report 1" in q.stem and "第 1 题" in q.stem


def test_cet_matching_statements_with_answer_seq():
    """匹配：N 条陈述 + 结尾答案序列 → N 道填空题（答案=段落号）。"""
    blocks = [
        Block("docx", "Normal", "匹配", "heading"),
        Block("docx", "Normal", "1、Evidence of X.", "para"),
        Block("docx", "Normal", "2、The role of Y.", "para"),
        Block("docx", "Normal", "3 7", "para"),  # 答案序列：2 个 token
    ]
    quiz = parse_blocks(blocks, source_file="cet.docx")
    qs = quiz.questions
    assert len(qs) == 2
    assert all(q.type == "blank" for q in qs)
    assert qs[0].answer == ["3"]
    assert qs[1].answer == ["7"]
    assert "Evidence of X" in qs[0].stem


def test_cet_module_sections():
    """听力/阅读 等模块各自成节，题目标 section=模块。"""
    blocks = [
        Block("docx", "Normal", "听力", "heading"),
        Block("docx", "Normal", "1、", "para"),
        Block("docx", "Normal", "A、a", "para"),
        Block("docx", "Normal", "B、b", "para", highlight="B、b"),
        Block("docx", "Normal", "C、c", "para"),
        Block("docx", "Normal", "D、d", "para"),
        Block("docx", "Normal", "阅读", "heading"),
        Block("docx", "Normal", "1、stem?", "para"),
        Block("docx", "Normal", "A、a", "para"),
        Block("docx", "Normal", "B、b", "para", highlight="B、b"),
        Block("docx", "Normal", "C、c", "para"),
        Block("docx", "Normal", "D、d", "para"),
    ]
    quiz = parse_blocks(blocks, source_file="cet.docx")
    sections = {q.section for q in quiz.questions}
    assert sections == {"听力", "阅读"}
