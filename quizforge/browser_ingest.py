"""浏览器端摄取（纯 Python stdlib，无第三方依赖）。

在 Pyodide 里跑的 docx/txt → Block 流，与 ingest.load_docx（python-docx）
逐块一致（tests/test_browser_ingest.py 对 data/*.docx 全量校验）。
PDF 暂不支持（pdfplumber 无法在浏览器运行，页面提示用 docx/txt）。
"""

from __future__ import annotations

import re
import zipfile
import xml.etree.ElementTree as ET

from .model import Block
from .patterns import SECTION_HEADER_RE as _SECTION_RE

_W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"

# python-docx 内置样式名规范化用（'heading 1' → 'Heading 1'）
_STYLE_ID_RE = re.compile(r"^[Hh]eading\s*(\d+)$")


def _q(tag: str) -> str:
    return f"{{{_W}}}{tag}"


def _para_kind(style: str) -> str:
    s = (style or "").lower()
    if s.startswith("heading") or s.startswith("title"):
        return "heading"
    return "para"


def _text_kind(text: str) -> str:
    return "heading" if _SECTION_RE.match(text.strip()) else "para"


# 中文 Word 样式 id 常为数字（"1"/"2" = 标题1/2）→ 需查 styles.xml 的 id→name 映射
def _load_style_names(zf: zipfile.ZipFile) -> dict[str, str]:
    try:
        root = ET.fromstring(zf.read("word/styles.xml"))
    except KeyError:
        return {}
    out: dict[str, str] = {}
    for st in root.findall(_q("style")):
        sid = st.get(_q("styleId"))
        name_el = st.find(_q("name"))
        if sid and name_el is not None:
            out[sid] = name_el.get(_q("val")) or sid
    return out


def _normalize_style_name(name: str) -> str:
    """python-docx BabelFish：内置英文名 'heading 1' → 'Heading 1'。"""
    m = _STYLE_ID_RE.match(name)
    if m:
        return f"Heading {m.group(1)}"
    return name


def _run_text(r) -> str:
    """run 文本 = 直接 w:t/w:tab 子节点（不含嵌套在 run 内的 VML textbox 等，与 python-docx 一致）。"""
    parts = []
    for node in r:
        if node.tag == _q("t") and node.text:
            parts.append(node.text)
        elif node.tag == _q("tab"):
            parts.append("\t")
    return "".join(parts)


def _para_text(p) -> str:
    """段落文本 = 直接 runs + 超链接内 runs（不含 drawing/textbox 嵌套段落，与 python-docx 一致）。"""
    parts = []
    for child in p:
        if child.tag == _q("r"):
            parts.append(_run_text(child))
        elif child.tag == _q("hyperlink"):
            for r in child.findall(_q("r")):
                parts.append(_run_text(r))
    return "".join(parts)


def _para_highlight(p) -> str:
    """提取段落中被高亮（如 yellow）的文本（答案标记）。"""
    parts = []
    for r in p.findall(_q("r")):
        rpr = r.find(_q("rPr"))
        if rpr is None:
            continue
        h = rpr.find(_q("highlight"))
        if h is not None:
            val = h.get(_q("val"))
            if val and val != "none":
                parts.append(_run_text(r))
    return "".join(parts)


def _table_text(tbl) -> str:
    rows = []
    for tr in tbl.findall(_q("tr")):
        cells = []
        for tc in tr.findall(_q("tc")):
            cell_text = "\n".join(
                _para_text(p).strip() for p in tc.findall(_q("p"))
            ).strip()
            cells.append(cell_text)
        rows.append("\t".join(cells))
    return "\n".join(rows)


def load_docx(path: str) -> list[Block]:
    """读取 .docx，按文档顺序输出 Block 流（段落 / 表格 / 图片占位）。与 ingest.load_docx 一致。"""
    with zipfile.ZipFile(path) as z:
        root = ET.fromstring(z.read("word/document.xml"))
        style_names = _load_style_names(z)

    def _style_name(p) -> str:
        ppr = p.find(_q("pPr"))
        if ppr is not None:
            pstyle = ppr.find(_q("pStyle"))
            if pstyle is not None:
                val = pstyle.get(_q("val")) or "Normal"
                return _normalize_style_name(style_names.get(val, val))
        return "Normal"

    body = root.find(_q("body"))
    blocks: list[Block] = []
    if body is None:
        return blocks
    for child in body:
        if child.tag == _q("p"):
            style = _style_name(child)
            text = _para_text(child).strip()
            has_image = child.find(f".//{_q('drawing')}") is not None
            if has_image:
                blocks.append(Block("docx", style, "[图片]", "image"))
            if text:
                blocks.append(
                    Block("docx", style, text, _para_kind(style),
                          highlight=_para_highlight(child))
                )
        elif child.tag == _q("tbl"):
            blocks.append(Block("docx", "Table", _table_text(child), "table"))
    return blocks


def load_txt(path: str) -> list[Block]:
    """读取 .txt：每行一 Block，段落样式，行首匹配章节标题则为 heading。与 ingest.load_txt 一致。"""
    blocks: list[Block] = []
    with open(path, encoding="utf-8") as f:
        for line in f:
            t = line.rstrip("\n")
            blocks.append(Block("txt", "text", t, _text_kind(t)))
    return blocks


def load(path: str) -> list[Block]:
    """按扩展名分派（浏览器版仅 docx/txt；pdf 抛 ValueError 由页面提示）。"""
    lower = (path or "").lower()
    if lower.endswith(".docx"):
        return load_docx(path)
    if lower.endswith(".txt"):
        return load_txt(path)
    if lower.endswith(".pdf"):
        raise ValueError("浏览器版暂不支持 PDF，请使用 .docx / .txt（PDF 请用命令行版 quizforge）")
    raise ValueError(f"不支持的文件类型: {path}")
