"""生成浏览器端 Python bundle：拷贝纯 stdlib 模块到 frontend/public/quizforge_py/。

在 /convert 页面由 Pyodide 加载运行（无第三方依赖：不含 ingest/llm/cli/reactfmt）。
用法：
  uv run python scripts/build_browser_bundle.py           # 生成到 frontend/public/quizforge_py/
  uv run python scripts/build_browser_bundle.py --check   # 校验已提交 bundle 是否与源码一致（不写仓库）
改 quizforge 核心模块后需重跑（提交产物入库，与 frontend/src/data.ts 同策略）。
"""

import difflib
import filecmp
import shutil
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# 可在浏览器运行的无第三方依赖模块
PURE_MODULES = [
    "__init__.py",
    "model.py",
    "patterns.py",
    "parse.py",
    "render.py",
    "validate.py",
    "browser_ingest.py",
]

SRC = ROOT / "quizforge"
DEST = ROOT / "frontend" / "public" / "quizforge_py" / "quizforge"


def build(dest: Path) -> list[Path]:
    """把 PURE_MODULES 拷到 dest/quizforge/，返回写出的文件列表。"""
    target = dest / "quizforge"
    target.mkdir(parents=True, exist_ok=True)
    written = []
    for name in PURE_MODULES:
        out = target / name
        shutil.copy2(SRC / name, out)
        written.append(out)
    return written


def check() -> int:
    """校验仓库里已提交的 bundle 与源码是否一致。

    在临时目录里重新生成一份，再逐个比对「生成结果」与「已提交 bundle」的内容
    （比对的是脚本的实际输出，而不是源文件的哈希——将来脚本若注入头部注释，
    这里仍然比对的是最终产物，不会误报）。不一致打印差异清单并返回 1。
    """
    with tempfile.TemporaryDirectory() as tmp:
        tmpdir = Path(tmp)
        build(tmpdir)
        problems: list[tuple[str, str, list[str]]] = []
        for name in PURE_MODULES:
            generated = tmpdir / "quizforge" / name
            committed = DEST / name
            if not committed.exists():
                problems.append((name, "已提交 bundle 缺少该文件", []))
                continue
            if filecmp.cmp(generated, committed, shallow=False):
                continue
            gen_lines = generated.read_text(encoding="utf-8").splitlines(keepends=True)
            com_lines = committed.read_text(encoding="utf-8").splitlines(keepends=True)
            diff = list(
                difflib.unified_diff(
                    com_lines,
                    gen_lines,
                    fromfile=f"committed/{name}",
                    tofile=f"generated/{name}",
                    n=1,
                )
            )
            problems.append(
                (
                    name,
                    f"内容不一致（已提交 {len(com_lines)} 行 / 重新生成 {len(gen_lines)} 行）",
                    diff,
                )
            )

    if not problems:
        print(f"✅ 浏览器 bundle 与 quizforge/ 源码一致（{len(PURE_MODULES)} 个模块）")
        return 0

    print(
        f"❌ 浏览器 bundle 已过期：{len(problems)} 个模块与 quizforge/ 源码不一致",
        file=sys.stderr,
    )
    for name, reason, diff in problems:
        print(f"  - {name}: {reason}", file=sys.stderr)
        for line in diff[:20]:
            print(f"      {line.rstrip()}", file=sys.stderr)
        if len(diff) > 20:
            print(f"      …（其余 {len(diff) - 20} 行省略）", file=sys.stderr)
    print(
        "  修复：uv run python scripts/build_browser_bundle.py "
        "并提交 frontend/public/quizforge_py/",
        file=sys.stderr,
    )
    return 1


def main() -> int:
    if "--check" in sys.argv[1:]:
        return check()
    build(DEST)
    print(f"✅ 已生成 {DEST}（{len(PURE_MODULES)} 个模块）")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
