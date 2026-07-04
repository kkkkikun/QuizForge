"""命令行入口。"""

from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path

from . import __version__


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog="quizforge",
        description="期末选填题速刷：Word/PDF/TXT → 单文件静态答题网页",
    )
    p.add_argument("input", help="输入文件 (.docx/.pdf/.txt)")
    p.add_argument("-o", "--output", help="输出 HTML 路径（默认 <input>.html）")
    p.add_argument(
        "--interactive",
        action="store_true",
        help="低置信题目逐题人工确认",
    )
    p.add_argument(
        "--keep-explanation",
        action="store_true",
        help="保留「解析」为折叠块（默认丢弃）",
    )
    p.add_argument(
        "--no-llm",
        action="store_true",
        help="强制纯规则、不调 LLM",
    )
    p.add_argument(
        "--shuffle",
        dest="shuffle",
        default=True,
        action="store_true",
        help="生成时默认乱序（默认开启）",
    )
    p.add_argument(
        "--no-shuffle",
        dest="shuffle",
        action="store_false",
        help="不乱序",
    )
    p.add_argument(
        "-V",
        "--version",
        action="version",
        version=f"%(prog)s {__version__}",
    )
    return p


def _default_output(input_path: str) -> str:
    base, _ = os.path.splitext(input_path)
    return base + ".html"


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)

    # 延迟导入，避免 --help/--version 触发重依赖加载
    from . import ingest, parse, render
    from .ingest import ScannedPdfError
    from .llm import LLMClient, LLMConfig

    # 1. 摄取
    try:
        blocks = ingest.load(args.input)
    except FileNotFoundError as e:
        print(f"错误：文件不存在 - {e}", file=sys.stderr)
        return 2
    except ScannedPdfError as e:
        print(f"错误：{e}", file=sys.stderr)
        return 2
    except ValueError as e:
        print(f"错误：{e}", file=sys.stderr)
        return 2

    # 2. 解析（LLM 可选；无 key 自动降级）
    llm = None
    if not args.no_llm:
        cfg = LLMConfig.from_args()
        if cfg.available():
            llm = LLMClient(cfg)
    quiz = parse.parse_blocks(blocks, source_file=os.path.basename(args.input), llm=llm)

    # 3. 鲁棒性：未识别到题目
    if not quiz.questions:
        print("错误：未识别到任何题目（文档可能不含选填题、为空或格式特殊）。", file=sys.stderr)
        print(f"  ignored_summary={quiz.ignored_summary}", file=sys.stderr)
        return 3

    # 4. 渲染 + 5. 写出
    html = render.render_html(quiz, shuffle=args.shuffle)
    out_path = args.output or _default_output(args.input)
    Path(out_path).write_text(html, encoding="utf-8")

    n_low = sum(1 for q in quiz.questions if q.low_confidence)
    print(f"✅ 已生成 {out_path}")
    print(f"   题目 {len(quiz.questions)} 道 | 存疑 {n_low} | ignored {quiz.ignored_summary}")
    if n_low:
        print("   提示：标「存疑」的题目可配置 LLM_API_KEY 后重跑以增强解析。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
