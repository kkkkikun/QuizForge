"""摄取层测试：TXT / PDF（含扫描版检测）。"""

import os
import tempfile

import pytest

from quizforge.ingest import ScannedPdfError, load, load_pdf, load_txt


def _write_tmp(suffix: str, content: str) -> str:
    fd, path = tempfile.mkstemp(suffix=suffix)
    with os.fdopen(fd, "w", encoding="utf-8") as f:
        f.write(content)
    return path


# ---------------- TXT ----------------

def test_load_txt_basic_and_section_headers():
    content = (
        "单选题\n"
        "1.数据库技术的核心是(B)\nA.数据\nB.数据库管理系统\nC.操作系统\nD.应用程序\n"
        "填空题\n"
        "1.___ 是操作系统的核心功能之一\n"
    )
    path = _write_tmp(".txt", content)
    try:
        blocks = load_txt(path)
        texts = [b.text for b in blocks]
        assert all(b.source == "txt" for b in blocks)
        # 分节标题识别为 heading
        assert any(b.kind == "heading" and b.text == "单选题" for b in blocks)
        assert any(b.kind == "heading" and b.text == "填空题" for b in blocks)
        # 题干与选项
        assert any(t.startswith("1.") and "(B)" in t for t in texts)
        assert any(t.startswith("A.") for t in texts)
    finally:
        os.remove(path)


def test_load_txt_via_dispatch():
    path = _write_tmp(".txt", "单选题\n1.x(A)\nA.a\nB.b\n")
    try:
        blocks = load(path)
        assert blocks and all(b.source == "txt" for b in blocks)
    finally:
        os.remove(path)


# ---------------- PDF ----------------

def _make_text_pdf(text: str) -> str:
    from fpdf import FPDF

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("helvetica", size=12)
    for line in text.splitlines():
        pdf.cell(0, 8, line, new_x="LMARGIN", new_y="NEXT")
    fd, path = tempfile.mkstemp(suffix=".pdf")
    os.close(fd)
    pdf.output(path)
    return path


def test_load_pdf_basic():
    path = _make_text_pdf(
        "1. What is 1+1? (B)\nA. 1\nB. 2\nC. 3\nD. 4"
    )
    try:
        blocks = load_pdf(path)
        texts = [b.text for b in blocks]
        assert all(b.source == "pdf" for b in blocks)
        assert any("1+1" in t for t in texts), "应抽到题干"
        assert any(t.startswith("A.") for t in texts), "应抽到选项"
    finally:
        os.remove(path)


def test_load_pdf_scanned_raises():
    from fpdf import FPDF

    pdf = FPDF()
    pdf.add_page()  # 空白页，无可提取文本
    fd, path = tempfile.mkstemp(suffix=".pdf")
    os.close(fd)
    pdf.output(path)
    try:
        with pytest.raises(ScannedPdfError):
            load_pdf(path)
    finally:
        os.remove(path)
