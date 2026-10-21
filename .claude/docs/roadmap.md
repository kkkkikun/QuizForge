# Roadmap — QuizForge 推广路线图

> 最近更新：2026-10-21 · 目标：从个人工具走到可推广给他人使用
> 节奏：课余细水长流（每周数小时），总周期约 3.5–5 个月；每个里程碑可独立交付、随时可停。

## 推广策略（两阶段）

1. **第一阶段（M0–M4）：中心化站点** — 同学把复习文档发给你，你生成后挂到 Pages 站点上供大家刷。做好移动端体验、题库生产流水线、错题反馈通道。
2. **第二阶段（M5）：工具化分发** — 把转换能力交到别人手里（浏览器端转换为推荐路线），陌生人不上 GitHub、不装 Python 也能用自己的文档生成题库。

**已定方向**：移动端优先（同学用手机刷题）；LLM 保持可选 + 默认关（BYOK，不向用户暴露 key 概念）。

## 状态跟踪

| 里程碑 | 主题 | 状态 | 完成时间 |
|--------|------|------|----------|
| M0 | 还债 + 数据质量关卡 | ✅ 已完成 | 2026-10-21 |
| M1 | 移动端答题体验 | ✅ 代码完成（真机/Lighthouse 验收待做） | 2026-10-21 |
| M2 | 站点可运营化 | ✅ 已完成（真机试用验收待做） | 2026-10-21 |
| M3 | 解析泛化（可持续穿插） | 未开始 | |
| M4 | 推广启动 | 未开始 | |
| M5 | 工具化分发 | 未开始 | |

```
M0 还债+质量关卡 → M1 移动端体验 → M2 运营化+反馈通道 → M4 推广启动
                        ↕ 可穿插        ↕ 可穿插
                     M3 解析泛化 ————————————————————→ M5 工具化
```

---

## M0：还债 + 数据质量关卡（1–2 周）✅ 2026-10-21

一切推广的前提：推广出去的内容不能有错。

- [x] **修 CET 组题合并 bug**：`patterns.py` 的 `CET_SUBCONTEXT_RE` 只匹配带数字的 `Conversation 1`，裸 `Conversation`/`Passage` 标题不更新上下文 → cet4 有 4 个 10+ 子题巨型组（data.ts id 6/20/37/53）。泛化正则使任意上下文标题行都重置分组，补 pytest 用例
- [x] **修组题干截断**：`parse.py` 的 `pending[0][:30]` 导致组名半句截断（如 "The tide of change: Embracing "）；新增 `_pick_group_name`——题前短标题行（≤60 字）整行取用，无标题时按词边界截断加省略号
- [x] **修前端白屏崩溃**：db 题库无填空题时 Dashboard 切"填空"tab 开练 → `questionsList[currentIndex]` undefined（`PracticeSession.tsx`）。双保险：组件空卷兜底 UI + Dashboard 空卷禁用开始按钮
- [x] **修 `bg-slate-905` 无效类**（`PracticeSession.tsx`，改 `bg-slate-50`）
- [x] **清死类型**：`QuizSession` / `WrongQuestionItem` / `UserStats`（types.ts，全项目零使用）
- [x] **tsconfig 开 `strict`** 并修随之而来的类型错误；顺带补装缺失的 `@types/react`/`@types/react-dom`（此前 react 全靠隐式 any）
- [x] **★ 建立「生成物校验关卡」（核心）**：新增 `quizforge/validate.py`（error 阻断 / warning 提示），接入 `cli.py`（退出码 4）与 `reactfmt.build_react_quizzes`（QuizValidationError）；`tests/test_validate.py` 对三个真实题库跑门禁进 CI。上线即抓到真问题：LLM 兜底产出的无选项废题此前静默流入 HTML，现于组装时丢弃（`_is_unrenderable`，计入 `ignored["invalid"]`）
- [x] **重复题去重**：`parse.dedup_questions`（题型+题干+选项+答案全等）覆盖 parse 与 reactfmt 的 JSON 加载双路径；net 题库 70→68 题

**验收结果**：pytest 126 全绿 + `npm run lint`（strict）/`build` 通过；重新生成 data.ts——cet4 28 组无巨型组、组名完整、重复题清零，剩余 3 条 warning 均为已知源文档缺陷（2 处匹配答案序号重复、1 处 2 选项题）。

## M1：移动端答题体验（3–4 周）✅ 2026-10-21（真机/Lighthouse 验收待做）

同学用手机刷题是核心场景，前端投入的大头。

- [x] **测试基建先行**：vitest(jsdom) + @testing-library/react + jest-dom；覆盖 `checkBlankAnswer` 12 场景、`gradeQuestion` 统一判分 7 场景、`renderQuestionStem` 空位渲染、GroupQuestion 点选锁/整组保存/重做交互
- [x] **PracticeSession 拆分**：判分逻辑抽为 `src/lib/grading.ts`（答题页与统计页共用口径，消除 Dashboard 重复实现）；`question/{Choice,Multiple,Blank,Group}Question` 组件；PracticeSession 只留编排（565 行 → ~230 行）
- [x] **移动端优先重设计**：底部 sticky 操作栏（44px 触控目标 + `env(safe-area-inset-bottom)` 安全区）、答题卡横滑切题手势（≥60px 且横向占优，输入框内不触发）、筛选 tab/返回按钮触控目标加大、viewport-fit=cover
- [x] **PWA 支持**：vite-plugin-pwa（autoUpdate）+ Pillow 生成 192/512/maskable 图标；「添加到主屏幕」后离线刷题
- [x] **接入 eslint**（flat config：typescript-eslint + react-hooks v7 + react-refresh）；`lint = tsc strict + eslint`，并顺手消除了 QuizPage effect 内 setState（改 key 重挂载 + 惰性初始化）
- [x] 加分项：ci.yml 新增 frontend job（lint + vitest + build）

