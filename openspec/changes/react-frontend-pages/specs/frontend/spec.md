# React 前端 + Pages 部署 — 增量规格

## 需求
- **R1 React 前端集成**：`frontend/` 子工程（React 19 + Vite + Tailwind v4），清理 AI Studio 残留；`vite.config.ts` 设 `base:'/QuizForge/'`。
- **R2 多选题**：React `QuestionType` 加 `'multiple'`；复选 UI + 集合判等 + "核对答案"提交。
- **R3 数据转换器**：`to_react_questions(quiz)` 把 QuizForge Quiz JSON 映射为 React `Question[]`（type 改名/选项带前缀 array/答案按型拆分/填空题干注入 `[答案]`/accepted 合并/tags）。
- **R4 data.ts 生成**：CLI `--react <path>` 写出 `frontend/src/data.ts`（`QUESTIONS` + `TITLE`）；提交 NET 样本产物。
- **R5 Pages CI**：`deploy.yml` 在 push master 时 `npm ci && npm run build` → 部署 `frontend/dist` 到 GitHub Pages。
- **R6 核心保留**：QuizForge CLI/ingest/parse/llm 与 `render_html` 单文件输出不破坏；`ci.yml` pytest 全绿。
- **R7 文档**：README 增补在线 demo 链接、前端工程说明、数据更新流程。

## 场景
- 😊 Happy：push → CI build React → Pages 上线；打开站点可答题、提交、看导航矩阵三色、填空容错匹配。
- 多选：复选项，"核对答案"后集合判等，对/错即时上色。
- 填空：题干 `[ ]` 作答前显虚线占位、作答后显绿块；大小写/括号缩写/`或`/`/` 容错。
- 数据更新：本地改源 → `quizforge <doc> --react frontend/src/data.ts` → commit → push → Pages 自动更新。
- 😣 Sad：base path 错 → 资源 404（vite base 固定 `/QuizForge/` 防护）；data.ts 缺失/非法 → build 失败（CI 报错）。
- ⚠️ Edge：QuizForge 多选/存疑题经转换后仍可答；`render_html` 单文件 HTML 仍可单独生成（离线）。
