# QuizForge — 技术设计

## 1. 总体架构（三段管线）

```
 输入文件            摄取 Ingest              解析 Parse                    渲染 Render
.docx/.pdf/.txt  ─────────────▶  Block 流  ─────────────▶  Quiz JSON  ─────────────▶  单文件 HTML
                  python-docx        规则优先                            题库 JSON 内嵌
                  pdfplumber         LLM 兜底(可选)                      原生 JS 答题引擎
                                     滤噪(丢大题/知识点)
```

**数据流单向**：Block 流（摄取产物）→ Quiz JSON（解析产物，也是数据契约）→ HTML（渲染产物）。
每一层有独立测试，层间靠数据契约解耦。

## 2. 真实样本洞察（驱动解析策略）

| 观察 | 对策略的影响 |
|------|--------------|
| 第 2 题无题号（2026题库） | 不能靠 `N.` 检测题目；选择题主信号 = 题干 + 紧跟的 A./B./C./D. 选项块 |
| 选项 Tab 挤一行 / 也跨行 | 选项解析按 `A.`/`B.`/`C.`/`D.` 标记切分，无视换行/Tab |
| 答案内联 `(B)` / `解答：` 行 / 末尾表 | 答案抽取多策略，逐个尝试 |
| 大量 `（15分）`/`（1）（2）` 大题 | R10 滤噪刚需：带分值/子题的大题、计算题、简答题丢弃 |
| `x⁴+x+1` 等 | "公式"是 unicode 数学，非 LaTeX → 原样保留，仅检测到 LaTeX 才上 KaTeX |
| Heading 1 分节（选择题/填空题…） | 分节用「样式 + 文本模式」双判 |

## 3. 数据契约

### 3.1 Block 流（摄取中间表示）
```python
Block {
  source: "docx" | "pdf" | "txt",
  style:  str,            # docx 段落样式 / pdf 推断 / "text"
  text:   str,
  kind:   "heading" | "para" | "table" | "image",  # 摄取期粗分类
}
```

### 3.2 Quiz JSON（解析产物 = 渲染输入 = 对外契约）
```json
{
  "title": "数据库原理题库",
  "source_file": "数据库原理题库.docx",
  "questions": [
    {"id":1, "type":"single", "section":"单选题",
     "stem":"数据库技术的核心是", "options":{"A":"数据","B":"数据库管理系统","C":"操作系统","D":"应用程序"},
     "answer":["B"], "low_confidence":false, "note":null},
    {"id":2, "type":"multiple", "section":"选择题",
     "stem":"...", "options":{...}, "answer":["A","C"], "low_confidence":false, "note":null},
    {"id":3, "type":"blank", "section":"填空题",
     "stem":"___ 是操作系统的核心功能之一",
     "options":null, "answer":["进程管理"], "accepted":["进程调度"], "tolerant":true,
     "low_confidence":false, "note":null}
  ],
  "ignored_summary": {"knowledge":12, "header":3, "explanation":8, "essay":5}
}
```
约定：`answer` 恒为数组；填空 `options=null`，`accepted` 为备选可接受答案，`tolerant` 开容错匹配；`low_confidence` 题目在前端高亮；`note` 记「本题含图已省略」等。

## 4. 摄取层策略
- **DOCX**：`python-docx` 按文档顺序遍历 paragraphs + tables（保持先后），带出 `style.name`；inline_shapes 记为 `image` block（MVP 不抽图，仅占位）。
- **PDF**：`pdfplumber` 按页抽文本，用字号/缩进/空行推断段落边界与标题；表格用 `extract_tables()`。
- **TXT**：按空行分段，无样式。
- 统一输出 Block 流。**扫描版 PDF 检测**：若 `pdfplumber` 抽出文本近乎为空 → 报错提示「需先 OCR」。

## 5. 解析层策略（核心）
1. **分节 Segmentation**：按 Heading 样式 + 文本模式（`选择题|单选题|多选题|填空题|判断题|简答题|计算题|应用题`）切段；记录 section 类型。
2. **候选识别（规则）**：在「选择/填空」节内，以**选项块**为锚识别选择题主单元（向前吸附题干）；填空以 `（ ）`/`___` 标记识别。题号仅辅助。
3. **选项切分**：正则 `(?m)^\s*([A-D])[.、)]\s*` 定位选项起点，跨行/Tab 合并，至下一个选项或题干止。
4. **答案抽取（多策略，逐个尝试）**：
   - 内联：题干末尾 `(B)` / `（B）` / `(AC)`
   - 行级：`答案：B` / `正确答案：AC` / `解答：（1）B`
   - 区域：文档末尾答案表/答案区
   - 命中即停；多策略冲突 → 标 `low_confidence`。
