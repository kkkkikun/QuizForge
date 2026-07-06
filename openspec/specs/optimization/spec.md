## Purpose

记录 QuizForge 已知优化点与技术债，按优先级持续改进。

## Requirements

### Requirement: 已知限制（待用户确认/数据驱动）

这些项需更多输入或场景才能优化，记此备查。

#### Scenario: 十五选十章节无答案

- **WHEN** 大英四.docx 的「十五选十」节（Unit 下完整英文句子）
- **THEN** 无高亮、无答案序列 → 当前产出 0 题；需用户提供该节的答案标记格式才能适配。优先级：中（看用户是否需要）

#### Scenario: 深链 HTTP 404

- **WHEN** 直接访问 `/quiz/:id`
- **THEN** 浏览器可见但 HTTP 状态 404（Pages SPA 限制）。优先级：低（功能不受影响；要真 200 需换 Vercel/Netlify）

#### Scenario: 阅读文章正文不在 group 题面

- **WHEN** 阅读仔细阅读 group
- **THEN** 当前题面只含段落标题 + 5 题，**不含文章正文**（避免题面过长）。优先级：低（背答案场景够用；若要阅读理解式答题需补正文）

### Requirement: 功能缺口（明确待办）

#### Scenario: 图片/图表抽取

- **WHEN** 题目含图（如网络拓扑、电路图）
- **THEN** 当前占位丢弃（`[图片]`）；未抽取。优先级：中

#### Scenario: 扫描版 PDF

- **WHEN** PDF 为纯图片（无可提取文本）
- **THEN** 抛 `ScannedPdfError` 提示需 OCR；未实现 OCR。优先级：低

#### Scenario: 答案 key 区映射

- **WHEN** 文档答案在独立「答案区」（非内联、非高亮、非序列）
- **THEN** 未实现按题号映射回题目。优先级：中（NET 类文档当前靠 LLM 补答案）
