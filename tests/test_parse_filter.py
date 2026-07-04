"""解析层测试：噪声过滤（解析/解答/分值大题/图片）→ ignored_summary。"""

from pathlib import Path

from quizforge import parse as P
from quizforge.ingest import load_docx
from quizforge.model import Block

DATA = Path(__file__).resolve().parent.parent / "data"


def test_is_noise_explanation():
    assert P.is_noise_block("解析：本题考查进程管理。") == "explanation"
    assert P.is_noise_block("【解析】答案为B") == "explanation"
    assert P.is_noise_block("解答：（1）B；（2分）") == "explanation"


def test_is_noise_essay_score():
    assert P.is_noise_block("7. 考虑某路由器具有下列路由表项：（15分）") == "essay"


def test_is_noise_clean_kept():
    assert P.is_noise_block("1.数据库技术的核心是(B)") is None
    assert P.is_noise_block("A.数据") is None
    assert P.is_noise_block("主键约束的关键字是PRIMARY KEY") is None


def test_filter_blocks_counts():
    blocks = [
        Block("docx", "Normal", "1.题干(B)", "para"),
        Block("docx", "Normal", "A.甲", "para"),
        Block("docx", "Normal", "[图]", "image"),
        Block("docx", "Normal", "解析：xxx", "para"),
        Block("docx", "Normal", "（15分）大题题干", "para"),
    ]
    kept, ignored = P.filter_blocks(blocks)
    assert len(kept) == 2, "只保留题干与选项"
    assert ignored.get("image") == 1
    assert ignored.get("explanation") == 1
    assert ignored.get("essay") == 1


def test_filter_real_net_counts_noise():
    blocks = load_docx(str(DATA / "2026年重点复习题库.docx"))
    _, ignored = P.filter_blocks(blocks)
    assert ignored.get("image", 0) >= 1, "NET 应滤掉图片"
    # NET 含解析/解答/分值 → 至少有 explanation 或 essay 计数
    assert (ignored.get("explanation", 0) + ignored.get("essay", 0)) >= 1
