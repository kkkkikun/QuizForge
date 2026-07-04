# QuizForge

期末选填题速刷工具：输入 Word/PDF 复习资料 → Agent 解析（规则+LLM 兜底+滤噪）→ 单文件自包含静态网页（仅核对答案 + 无限重做）。

## 快速运行
```bash
uv sync                      # 装依赖（python-docx, pdfplumber, httpx, pytest）
uv run quizforge ./data/数据库原理题库.docx        # 生成 数据库原理题库.html
```
LLM 兜底为**可选增强**：设 `LLM_API_KEY`（或 `DEEPSEEK_API_KEY`）/ `LLM_BASE_URL` / `LLM_MODEL` 后启用；不配也能跑（纯规则 + 标记存疑）。

## 项目布局
```
quizforge/        源码：cli / ingest / parse / llm / render / model
tests/            单测 + golden 快照（./data 为真实回归样本）
openspec/         变更管理（当前变更：quizforge-mvp）
data/             真实样本（勿提交大文件？见 .gitignore 策略）
```

## 开发约定
- TDD：先测后码。两份 `data/*.docx` 是回归基线（干净 + 脏）。
- 数据契约 = `Quiz JSON`（见 `openspec/changes/quizforge-mvp/design.md §3.2`），层间解耦。
- 解析不依赖题号；选项按 `A./B./C./D.` 切分；答案多策略抽取；大题/知识点必滤。

## OpenSpec
- 当前变更：`openspec/changes/quizforge-mvp/`（proposal / design / tasks / specs）
- 规则与流程：见 ai-engineer-workflow-v5-ulw（Karpathy 监察 / TDD / BDD / Gate）
