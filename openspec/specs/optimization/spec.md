## Purpose

记录 QuizForge 已知优化点与技术债（十五选十未识别、深链 404、阅读正文未入题面、图片/OCR/答案区映射），按优先级持续改进。

## Requirements

### Requirement: 已知限制登记

需更多输入或场景才能优化的限制项 MUST 登记于本 spec，标注当前影响、建议方案与优先级。

#### Scenario: 十五选十章节无答案

- **WHEN** 大英四.docx 的「十五选十」节（完整英文句子，无高亮/无答案序列）
- **THEN** 当前产出 0 题；需用户提供答案标记格式才能适配。优先级：中

#### Scenario: 深链 HTTP 404

- **WHEN** 直接访问 `/quiz/:id`
- **THEN** 浏览器可见但 HTTP 404（Pages SPA 限制）。优先级：低（要真 200 需换 Vercel/Netlify）

#### Scenario: 阅读正文不在 group 题面

- **WHEN** 阅读仔细阅读 group
- **THEN** 题面只含段落标题 + 5 题，不含文章正文（避免过长）。优先级：低

### Requirement: 功能缺口登记

明确待办的功能缺口 MUST 登记于本 spec 并标优先级。

#### Scenario: 图片/图表抽取

- **WHEN** 题目含图
- **THEN** 当前占位丢弃；未抽取。优先级：中

#### Scenario: 扫描版 PDF

- **WHEN** PDF 为纯图片
- **THEN** 抛 `ScannedPdfError` 提示需 OCR；未实现。优先级：低

#### Scenario: 答案 key 区映射

- **WHEN** 答案在独立「答案区」
- **THEN** 未实现按题号映射回题目（NET 类现靠 LLM）。优先级：中
