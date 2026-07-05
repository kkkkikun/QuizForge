# React 前端整合 + GitHub Pages 自动部署

## Context
当前 QuizForge 的渲染层是单文件 vanilla HTML（`render.py`），功能够用但 UI 朴素。另有一个参考项目 `database-quiz-app`（React 19 + TS + Vite + Tailwind v4）前端精致（题目导航矩阵、逐题即时锁定判分、填空容错匹配），但只为单一题库定制、数据硬编码。本变更把二者整合：**采用参考项目的 React 前端，保留 QuizForge 的解析核心**，并加 CI 自动部署到 GitHub Pages。

## What Changes
- `frontend/` 子目录：迁入清理后的 React 应用（去 AI Studio 残留：metadata.json、genai/express 依赖、Gemini .env）
- 数据转换器（Python）：QuizForge `Quiz JSON` → React `Question[]`（字段映射、选项 dict→带前缀 array、答案拆分、填空 `[答案]` 注入题干）；生成 `frontend/src/data.ts`
- React 扩展多选：`type` 联合加 `multiple` + 复选 UI + 集合判等
- `.github/workflows/deploy.yml`：push → `npm ci && npm build` → upload-pages-artifact → deploy-pages
- 保留 QuizForge 核心（CLI/ingest/parse/llm）与 `render_html` 单文件输出（离线次选）；现有 `ci.yml`（pytest）不动

## Out of Scope
- 不在 CI 里跑 quizforge 解析（数据本地生成后提交；CI 只构建部署）
- 不做错题本/随机练习/模拟测试（参考项目 types 里有但未实现，不引入）
- 不做多题库选择器（先部署单一题库；后续可加）

## 数据来源（决策已定）
提交生成好的 `frontend/src/data.ts`（由 `quizforge --react` 从 NET 样本生成），CI 只 build+deploy。
