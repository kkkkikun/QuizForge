# QuizForge MVP — 任务清单

> 状态：**MVP 完成**（53 测试全绿；两份真实样本 Manual QA 通过）。
> 标记：`[x]` 完成 / `[ ]` 待办。

## Phase 0 — 项目 Bootstrap ✅
- [x] T0.1 `git init` + `.gitignore` + `pyproject.toml`(uv) + entry `quizforge`
- [x] T0.2 deps（python-docx、pdfplumber、openai、pytest、fpdf2 测试夹具）
- [x] T0.3 包骨架 `quizforge/{cli,ingest,parse,llm,render,model,patterns}.py` + `tests/`
- [x] T0.4 README + CLAUDE.md 索引

## Phase 1 — 摄取层 Ingest ✅
- [x] T1.1 `model.py`：Block / Question / Quiz 数据类
- [x] T1.2 DOCX loader（body 顺序遍历，段落+表格+图片占位）
- [x] T1.3 PDF loader（pdfplumber，扫描版检测 → ScannedPdfError）
- [x] T1.4 TXT loader
- [x] T1.5 测试：两份 docx + PDF/TXT + 扫描版

## Phase 2 — 解析层 Parse ✅
- [x] T2.1 分节（Heading + 文本模式）
- [x] T2.2 候选识别（选项块为锚，不依赖题号）
- [x] T2.3 选项切分（A./B./C./D. 跨行/Tab 合并）
- [x] T2.4 答案抽取（内联括号多策略 + 行级）
- [x] T2.5 题型推断 single/multiple/blank
- [x] T2.6 滤噪（大题/计算/简答/解析/知识点/图片）→ ignored_summary
- [x] T2.7 LLM 兜底（可配置，无 key 降级）
- [x] T2.8 low_confidence 标记
- [x] T2.9 Quiz JSON 组装（parse_blocks 编排）
- [x] T2.10 测试：golden 快照（DB 48 题）+ 脏样本回归 + LLM mock

## Phase 3 — 渲染层 Render ✅
- [x] T3.1 单文件自包含 HTML（JSON 内嵌 + 内联 CSS/JS）
- [x] T3.2 答题引擎 JS（单选/多选/填空、计分、乱序、localStorage、无限重做；node --check 通过）
- [x] T3.3 数学（UTF-8 原样 + 检测 LaTeX→KaTeX CDN）
- [x] T3.4 低置信 ⚠️ 高亮 UI
- [x] T3.5 测试

## Phase 4 — CLI + 集成 ✅
- [x] T4.1 CLI 参数（-o/--interactive/--keep-explanation/--no-llm/--shuffle）
- [x] T4.2 端到端 ingest→parse→render→写文件
- [x] T4.3 鲁棒性（空文档/不支持类型/不存在文件 非零退出）
- [x] T4.4 Manual QA：DB（48 题/0 存疑）、NET（70 题/滤噪 essay×66 image×11 knowledge×56）

## 已知限制（后续版本）
- NET 类「答案非内联」文档：规则层标全存疑，需配 LLM_API_KEY 或补「答案 key 区映射」。
- 图片/图表不抽取（占位丢弃）；扫描版 PDF 不支持（需 OCR）。
- 每题解析默认丢弃（`--keep-explanation` 占位未接 UI）。

## 需求可追溯矩阵
| 需求 | 任务 | 状态 |
|------|------|------|
| R1 CLI | T0.1,T4.1,T4.2 | ✅ |
| R2 摄取 | T1.1–T1.5 | ✅ |
| R3 解析规则+LLM | T2.1–T2.9 | ✅ |
| R4 LLM 可配置/降级 | T2.7 | ✅ |
| R5 低置信标记 | T2.8,T3.4 | ✅ |
| R6 单文件 HTML | T3.1 | ✅ |
| R7 答题/计分/乱序/记忆/重做 | T3.2 | ✅ |
| R8 数学（UTF-8 + LaTeX→KaTeX） | T3.3 | ✅（已按真实数据调整） |
| R9 鲁棒性 | T4.3 | ✅ |
| R10 滤噪 | T2.6 | ✅ |
