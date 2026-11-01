"""patterns.py 的正则/判定常量边界行为测试。

断言一律按**生产代码里的真实调用方式**写（match / search / finditer），
避免"测试用 match、生产用 search"造成的假覆盖。
"""

import ast
from pathlib import Path

import pytest

from quizforge import patterns as P


# ---------------- 章节标题 ----------------


@pytest.mark.parametrize("text", [
    "选择题", "单选题", "多选题", "填空题", "判断题",
    "简答题", "计算题", "应用题", "综合题",
    "选择题 后面跟内容",  # 前缀命中
])
def test_section_header_re_matches(text):
    assert P.SECTION_HEADER_RE.match(text)


@pytest.mark.parametrize("text", ["选择", "题", "作文题", "Section", "Question"])
def test_section_header_re_not_matches(text):
    assert not P.SECTION_HEADER_RE.match(text)


@pytest.mark.parametrize("text", [
    "Single Choice", "multiple choice", "Choice Questions", "true or false",
    "Fill in the blanks", "Questions", "question",
])
def test_en_section_header_re_matches(text):
    """英文标题大小写不敏感（re.IGNORECASE）。"""
    assert P.EN_SECTION_HEADER_RE.match(text)


@pytest.mark.parametrize("text", ["Chapter 1", "Unit 1", "选择题", "Choices"])
def test_en_section_header_re_not_matches(text):
    assert not P.EN_SECTION_HEADER_RE.match(text)


# ---------------- 答案 key 区 ----------------


@pytest.mark.parametrize("text", [
    "参考答案", "标准答案", "试题答案", "答案",
    "1. 答案", "二、标准答案", "参考答案  ",
])
def test_answer_key_re_matches(text):
    assert P.ANSWER_KEY_RE.match(text)


@pytest.mark.parametrize("text", ["答案是B", "答案x", "参考答案："])
def test_answer_key_re_not_matches(text):
    """答案区标题必须整行匹配，不能带多余内容。"""
    assert not P.ANSWER_KEY_RE.match(text)


# ---------------- 选项 / 题号 ----------------


def test_option_start_re_finditer():
    """生产代码用 finditer（可在行中任意位置匹配）。"""
    got = lambda t: [(m.group(1), m.group(2)) for m in P.OPTION_START_RE.finditer(t)]
    assert got("A. x") == [("A", ".")]
    assert got("  B、x") == [("B", "、")]
    assert got("\tC) x") == [("C", ")")]
    assert got("AB. x") == []      # 字母必须单独成词
    assert got("D: x") == []       # 分隔符只有 . 、 ) 三种


def test_option_start_re_requires_line_start_or_blank():
    """选项起点只认「行首」或「单个空格/Tab 前」——\n 不在白名单里。

    故同一段落内用换行分隔的第二个选项不会被这个正则切出来；真实 docx 里选项
    各占一个段落，由 Block 结构负责切分，不靠正则跨行。
    """
    got = [m.group(1) for m in P.OPTION_START_RE.finditer("A. 甲\nB. 乙")]
    assert got == ["A"]


def test_question_num_re_match_and_sub():
    assert P.QUESTION_NUM_RE.match("1. x").group(0) == "1. "
    assert P.QUESTION_NUM_RE.match("2、x").group(0) == "2、"
    assert P.QUESTION_NUM_RE.match("3) x").group(0) == "3) "
    assert P.QUESTION_NUM_RE.match("4 x").group(0) == "4 "   # 分隔符可省
    assert P.QUESTION_NUM_RE.match("第1题") is None
    assert P.QUESTION_NUM_RE.sub("", "1. 题干", count=1) == "题干"


# ---------------- 答案抽取 ----------------


def test_paren_answer_re_finditer():
    """括号答案只认 A-D，且允许多个字母（多选）。"""
    got = lambda t: [m.group(1) for m in P.PAREN_ANSWER_RE.finditer(t)]
    assert got("(B)") == ["B"]
    assert got("（AC）") == ["AC"]
    assert got("( A )") == ["A"]
    assert got("(ABCD)") == ["ABCD"]
    assert got("(E)") == []        # E 不在 A-D 内


