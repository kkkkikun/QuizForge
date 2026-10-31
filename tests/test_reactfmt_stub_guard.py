"""--react 覆盖多题库转发桩的防护（reactfmt 层）。"""

import pytest

from quizforge.model import Question, Quiz
from quizforge.reactfmt import ForwardingStubError, write_data_ts

STUB = (
    "export { QUIZZES, getQuiz } from './data/index';\n"
    "export type { QuizMeta } from './data/index';\n"
)


def _quiz():
    q = Question(1, "single", "单选", "1+1=?", {"A": "1", "B": "2"}, answer=["B"])
    return Quiz(title="测试题库", source_file="t.docx", questions=[q])


def test_write_data_ts_refuses_forwarding_stub(tmp_path):
    """目标是多题库转发桩 → 拒绝写入并提示改用 --react-frontend，不静默覆盖。"""
    p = tmp_path / "data.ts"
    p.write_text(STUB, encoding="utf-8")
    with pytest.raises(ForwardingStubError) as exc:
        write_data_ts(_quiz(), str(p))
    assert "--react-frontend" in str(exc.value)
    assert p.read_text(encoding="utf-8") == STUB, "转发桩不能被改写"


def test_write_data_ts_allows_plain_target(tmp_path):
    """普通新路径照常写。"""
    p = tmp_path / "data.ts"
    write_data_ts(_quiz(), str(p))
    assert "export const QUIZZES: Quiz[]" in p.read_text(encoding="utf-8")


def test_write_data_ts_overwrites_own_output(tmp_path):
    """自己写出的单题库文件可覆盖（幂等重跑不算踩桩）。"""
    p = tmp_path / "data.ts"
    write_data_ts(_quiz(), str(p))
    write_data_ts(_quiz(), str(p))
    assert "export const QUIZZES: Quiz[]" in p.read_text(encoding="utf-8")
