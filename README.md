# QuizForge

> 期末选填题速刷工具：Word/PDF 复习资料 → 一键生成**单文件静态答题网页**，只保留「核对答案 + 无限重做」。

[![CI](https://github.com/kkkkikun/QuizForge/actions/workflows/ci.yml/badge.svg)](https://github.com/kkkkikun/QuizForge/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

把老师发的乱糟糟的题库（Word/PDF）丢进去，QuizForge 用「规则 + LLM 兜底」解析成结构化题库，再渲染成一个**双击即开、可离线、无限重做**的自包含 HTML 答题页。

---

## ✨ 特性

- **多格式输入**：`.docx` / `.pdf` / `.txt`；也支持从已导出的 `.json` 直接重渲染
- **鲁棒解析**：规则优先——不依赖题号、选项按 `A./B./C./D.` 跨行/Tab 切分、答案多策略抽取、自动滤掉大题/知识点/解析/图片
- **LLM 增强（可选）**：兼容 OpenAI 系（DeepSeek / OpenAI / 中转）与 Anthropic Claude；规则判不定的残留块交 LLM 兜底，低置信题自动补答案
- **正确性把关**：结构校验 + 来源标记（规则/LLM）+ `--review` 人工逐题核对
- **答题引擎**：单选 / 多选 / 填空、提交计分、乱序、localStorage 进度记忆、无限重做
- **单文件自包含**：题库 JSON 内嵌，零依赖、零后端，拷贝给同学直接开

## 📸 预览

> 前端仍在打磨，截图稍后补上。

<!-- 截图占位：前端定稿后把图片放到 docs/screenshot.png，并取消下面这行注释 -->
<!-- ![QuizForge 答题页](docs/screenshot.png) -->

## 🔧 工作原理

三段管线，层间用「题库 JSON」数据契约解耦：

```
 .docx/.pdf/.txt  ──▶  摄取  ──▶  Block 流  ──▶  解析  ──▶  Quiz JSON  ──▶  渲染  ──▶  单文件 HTML
                     python-docx     规则优先            题库 JSON 内嵌
                     pdfplumber      + LLM 兜底          原生 JS 答题引擎
                                     + 滤噪
```

设计详见 [`openspec/changes/quizforge-mvp/design.md`](openspec/changes/quizforge-mvp/design.md)。

## 📦 安装

需要 Python ≥ 3.10，推荐用 [uv](https://docs.astral.sh/uv/)：

```bash
git clone <your-repo-url> && cd QuizForge
uv sync
```

## 🚀 快速开始

```bash
# ① 纯规则解析（无需任何 key），生成同名 HTML
uv run quizforge ./data/数据库原理题库.docx

# ② 想让 LLM 补答案/兜底：先配 .env，再带 --json 留存结果
cp .env.example .env            # 填入你的 key
uv run quizforge ./data/2026年重点复习题库.docx --json --max-llm 70
```

生成的 `.html` **双击即开**；带 `--json` 还会输出同名 `.json` 题库文件。

## 🔑 LLM 配置（可选增强）

LLM 是**可选**的——不配也能跑（纯规则 + 标记存疑）。要启用，复制 `.env.example` 为 `.env` 填入 key（`.env` 已 gitignore，切勿提交）。

**Provider 自动判定**：显式 `LLM_PROVIDER` > 设了 `ANTHROPIC_API_KEY` 走 Claude > 其它 key 走 OpenAI 系。

| Provider | 需配置 |
|----------|--------|
| DeepSeek（默认） | `LLM_API_KEY` + `LLM_BASE_URL=https://api.deepseek.com` + `LLM_MODEL=deepseek-chat` |
| OpenAI | `LLM_API_KEY` + `LLM_BASE_URL=https://api.openai.com/v1` + `LLM_MODEL=gpt-4o-mini` |
| Anthropic Claude | `LLM_PROVIDER=anthropic` + `ANTHROPIC_API_KEY` + `LLM_MODEL=claude-haiku-4-5-20251001` |

## 📜 命令行参考

```bash
quizforge <input> [options]
```

| 选项 | 说明 |
|------|------|
| `input` | 输入：`.docx`/`.pdf`/`.txt`（解析）或 `.json`（从已存题库重渲染，跳过解析/LLM） |
| `-o, --output <path>` | 输出 HTML 路径（默认 `<input>.html`） |
| `--no-llm` | 强制纯规则，不调 LLM |
| `--llm-parse` | 整篇交 LLM 结构化（规则搞不动的怪文档；产出默认标存疑） |
| `--max-llm <N>` | LLM 调用次数上限（控成本） |
| `--review` | 生成前逐题核对存疑题（`y`确认 / `a`改答案 / `s`跳过 / `d`删除 / `q`结束） |
| `--json` | 同时导出题库 JSON（与 HTML 同名 `.json`） |
| `--shuffle` / `--no-shuffle` | 是否乱序（默认乱序） |
| `-V, --version` | 版本 |

## 🧩 题库 JSON 数据契约

```json
{
  "title": "数据库原理题库",
  "source_file": "数据库原理题库.docx",
  "questions": [
    {"id": 1, "type": "single", "section": "单选题", "stem": "数据库技术的核心是",
     "options": {"A": "数据", "B": "数据库管理系统", "C": "操作系统", "D": "应用程序"},
     "answer": ["B"], "accepted": [], "tolerant": false,
     "low_confidence": false, "note": null, "source": "rule"}
  ],
  "ignored_summary": {"fill": 30}
}
```

- `type`：`single` / `multiple` / `blank`
- `answer` 恒为数组；填空 `options=null`，`accepted` 为备选可接受答案，`tolerant` 开容错匹配
- `source`：`rule`（规则解析）或 `llm`（LLM 产出，默认标存疑）
- `low_confidence`：HTML 显示 ⚠️，可用 `--review` 人工核对

## 🛡 解析模式与正确性把关

**模式**：默认「规则优先 + LLM 兜底」（DB/NET 这类常规排版零影响）；`--llm-parse` 则整篇交 LLM。

**三道关**：
1. **结构校验**（自动）：题干非空、选项 ≥ 2 且键合法、答案 ⊆ 选项、题型已知——不合规 → ⚠️
2. **来源标记**（自动）：LLM 产出一律默认存疑，卡片显示 `LLM` 徽标
3. **人工核对**（`--review`）：只对存疑题逐题过，不必整本看

## 📁 项目结构

```
quizforge/        源码
  cli.py          命令行入口
  ingest.py       摄取：docx/pdf/txt → Block 流
  parse.py        解析：规则 + LLM → Quiz JSON（数据契约）
  llm.py          LLM 兜底：OpenAI 系 + Anthropic
  render.py       渲染：Quiz JSON → 单文件 HTML + JS 引擎
  model.py        数据模型：Block / Question / Quiz
  patterns.py     共享正则
tests/            单测 + golden 快照（data/*.docx 为真实回归样本）
data/             真实样本
openspec/         变更管理（proposal / design / tasks / specs）
```

## 🛠 开发

```bash
uv sync                                  # 装依赖（含 dev：pytest、fpdf2）
uv run pytest                            # 全量测试
uv run pytest tests/test_parse_segment.py -q   # 单模块
```

约定：TDD（先测后码）；两份 `data/*.docx` 是回归基线（干净 + 脏）；改解析逻辑导致 golden 快照需更新时，删 `tests/golden/*.json` 重跑即可重新生成。

## ⚠️ 局限 / 已知问题

- 题目图片/图表：MVP 不抽取（占位丢弃）
- 扫描版 PDF（纯图片）：不支持，需先 OCR
- LLM 答案为其推理结果（文档无答案 key 时）；标准 CS 事实可靠，冷门/有争议题可能偏差
- 前端答题引擎已过 `node --check` 与结构断言，浏览器交互建议实机确认

## 🗺 路线图

- [ ] 图片/图表抽取（base64 内嵌）
- [ ] 扫描版 PDF OCR
- [ ] jsdom 前端运行时单测
- [ ] 答案 key 区映射（让非内联答案文档免 LLM）

## 🤝 贡献

欢迎 Issue / PR。较大改动建议走 OpenSpec 变更流程（见 `openspec/changes/`）。

## 📄 许可证

MIT，详见 [LICENSE](LICENSE)。
