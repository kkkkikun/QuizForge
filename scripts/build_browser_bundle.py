"""生成浏览器端 Python bundle：拷贝纯 stdlib 模块到 frontend/public/quizforge_py/。

在 /convert 页面由 Pyodide 加载运行（无第三方依赖：不含 ingest/llm/cli/reactfmt）。
用法：uv run python scripts/build_browser_bundle.py
改 quizforge 核心模块后需重跑（提交产物入库，与 frontend/src/data.ts 同策略）。
"""

import shutil
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


def main() -> int:
    DEST.mkdir(parents=True, exist_ok=True)
    for name in PURE_MODULES:
        shutil.copy2(SRC / name, DEST / name)
    print(f"✅ 已生成 {DEST}（{len(PURE_MODULES)} 个模块）")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
