# Tasks — QuizForge 全局任务

> 与 `openspec/changes/*/tasks.md` 同步；此处为高层视图。

## 进行中

（无）→ 下一步：M4 推广启动（找同学收文档 + README 分层重写，见 `roadmap.md`）；M3 泛化随收到的文档持续反哺

### 遗留（小项）

- [ ] 真机过一遍移动端主流操作（滑题/底部栏/组题）+ Lighthouse 移动端可用性复核（M1）
- [ ] 错题反馈按钮在真实 GitHub 页面的预填效果复核（需 push 后验证，M2）
- [ ] **十五选十**：大英四文档缺词库与答案标记（勘查确认），需格式样本才能适配（M3）
- [ ] M3 陌生文档验收：≥3 份他人文档成功产出题库（**已 1/3**：thermal 热物理，2026-10-21）

## 待办 / 待确认

> 长程规划见 `.claude/docs/roadmap.md`（M0–M5）；以下为按里程碑挂接的任务。

### 已登记技术债

- [x] 答案 key 区映射（M3 完成：answer_key 节识别 + 按题号回填，免 LLM）
- [x] 解析失败诊断输出（M3 完成：diagnose_blocks + `--diagnose`）
- [ ] **十五选十章节**：勘查确认大英四文档缺词库与答案标记 → 需格式样本才能适配
- [ ] 图片/图表抽取（题目含图时占位丢弃，未抽取）——酌情
- [ ] 扫描版 PDF OCR 支持——酌情

### 数据源已知缺陷（warning 级，源文档问题，随手修）

- [ ] 大英四匹配题答案序号重复 ×2（题 72/75，需对源文档核对）
- [ ] net 题 47 仅 2 个选项（源文档缺项）

## 近期完成

- [x] **M3+ 首份陌生文档实战**（2026-10-21）：01-pptx.docx → thermal 题库上线（9 题）；反哺解析层 4 项——丢 A 标签恢复、内联题干、回退组 ≥2 门槛（CET 组豁免）、组内子题 LLM 补答；顺带修复 dict_to_quiz 丢 sub_questions
- [x] **M3 解析泛化**（2026-10-21）：答案 key 区映射（answer_key 节 + 题号回填，免 LLM）+ 解析失败诊断（diagnose_blocks/--diagnose）+ data/ 全量回归门禁 + Question 契约新增 num 字段
- [x] **M2 站点可运营化**（2026-10-21）：错题反馈通道（预填 GitHub Issue）+ 错题本卷 + 关于/隐私页 + `scripts/add_quiz.py` 题库流水线 + Issues 模板
- [x] **M1 移动端答题体验**（2026-10-21）：vitest 测试基建（24 测试）+ 判分库 `lib/grading.ts` + PracticeSession 按题型拆分 + 底部操作栏/横滑切题/触控目标 + PWA（离线刷题）+ eslint + CI 前端流水线
- [x] **M0 还债 + 数据质量关卡**（2026-10-21）：CET 裸标题分组 bug、组名标题行化、前端空卷白屏、strict + @types、`validate.py` 发布校验关卡（error 拒绝生成，真实题库门禁进 CI）、LLM 废题组装时丢弃、双路径去重（net 70→68）
- [x] 推广路线图确立（`.claude/docs/roadmap.md`：M0–M5，中心化站点 → 工具化分阶段）
- [x] 多题库站点（首页 + /quiz/:id，quizzes.yaml 清单）
- [x] CET 题库：黄色高亮=答案 + 匹配题（文章+陈述题面，填数字串）
- [x] group 题型：听力/阅读/综合 一组一屏
- [x] 每组「重做本组」按钮
- [x] React 前端 + GitHub Pages CI 自动部署
- [x] LLM 双 provider（OpenAI 系 + Anthropic）+ --review/--json/--react
- [x] QuizForge MVP（摄取→规则解析→单文件 HTML）

## 阻塞项

（无）
