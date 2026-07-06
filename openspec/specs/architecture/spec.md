## Purpose

记录 QuizForge 的架构决策（ADR），指导后续技术选型与系统设计。

## Requirements

### Requirement: 三段管线 + 数据契约解耦

摄取 / 解析 / 渲染三段，层间只用 `Quiz JSON` 通信，互不依赖实现。

#### Scenario: 改动某一层

- **WHEN** 只改渲染层（如换前端框架）
- **THEN** 摄取与解析层零改动，只要仍产出符合契约的 `Quiz JSON`

### Requirement: 规则优先 + LLM 兜底

结构化解析以规则为主（确定性、离线、零成本），LLM 仅对规则判不定的残留块兜底。

#### Scenario: 无 LLM key

- **WHEN** 未配置 LLM_API_KEY
- **THEN** 仍能纯规则解析 + 标记存疑出 HTML/JSON，不阻塞

### Requirement: 格式即答案（CET 高亮）

答案若由文档格式标记（如黄色高亮、结尾答案序列），由 loader/规则层确定性读取，不交给 LLM 猜。

#### Scenario: 高亮选项

- **WHEN** 某选项被 `w:highlight=yellow` 标记
- **THEN** loader 提取该高亮，规则层将其定为答案（高置信），LLM 不参与

### Requirement: 强相关题分组（group 题型）

共享上下文（同一段音频/文章）的多题聚合为一个 group，一组一屏作答。

#### Scenario: 听力 News report

- **WHEN** 同一 Unit·News report 下有多道单选
- **THEN** 聚合成一个 group 题（组名=上下文，子题各自点选即锁）

### Requirement: 前端独立工程 + Pages 部署

React 前端为独立 `frontend/` 子工程，`npm build` 产物部署 GitHub Pages；深链靠 `404.html` 回退。

#### Scenario: 深链刷新

- **WHEN** 直接访问 `/quiz/:id`
- **THEN** Pages 返回 `404.html`（= 应用入口），浏览器渲染后路由到目标页（HTTP 404 但可见）
