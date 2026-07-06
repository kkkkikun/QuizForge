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
    """匹配：一篇文章 + N 条陈述 + 答案序列 → 一整道题（题面=文章+陈述，答案=数字串）。"""
    blocks = [
        Block("docx", "Normal", "匹配", "heading"),
        Block("docx", "Normal", "Ten years of the BRI", "para"),
        Block("docx", "Normal", "1 It's been 10 years since the BRI.", "para"),
        Block("docx", "Normal", "2 Journalists reflected on it.", "para"),
        Block("docx", "Normal", "1、Evidence of X.", "para"),
        Block("docx", "Normal", "2、The role of Y.", "para"),
        Block("docx", "Normal", "3 7", "para"),  # 答案序列
    ]
    quiz = parse_blocks(blocks, source_file="cet.docx")
    qs = quiz.questions
    assert len(qs) == 1, "一篇文章一道题"
    q = qs[0]
    assert q.type == "blank"
    assert q.answer == ["3 7"]            # 完整数字串
    assert "Evidence of X" in q.stem      # 陈述在题面
    assert "The role of Y" in q.stem
    assert "10 years since the BRI" in q.stem   # 文章正文在题面


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
