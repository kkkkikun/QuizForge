## ADDED Requirements

### Requirement: R1 React 前端集成
前端 MUST 为 `frontend/` 子工程（React 19 + Vite + Tailwind v4），MUST 清除 AI Studio 残留（metadata.json / Gemini .env / package.json 里 genai+express+dotenv+tsx / server.js）；`vite.config.ts` MUST 设 `base: '/QuizForge/'`。

#### Scenario: 构建产出 Pages 可用产物

- **WHEN** 在 `frontend/` 执行 `npm run build`
- **THEN** 产出 `dist/`，且构建脚本复制 `dist/index.html` 为 `dist/404.html`（Pages 深链回退）

### Requirement: R2 多选题
React `QuestionType` MUST 含 `'multiple'`；复选 UI + 集合判等 + 「核对答案」提交 MUST 可用。

#### Scenario: 多选判分

- **WHEN** 用户勾选多个选项并提交核对
- **THEN** 以集合判等给对/错并即时上色

### Requirement: R3 数据转换器
`reactfmt.to_react_questions(quiz)` MUST 把 QuizForge Quiz JSON 映射为 React `Question[]`（type 改名/选项带前缀 array/答案按型拆分/填空题干注入 `[答案]`/accepted 合并/tags）。

#### Scenario: 字段映射

- **WHEN** 传入含单选/多选/填空/group 的 Quiz
- **THEN** 输出的 React 题目字段、选项前缀与答案形态与 React 组件契约一致

### Requirement: R4 data.ts 生成
CLI `--react-frontend DIR` MUST 读 `DIR/quizzes.yaml` 并写出 `DIR/src/data.ts`（QUIZZES 清单）；产物 MUST 过发布校验关卡，error 级问题拒绝生成。

#### Scenario: 清单驱动生成

- **WHEN** 修改 quizzes.yaml 后重新生成
- **THEN** data.ts 与清单一致；校验关卡 error 级问题拒绝生成

### Requirement: R5 Pages CI
`.github/workflows/deploy.yml` MUST 在 push master 时执行 `npm ci` → `npm run lint` → `npm test` → `npm run build`，再把 `frontend/dist` 部署到 GitHub Pages；lint/test 不通过 MUST 不部署。

#### Scenario: push 后自动上线

- **WHEN** push master
- **THEN** CI 构建 React 并部署 `frontend/dist` 到 Pages

### Requirement: R6 核心保留
QuizForge CLI / ingest / parse / llm 与 `render_html` 单文件输出 MUST 不被前端整合破坏；`ci.yml` MUST 保留 pytest 门禁。

#### Scenario: 单文件 HTML 仍可单独生成

- **WHEN** 不经前端直接运行 CLI
- **THEN** 仍产出可单独打开的单文件 HTML

### Requirement: R7 文档
README MUST 含在线 demo 链接、前端工程说明与数据更新流程。

#### Scenario: 新同学上手

- **WHEN** 新同学读 README
- **THEN** 能找到在线刷题入口、`frontend/` 工程启动方式与「怎么加自己的题库」的操作
