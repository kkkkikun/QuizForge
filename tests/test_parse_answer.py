"""解析层测试：答案抽取（多策略）+ 题型推断。"""

from pathlib import Path

from quizforge import parse as P
from quizforge.ingest import load_docx
from quizforge.parse import (
    extract_answer_line,
    extract_inline_answer,
    infer_choice_type,
)

DATA = Path(__file__).resolve().parent.parent / "data"


# ---------------- 内联答案 ----------------

def test_inline_answer_at_end():
    clean, letters = extract_inline_answer("数据库技术的核心是(B)")
    assert letters == ["B"]
    assert clean == "数据库技术的核心是"


def test_inline_answer_mid_stem():
    clean, letters = extract_inline_answer("SQL Server 2008是一个(C)型数据库系统。")
    assert letters == ["C"]
    assert "＿＿＿" in clean          # 中段答案 → 留空位保语法
    assert "型数据库系统" in clean


def test_inline_answer_none():
    _, letters = extract_inline_answer("下面关于B树的描述")
    assert letters is None


def test_inline_answer_multiple_is_ambiguous():
    _, letters = extract_inline_answer("见(A)与(B)的对比")
    assert letters is None


# ---------------- 行级答案 ----------------

def test_answer_line():
    assert extract_answer_line("答案：B") == ["B"]
    assert extract_answer_line("正确答案：AC") == ["A", "C"]
    assert extract_answer_line("无关文本") is None


# ---------------- 题型推断 ----------------

def test_infer_type():
    assert infer_choice_type("单选题", ["B"]) == "single"
    assert infer_choice_type("多选题", ["A", "C"]) == "multiple"
    assert infer_choice_type("选择题", ["A", "C"]) == "multiple"  # 多答案 → 多选
    assert infer_choice_type("选择题", ["B"]) == "single"


# ---------------- 真实样本：DB 选择题建成 Question ----------------

def test_db_first_question_built():
    blocks = load_docx(str(DATA / "数据库原理题库.docx"))
    choice = next(s for s in P.segment(blocks) if s.type == "choice")
    cands = P.detect_choice_questions(choice)
    qs = [P.choice_candidate_to_question(c, i + 1) for i, c in enumerate(cands)]
    q1 = qs[0]
    assert q1.type == "single"
    assert q1.answer == ["B"]
    assert q1.stem == "数据库技术的核心是"
    assert not q1.low_confidence
    # 多数 DB 选择题应抽到答案
    with_answer = [q for q in qs if q.answer]
    assert len(with_answer) >= 13, f"DB 选择题多数应有答案，实际 {len(with_answer)}/{len(qs)}"
