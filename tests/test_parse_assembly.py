"""解析层测试：端到端组装 parse_blocks（DB 干净 + NET 脏）。"""

import json
from pathlib import Path

from quizforge.ingest import load_docx
from quizforge.parse import parse_blocks, quiz_to_dict

DATA = Path(__file__).resolve().parent.parent / "data"


def test_assembly_db_basic():
    blocks = load_docx(str(DATA / "数据库原理题库.docx"))
    quiz = parse_blocks(blocks, source_file="数据库原理题库.docx")
    assert quiz.title == "数据库原理题库"
    assert len(quiz.questions) >= 40, f"DB 应有 ~48 道单选，实际 {len(quiz.questions)}"
    q1 = quiz.questions[0]
    assert q1.type == "single"
    assert q1.answer == ["B"]
    assert not q1.low_confidence
    assert all(q.type in {"single", "multiple", "blank"} for q in quiz.questions)
    # 单选全有内联答案
    assert all(q.answer for q in quiz.questions), "DB 单选应全部抽到答案"
    # 填空节「已填陈述」无法成题 → 计入 fill
    assert quiz.ignored_summary.get("fill", 0) >= 20, quiz.ignored_summary


def test_assembly_db_serializable():
    blocks = load_docx(str(DATA / "数据库原理题库.docx"))
    quiz = parse_blocks(blocks, source_file="数据库原理题库.docx")
    d = quiz_to_dict(quiz)
    s = json.dumps(d, ensure_ascii=False)  # 不抛即可
    assert '"questions"' in s


def test_assembly_net_filters_noise():
    blocks = load_docx(str(DATA / "2026年重点复习题库.docx"))
    quiz = parse_blocks(blocks, source_file="2026年重点复习题库.docx")
    ig = quiz.ignored_summary
    assert ig.get("image", 0) >= 1, "NET 图片应被滤"
    assert (ig.get("essay", 0) + ig.get("explanation", 0)) >= 1, "NET 大题/解析应被滤"
    assert all(q.type in {"single", "multiple", "blank"} for q in quiz.questions)
    # NET 选择题答案多不内联 → 应有 low_confidence
    assert any(q.low_confidence for q in quiz.questions)


def test_assembly_dedup_exact_duplicates():
    """完全相同的题（题型+题干+选项+答案）只留一道，重复计入 ignored_summary。"""
    from quizforge.model import Block

    blocks = [Block("docx", "Normal", "单选题", "heading")]
    for n in (1, 2):
        blocks.append(Block("docx", "Normal", f"{n}. 数据库技术的核心是（B）", "para"))
        for letter, txt in (("A", "数据"), ("B", "数据库管理系统"),
                            ("C", "操作系统"), ("D", "应用程序")):
            blocks.append(Block("docx", "Normal", f"{letter}、{txt}", "para"))
    quiz = parse_blocks(blocks, source_file="x.docx")
    assert len(quiz.questions) == 1, "完全相同的两道单选应去重为一道"
    assert quiz.ignored_summary.get("duplicate", 0) == 1

    blanks = [
        Block("docx", "Normal", "填空题", "heading"),
        Block("docx", "Normal", "1. 数据库系统的三级模式结构是指____", "para"),
        Block("docx", "Normal", "2. 数据库系统的三级模式结构是指____", "para"),
    ]
    quiz2 = parse_blocks(blanks, source_file="y.docx")
    assert len(quiz2.questions) == 1, "完全相同的两道填空应去重为一道"


def test_assembly_with_fake_llm_refines():
    blocks = load_docx(str(DATA / "2026年重点复习题库.docx"))

    class FakeLLM:
        def adjudicate(self, text):
            return {"is_question": True, "type": "single", "answer": ["A"],
                    "stem": "x", "options": {"A": "a"}}

    quiz = parse_blocks(blocks, source_file="x.docx", llm=FakeLLM())
    refined = [q for q in quiz.questions if q.answer and not q.low_confidence]
    assert len(refined) >= 1, "fake LLM 应能把低置信题目补上答案并提升置信"


def test_assembly_drops_unrenderable_llm_questions():
    """LLM 兜底产出无选项的『假题』→ 组装时丢弃并计入 ignored，不流入渲染。"""
    blocks = load_docx(str(DATA / "2026年重点复习题库.docx"))

    class BrokenLLM:
        def adjudicate(self, text):
            if "路由" in text:
                return {"is_question": True, "type": "single", "answer": ["A"],
                        "stem": text[:20], "options": {}}
            return None

    quiz = parse_blocks(blocks, source_file="x.docx", llm=BrokenLLM())
    bad = [q for q in quiz.questions
           if q.type in ("single", "multiple") and (not q.options or len(q.options) < 2)]
    assert not bad, "无选项的选择题不应流入 Quiz"
    assert quiz.ignored_summary.get("invalid", 0) >= 1, "废题应计入 ignored_summary"


def test_dict_roundtrip_preserves_group():
    """契约往返：quiz_to_dict → dict_to_quiz 必须保留 group 的 sub_questions。"""
    from quizforge.model import Question, Quiz
    from quizforge.parse import dict_to_quiz, quiz_to_dict

    g = Question(id=1, type="group", stem="Unit 1 · News report 1", sub_questions=[
        Question(id=2, type="single", stem="第 1 题",
                 options={"A": "x", "B": "y", "C": "z", "D": "w"}, answer=["A"]),
        Question(id=3, type="single", stem="第 2 题",
                 options={"A": "x", "B": "y", "C": "z", "D": "w"}, answer=["B"]),
    ])
    restored = dict_to_quiz(quiz_to_dict(Quiz(questions=[g])))
    rg = restored.questions[0]
    assert rg.type == "group"
    assert len(rg.sub_questions) == 2
    assert rg.sub_questions[0].stem == "第 1 题"
    assert rg.sub_questions[1].answer == ["B"]
