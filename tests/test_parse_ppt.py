"""PPT 转换文档（01-pptx.docx 形态）暴露的解析缺口：丢首选项标签 + 组题误产。"""

from quizforge.model import Block
from quizforge.parse import parse_blocks


def _stem(num, text):
    return Block("docx", "Normal", f"{num}、{text}", "para")


def _opts_block(*pairs):
    return Block("docx", "Normal", "      ".join(f"{L}. {c}" for L, c in pairs), "para")


def test_missing_option_a_recovered():
    """首选项标签丢失（内容裸在行首）→ 恢复为 A 选项。"""
    blocks = [
        Block("docx", "Heading 1", "单选题：", "heading"),
        _stem(1, "某热机的高温热源温度为500K，其最大效率为 (   )"),
        Block("docx", "Normal", "40%      B. 50%      C. 60%      D. 20%。", "para"),
    ]
    quiz = parse_blocks(blocks, source_file="ppt.docx")
    q = quiz.questions[0]
    assert q.type == "single"
    assert set(q.options) == {"A", "B", "C", "D"}
    assert q.options["A"] == "40%"
    assert q.options["B"] == "50%"


def test_missing_option_a_long_prefix_not_synthesized():
    """标记前是长题干（内联排版）→ 不误合成为 A 选项。"""
    long_stem = "这是一段很长的题干内容超过四十个字符用来验证内联排版不会被误判为选项内容".ljust(44, "文")
    blocks = [
        Block("docx", "Heading 1", "单选题：", "heading"),
        Block("docx", "Normal", f"1、{long_stem}（  ）      B. 乙      C. 丙      D. 丁", "para"),
    ]
    quiz = parse_blocks(blocks, source_file="ppt.docx")
    q = quiz.questions[0]
    assert set(q.options) == {"B", "C", "D"}, "长前缀不应被合成为 A"


def test_single_candidate_not_grouped():
    """回退组需 ≥2 道题：孤立候选即使前面有段落也不成组。"""
    blocks = [
        Block("docx", "Heading 1", "单选题", "heading"),
        Block("docx", "Normal", "光纤可用于科学研究", "para"),
        Block("docx", "Normal", "传输损耗低", "para"),
        _stem(1, "光纤的损耗包括哪些因素？"),
        _opts_block(("A", "介质吸收"), ("B", "散射损耗"), ("C", "弯曲"), ("D", "以上都是")),
    ]
    quiz = parse_blocks(blocks, source_file="ppt.docx")
    assert len(quiz.questions) == 1
    assert quiz.questions[0].type == "single", "单候选不应被标成 group"
    assert quiz.questions[0].stem.startswith("光纤的损耗")


def test_two_candidates_still_grouped_by_passage():
    """≥2 道题共享正文段落 → 正常成组（阅读理解形态保持）。"""
    blocks = [
        Block("docx", "Normal", "阅读", "heading"),
        Block("docx", "Normal", "The tide of change: Embracing the future", "para"),
        Block("docx", "Normal",
              "Industrial revolutions reshaped the world economy deeply and transformed "
              "manufacturing across continents in every century.",
              "para"),
        _stem(1, "What does the passage mainly talk about?"),
        _opts_block(("A", "aa"), ("B", "bb"), ("C", "cc"), ("D", "dd")),
        _stem(2, "Which industry came first?"),
        _opts_block(("A", "aa"), ("B", "bb"), ("C", "cc"), ("D", "dd")),
    ]
    quiz = parse_blocks(blocks, source_file="ppt.docx")
    assert len(quiz.questions) == 1
    g = quiz.questions[0]
    assert g.type == "group" and len(g.sub_questions) == 2
    assert g.stem == "The tide of change: Embracing the future"


def test_llm_fills_group_sub_answers():
    """组内子题无答案时同样走 LLM 补答（此前只处理顶层题）。"""
    blocks = [
        Block("docx", "Normal", "综合训练", "heading"),
        Block("docx", "Normal", "超声波是一种机械振动波。", "para"),
        _stem(1, "超声波是一种(   )"),
        _opts_block(("A", "机械波"), ("B", "物质波"), ("C", "电磁波"), ("D", "引力波")),
        _stem(2, "超声波的频率范围是(   )"),
        _opts_block(("A", "高于20000Hz"), ("B", "低于20Hz"), ("C", "任意频率"), ("D", "仅可听声")),
    ]

    class FakeLLM:
        def adjudicate(self, text):
            if "频率范围" in text:
                return {"is_question": True, "answer": ["A"]}
            return {"is_question": True, "answer": ["A"]}

    quiz = parse_blocks(blocks, source_file="ppt.docx", llm=FakeLLM())
    g = quiz.questions[0]
    assert g.type == "group"
    assert all(s.answer for s in g.sub_questions), "组内子题应被 LLM 补上答案"
