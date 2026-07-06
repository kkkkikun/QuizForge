## Purpose

QuizForge 的编码规范与开发流程（整合 Karpathy / 务实编码 / Workflow Designer + 项目铁律）。

## Requirements

### Requirement: TDD 先测后码

任何解析/转换逻辑变更先写测试（含 golden 快照），见 RED 再实现，见 GREEN 再提交。

#### Scenario: 改解析逻辑

- **WHEN** 修改 ingest/parse/reactfmt
- **THEN** 先更新或新增测试，`uv run pytest` 全绿后才提交；golden 变化需人工复查后重生成

### Requirement: Surgical Changes

只改必须改的，不顺手"改进"相邻代码；改动可追溯到用户请求。

#### Scenario: 修一个 bug

- **WHEN** 修复某问题
- **THEN** 不重构未坏的代码、不改无关风格；注意到无关死代码只提及不删除

### Requirement: 提交不加共同创作者

git 提交信息**不加** `Co-Authored-By`、**不设**共同创作者。

#### Scenario: 写提交信息

- **WHEN** 任何 git commit
- **THEN** 提交体只含变更说明，不以任何形式标注 Claude/AI 为 co-author

### Requirement: 命名清晰、函数单一职责

标识符揭示意图（不缩写）；函数 < 20 行、只做一件事、无副作用。

#### Scenario: 新增函数

- **WHEN** 编写新函数
- **THEN** 名称说清做什么；超 20 行或做多件事则拆分

### Requirement: 验证铁律

声明"完成/通过"前必须展示命令输出片段，禁用"应该/大概/似乎"。

#### Scenario: 声明测试通过

- **WHEN** 说"测试通过"
- **THEN** 展示 `uv run pytest` 的 `N passed` 输出；无证据不得声明

### Requirement: 数据契约为唯一中间表示

层间通信只走 `Quiz JSON`（见 architecture），不跨层传内部结构。

#### Scenario: 渲染层取数

- **WHEN** 前端/渲染需要题目
- **THEN** 只消费 `Quiz JSON`（或其 React 变体），不直接调 ingest/parse 内部
