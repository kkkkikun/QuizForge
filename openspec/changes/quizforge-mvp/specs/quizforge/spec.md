# QuizForge — 增量规格（MVP）

## 需求（Requirements）

- **R1 CLI 入口**：`quizforge <input> [-o out.html] [--interactive] [--keep-explanation] [--no-llm] [--shuffle]`，支持 `.docx/.pdf/.txt`。
- **R2 摄取**：DOCX(`python-docx`) / PDF(`pdfplumber`) / TXT → 统一 Block 流；扫描版 PDF（文本近乎空）→ 报错提示需 OCR。
- **R3 解析**：规则优先 + LLM 兜底，识别单选/多选/填空 → Quiz JSON；无 LLM key 时降级纯规则。
- **R4 LLM 层可配置**：`LLM_BASE_URL`/`LLM_MODEL`/`LLM_API_KEY`（或 `DEEPSEEK_API_KEY`），OpenAI 兼容，默认 DeepSeek；CLI flag 可覆盖；无 key 自动降级。
- **R5 低置信度标记**：规则与 LLM 都拿不准的题目标 `low_confidence`，HTML 高亮「⚠️ 存疑请核对」；`--interactive` 可逐题确认。
- **R6 渲染**：单文件自包含 HTML（题库 JSON 内嵌、CSS/JS 内联），双击即开。
- **R7 答题**：单选/多选/填空答题、提交计分、乱序、localStorage 记忆进度、一键无限重做；纯前端无后端。
- **R8 数学**：题干数学符号按 UTF-8 原样渲染；仅当检测到 `$...$`/`\(...\)` LaTeX 时用 KaTeX 渲染。
- **R9 鲁棒性**：空文档/无可识别题目 → 报错不生成空页；超长文档 → 前端分页不卡死；范围外题型（简答/计算）→ 跳过并提示。
- **R10 滤噪**：过滤知识点说明、前言、章节标题、大题/计算题/简答题（带分值`（N分）`或子题`（1）（2）`）、解析文字；被忽略内容计入 `ignored_summary` 供核对。

## 场景（Scenarios）

### Happy
- 规整 DOCX（`1.题干(B)` + 每行选项 + 末尾陈述）→ 生成 HTML，答案正确，计分/乱序/记忆正常。
- 多节 DOCX（Heading 1：选择题/填空题）→ 按节解析，单选/多选/填空各就位。

### Sad
- PDF 可提取但排版乱（答案藏题干括号、选项 Tab 挤一行、第 2 题无题号）→ 规则+LLM 兜底解析成功。
- 填空一题多空/多可接受答案 → `answer`+`accepted` 数组 + 容错匹配通过。
- 文档混入大题（`（15分）`/子题）与知识点说明 → 滤噪丢弃，`ignored_summary` 记账。
- 某题规则+LLM 都拿不准 → `low_confidence` 标记，HTML 高亮。
- 含 unicode 数学（`x⁴+x+1`）→ 原样正确显示。

### Edge
- 空文档/无可识别题目 → 报错，不生成空 HTML。
- 含图题目 → 图片省略，`note` 提示「本题含图，已省略」。
- 选项残缺（只有 A B）→ `low_confidence` 标记。
- 超长文档（几百题）→ 前端分页，不卡死浏览器。
- 无 API key + 规则解析不全 → 降级标记存疑，仍输出 HTML。
