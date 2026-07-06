## Purpose

记录 QuizForge 开发中踩过的坑与有效模式，避免重复探索。

## Requirements

### Requirement: python-docx 坑点

python-docx 的 oxml 元素 API 有两处反直觉行为，已踩过。

#### Scenario: 段落内查图片/高亮

- **WHEN** 需在 CT_P 段落里查 `w:drawing` 或 `w:highlight`
- **THEN** **不要**用 `child.xpath("...", namespaces=...)`（会报 `unexpected keyword argument`）；用 `child.findall(".//{命名空间}localname")`（Clark 记法）

#### Scenario: 读高亮颜色

- **WHEN** 用 `run.font.highlight_color`
- **THEN** 遇到 `w:val="none"` 会抛 `WD_COLOR_INDEX has no XML mapping`；**改为直接读 XML**：`run._element.rPr.find(qn('w:highlight')).get(qn('w:val'))`，并跳过 `none`

### Requirement: GitHub Pages 部署模式

Pages 部署的两条固有限制 + 一个高频瞬时故障。

#### Scenario: SPA 深链刷新

- **WHEN** 用户直接访问/刷新 `/quiz/:id`
- **THEN** Pages 返回 `404.html`（= 应用入口），浏览器渲染后客户端路由；**HTTP 状态是 404 但页面可见**（Pages 固有限制）。需 `vite build && cp dist/index.html dist/404.html`

#### Scenario: deploy-pages 瞬时失败

- **WHEN** deploy.yml 的 `actions/deploy-pages@v5` 报 `Deployment failed, try again later`（error_count 10）
- **THEN** 是 GitHub 侧瞬时问题（build/上传都成功）；`gh run rerun` 重试即可，非代码问题

### Requirement: vite + Pages 路径

Pages 项目站 URL 是 `user.github.io/<repo>/`，资源引用必须带该前缀。

#### Scenario: 配置 base

- **WHEN** 部署到 Pages
- **THEN** `vite.config.ts` 设 `base: '/<repo>/'`；前端 `BrowserRouter` 用 `basename={import.meta.env.BASE_URL.replace(/\/$/,'')}`；否则 JS/CSS 全 404

### Requirement: .gitignore 通配陷阱

`*.html` 这类通配会误伤源码。

#### Scenario: 前端入口被忽略

- **WHEN** 根 `.gitignore` 有 `*.html`（为忽略生成的答题页）
- **THEN** 会连带忽略 `frontend/index.html`（构建入口），CI build 报 `Could not resolve entry module`；需加 `!frontend/index.html` 例外
