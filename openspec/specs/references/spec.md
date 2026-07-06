## Purpose

记录 QuizForge 的依赖与外部参考，确保可追溯。

## Requirements

### Requirement: 后端依赖

Python 依赖（pyproject.toml，uv 管理）。

| 依赖 | 用途 |
|------|------|
| python-docx | .docx 摄取（段落/表格/高亮，按文档顺序） |
| pdfplumber | .pdf 摄取 + 扫描版检测 |
| openai | OpenAI 兼容 LLM（DeepSeek/OpenAI/中转） |
| anthropic | Anthropic Claude（A社） |
| python-dotenv | 启动加载 .env（密钥） |
| pyyaml | 读 frontend/quizzes.yaml 多题库清单 |
| pytest / fpdf2 | 测试 + PDF 夹具（dev） |

### Requirement: 前端依赖

frontend/ 子工程（package.json）。

| 依赖 | 用途 |
|------|------|
| react / react-dom | UI 框架（v19） |
| vite + @vitejs/plugin-react | 构建 |
| @tailwindcss/vite + tailwindcss | 样式（v4） |
| react-router-dom | 多题库路由（首页 + /quiz/:id） |
| lucide-react / motion | 图标 / 动效 |

### Requirement: 外部参考

- 参考前端源自 [database-quiz-app](https://github.com/kkkkikun/database-quiz-app)（已清理 + 扩展多选/多题库/group）
- AI 工作流：`ai-engineer-workflow-v5-ulw` skill（Karpathy 监察 / TDD / Gate）

#### Scenario: 新增依赖

- **WHEN** 引入新依赖
- **THEN** 在对应表格登记（名称/版本/用途）；后端 `uv add`、前端 `npm install`
