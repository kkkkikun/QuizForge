# QuizForge

期末选填题速刷工具：输入 Word/PDF 复习资料 → Agent 解析（规则 + LLM 兜底 + 滤噪）→ **单文件自包含静态网页**，只保留「核对答案 + 无限重做」。

## 安装
```bash
uv sync
```

## 使用
```bash
uv run quizforge ./data/数据库原理题库.docx        # → 数据库原理题库.html，双击即开
```

LLM 兜底为**可选增强**（不配也能跑，纯规则 + 标记存疑）。**兼容两套 provider**：
- **OpenAI 系**（DeepSeek / OpenAI / 任意 OpenAI 兼容中转）
- **Anthropic 系**（Claude，A社）

最简方式：把密钥写进项目根的 `.env`（已被 gitignore，启动自动加载，切勿提交）：
```bash
# .env —— 用 DeepSeek（默认）
LLM_API_KEY=sk-xxx                 # 或 DEEPSEEK_API_KEY / OPENAI_API_KEY
LLM_BASE_URL=https://api.deepseek.com
LLM_MODEL=deepseek-chat
```
```bash
# .env —— 切换到 Anthropic Claude
LLM_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-xxx
LLM_MODEL=claude-haiku-4-5-20251001
```
Provider 判定：显式 `LLM_PROVIDER` 优先；否则设了 `ANTHROPIC_API_KEY` 走 Claude，设了 `LLM/DEEPSEEK/OPENAI_API_KEY` 走 OpenAI 系。

成本控制：`--max-llm N` 限制 LLM 兜底调用次数（每道低置信题调用一次）。

## 常用选项
- `-o <path>`：输出路径
- `--no-llm`：强制纯规则（不调 LLM）
- `--llm-parse`：整篇交 LLM 结构化（规则搞不动的怪文档；产出默认标存疑）
- `--max-llm N`：LLM 调用次数上限（控成本）
- `--review`：生成 HTML 前逐题核对存疑题（`y`确认 / `a`改答案 / `s`跳过 / `d`删除）
- `--no-shuffle` / `--shuffle`：是否乱序（默认乱序）

> 解析模式：默认**规则优先 + LLM 兜底**（规则判不定的残留块交 LLM）；`--llm-parse` 则整篇交 LLM。
> 每题标来源（规则/LLM，卡片上显示）+ 结构校验（题干/选项/答案一致性），不合规或 LLM 产出一律标 ⚠️ 存疑，可用 `--review` 人工过一遍。

## 开发
```bash
uv run pytest                      # 测试（两份 data/*.docx 为回归基线）
```
设计见 `openspec/changes/quizforge-mvp/design.md`。
