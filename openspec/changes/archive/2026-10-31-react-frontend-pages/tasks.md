# 任务清单：React 前端整合 + Pages 部署

> 状态：**已完成**（前端已上线并持续迭代；追溯矩阵全 ✅）。

## P0 前端迁入
- [x] T1 复制 database-quiz-app → `frontend/`；清理 metadata.json / Gemini .env / package.json 里 genai+express+dotenv+tsx / server.js 残留
- [x] T2 `vite.config.ts` base → `/QuizForge/`；确认 `npm ci && npm run build` 出 `dist/`

## P1 数据转换器
- [x] T3 `quizforge/reactfmt.py`：`to_react_questions(quiz)->list` + 单测（字段映射/选项前缀/blank stem 注入/multiple/accepted 合并/tags）
- [x] T4 data.ts 写出器 + CLI `--react-frontend <DIR>`（清单驱动的多题库模式；早期单库 `--react <path>` 仍保留）；生成 `frontend/src/data.ts`（QUIZZES 清单）并提交

## P2 React 多选
- [x] T5 `types.ts` 加 `'multiple'`；`PracticeSession.tsx` 复选 UI + 集合判等 + "核对答案"按钮；Dashboard 网格兼容

## P3 CI 部署
- [x] T6 `.github/workflows/deploy.yml`（npm build + upload-pages-artifact + deploy-pages，permissions/concurrency/environment）
- [x] T7 README 加「在线 demo / 前端工程 / 如何更新数据」段

## P4 验证
- [x] T8 本地 `npm run build` 通过；`ci.yml` 绿；`deploy.yml` 首跑成功；render_html 单文件回归；Manual QA Pages 实答

> 注：2026-10-25 的 v0.2.0 批次引入 eslint error，线上 CI 的 `frontend` job 自此停在 Lint 步骤（后续 vitest/E2E/Build 全部 skipped）；2026-10-31 已本地修复并加固门禁，尚未推送。

## 需求可追溯矩阵
| 需求 | 任务 | 状态 |
|------|------|------|
| R1 React 前端集成（frontend/ + 清理 + base path） | T1,T2 | ✅ |
| R2 多选题支持 | T5 | ✅ |
| R3 数据转换器（Quiz JSON→React） | T3 | ✅ |
| R4 data.ts 生成（CLI --react-frontend + quizzes.yaml 清单） | T3,T4 | ✅ |
| R5 GitHub Pages CI 自动部署 | T6 | ✅ |
| R6 保留 QuizForge 核心 + render_html | T8 | ✅ |
| R7 文档（demo/前端/更新数据） | T7 | ✅ |
