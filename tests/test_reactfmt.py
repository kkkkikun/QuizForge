"""QuizForge Quiz → React 数据格式转换器测试。"""

from quizforge.model import Question, Quiz
from quizforge.reactfmt import (
    build_react_quizzes,
    load_manifest,
    to_react_questions,
    to_react_quiz,
    write_data_ts,
    write_quizzes_ts,
)


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
    # 单题库也写成 QUIZZES（单元素），保持前端数据格式统一
    assert "export const QUIZZES: Quiz[]" in content
    assert "测试题库" in content
    assert '"choice"' in content
    assert "import { Quiz } from './types'" in content


# ---------------- 多题库（QUIZZES + 清单）----------------


def test_to_react_quiz():
    q = Question(1, "single", "选", "x", {"A": "1", "B": "2"}, answer=["B"])
    rq = to_react_quiz(_quiz(q), qid="db")
    assert rq["id"] == "db"
    assert rq["title"] == "测试题库"
    assert rq["questions"][0]["type"] == "choice"


def test_to_react_quiz_id_from_source_slug():
    quiz = Quiz(title="X", source_file="数据库原理题库.docx", questions=[])
    rq = to_react_quiz(quiz)
    assert rq["id"] == "数据库原理题库"


def test_to_react_group():
    """group 题 → React {type:group, subQuestions:[...]}。"""
    g = Question(1, "group", stem="Unit 1 · News report 1",
                 sub_questions=[
                     Question(2, "single", stem="第 1 题", options={"A": "x", "B": "y"}, answer=["B"]),
                     Question(3, "single", stem="第 2 题", options={"A": "x", "B": "y"}, answer=["A"]),
                 ])
    r = to_react_questions(_quiz(g))[0]
    assert r["type"] == "group"
    assert r["question"] == "Unit 1 · News report 1"
    assert len(r["subQuestions"]) == 2
    assert r["subQuestions"][0]["answer"] == "B"
    assert r["subQuestions"][0]["options"] == ["A. x", "B. y"]


def test_write_quizzes_ts(tmp_path):
    quizzes = [
        to_react_quiz(Quiz(title="DB", source_file="db", questions=[]), "db"),
        to_react_quiz(Quiz(title="NET", source_file="net", questions=[]), "net"),
    ]
    p = tmp_path / "data.ts"
    write_quizzes_ts(quizzes, str(p))
    content = p.read_text(encoding="utf-8")
    assert "export const QUIZZES: Quiz[]" in content
    assert '"id": "db"' in content and '"id": "net"' in content


def test_load_manifest(tmp_path):
    from quizforge.reactfmt import load_manifest
    m = tmp_path / "quizzes.yaml"
    m.write_text(
        "quizzes:\n  - id: db\n    title: 数据库\n    source: db.json\n"
        "  - id: net\n    title: 网络\n    source: net.docx\n",
        encoding="utf-8",
    )
    entries = load_manifest(str(m))
    assert len(entries) == 2
    assert entries[0] == {"id": "db", "title": "数据库", "source": "db.json"}
    assert entries[1]["source"] == "net.docx"


def test_build_react_quizzes_from_json(tmp_path):
    from quizforge.parse import quiz_to_dict
    from quizforge.reactfmt import build_react_quizzes
    import json
    quiz = _quiz(Question(1, "single", "选", "x", {"A": "1", "B": "2"}, answer=["B"]))
    jp = tmp_path / "q.json"
    jp.write_text(json.dumps(quiz_to_dict(quiz), ensure_ascii=False), encoding="utf-8")
    m = tmp_path / "quizzes.yaml"
    m.write_text("quizzes:\n  - id: t\n    title: 测试\n    source: q.json\n", encoding="utf-8")
    out = build_react_quizzes(str(m))
    assert len(out) == 1
    assert out[0]["id"] == "t"
    assert out[0]["questions"][0]["answer"] == "B"


def test_build_react_quizzes_from_txt(tmp_path):
    from quizforge.reactfmt import build_react_quizzes
    tp = tmp_path / "q.txt"
    tp.write_text("选择题\n1.题干(B)\nA.甲\nB.乙\nC.丙\nD.丁\n", encoding="utf-8")
    m = tmp_path / "quizzes.yaml"
    m.write_text("quizzes:\n  - id: t\n    title: T\n    source: q.txt\n", encoding="utf-8")
    out = build_react_quizzes(str(m))
    assert out[0]["questions"][0]["answer"] == "B"
