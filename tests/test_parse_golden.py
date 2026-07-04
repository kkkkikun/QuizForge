"""Golden 快照测试：DB 干净样本解析结果锁基线（删除快照可重新生成）。"""

import json
from pathlib import Path

from quizforge.ingest import load_docx
from quizforge.parse import parse_blocks, quiz_to_dict

DATA = Path(__file__).resolve().parent.parent / "data"
GOLDEN = Path(__file__).resolve().parent / "golden"


def test_db_golden():
    GOLDEN.mkdir(exist_ok=True)
    blocks = load_docx(str(DATA / "数据库原理题库.docx"))
    quiz = parse_blocks(blocks, source_file="数据库原理题库.docx")
    data = quiz_to_dict(quiz)
    out = GOLDEN / "数据库原理题库.json"
    if not out.exists():
        out.write_text(
            json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        raise AssertionError(
            f"golden 快照首次生成于 {out}，请人工复查后重跑测试以锁定。"
        )
    expected = json.loads(out.read_text(encoding="utf-8"))
    assert data == expected, (
        "DB 解析结果与 golden 快照不一致；如属预期变更，删除快照后重跑以重新生成。"
    )
