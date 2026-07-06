# SNAPSHOT — QuizForge 项目状态

> 最近更新：2026-07-06

## 项目结构

```
QuizForge/
├── quizforge/              # Python 核心
│   ├── cli.py              # CLI 入口（--react / --react-frontend / --json / --review）
│   ├── ingest.py           # 摄取 docx/pdf/txt → Block（含 highlight）
│   ├── parse.py            # 规则+LLM 解析 → Quiz（分节/选项/答案/滤噪/分组/匹配）
│   ├── llm.py              # LLM 兜底（OpenAI 系 + Anthropic，双 provider）
│   ├── render.py           # 单文件 vanilla HTML 渲染（离线次选）
│   ├── reactfmt.py         # Quiz JSON → React data.ts（含 group/匹配）
│   ├── model.py            # Block / Question / Quiz 数据类
│   └── patterns.py         # 共享正则
├── frontend/               # React19+Vite+Tailwind 子工程（部署 Pages）
│   ├── quizzes.yaml        # 多题库清单（db/net/cet4）
│   └── src/{App, HomePage, QuizPage, Dashboard, PracticeSession, data, types}
├── tests/                  # pytest + golden 快照
├── data/                   # 真实样本（数据库原理 / 2026复习 / 大英四）
├── openspec/               # specs/（5 domain）+ changes/（mvp, react-frontend-pages）
└── .github/workflows/      # ci.yml（pytest）+ deploy.yml（Pages）
```

## 技术栈

| 层 | 技术 |
|----|------|
| 后端 | Python 3.10+ (uv)；python-docx / pdfplumber / openai / anthropic / pyyaml |
| 前端 | React 19 + Vite + Tailwind v4 + react-router-dom |
| 测试 | pytest（含 golden）；frontend tsc + vite build |
| 部署 | GitHub Pages（deploy.yml，404.html 回退） |

## Git 状态

- 分支：`master`
- 远程：`origin` → https://github.com/kkkkikun/QuizForge
- 最近主线：MVP → LLM 双 provider → React 前端 + Pages CI → 多题库 → CET 高亮/匹配 → group 题型 → 重做本组

## 关键契约

- **Quiz JSON**（`openspec/changes/quizforge-mvp/design.md §3.2`）：层间唯一中间表示。
- **React data.ts**：`QUIZZES: Quiz[]`，每题 `{type: choice|multiple|blank|group, ...}`；group 带 `subQuestions`。
