## Purpose

记录 QuizForge 已知优化点与技术债（十五选十未识别、深链 404、阅读正文未入题面、图片/OCR），按优先级持续改进。已实现的优化（答案 key 区映射、解析诊断、PPT 形态适配等）随实现从本 spec 移除。

## Requirements

### Requirement: 已知限制登记

需更多输入或场景才能优化的限制项 MUST 登记于本 spec，标注当前影响、建议方案与优先级。

#### Scenario: 十五选十章节无答案

- **WHEN** 大英四.docx 的「十五选十」节（勘查确认：仅句子片段，15 词词库与答案标记缺失，疑似在丢失的图片中）
- **THEN** 当前产出 0 题；需用户提供完整格式样本才能适配。优先级：中

#### Scenario: 深链 HTTP 404

- **WHEN** 直接访问 `/quiz/:id` 或 `/convert`
- **THEN** 浏览器可用但 HTTP 404（Pages SPA 限制）。优先级：低（要真 200 需换 Vercel/Netlify）

#### Scenario: 阅读正文不在 group 题面

- **WHEN** 阅读仔细阅读 group
- **THEN** 题面只含段落标题 + 子题，不含文章正文（避免过长）。优先级：低

### Requirement: 功能缺口登记

明确待办的功能缺口 MUST 登记于本 spec 并标优先级。

#### Scenario: 图片/图表抽取

- **WHEN** 题目含图
- **THEN** 当前占位丢弃；未抽取。优先级：中

#### Scenario: 扫描版 PDF

- **WHEN** PDF 为纯图片
- **THEN** 抛 `ScannedPdfError` 提示需 OCR；未实现。优先级：低

#### Scenario: 浏览器版 PDF 支持

- **WHEN** 在 `/convert` 页面上传 PDF
- **THEN** 提示不支持（pdfplumber 无法在 Pyodide 运行），引导用命令行版。优先级：低
