# SNAPSHOT — QuizForge 项目状态

> 最近更新：2026-10-21（M0–M5 全阶段收官，PyPI v0.1.0 已发布）

## 项目结构

```
QuizForge/
├── quizforge/              # Python 核心
│   ├── cli.py              # CLI（--json/--review/--diagnose/--react-frontend）
│   ├── ingest.py           # 摄取 docx/pdf/txt → Block（python-docx 版，含 highlight）
│   ├── browser_ingest.py   # 纯 stdlib 摄取（Pyodide/浏览器版，与 ingest 逐块一致）
│   ├── parse.py            # 规则+LLM 解析 → Quiz（分节/选项/答案多策略/答案区映射/滤噪/分组/去重/诊断）
│   ├── llm.py              # LLM 兜底（OpenAI 系 + Anthropic，双 provider）
│   ├── validate.py         # 发布校验关卡（error 拒绝生成 / warning 提示）
│   ├── render.py           # 单文件 vanilla HTML 渲染（离线次选）
│   ├── reactfmt.py         # Quiz JSON → React data.ts（写出前过校验关卡；含 append_manifest）
│   ├── model.py            # Block / Question / Quiz 数据类
│   └── patterns.py         # 共享正则
├── frontend/               # React19+Vite+Tailwind+PWA 子工程（部署 Pages）
│   ├── quizzes.yaml        # 多题库清单（db/net/cet4/thermal）
│   ├── public/quizforge_py/# Pyodide bundle（7 个纯 Python 模块，scripts 生成）
│   └── src/…               # / · /quiz/:id · /about · /convert（浏览器内转换 Beta）
├── scripts/                # add_quiz 题库流水线 · build_browser_bundle
├── tests/                  # pytest + golden 快照 + data/ 全量回归门禁 + parity 测试
├── data/                   # 真实样本（含 PPT 形态热物理）
├── docs/                   # 站点截图
├── .github/                # ci(pytest+前端) · deploy(Pages) · publish(PyPI) · ISSUE_TEMPLATE
└── openspec/               # specs/（5 domain）+ changes/
```

## 技术栈

| 层 | 技术 |
|----|------|
| 后端 | Python 3.10+ (uv)；python-docx / pdfplumber / openai / anthropic / pyyaml |
| 浏览器端 | Pyodide + browser_ingest（纯 stdlib 提取器，/convert 页面，文件不上传）|
| 前端 | React 19 + Vite + Tailwind v4 + react-router-dom + PWA（vite-plugin-pwa）|
| 前端质量 | tsc strict + eslint + vitest(jsdom 30 测试，含 Pyodide 真实集成) |
| 测试 | pytest 146（含 golden + data/ 全量回归门禁）；frontend lint/test/build 进 CI |
| 部署 | GitHub Pages（deploy.yml，404.html 回退）；PyPI `quizforge-cli` v0.1.0 已发布（tag 触发 trusted publishing） |

## Git 状态

- 分支：`master`
- 远程：`origin` → https://github.com/kkkkikun/QuizForge
- 最近主线：MVP → LLM 双 provider → React 前端 + Pages CI → 多题库 → CET 高亮/匹配 → group 题型 → 推广路线图 M0–M5 全程（还债/校验关卡 → 移动端+PWA → 运营化 → 解析泛化+陌生文档实战 → README 分层/Lighthouse → 浏览器转换 /convert + PyPI v0.1.0 发布）（详见 `roadmap.md`）

## 关键契约

- **Quiz JSON**（`openspec/changes/quizforge-mvp/design.md §3.2`）：层间唯一中间表示（含 `num` 题号字段，答案区映射用）。
- **React data.ts**：`QUIZZES: Quiz[]`，每题 `{type: choice|multiple|blank|group, ...}`；group 带 `subQuestions`。
- **PyPI 分发名**：`quizforge-cli`（`quizforge` 被他人占用；导入包名/命令名仍为 `quizforge`）。
- **浏览器 bundle**：`frontend/public/quizforge_py/` 由 `scripts/build_browser_bundle.py` 生成，改核心纯 Python 模块后须重跑。
