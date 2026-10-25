# Changelog

本项目的显著变化记录于此。格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本遵循 [SemVer](https://semver.org/lang/zh-CN/)。

## [0.2.0] - 2026-10-25

### 新增

- **题目图片抽取**：docx 配图（png/jpg/gif/webp）base64 内嵌全链路——摄取/解析关联题目、单文件 HTML、React 答题页（含组题子题）、浏览器在线转换三端渲染；wmf 公式图自动过滤
- **浏览器在线转换**（`/convert`）：Pyodide 运行完整解析管线（文件不上传），支持 `.docx`/`.txt`/`.pdf（文字版）`；扫描版 PDF 提示转存 docx；与 CLI 同语义（校验关卡、0 题诊断）
- **模拟考试模式**：随机抽题（保序无重复）+ 限时倒计时（到点自动交卷）+ 交卷成绩单（得分概览、逐题回看）；答题不即时判分
- **英文节头识别**：Single/Multiple Choice、Fill in the Blanks、Questions 等英文题库分节
- **单选节混排填空救回**：空位在句中的残缺填空句成题（thermal 形态）
- **进度导出/导入**：答题记录 JSON 导出与导入（换设备迁移，校验题库匹配）
- **深色模式**：跟随系统 + 手动切换（首页 toggle，偏好记忆）
- **键盘作答**：单选 A-D/1-4、←/→/Enter 翻题
- **PWA 更新提示**：新版本（含新题库）部署后横幅提示刷新
- OG/Twitter 分享卡片；全局 ErrorBoundary（异常兜底 + 反馈入口）

### 改进

- 题库数据按需加载：每题库独立 JSON chunk（主包 562KB→417KB）
- `checkBlankAnswer` 判分收紧：纯数字答案要求完整数字串匹配（"123" 不再误匹配 "12"）
- 发布校验关卡覆盖组题子题（答案越界/选项不足 → error）
- 单文件 HTML 引擎支持组题（两条渲染路径能力对齐）
- Lighthouse 移动端：字体异步加载，Performance 86→98（Accessibility 91）
- CI：前端 lint/vitest/Playwright E2E 冒烟/构建；Python 3.10/3.12 矩阵 + data/ 全量回归门禁

## [0.1.0] - 2026-10-21

首个 PyPI 发布。

### 核心

- 三段管线：摄取（docx/pdf/txt）→ 解析（规则优先 + LLM 可选兜底 + 滤噪）→ 渲染（单文件 HTML / React 多题库站点）
- 答案多策略：内联 `(B)`、行级「答案：B」、CET 黄色高亮、文末答案区按题号回填（免 LLM）
- 强相关题分组（一组一屏）、匹配题、重做本组、错题本、题库纠错反馈（预填 GitHub Issue）
- 发布校验关卡（error 拒绝生成）；`--diagnose` 解析诊断；题库上线流水线 `scripts/add_quiz.py`
- React 前端：移动端优先 + PWA 离线刷题；GitHub Pages 自动部署
