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


def test_assembly_with_fake_llm_refines():
    blocks = load_docx(str(DATA / "2026年重点复习题库.docx"))

    class FakeLLM:
        def adjudicate(self, text):
            return {"is_question": True, "type": "single", "answer": ["A"],
                    "stem": "x", "options": {"A": "a"}}

    quiz = parse_blocks(blocks, source_file="x.docx", llm=FakeLLM())
    refined = [q for q in quiz.questions if q.answer and not q.low_confidence]
    assert len(refined) >= 1, "fake LLM 应能把低置信题目补上答案并提升置信"