def test_answer_line_re_search():
    assert P.ANSWER_LINE_RE.search("答案：B").group(1) == "B"
    assert P.ANSWER_LINE_RE.search("正确答案：AC").group(1) == "AC"
    assert P.ANSWER_LINE_RE.search("答：B").group(1) == "B"
    assert P.ANSWER_LINE_RE.search("答案 B") is None       # 必须有冒号
    assert P.ANSWER_LINE_RE.search("answer: B") is None    # 只认中文关键字


# ---------------- 滤噪标记 ----------------


@pytest.mark.parametrize("text", ["___", "__", "（ ）", "( )", "〔 〕", "（  ）"])
def test_blank_re_matches(text):
    assert P.BLANK_RE.search(text)


@pytest.mark.parametrize("text", ["_", "（x）"])
def test_blank_re_not_matches(text):
    assert P.BLANK_RE.search(text) is None


def test_explain_re_search():
    assert P.EXPLAIN_RE.search("解析")
    assert P.EXPLAIN_RE.search("【解析】")
    assert P.EXPLAIN_RE.search("分析：")
    assert P.EXPLAIN_RE.search("解答：")
    assert P.EXPLAIN_RE.search("这是解析")   # 子串命中（生产用 search）


def test_score_re_search():
    assert P.SCORE_RE.search("(15分)")
    assert P.SCORE_RE.search("（20 分）")
    assert P.SCORE_RE.search("( 5 分 )")
    assert P.SCORE_RE.search("15分") is None    # 必须带括号


# ---------------- CET 题库 ----------------


@pytest.mark.parametrize("text", [
    "听力", "阅读", "十五选十", "选词填空", "仔细阅读", "长篇阅读", "翻译",
])
def test_cet_section_re_matches(text):
    assert P.CET_SECTION_RE.match(text)


def test_cet_section_re_not_matches():
    """CET 顶层分节必须整行匹配，「阅读理解」不是顶层分节。"""
    assert not P.CET_SECTION_RE.match("阅读理解")


@pytest.mark.parametrize("text", [
    "Unit 1", "News report 2", "Passage", "Conversation", "Section A",
])
def test_cet_subcontext_re_matches(text):
    assert P.CET_SUBCONTEXT_RE.match(text)


def test_cet_subcontext_re_not_matches():
    """子分组标题必须带编号/编号位（真实样本存在裸标题，故编号可省但不能全空）。"""
    assert not P.CET_SUBCONTEXT_RE.match("Unit")
    assert not P.CET_SUBCONTEXT_RE.match("阅读")


def test_answer_seq_re_match():
    """答案序列行至少 2 个 token。"""
    assert P.ANSWER_SEQ_RE.match("1 2 3")
    assert P.ANSWER_SEQ_RE.match("A B C")
    assert P.ANSWER_SEQ_RE.match("1 2")
    assert P.ANSWER_SEQ_RE.match("A O")
    assert P.ANSWER_SEQ_RE.match("A") is None
    assert P.ANSWER_SEQ_RE.match("1") is None


# ---------------- 判定/常量 ----------------


def test_para_kind():
    """段落样式名 → 块类型（ingest 与 browser_ingest 共用的实现）。"""
    assert P.para_kind("Heading 1") == "heading"
    assert P.para_kind("heading 2") == "heading"
    assert P.para_kind("Title") == "heading"
    assert P.para_kind("Normal") == "para"
    assert P.para_kind("") == "para"
    assert P.para_kind(None) == "para"


def test_renderable_img_whitelist():
    """可渲染图片扩展名白名单（wmf/emf 不收；常量本身是小写，生产代码先 lower()）。"""
    assert {".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp"} <= P.RENDERABLE_IMG
    assert ".wmf" not in P.RENDERABLE_IMG
    assert ".emf" not in P.RENDERABLE_IMG
    assert ".PNG" not in P.RENDERABLE_IMG


def test_patterns_has_no_third_party_import():
    """patterns.py 会被打进浏览器 Pyodide bundle，必须零第三方依赖。"""
    tree = ast.parse(Path(P.__file__).read_text(encoding="utf-8"))
    mods = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            mods |= {a.name.split(".")[0] for a in node.names}
        elif isinstance(node, ast.ImportFrom) and node.module:
            mods.add(node.module.split(".")[0])
    assert mods <= {"re"}, f"patterns.py 出现第三方依赖：{mods}"
