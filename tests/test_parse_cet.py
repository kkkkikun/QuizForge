"""CET 题库解析：高亮答案 + 匹配题 + 模块分节 + 子分组上下文。"""

from quizforge.model import Block
from quizforge.parse import parse_blocks


def test_cet_highlight_answer_and_context():
    """听力：同一 News report 的题归组；高亮选项=答案；子题干=第N题。"""
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
    g = quiz.questions[0]
    assert g.type == "group"
    assert g.section == "听力"
    assert g.stem == "Unit 1 · News report 1"
    assert len(g.sub_questions) == 1
    sub = g.sub_questions[0]
    assert sub.answer == ["B"]
    assert sub.stem == "第 1 题"
    assert not sub.low_confidence


def test_cet_choice_grouped_multi():
    """同一 News report 的多题聚合成一个 group（一组一屏）。"""
    blocks = [Block("docx", "Normal", "听力", "heading"),
              Block("docx", "Normal", "Unit 1", "para"),
              Block("docx", "Normal", "News report 1", "para")]
    for n in (1, 2):
        blocks.append(Block("docx", "Normal", f"{n}、", "para"))
        for L in "ABCD":
            blocks.append(Block("docx", "Normal", f"{L}、opt{L}", "para",
                                highlight=(f"{L}、opt{L}") if L == "B" else ""))
    quiz = parse_blocks(blocks, source_file="cet.docx")
    assert len(quiz.questions) == 1
    g = quiz.questions[0]
    assert g.type == "group" and len(g.sub_questions) == 2
    assert [s.stem for s in g.sub_questions] == ["第 1 题", "第 2 题"]
    assert all(s.answer == ["B"] for s in g.sub_questions)


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


def _option_block(answer="A"):
    return [
        Block("docx", "Normal", "A、optA", "para"),
        Block("docx", "Normal", "B、optB", "para"),
        Block("docx", "Normal", "C、optC", "para"),
        Block("docx", "Normal", "D、optD", "para"),
    ]


def _reading_q(num, stem_text):
    return [
        Block("docx", "Normal", f"{num}. {stem_text}", "para"),
    ] + _option_block()


def test_cet_bare_subcontext_titles_separate_groups():
    """裸 Conversation/Passage 标题（无编号）也必须更新上下文，切断前一组的粘连带。"""
    blocks = [
        Block("docx", "Normal", "听力", "heading"),
        Block("docx", "Normal", "Unit 1", "para"),
        Block("docx", "Normal", "News report 2", "para"),
    ]
    blocks += [Block("docx", "Normal", "1、", "para")] + _option_block()
    blocks.append(Block("docx", "Normal", "Conversation", "para"))
    blocks += [Block("docx", "Normal", "2、", "para")] + _option_block()
    blocks.append(Block("docx", "Normal", "Passage", "para"))
    blocks += [Block("docx", "Normal", "3、", "para")] + _option_block()
    quiz = parse_blocks(blocks, source_file="cet.docx")
    groups = [q for q in quiz.questions if q.type == "group"]
    assert [g.stem for g in groups] == [
        "Unit 1 · News report 2",
        "Unit 1 · Conversation",
        "Unit 1 · Passage",
    ]
    assert [len(g.sub_questions) for g in groups] == [1, 1, 1]


def test_group_named_by_title_line():
    """题前短标题行 → 组名取标题整行，不截断（≥2 题成组）。"""
    title = "The tide of change: Embracing the industries of the future"
    blocks = [
        Block("docx", "Normal", "阅读", "heading"),
        Block("docx", "Normal", title, "para"),
        Block("docx", "Normal",
              "1 Turning back the clock to Britain in the 18th century, we find the Factory Act.",
              "para"),
        Block("docx", "Normal",
              "2 Progress continued with the Second Industrial Revolution in the late 19th century.",
              "para"),
    ]
    blocks += _reading_q(1, "What does the passage mainly talk about?")
    blocks += _reading_q(2, "Which industry came first according to the passage?")
    quiz = parse_blocks(blocks, source_file="cet.docx")
    g = quiz.questions[0]
    assert g.type == "group"
    assert g.stem == title
    assert len(g.sub_questions) == 2


def test_group_name_prefers_title_over_leading_header():
    """文档头（如教材名）之后的短标题行优先作组名。"""
    blocks = [
        Block("docx", "Normal", "阅读", "heading"),
        Block("docx", "Normal", "理解当代中国", "para"),
        Block("docx", "Normal", "Stargazers at 4,410 meters", "para"),
        Block("docx", "Normal",
              "1 In Daocheng County, Garze Tibetan Autonomous Prefecture, the LHAASO project "
              "observes cosmic rays at high altitude.",
              "para"),
    ]
    blocks += _reading_q(1, "What is the main purpose of the project?")
    blocks += _reading_q(2, "Where is the LHAASO project located?")
    quiz = parse_blocks(blocks, source_file="cet.docx")
    g = quiz.questions[0]
    assert g.type == "group"
    assert g.stem == "Stargazers at 4,410 meters"


def test_group_name_word_boundary_truncation():
    """无标题行（正文直接开头）→ 首段按词边界截断并加省略号。"""
    blocks = [
        Block("docx", "Normal", "综合训练", "heading"),
        Block("docx", "Normal",
              "Tea's remarkable journey began in ancient China, evolving from a medicinal "
              "drink into a global commodity over centuries.",
              "para"),
        Block("docx", "Normal",
              "In the Han Dynasty, tea drinking became widespread in the court and among "
              "common people alike.",
              "para"),
    ]
    blocks += _reading_q(1, "What was the earliest use of tea?")
    blocks += _reading_q(2, "When did tea drinking become widespread?")
    quiz = parse_blocks(blocks, source_file="cet.docx")
    g = quiz.questions[0]
    assert g.type == "group"
    assert g.stem == "Tea's remarkable journey began…"
