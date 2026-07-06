## Purpose

记录 QuizForge 的后端/前端依赖与外部参考资源（database-quiz-app、ai-engineer-workflow skill），确保依赖可追溯、资源可获取。

## Requirements

### Requirement: 后端依赖登记

Python 依赖 MUST 登记于本 spec 的依赖表（名称/用途），经 `uv add` 引入。

#### Scenario: 新增后端依赖

- **WHEN** 引入新 Python 依赖
- **THEN** MUST `uv add` 并在后端依赖表登记用途

### Requirement: 前端依赖登记

frontend/ 子工程依赖 MUST 登记于本 spec 的依赖表，经 `npm install` 引入。

#### Scenario: 新增前端依赖

- **WHEN** 引入新前端依赖
- **THEN** MUST `npm install` 并在前端依赖表登记用途

### Requirement: 外部参考登记

重要的外部参考（上游项目、工作流 skill）MUST 登记链接与关键摘要。

#### Scenario: 引用外部资源

- **WHEN** 参考了上游项目或重要外部资源
- **THEN** MUST 登记名称/链接/摘要于本 spec

## 后端依赖

| 依赖 | 用途 |
|------|------|
| python-docx | .docx 摄取（段落/表格/高亮，按文档顺序） |
| pdfplumber | .pdf 摄取 + 扫描版检测 |
| openai | OpenAI 兼容 LLM（DeepSeek/OpenAI/中转） |
| anthropic | Anthropic Claude（A社） |
| python-dotenv | 启动加载 .env |
| pyyaml | 读 frontend/quizzes.yaml |
| pytest / fpdf2 | 测试 + PDF 夹具（dev） |

## 前端依赖

| 依赖 | 用途 |
|------|------|
| react / react-dom | UI 框架（v19） |
| vite + @vitejs/plugin-react | 构建 |
| @tailwindcss/vite + tailwindcss | 样式（v4） |
| react-router-dom | 多题库路由 |
| lucide-react / motion | 图标 / 动效 |

## 外部参考

- 前端源自 [database-quiz-app](https://github.com/kkkkikun/database-quiz-app)（已清理 + 扩展多选/多题库/group）
- 工作流：`ai-engineer-workflow-v5-ulw` skill（Karpathy 监察 / TDD / Gate）