5. **题型推断**：选项数+答案数+section 类型 → single/multiple/blank；不确定标 `low_confidence`。
6. **滤噪（R10）**：丢弃——带分值`（N分）`的大题、含子题`（1）（2）`的计算/简答题、知识点陈述（在非题目节或无选项无空的长陈述）、前言/标题。被丢内容计入 `ignored_summary`。
7. **LLM 兜底（可选）**：
   - **补答案**：规则产出的 `low_confidence`（`source=rule`）题交 `adjudicate` 补答案。
   - **结构化兜底（默认）**：规则判不定的残留块（choice leftover / 填空节非空位项 / unknown 节）逐块交 `adjudicate`，是题→`source=llm` 入库，否则计噪声。
   - **`--llm-parse`**：整节文本交 `extract_questions` 批量结构化（规则旁路），用于规则完全搞不动的怪文档。
   - 无 key → 全部跳过，纯规则 + `low_confidence` 照常输出。
8. **结构校验**（关①）：所有题过 `validate_question`（题干非空/选项≥2 且键合法/答案⊆选项/题型已知）；不合规→`low_confidence=True`+`note`。
9. **来源标记**：`Question.source ∈ {rule, llm}`；LLM 产出一律默认 `low_confidence`，HTML 卡片显示「LLM」标。
10. **`--review`**：生成前逐题核对 `low_confidence` 题（`y/a/s/d/q`），人工把关只针对存疑题。

## 6. LLM 层
- **双 provider**：OpenAI 系（DeepSeek/OpenAI/中转，`openai` SDK）与 Anthropic（Claude，`anthropic` SDK）。
  - 判定：`LLM_PROVIDER` 显式 > `ANTHROPIC_API_KEY` 存在→anthropic > 其它 key→openai。
  - openai：key=`LLM_API_KEY`||`DEEPSEEK_API_KEY`||`OPENAI_API_KEY`，base_url 默认 `https://api.deepseek.com`，model 默认 `deepseek-chat`。
  - anthropic：key=`ANTHROPIC_API_KEY`||`LLM_API_KEY`，model 默认 `claude-haiku-4-5-20251001`。
- **配置来源**：`.env`（gitignore，`python-dotenv` 启动自动加载）> 环境变量 > CLI flag（`--max-llm`/`--no-llm`）。
- **降级**：无 key → 纯规则 + `low_confidence` 标记，仍能出 HTML（R3/R4 的"可选增强"语义）。
- **成本控制**：`--max-llm N` 限制调用次数（每低置信题一次）；`_llm_refine` 仅对 `low_confidence` 题触发。
- **Prompt 要点**：喂 block 原文 + 数据契约 schema，要求只输出符合 schema 的 JSON；provider 无关。

## 7. 渲染层
- **单文件自包含 HTML**：题库 JSON 以 `<script type="application/json">` 内嵌；CSS/JS 全内联；KaTeX 仅在检测到 LaTeX 时内联（否则不发）。
- **答题引擎（原生 JS）**：按 type 渲染单选(radio)/多选(checkbox)/填空(text input)；提交→计分；乱序开关；localStorage 存「上次作答+进度」；一键「重做」（清空作答、可重新乱序），无限次。
- **低置信度 UI**：`low_confidence` 题目加 ⚠️ 边框 + 「解析存疑，请核对」。
- **数学**：题干按 UTF-8 原样渲染（`x⁴` 等原生显示）；检测 `$...$`/`\(...\)` 才走 KaTeX。

## 8. CLI
```
quizforge <input>                      # 必填：.docx/.pdf/.txt
  -o, --output <path>                  # 默认：<input>.html
      --interactive                    # 低置信题目逐题人工确认
      --keep-explanation               # 保留「解析」为折叠块（默认丢）
      --no-llm                         # 强制纯规则、不调 LLM
      --shuffle / --no-shuffle         # 生成时是否默认乱序（前端也可切）
```

## 9. 测试策略（TDD）
- 每层先写测试再实现（Iron Law）。
- **Golden file 测试**：`./data/数据库原理题库.docx`（干净）→ 期望 JSON 快照，锁住解析正确性。
- **脏样本回归**：`./data/2026年重点复习题库.docx` → 验证「选项 Tab 切分 / 无题号识别 / 大题滤除 / 内联+解答双答案」。
- 渲染：JSON → 断言 HTML 含期望元素（选项数、填空框、计分区）。
- **Manual QA**：`quizforge ./data/数据库原理题库.docx` → 打开 HTML → 实际答题核对（Gate 5 零妥协）。
