"""摄取层测试：Block 流结构（以两份真实样本为基线）。"""

from pathlib import Path

from quizforge.ingest import load, load_docx
from quizforge.model import Block

DATA = Path(__file__).resolve().parent.parent / "data"
DB = DATA / "数据库原理题库.docx"  # 干净样本
NET = DATA / "2026年重点复习题库.docx"  # 脏样本（计算机网络）


def test_model_block_dataclass():
    b = Block(source="docx", style="Normal", text="x", kind="para")
    assert b.text == "x" and b.kind == "para"
    # 默认值
    b2 = Block(source="docx", style="Normal", text="y")
    assert b2.kind == "para"


def test_load_docx_clean_db_structure():
    blocks = load_docx(str(DB))
    assert len(blocks) > 100, "干净文件应产出大量 block"
    texts = [b.text for b in blocks]
    assert "数据库原理题库" in texts[0], "首块应是标题"
    assert "单选题" in texts, "应含分节标题"
    # 一行一个选项
    assert any(t.startswith("A.") for t in texts), "应有选项块"
    # 干净文件：无表格、无图片
    assert not any(b.kind == "table" for b in blocks), "DB 文件应无表格"
    assert not any(b.kind == "image" for b in blocks), "DB 文件应无图片"


def test_load_docx_messy_net_structure():
    blocks = load_docx(str(NET))
    texts = [b.text for b in blocks]
    # Heading 1 分节
    headings = [b for b in blocks if b.kind == "heading"]
    assert headings, "应有 heading 块"
    assert any("选择题" in h.text for h in headings), "应有「选择题」分节"
    # 表格（3 个）
    tables = [b for b in blocks if b.kind == "table"]
    assert len(tables) == 3, f"应有 3 个表格，实际 {len(tables)}"
    # 图片（11）→ 至少有 image 块
    assert any(b.kind == "image" for b in blocks), "应有图片占位块"
    # Tab 分隔多选项挤一行的块
    assert any(
        "A." in t and "B." in t and "\t" in t for t in texts
    ), "应有 Tab 分隔的多选项行"


def test_load_dispatch_by_extension():
    blocks = load(str(DB))
    assert len(blocks) > 100
    assert all(b.source == "docx" for b in blocks)
