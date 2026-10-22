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


def _para_highlight(para) -> str:
    """提取段落中被高亮（如 yellow）的文本（答案标记）。"""
    from docx.oxml.ns import qn

    parts = []
    for r in para.runs:
        rpr = r._element.rPr
        if rpr is None:
            continue
        h = rpr.find(qn("w:highlight"))
        if h is not None:
            val = h.get(qn("w:val"))
            if val and val != "none":
                parts.append(r.text)
    return "".join(parts)


_A_NS = "http://schemas.openxmlformats.org/drawingml/2006/main"
_R_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
_V_NS = "urn:schemas-microsoft-com:vml"

# 浏览器可直接渲染的图片格式（wmf/emf 公式图不支持，维持丢弃）
_RENDERABLE_IMG = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp"}


def _para_images(p, doc) -> list[str]:
    """提取段落内图片（DrawingML a:blip 与 VML v:imagedata 双路径）→ base64 列表。

    仅收浏览器可渲染格式；不可渲染（wmf 公式图等）返回空（保持占位丢弃语义）。
    """
    import base64
    import os

    out: list[str] = []
    rels = doc.part.related_parts
    for node in p.iter():
        rid = None
        if node.tag == f"{{{_A_NS}}}blip":
            rid = node.get(f"{{{_R_NS}}}embed")
        elif node.tag == f"{{{_V_NS}}}imagedata":
            rid = node.get(f"{{{_R_NS}}}id")
        if not rid:
            continue
        part = rels.get(rid)
        if part is None:
            continue
        ext = os.path.splitext(str(part.partname))[1].lower()
        if ext in _RENDERABLE_IMG:
            out.append(base64.b64encode(part.blob).decode())
    return out


def load_docx(path: str) -> list[Block]:
    """读取 .docx，按文档顺序输出 Block 流（段落 / 表格 / 图片，图片带 base64）。"""
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
            images = _para_images(child, doc)
            has_image = bool(child.findall(f".//{{{_W_NS}}}drawing")) or bool(images)
            if has_image:
                blocks.append(Block("docx", style, "[图片]", "image", images=images))
            if text:
                blocks.append(Block("docx", style, text, _para_kind(style),
                                    highlight=_para_highlight(para)))
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
