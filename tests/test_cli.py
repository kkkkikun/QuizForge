"""CLI 端到端测试：跑真实样本生成 HTML + 鲁棒性（空/不存在/不支持）。"""

import json
import subprocess
import sys
from pathlib import Path

DATA = Path(__file__).resolve().parent.parent / "data"


def _run(*args):
    # --no-llm：测试与网络隔离（LLM 路径由 test_llm / test_parse_llm_struct 用 mock 覆盖）
    return subprocess.run(
        [sys.executable, "-m", "quizforge.cli", "--no-llm", *args],
        capture_output=True,
        text=True,
    )


def test_cli_db_generates_html(tmp_path):
    out = tmp_path / "db.html"
    r = _run(str(DATA / "数据库原理题库.docx"), "-o", str(out))
    assert r.returncode == 0, r.stderr
    assert out.exists()
    html = out.read_text(encoding="utf-8")
    assert "<html" in html.lower()
    assert "数据库原理题库" in html
    assert "数据库技术的核心" in html  # 题干入页


def test_cli_default_output_name(tmp_path, monkeypatch):
    import shutil

    dst = tmp_path / "数据库原理题库.docx"
    shutil.copy(DATA / "数据库原理题库.docx", dst)
    monkeypatch.chdir(tmp_path)
    r = _run(str(dst))
    assert r.returncode == 0, r.stderr
    assert (tmp_path / "数据库原理题库.html").exists()


def test_cli_nonexistent_file(tmp_path):
    r = _run(str(tmp_path / "nope.docx"))
    assert r.returncode != 0


def test_cli_unsupported_ext(tmp_path):
    f = tmp_path / "x.unknown"
    f.write_text("x", encoding="utf-8")
    r = _run(str(f))
    assert r.returncode != 0


def test_cli_empty_no_questions(tmp_path):
    f = tmp_path / "empty.txt"
    f.write_text("随便一段没有题目的话，也没有选项。", encoding="utf-8")
    r = _run(str(f), "-o", str(tmp_path / "o.html"))
    assert r.returncode != 0, "无可识别题目应非零退出"


def test_cli_emits_json(tmp_path):
    out = tmp_path / "db.html"
    r = _run(str(DATA / "数据库原理题库.docx"), "-o", str(out), "--json")
    assert r.returncode == 0, r.stderr
    jpath = tmp_path / "db.json"
    assert jpath.exists(), "--json 应产出同名 .json"
    d = json.loads(jpath.read_text(encoding="utf-8"))
    assert d["title"] == "数据库原理题库"
    assert len(d["questions"]) >= 40
    assert "ignored_summary" in d


def test_cli_render_from_json(tmp_path):
    """从已留存 JSON 重新渲染 HTML（跳过解析/LLM）。"""
    jpath = tmp_path / "db.json"
    r1 = _run(str(DATA / "数据库原理题库.docx"), "-o", str(tmp_path / "db.html"), "--json")
    assert r1.returncode == 0 and jpath.exists()
    r2 = _run(str(jpath), "-o", str(tmp_path / "db2.html"))
    assert r2.returncode == 0, r2.stderr
    html = (tmp_path / "db2.html").read_text(encoding="utf-8")
    assert "数据库原理题库" in html
    assert "数据库技术的核心" in html  # 题干来自 JSON
