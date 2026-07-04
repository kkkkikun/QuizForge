# QuizForge MVP

## Context（为什么做）
期末选填题速刷工具。输入 Word/PDF 复习资料 → Agent 解析为结构化题库 → 生成**单文件自包含静态网页**，只保留「核对答案 + 无限重做」。Agent 的核心价值：把千奇百怪的输入归一成代码能处理的格式，并**滤掉非题目噪声**（知识点说明、大题、计算题等）。

## What Changes（新增）
- Python CLI `quizforge <input> [-o out.html] [--interactive] [--keep-explanation] [--no-llm]`
- 三段管线：**摄取**(docx/pdf/txt) → **解析**(规则优先 + LLM 兜底 + 滤噪) → **渲染**(单文件 HTML)
- 统一题库 JSON 数据契约（中间表示 + 最终产物）
- 答题前端（原生 JS）：单选/多选/填空、提交计分、乱序、localStorage 记忆、无限重做
- 数学符号保留（UTF-8 原样 + 检测到 LaTeX 时 KaTeX）
- 可配置 LLM 兜底层（DeepSeek 兼容；无 key 自动降级纯规则 + 标记存疑）

## Out of Scope（留后续版本）
- 题目图片/图表抽取（MVP 遇图省略并提示）
- 扫描版 PDF（OCR）
- 多份试卷合并 / 错题本 / 历史
- 每题解析保留（MVP 默认丢弃；`--keep-explanation` 可留为折叠「查看解析」）

## Real-Data 驱动的关键决策
见 `design.md → 真实样本洞察`。两份样本揭示了：题号不可靠、选项排版多变、答案位置多变、须过滤大题、"公式"实为 plaintext 数学符号。这些直接决定了「解析层」的策略。
