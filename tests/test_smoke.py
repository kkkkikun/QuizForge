"""骨架冒烟测试：包可导入、CLI 可跑 --help。"""

import subprocess
import sys

import quizforge


def test_version():
    assert isinstance(quizforge.__version__, str) and quizforge.__version__


def test_cli_help():
    r = subprocess.run(
        [sys.executable, "-m", "quizforge.cli", "--help"],
        capture_output=True,
        text=True,
    )
    assert r.returncode == 0, r.stderr
    assert "quizforge" in r.stdout.lower()
    for flag in ["--no-llm", "--interactive", "--keep-explanation", "--no-shuffle"]:
        assert flag in r.stdout
