# 技术设计：React 前端整合 + Pages 部署

## 1. 仓库结构（变更后）
```
QuizForge/
  quizforge/          Python 核心（不变 + 新增 reactfmt.py）
  frontend/           React 子工程（新增）
    index.html, vite.config.ts, tsconfig.json, package.json
    src/{main.tsx, App.tsx, index.css, types.ts, data.ts, components/}
  .github/workflows/
    ci.yml            pytest（不变）
    deploy.yml        新增：build frontend + Pages 部署
```

## 2. 数据契约映射（QuizForge → React）

React `Question`（`frontend/src/types.ts`，扩展 multiple 后）：
```ts
type QuestionType = 'choice' | 'multiple' | 'blank';
interface Question {
  id: number; type: QuestionType; question: string;
  options?: string[];                 // ["A. 数据", ...]，choice/multiple 才有
  answer: string | string[];          // choice→"B"；multiple→["A","C"]；blank→["一致性"]
  explanation?: string; tags: string[];
}
```

转换规则（`quizforge/reactfmt.py: to_react_questions(quiz)`）：
| QuizForge | React | 处理 |
|-----------|-------|------|
| `type:"single"` | `"choice"` | 改名 |
| `type:"multiple"` | `"multiple"` | 直接 |
| `type:"blank"` | `"blank"` | 直接 |
| `stem` | `question` | blank：把首个空位标记 `＿＿＿`/`（ ）`/`___` 替换为 `[<answer>]`（配合 React `renderQuestionStem` 的揭示逻辑） |
| `options:{A:"数据"}` | `["A. 数据",...]` | dict→按字母排序的带前缀 array；blank 省略 |
| `answer:["B"]` | choice→`"B"`；multiple→`["A","C"]`；blank→`answer+accepted` 合并去重 | 按型拆分 |
| `accepted` | 合入 blank answer 数组 | 靠 React `checkBlankAnswer` 容错 |
| `low_confidence`/`note` | `explanation` 拼接 " [存疑]" + note | 保信息 |
| `section`/`source` | `tags`（section；source=llm→加 "LLM"） | 保信息 |

## 3. data.ts 生成
- CLI 新增 `--react <path>`：读取解析后的 Quiz（或从 `--json` 产物经 `dict_to_quiz` 还原），调用 `to_react_questions`，写出 `export const QUESTIONS: Question[] = [...]` 到 `frontend/src/data.ts`。
- React 应用 `import { QUESTIONS } from './data'` 不变（同步导入，零数据加载改造）。
- 顶层 title：写入 `frontend/src/data.ts` 同时导出 `export const TITLE = "...";`，App.tsx 引用（替代硬编码）。

## 4. React 多选扩展（最小改动）
- `types.ts`：`QuestionType` 加 `'multiple'`。
- `PracticeSession.tsx`：`type==='multiple'` 渲染复选框（checkbox）；判分用集合相等 `Set(user)===Set(answer)`；选中不锁定（多选需"确认"按钮提交，参考 choice 的点击即锁不适合多选 → 多选走填空式的"核对答案"按钮）。
- `Dashboard.tsx`：网格三色逻辑不区分 choice/multiple（都是选项题），无需改。

## 5. 前端清理（迁入时）
删除：`metadata.json`、`.env.example`（Gemini）、package.json 里 `@google/genai`/`express`/`dotenv`/`tsx` 及对应脚本、`server.js` 残留引用。保留：react/react-dom/vite/@vitejs/plugin-react/tailwindcss(v4+vite 插件)/lucide-react/motion/typescript。

## 6. vite.config.ts
`base: '/QuizForge/'`（GitHub Pages 项目站路径，仓库名）。缺这行 → 资源 404。

## 7. deploy.yml（照搬参考项目 + 适配）
```yaml
on: { push: { branches: [master] }, workflow_dispatch: }
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: pages, cancel-in-progress: false }
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    environment: github-pages
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm', cache-dependency-path: frontend/package-lock.json }
      - working-directory: frontend
        run: npm ci
      - working-directory: frontend
        run: npm run build        # → frontend/dist
      - uses: actions/upload-pages-artifact@v3
        with: { path: frontend/dist }
      - id: deployment
        uses: actions/deploy-pages@v4
```
仓库一次性设置：Settings → Pages → Source = GitHub Actions。

## 8. 测试策略
- `to_react_questions` 单测：字段映射、选项前缀、blank stem 注入 `[答案]`、multiple/accepted 合并、tags。
- 本地 `npm run build` 通过（产物 dist 生成）。
- CI：`ci.yml`（pytest，含转换器测试）+ `deploy.yml`（build+deploy）。
- Manual QA：Pages 上线后浏览器实答（导航矩阵/多选/填空容错/锁定判分）。
