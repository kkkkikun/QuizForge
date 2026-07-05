"""命令行入口。"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

from . import __version__


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog="quizforge",
        description="期末选填题速刷：Word/PDF/TXT → 单文件静态答题网页",
    )
    p.add_argument("input", nargs="?", help="输入文件 (.docx/.pdf/.txt 或 .json)；--react-frontend 模式可省略")
    p.add_argument("-o", "--output", help="输出 HTML 路径（默认 <input>.html）")
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
        "--max-llm",
        type=int,
        default=None,
        help="LLM 兜底最多调用次数（控制成本；不设则对所有低置信题目调用）",
    )
    p.add_argument(
        "--llm-parse",
        action="store_true",
        help="整篇交 LLM 结构化解析（用于规则无法处理的怪文档；产出默认标存疑）",
    )
    p.add_argument(
        "--review",
        action="store_true",
        help="生成 HTML 前逐题核对存疑题目（y 确认 / a 改答案 / s 跳过 / d 删除）",
    )
    p.add_argument(
        "--json",
        action="store_true",
        help="同时导出题库 JSON（与 HTML 同名的 .json，便于留存/复用 LLM 结果）",
    )
    p.add_argument(
        "--react",
        metavar="PATH",
        help="导出 React 前端数据到 PATH（如 frontend/src/data.ts），供 frontend/ 构建",
    )
    p.add_argument(
        "--react-frontend",
        metavar="DIR",
        help="多题库模式：读 <DIR>/quizzes.yaml，生成 <DIR>/src/data.ts（QUIZZES）",
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

    # 加载 .env（密钥等本地配置，已 gitignore）
    try:
        from dotenv import load_dotenv
        load_dotenv()
    except Exception:
        pass

    # 多题库模式：读 manifest 生成 frontend/src/data.ts
    if args.react_frontend:
        from . import reactfmt
        manifest = os.path.join(args.react_frontend, "quizzes.yaml")
        quizzes = reactfmt.build_react_quizzes(manifest)
        out_ts = os.path.join(args.react_frontend, "src", "data.ts")
        reactfmt.write_quizzes_ts(quizzes, out_ts)
        titles = "、".join(q["title"] for q in quizzes)
        print(f"✅ 已生成 {out_ts}（{len(quizzes)} 个题库：{titles}）")
        return 0

    if not args.input:
        build_parser().error("需要 <input> 文件，或使用 --react-frontend <DIR> 多题库模式")

    # 延迟导入
    from . import parse, render

    if args.input.lower().endswith(".json"):
        # 从 JSON 重新渲染（跳过解析/LLM）——复用已留存的结构化题库
        import json as _json
        try:
            data = _json.loads(Path(args.input).read_text(encoding="utf-8"))
        except FileNotFoundError as e:
            print(f"错误：文件不存在 - {e}", file=sys.stderr)
            return 2
        except ValueError as e:
            print(f"错误：JSON 解析失败 - {e}", file=sys.stderr)
            return 2
        quiz = parse.dict_to_quiz(data)
    else:
        from . import ingest
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
            cfg = LLMConfig.from_args(max_calls=args.max_llm)
            if cfg.available():
                llm = LLMClient(cfg)
                print(f"   LLM 已启用：provider={cfg.provider} model={cfg.model}"
                      + (f"（上限 {cfg.max_calls} 次）" if cfg.max_calls else "")
                      + (" [--llm-parse 整篇结构化]" if args.llm_parse else ""), file=sys.stderr)
        quiz = parse.parse_blocks(
            blocks, source_file=os.path.basename(args.input), llm=llm, llm_parse=args.llm_parse
        )

    # 3. 鲁棒性：未识别到题目
    if not quiz.questions:
        print("错误：未识别到任何题目（文档可能不含选填题、为空或格式特殊）。", file=sys.stderr)
        print(f"  ignored_summary={quiz.ignored_summary}", file=sys.stderr)
        return 3

    # 3.5 交互审校（--review）
    if args.review:
        parse.review_quiz(quiz)
        if not quiz.questions:
            print("审校后无题目保留。", file=sys.stderr)
            return 3

    # 4. 渲染 + 5. 写出
    html = render.render_html(quiz, shuffle=args.shuffle)
    out_path = args.output or _default_output(args.input)
    Path(out_path).write_text(html, encoding="utf-8")

    if args.json:
        json_path = os.path.splitext(out_path)[0] + ".json"
        Path(json_path).write_text(
            json.dumps(parse.quiz_to_dict(quiz), ensure_ascii=False, indent=2),
            encoding="utf-8",
        )

    if args.react:
        from . import reactfmt
        reactfmt.write_data_ts(quiz, args.react)

    n_low = sum(1 for q in quiz.questions if q.low_confidence)
    print(f"✅ 已生成 {out_path}")
    print(f"   题目 {len(quiz.questions)} 道 | 存疑 {n_low} | ignored {quiz.ignored_summary}")
    if n_low:
        print("   提示：标「存疑」的题目可配置 LLM_API_KEY 后重跑以增强解析。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