**验收**：pytest 126 全绿 + `npm run lint`（strict+eslint）零报错 + 24 前端测试全过 + build 含 PWA 预缓存。**待办**：真机过一遍主流操作、Lighthouse 移动端可用性 ≥90 复核。

## M2：站点可运营化（2–3 周）✅ 2026-10-21

让别人用起来的"最后一公里"。

- [x] **★ 错题反馈通道（运营生命线）**：答题卡"这道题有问题？"按钮 → 预填 GitHub Issue（`lib/issue.ts` 构造 URL，字段 id 与 `.github/ISSUE_TEMPLATE/question-error.yml` 对齐，含题库 id/题号/题干摘要）
- [x] **错题本**：`collectWrongQuestions` 由答题记录实时推导（零额外存储）；Dashboard 新增「错题」卷；练习列表进入时快照（重做答对不影响本次列表）
- [x] **关于/使用说明页**：`/about` 路由——是什么/怎么用/隐私声明（进度只存本机 localStorage、不上传数据）/请求新题库与反馈入口/开源地址；首页 footer 挂入口
- [x] **题库生产流水线脚本化**：`scripts/add_quiz.py`——校验 id/源文件 → 复制入 `data/` → `reactfmt.append_manifest` 登记（id 冲突拒绝）→ 生成 data.ts（过校验关卡）→ 打印提交命令；`append_manifest` 带 pytest
- [x] **Issues 模板**：题库纠错 / 新题库请求 / 功能建议（YAML forms，禁空白 Issue）

**验收**：pytest 127 全绿（含 append_manifest）+ 前端 lint/27 测试/构建全过；用模拟文档**实际走通一次全流程**（登记 → 校验 → 生成 → 提交指引），演练产物已还原。待办：真实同学文档上线时复核一次。

## M3：解析泛化——去个人化（3–4 周，可与 M1/M2 穿插）

要吃下别人发来的任意文档，解析层必须摆脱"只认自己的三份样本"。

- [ ] **答案 key 区映射**（技术债最高价值项）：答案统一列文末的文档形态最常见，按题号映射回题目，让 NET 类文档免 LLM
- [ ] **解析失败诊断**：识别 0 题/极少题时输出人类可读诊断（识别到的结构样例 + 建议格式），不再静默
- [ ] **十五选十/选词填空**：等格式样本适配规则路径，或先走 `--llm-parse` 兜底路径
- [ ] **模式积累机制**：每收到新文档 → 存 `data/` 作回归样本 → 补 golden 快照 → 失败案例反哺 `patterns.py`，把泛化变成运营驱动的持续过程
- [ ] 酌情：图片抽取（base64 内嵌）、阅读正文入 group 题面、扫描 PDF OCR

**验收**：至少 3 份来自他人的陌生文档成功产出可用题库（校验关卡通过）。

## M4：推广启动（1 周准备 + 持续运营）

M0–M2 完成、M3 有初步泛化后启动。

- [ ] 找 5–10 位同学试用：请他们发复习文档，全流程陪跑收集反馈
- [ ] README 分层重写：使用者视角（只需知道网址 + 如何请求题库）与贡献者视角分离
- [ ] 站点加截图/预览图（README 占位一直空着）
- [ ] 校内渠道传播；以反馈 Issue 数 + 新题库请求量为推广指标
- [ ] （可选）无后端访问计数（如 GoatCounter），评估是否继续投入

## M5：工具化分发——第二曲线（4–8 周，依 M4 反馈决定启动）

把转换能力交到别人手里。

- [ ] **方案 A（推荐）：Web 上传界面 + 浏览器内转换**——Pyodide 打包 ingest/parse（纯规则，无 LLM），文档全程不上传（隐私卖点）；LLM 兜底改为用户自带 key 或导出 JSON 回本地 CLI 补。先做工作量评估再定 Pyodide 或渐进重写
- [ ] **方案 B（并行小成本）：PyPI 发布** `quizforge` CLI（uv build），面向有 Python 环境的进阶用户
- [ ] LLM 默认关、BYOK；仅处理教育用途文档的使用条款
- [ ] 明确不做：自建后端转换服务（服务器成本与滥用问题不划算）

**验收**：陌生人不上 GitHub、不装 Python，打开网页上传自己的 docx 就能拿到题库网页。

---

## 跨阶段工程纪律

- 每个里程碑走 openspec 变更流程（`/opsx:propose` → `/opsx:apply` → `/opsx:archive`）
- TDD 先测后码；M0 建立的数据校验关卡为永久 CI 门禁
- 每份新真实文档都进 `data/` 回归样本库
- 每完成一个里程碑回写本文件的状态跟踪表
