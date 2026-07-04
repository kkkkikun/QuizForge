"""摄取层：docx / pdf / txt → Block 流。"""

from __future__ import annotations

import os

from .model import Block
from .patterns import SECTION_HEADER_RE as _SECTION_RE

# OOXML 命名空间（用于检测段落内图片）
_W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"


class ScannedPdfError(Exception):
    """PDF 几乎无可提取文本（疑似扫描版/图片版）。"""


def _para_kind(style: str) -> str:
    s = (style or "").lower()
    if s.startswith("heading") or s.startswith("title"):
        return "heading"
    return "para"


def _text_kind(text: str) -> str:
    return "heading" if _SECTION_RE.match(text.strip()) else "para"


def _table_text(table) -> str:
    rows = []
    for row in table.rows:
        cells = [c.text.strip() for c in row.cells]
        rows.append("\t".join(cells))
    return "\n".join(rows)


def load_docx(path: str) -> list[Block]:
    """读取 .docx，按文档顺序输出 Block 流（段落 / 表格 / 图片占位）。"""
    from docx import Document
    from docx.oxml.table import CT_Tbl
    from docx.oxml.text.paragraph import CT_P
    from docx.table import Table
    from docx.text.paragraph import Paragraph

    doc = Document(path)
    blocks: list[Block] = []
    for child in doc.element.body.iterchildren():
        if isinstance(child, CT_P):
            para = Paragraph(child, doc)
            style = para.style.name if para.style else "Normal"
            text = para.text.strip()
            has_image = bool(child.findall(f".//{{{_W_NS}}}drawing"))
            if has_image:
                blocks.append(Block("docx", style, "[图片]", "image"))
            if text:
                blocks.append(Block("docx", style, text, _para_kind(style)))
        elif isinstance(child, CT_Tbl):
            tbl = Table(child, doc)
            blocks.append(Block("docx", "Table", _table_text(tbl), "table"))
    return blocks


def load_pdf(path: str) -> list[Block]:
    """读取 .pdf；文本近乎空 → 抛 ScannedPdfError（疑似扫描版）。"""
    import pdfplumber

    pages_text: list[str] = []
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            pages_text.append(page.extract_text() or "")
    full = "\n".join(pages_text).strip()
    if len(full) < 10:
        raise ScannedPdfError(
            "PDF 几乎无可提取文本，可能是扫描版/图片版，请先用 OCR 转文本后再处理。"
        )
    blocks: list[Block] = []
    for line in full.splitlines():
        t = line.strip()
        if t:
            blocks.append(Block("pdf", "text", t, _text_kind(t)))
    return blocks


def load_txt(path: str) -> list[Block]:
    """读取 .txt（UTF-8），按行输出 Block；行级粗分节。"""
    with open(path, encoding="utf-8") as f:
        raw = f.read()
    blocks: list[Block] = []
    for line in raw.splitlines():
        t = line.strip()
        if t:
            blocks.append(Block("txt", "text", t, _text_kind(t)))
    return blocks


def load(path: str) -> list[Block]:
    """按扩展名分派到对应 loader。"""
    ext = os.path.splitext(path)[1].lower()
    if ext == ".docx":
        return load_docx(path)
    if ext == ".pdf":
        return load_pdf(path)
    if ext == ".txt":
        return load_txt(path)
    raise ValueError(f"不支持的文件类型: {ext}")
