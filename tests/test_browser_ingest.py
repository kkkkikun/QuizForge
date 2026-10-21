"""browser_ingest（纯 stdlib）与 ingest.load_docx（python-docx）的逐块一致性。"""

from pathlib import Path

import pytest

from quizforge import browser_ingest, ingest

DATA = Path(__file__).resolve().parent.parent / "data"

DOCX_FILES = sorted(DATA.glob("*.docx"))


@pytest.mark.parametrize("path", DOCX_FILES, ids=lambda p: p.name)
def test_docx_parity(path):
    """每个 data/*.docx：两种提取器产出完全一致的 Block 流。"""
    expect = ingest.load_docx(str(path))
    actual = browser_ingest.load_docx(str(path))
    assert len(actual) == len(expect), (
        f"{path.name}: 块数不一致 stdlib={len(actual)} python-docx={len(expect)}"
    )
    for i, (a, e) in enumerate(zip(actual, expect)):
        assert (a.source, a.style, a.text, a.kind, a.highlight) == (
            e.source, e.style, e.text, e.kind, e.highlight
        ), f"{path.name} 第 {i} 块不一致:\n  stdlib={a}\n  pydocx={e}"


def test_txt_load():
    """txt 路径与 ingest.load_txt 一致。"""
    import tempfile, os
    with tempfile.NamedTemporaryFile(suffix=".txt", delete=False, mode="w", encoding="utf-8") as f:
        f.write("单选题\n1.题干(B)\nA.甲\nB.乙\n")
        p = f.name
    try:
        assert browser_ingest.load_txt(p) == ingest.load_txt(p)
    finally:
        os.unlink(p)
