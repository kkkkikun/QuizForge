"""渲染层测试：单文件 HTML + 答题引擎。"""

from quizforge.model import Question, Quiz
from quizforge.render import has_latex, render_html


def _sample_quiz() -> Quiz:
    return Quiz(
        title="测试题库",
        source_file="t.docx",
        questions=[
            Question(1, "single", "单选", "1+1=?", {"A": "1", "B": "2", "C": "3"}, answer=["B"]),
            Question(2, "multiple", "多选", "选偶数", {"A": "2", "B": "3", "C": "4"}, answer=["A", "C"]),
            Question(3, "blank", "填空", "＿＿＿ 是 OS 的核心",
                     None, answer=["内核"], accepted=["kernel"],
                     tolerant=True, low_confidence=True),
        ],
    )


def test_render_contains_essentials():
    html = render_html(_sample_quiz())
    assert "测试题库" in html
    assert "1+1=?" in html
    assert "选偶数" in html
    # 选项内容入页
    assert "数据库管理系统" not in html  # 无关内容不应出现
    # 控件
    assert "重做" in html


def test_render_embeds_json():
    html = render_html(_sample_quiz())
    assert '"questions"' in html
    assert "1+1=?" in html  # JSON 内嵌后仍可检索到题干


def test_render_selfcontained():
    html = render_html(_sample_quiz())
    # 不依赖外部本地文件（CDN 仅在含 LaTeX 时引入，本样本无）
    assert 'src="./' not in html
    assert 'href="./' not in html
    assert "katex" not in html.lower(), "无 LaTeX 不应引入 KaTeX"


def test_render_lowconfidence_marker():
    html = render_html(_sample_quiz())
    assert "存疑" in html  # 低置信题目高亮


def test_has_latex_detection():
    q = Quiz(questions=[Question(1, "single", "x", r"求 $\int_0^1 x\,dx$", {"A": "1"}, answer=["A"])])
    assert has_latex(q) is True
    assert has_latex(_sample_quiz()) is False


def test_render_includes_katex_when_latex():
    q = Quiz(title="x", source_file="x", questions=[
        Question(1, "single", "x", r"求 $\int x\,dx$", {"A": "1"}, answer=["A"])])
    html = render_html(q)
    assert "katex" in html.lower()


def test_render_blank_reveal_present():
    """填空题提交后应显示正确答案（引擎 JS 含「正确答案」分支）。"""
    html = render_html(_sample_quiz())
    assert "正确答案" in html
    assert "无标准答案" in html
