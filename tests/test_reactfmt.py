"""QuizForge Quiz → React 数据格式转换器测试。"""

from quizforge.model import Question, Quiz
from quizforge.reactfmt import to_react_questions, write_data_ts


def _quiz(*qs):
    return Quiz(title="测试题库", source_file="t.docx", questions=list(qs))


def test_single_choice():
    q = Question(1, "single", "单选", "1+1=?", {"A": "1", "B": "2", "C": "3", "D": "4"}, answer=["B"])
    r = to_react_questions(_quiz(q))[0]
    assert r["type"] == "choice"
    assert r["question"] == "1+1=?"
    assert r["options"] == ["A. 1", "B. 2", "C. 3", "D. 4"]
    assert r["answer"] == "B"
    assert r["tags"]


def test_multiple_choice():
    q = Question(2, "multiple", "多选", "选偶数", {"A": "2", "B": "3", "C": "4"}, answer=["A", "C"])
    r = to_react_questions(_quiz(q))[0]
    assert r["type"] == "multiple"
    assert r["answer"] == ["A", "C"]
    assert r["options"] == ["A. 2", "B. 3", "C. 4"]


def test_blank_injects_answer_into_stem():
    q = Question(3, "blank", "填空", "OSI…链路层、_________层、传输层…", None, answer=["网络"])
    r = to_react_questions(_quiz(q))[0]
    assert r["type"] == "blank"
    assert "[网络]" in r["question"]
    assert "_________" not in r["question"]
    assert r["answer"] == ["网络"]
    assert "options" not in r  # 填空不带 options


def test_blank_multi_accepted_joined():
    q = Question(4, "blank", "填空", "C=log(1+___)", None, answer=["S/N"], accepted=["信噪比"])
    r = to_react_questions(_quiz(q))[0]
    # 多个可接受答案用 / 连接成单空的备选，靠 React checkBlankAnswer 容错
    assert "S/N/信噪比" in r["question"]
    assert r["answer"] == ["S/N/信噪比"]


def test_tags_section_and_llm_source():
    q = Question(5, "single", "选择题", "x", {"A": "1", "B": "2"}, answer=["A"], source="llm")
    r = to_react_questions(_quiz(q))[0]
    assert "选择题" in r["tags"]
    assert "LLM" in r["tags"]


def test_explanation_low_confidence():
    q = Question(6, "single", "选", "x", {"A": "1", "B": "2"}, answer=[], low_confidence=True, note="无答案")
    r = to_react_questions(_quiz(q))[0]
    assert "存疑" in r["explanation"]


def test_write_data_ts(tmp_path):
    q = Question(1, "single", "单选", "1+1=?", {"A": "1", "B": "2"}, answer=["B"])
    p = tmp_path / "data.ts"
    write_data_ts(_quiz(q), str(p))
    content = p.read_text(encoding="utf-8")
    assert "export const TITLE" in content and "测试题库" in content
    assert "export const QUESTIONS: Question[]" in content
    assert '"choice"' in content
    assert "import { Question } from './types'" in content
