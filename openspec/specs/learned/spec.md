## Purpose

记录 QuizForge 开发中踩过的坑与有效模式（python-docx 怪癖、GitHub Pages 部署、vite 路径、gitignore 通配），避免重复探索。

## Requirements

### Requirement: python-docx 怪癖记录

python-docx 的 oxml API 有两处反直觉行为，使用时 MUST 按本规范避坑。

#### Scenario: 段落内查图片/高亮

- **WHEN** 需在 CT_P 段落里查 `w:drawing` 或 `w:highlight`
- **THEN** MUST 用 `child.findall(".//{命名空间}localname")`（Clark 记法），不得用 `xpath(..., namespaces=...)`

#### Scenario: 读高亮颜色

- **WHEN** 读 `run.font.highlight_color`
- **THEN** 遇 `w:val="none"` 会抛枚举错误；MUST 直接读 XML `rPr.find(qn('w:highlight')).get(qn('w:val'))` 并跳过 `none`

### Requirement: GitHub Pages 部署模式记录

Pages 部署的两条固有限制与一个高频瞬时故障 MUST 按本规范处理。

#### Scenario: SPA 深链刷新

- **WHEN** 用户直接访问/刷新 `/quiz/:id`
- **THEN** Pages 返回 `404.html`（HTTP 404 但页面可见）；构建 MUST `cp dist/index.html dist/404.html`

#### Scenario: deploy-pages 瞬时失败

- **WHEN** `actions/deploy-pages` 报 `Deployment failed, try again later`
- **THEN** 为 GitHub 侧瞬时问题；MUST `gh run rerun` 重试，不当代码 bug 处理

### Requirement: vite 与 Pages 路径

Pages 项目站 URL 含 `/<repo>/`，资源引用 MUST 带该前缀。

#### Scenario: 配置 base

- **WHEN** 部署到 Pages
- **THEN** `vite.config.ts` MUST 设 `base: '/<repo>/'`；`BrowserRouter` MUST 用 `basename={import.meta.env.BASE_URL.replace(/\/$/,'')}`

### Requirement: gitignore 通配陷阱

`*.html` 等通配 MUST 不能误伤源码入口。

#### Scenario: 前端入口被忽略

- **WHEN** 根 `.gitignore` 有 `*.html`
- **THEN** 会忽略 `frontend/index.html`（构建入口）；MUST 加 `!frontend/index.html` 例外
