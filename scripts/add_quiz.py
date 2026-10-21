"""新题库上线流水线：登记源文档 → 生成 data.ts（含校验关卡）→ 提示提交。

用法（仓库根目录）：
    uv run python scripts/add_quiz.py <source> --id <quiz-id> [--title <标题>]

示例：
    uv run python scripts/add_quiz.py 同学的计网复习.docx --id network --title 计算机网络期末
"""

import argparse
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="新题库上线：复制文档 → 登记 quizzes.yaml → 生成 data.ts")
    p.add_argument("source", help="题库源文件 (.docx/.pdf/.txt/.json)")
    p.add_argument("--id", required=True, help="题库 id（URL 用，小写字母/数字/连字符）")
    p.add_argument("--title", help="站点展示标题（默认用文件名）")
    args = p.parse_args(argv)

    if not re.fullmatch(r"[a-z0-9][a-z0-9-]*", args.id):
        print(f"错误：--id 需为小写字母/数字/连字符，得到 {args.id!r}", file=sys.stderr)
        return 2

    src = Path(args.source).resolve()
    if not src.exists():
        print(f"错误：源文件不存在 {src}", file=sys.stderr)
        return 2

    dest = ROOT / "data" / src.name
    if dest.exists():
        print(f"错误：data/{src.name} 已存在，请先清理或改名", file=sys.stderr)
        return 2
    shutil.copy2(src, dest)

    from quizforge.reactfmt import append_manifest

    manifest = ROOT / "frontend" / "quizzes.yaml"
    title = args.title or src.stem
    try:
        append_manifest(str(manifest), args.id, title, os.path.relpath(dest, manifest.parent))
    except ValueError as e:
        dest.unlink(missing_ok=True)
        print(f"错误：{e}", file=sys.stderr)
        return 2

    print(f"✅ 已登记：id={args.id} / {title} / data/{src.name}")
    print("⏳ 生成 data.ts（含发布校验关卡）…")
    r = subprocess.run(["uv", "run", "quizforge", "--react-frontend", str(ROOT / "frontend")])
    if r.returncode != 0:
        print("\n生成失败：题库未通过校验或解析异常。撤销本次登记：", file=sys.stderr)
        print(f"  git checkout -- frontend/quizzes.yaml && rm data/{src.name}", file=sys.stderr)
        return r.returncode

    print("\n下一步（人工确认 data.ts 无误后执行）：")
    print(f"  git add data/{src.name} frontend/quizzes.yaml frontend/src/data.ts")
    print(f"  git commit -m 'data: 上线题库 {args.id}（{title}）' && git push")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
