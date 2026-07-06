# CLAUDE.md — QuizForge 文档索引

期末选填题速刷工具：Word/PDF 复习资料 →（规则 + LLM 兜底 + 滤噪）→ 题库 JSON → 单文件 HTML / React 前端（GitHub Pages）。

## 快速运行
```bash
uv sync                                         # 装依赖
uv run quizforge ./data/数据库原理题库.docx        # → 单文件 HTML（离线）
uv run quizforge --react-frontend frontend      # 多题库：读 frontend/quizzes.yaml → frontend/src/data.ts
uv run pytest                                   # 测试
```
LLM 兜底为**可选增强**（设 `LLM_API_KEY`/`DEEPSEEK_API_KEY` 启用；不配也能跑）。前端：`cd frontend && npm run dev`。

## 项目布局
```
quizforge/   cli / ingest / parse / llm / render / reactfmt / model / patterns
frontend/    React19+Vite+Tailwind（quizzes.yaml 清单；部署 Pages）
tests/       pytest + golden 快照（data/*.docx 为回归基线）
data/        真实样本（数据库原理 / 2026复习 / 大英四）
openspec/    specs/（5 domain）+ changes/（mvp / react-frontend-pages）
```

---

## 文档体系

### OpenSpec（需求/规范管理）

| 目录 | 用途 | 查询 |
|------|------|------|
| `openspec/specs/architecture/` | 架构决策（管线/契约/group/Pages） | `grep 关键词 openspec/specs/architecture/spec.md` |
| `openspec/specs/rules/` | 编码规范（TDD/Surgical/提交/契约） | `grep 关键词 openspec/specs/rules/spec.md` |
| `openspec/specs/learned/` | 踩坑与模式（python-docx/Pages/vite） | `grep 关键词 openspec/specs/learned/spec.md` |
| `openspec/specs/references/` | 依赖与外部参考 | `grep 关键词 openspec/specs/references/spec.md` |
| `openspec/specs/optimization/` | 已知优化点与技术债 | `grep 关键词 openspec/specs/optimization/spec.md` |
| `openspec/changes/` | 变更提案 | `openspec list` |

### 项目状态（日常维护）

| 文档 | 用途 |
|------|------|
| `.claude/docs/SNAPSHOT.md` | 项目状态快照（结构/技术栈/git） |
| `.claude/docs/tasks.md` | 全局任务（进行中/待办/阻塞） |

## 读取顺序

| 场景 | 读 |
|------|----|
| 开始新会话 | CLAUDE.md → SNAPSHOT.md → tasks.md |
| 写新功能 | rules/ + architecture/ + learned/ |
| 修 bug | rules/ + SNAPSHOT.md + learned/ |
| 改解析/数据契约 | architecture/（数据契约 §）+ quizforge-mvp/design.md |

## OpenSpec 命令

| 命令 | 用途 |
|------|------|
| `/opsx:propose` | 创建变更提案（proposal/specs/design/tasks） |
| `/opsx:apply` | 按 tasks.md 实施 |
| `/opsx:archive` | 归档完成变更 → specs/ |

---

## 开发约定

- **TDD**：先测后码；两份 `data/*.docx`（干净+脏）+ 大英四 是回归基线；golden 变化需人工复查后重生成。
- **数据契约**：`Quiz JSON`（层间唯一中间表示，见 `openspec/changes/quizforge-mvp/design.md §3.2`）。
- **解析**：不依赖题号；选项按 `A./B./C./D.` 切分；答案多策略（内联/高亮/答案序列）；大题/知识点必滤。
- **提交规范**：**不加 `Co-Authored-By`、不设共同创作者**。

## Red Flags
```
❌ 改动超出请求 → 回滚（Surgical）
❌ 无测试变更代码 → TDD 违规
❌ 声明通过却无输出证据 → 验证违规
❌ 提交含 Co-Authored-By → 提交规范违规
❌ 层间直传内部结构（绕过 Quiz JSON）→ 契约违规
```
