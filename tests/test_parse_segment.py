"""解析层测试：分节 + 选项切分 + 选择题候选识别（真实样本驱动）。"""

from pathlib import Path

from quizforge import parse as P
from quizforge.ingest import load_docx

DATA = Path(__file__).resolve().parent.parent / "data"
DB = DATA / "数据库原理题库.docx"
NET = DATA / "2026年重点复习题库.docx"


def test_scan_options_single():
    assert P._scan_options("A.数据") == [("A", "数据")]


def test_scan_options_tab_multi():
    opts = P._scan_options("A. 协议\t\tB. 服务\t\tC. 介质\t\tD. 接口")
    assert opts == [("A", "协议"), ("B", "服务"), ("C", "介质"), ("D", "接口")]


def test_scan_options_no_false_positive():
    # B树 / C语言 / 内联 (B) 都不应被识别为选项
    assert P._scan_options("下面关于B树的描述，C语言中(B)") == []


def test_segment_db():
    blocks = load_docx(str(DB))
    sections = P.segment(blocks)
    assert sections
    choice = [s for s in sections if s.type == "choice"]
    assert choice, "应有 choice 节"
    assert choice[0].title == "单选题"
    assert any("数据库原理题库" in s.title for s in sections), "应保留文档标题"


def test_segment_net_has_choice():
    blocks = load_docx(str(NET))
    sections = P.segment(blocks)
    titles = [s.title for s in sections]
    assert any("选择题" in t for t in titles), "NET 应有「选择题」分节"


def test_detect_choice_db_first_question():
    blocks = load_docx(str(DB))
    sections = P.segment(blocks)
    choice = next(s for s in sections if s.type == "choice")
    cands = P.detect_choice_questions(choice)
    assert len(cands) >= 15, f"DB 应至少识别 15 道选择题，实际 {len(cands)}"
    first = cands[0]
    assert "数据库技术的核心" in first.stem
    assert set(first.options) >= {"A", "B", "C", "D"}
    assert first.options["B"] == "数据库管理系统"
