# quizforge Specification

## Purpose
记录 QuizForge 后端核心的行为契约——CLI 入口、三段管线（摄取/解析/渲染）、规则优先 + LLM 兜底、滤噪与存疑标记、单文件 HTML 答题与鲁棒性——由 MVP 变更（quizforge-mvp）归档同步，指导 CLI 与浏览器版引擎的一致性演进。

## Requirements
### Requirement: R1 CLI 入口
CLI MUST 以 `quizforge <input>` 驱动，输入支持 `.docx`/`.pdf`/`.txt`（解析）与 `.json`（从已存题库重渲染）；开关含 `-o/--output`、`--no-llm`、`--shuffle/--no-shuffle`、`--max-llm N`、`--llm-parse`、`--review`、`--diagnose`、`--json`，多题库模式为 `--react-frontend DIR`。

#### Scenario: 规整 DOCX 端到端

- **WHEN** 输入规整 DOCX（`1.题干(B)` + 每行选项 + 末尾陈述）
- **THEN** 生成 HTML，答案正确，计分/乱序/记忆正常

#### Scenario: 多节 DOCX 按节解析

- **WHEN** 输入多节 DOCX（Heading 1：选择题/填空题）
- **THEN** 按节解析，单选/多选/填空各就位

### Requirement: R2 摄取
摄取层 MUST 将 DOCX（python-docx）/ PDF（pdfplumber）/ TXT 统一为 Block 流；扫描版 PDF（文本近乎空）MUST 报错并提示需 OCR。

#### Scenario: 扫描版 PDF

- **WHEN** 输入 PDF 为纯图片（无可提取文本）
- **THEN** 报错提示需 OCR / 转存 .docx，不生成空题库

### Requirement: R3 解析
解析层 MUST 以规则为主识别单选/多选/填空并产出 Quiz JSON，LLM 仅对规则判不定的残留块兜底。

#### Scenario: PDF 排版乱兜底

- **WHEN** PDF 可提取但排版乱（答案藏题干括号、选项 Tab 挤一行、第 2 题无题号）
- **THEN** 规则 + LLM 兜底解析成功

#### Scenario: 无 LLM key

- **WHEN** 未配置 LLM_API_KEY
- **THEN** 降级为纯规则解析并标记存疑，不阻塞出题

### Requirement: R4 LLM 层可配置
LLM 兜底层 MUST 可配置：`LLM_PROVIDER`/`LLM_BASE_URL`/`LLM_MODEL`/`LLM_API_KEY`（或 `DEEPSEEK_API_KEY`/`OPENAI_API_KEY`/`ANTHROPIC_API_KEY`），OpenAI 兼容，默认 DeepSeek；无 key MUST 自动降级纯规则。

#### Scenario: 指定 provider 与模型

- **WHEN** 设置 `LLM_PROVIDER` / `LLM_BASE_URL` / `LLM_MODEL` 与对应 key
- **THEN** 按指定 provider 调用；未设置 key 时降级纯规则

### Requirement: R5 低置信度标记
规则与 LLM 都拿不准的题 MUST 标 `low_confidence`，HTML 高亮「⚠️ 存疑请核对」；`--review` MUST 支持逐题确认（y 确认 / a 改答案 / s 跳过 / d 删除）。

#### Scenario: 双路都拿不准

- **WHEN** 某题规则与 LLM 都拿不准
- **THEN** 标 `low_confidence`，HTML 高亮 ⚠️ 存疑

#### Scenario: 选项残缺

- **WHEN** 选项残缺（只有 A B）
- **THEN** 标 `low_confidence`

### Requirement: R6 渲染
渲染层 MUST 产出单文件自包含 HTML（题库 JSON 内嵌、CSS/JS 内联），双击即开。

#### Scenario: 生成单文件 HTML

- **WHEN** 运行 CLI 生成产物
- **THEN** HTML 内嵌题库 JSON 与全部 CSS/JS，无外部依赖

### Requirement: R7 答题
答题前端 MUST 支持单选/多选/填空作答、提交计分、乱序、localStorage 记忆进度、一键无限重做，纯前端无后端。

#### Scenario: 进度记忆与无限重做

- **WHEN** 作答后刷新页面再进入
- **THEN** 从 localStorage 恢复进度；「无限重做」可再次作答同一题

### Requirement: R8 数学
题干数学符号 MUST 按 UTF-8 原样渲染；仅当检测到 `$...$`/`\(...\)` LaTeX 时才用 KaTeX 渲染。

#### Scenario: unicode 数学

- **WHEN** 题干含 unicode 数学（如 `x⁴+x+1`）
- **THEN** 原样正确显示

### Requirement: R9 鲁棒性
空文档/无可识别题目 MUST 报错不生成空页；超长文档 MUST 前端分页不卡死；范围外题型（简答/计算）MUST 跳过并提示。

#### Scenario: 空文档

- **WHEN** 输入为空文档或无可识别题目
- **THEN** 报错，不生成空 HTML

#### Scenario: 超长文档

- **WHEN** 文档含几百题
- **THEN** 前端分页，不卡死浏览器

### Requirement: R10 滤噪
解析层 MUST 过滤知识点说明、前言、章节标题、大题/计算题/简答题（带分值 `（N分）` 或子题 `（1）（2）`）、解析文字；被忽略内容 MUST 计入 `ignored_summary` 供核对。

#### Scenario: 文档混入大题与知识点

- **WHEN** 文档混入大题（`（15分）`/子题）与知识点说明
- **THEN** 滤噪丢弃，`ignored_summary` 记账

