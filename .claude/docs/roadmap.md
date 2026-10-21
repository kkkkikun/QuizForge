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
| M3 | 解析泛化（可持续穿插） | ✅ 工程完成（陌生文档验收 **1/3**） | 2026-10-21 |
| M4 | 推广启动 | ✅ 代码侧完成（真实推广为持续运营动作） | 2026-10-21 |
| M5 | 工具化分发 | ✅ 浏览器版上线 / PyPI 就绪待发布 | 2026-10-21 |

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

## M3：解析泛化——去个人化（3–4 周，可与 M1/M2 穿插）✅ 工程完成 2026-10-21

要吃下别人发来的任意文档，解析层必须摆脱"只认自己的三份样本"。

- [x] **答案 key 区映射**（技术债最高价值项）：`参考答案` 节识别为 answer_key；`parse_answer_key` 支持题号对（`1.B 2、AC`）、区间字母（`1-5 BCADC`，长度校验防误读）、文本值（填空）；`apply_answer_key` 按题号回填（答案不在选项则维持存疑），确定性来源优先于 LLM。Question 契约新增 `num` 字段（golden 已复查重生成，去 num 后与旧快照全等）
- [x] **解析失败诊断**：`parse.diagnose_blocks` 输出分节/候选/滤噪报告 + 支持形态说明；CLI 0 题时自动打印，`--diagnose` 随时可用
- [x] **模式积累机制**：`tests/test_validate.py` 的真实数据门禁从写死 3 题库泛化为 **data/ 全量扫描**——每收到新文档存入 `data/` 即自动受检（parse 不崩 + 校验无 ERROR）
- [x] 勘查结论：**十五选十维持阻塞**（大英四文档缺词库与答案标记，仅句子片段，需格式样本）；NET 文档无答案区（LLM 推理是当时唯一途径，留存 JSON 仍有效）
- [ ] 酌情（未排期）：图片抽取（base64 内嵌）、阅读正文入 group 题面、扫描 PDF OCR

**验收**：pytest 135 全绿；诊断输出实测可用（模拟怪文档演练）。**「3 份陌生文档」验收天然挂接 M4 收文档活动**——每收到一份即入 data/ 受检并反哺 patterns。

### M3+ 首份陌生文档实战（01-pptx.docx → thermal 题库，2026-10-21）

PPT 转 Word 形态的「热物理在工程技术中的应用」，验收流程完整走通并反哺了解析层：

- **丢 A 标签恢复**：PPT 转换常丢首选项标签（`40%      B. 50%…`）——首选项非 A 且标记前有短文本（≤40 字）时恢复为 A；长前缀则识别为与选项同块的内联题干
- **回退组 ≥2 门槛**：PPT 知识段落累积触发组题误产（4 个垃圾单题组）——回退组需 ≥2 道候选才成立（单题解散），CET 显式上下文组（`group_ctx`）豁免
- **组内子题 LLM 补答**：修复「LLM 补答只处理顶层题、不进组内子题」缺口
- **dict_to_quiz 丢 sub_questions**：契约逆函数不完整（此前 JSON 源无组题从未暴露），留存 JSON 走校验关卡时被拦下，已修 + 往返测试
- **验收数据**：thermal 题库 9 题（7 单选 + 1 组 + 1 填空）上线，仅 1 道 rescued 填空存疑（源文档无答案区，LLM 补答 8 道）；docx 入 data/ 作回归样本
- 进度：陌生文档验收 **1/3**

## M4：推广启动（1 周准备 + 持续运营）✅ 代码侧完成 2026-10-21

M0–M2 完成、M3 有初步泛化后启动。

- [x] README 分层重写：使用者视角（网址/怎么刷/反馈/请求题库/隐私）与开发者视角（管线/CLI/质量把关/约定）分离
- [x] 站点截图入 README（chrome-headless-shell 实拍首页/面板/移动端/转换页四张，docs/）
- [x] 顺手修 HomePage 题库卡片「选择」计数不含 group 的口径不一致（cet4 曾显示"选择 0"）
- [x] 访问计数（GoatCounter）**评估决策：不加**——与零后端/隐私优先定位冲突，推广信号先用 GitHub Issues 量与新题库请求量衡量；有强需求再议
- [ ] **持续运营（真实动作，非代码）**：找 5–10 位同学试用收文档；校内渠道传播；以 Issue 数/请求量为指标复盘

## M5：工具化分发——第二曲线 ✅ 2026-10-21（PyPI 发布待用户操作）

- [x] **方案 A（推荐，已上线）：Web 上传 + 浏览器内转换**——`/convert` 页面（Beta）：
  - `quizforge/browser_ingest.py`：纯 stdlib docx 提取器（zipfile + ElementTree，含 styles.xml 样式名映射、VML textbox 剔除），与 python-docx 在 data/*.docx 全量**逐块一致**（pytest 参数化测试）
  - `scripts/build_browser_bundle.py` → `frontend/public/quizforge_py/`（7 个纯 Python 模块，改核心后重跑）
  - `src/lib/convert.ts`：Pyodide 桥（FS 写入 bundle+文件 → 摄取→解析→校验→渲染），依赖可注入
  - 与 CLI 同语义：校验关卡 error 拒出 HTML（可下载 JSON 走 CLI `--review`）、0 题出诊断报告、LLM 不参与（BYOK 策略）
  - **vitest + npm pyodide 真实集成测试**（node 环境）：大英四.docx → 32 题与 Python 侧一致 / txt / 0 题诊断 3 例；浏览器端 chrome-headless-shell 实拍验证渲染
  - PDF 不支持（页面提示用 CLI）；Pyodide 引擎走 CDN（首访需联网，之后浏览器缓存）
- [x] **方案 B（就绪待发布）：PyPI**——包元数据/classifiers/urls 补全；sdist 瘦身（3.1MB→31KB，排除 data/frontend 等）；`publish.yml`（手动触发或 v* 标签，OIDC trusted publishing）；`uv build` 验证通过。**首次发布需用户在 PyPI 侧配置 publisher 后打 tag**
- [x] 明确不做：自建后端转换服务

**验收**：陌生人不上 GitHub、不装 Python，打开网页上传自己的 docx 就能拿到题库网页——已达成（Pyodide 集成测试 + 实拍验证；线上真实设备使用随推广观察）。

---

## 跨阶段工程纪律

- 每个里程碑走 openspec 变更流程（`/opsx:propose` → `/opsx:apply` → `/opsx:archive`）
- TDD 先测后码；M0 建立的数据校验关卡为永久 CI 门禁
- 每份新真实文档都进 `data/` 回归样本库
- 每完成一个里程碑回写本文件的状态跟踪表
