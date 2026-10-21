// 浏览器内转换：Pyodide 加载 quizforge 纯 Python 核心（public/quizforge_py/），
// 文件全程不离开浏览器。依赖可注入（Node/vitest 侧用 npm pyodide + fs 注入验证）。

export interface ConvertIssue {
  level: 'error' | 'warning';
  questionId: number | null;
  message: string;
}

export interface ConvertResult {
  title: string;
  questionCount: number;
  lowConfidenceCount: number;
  ignored: Record<string, number>;
  issues: ConvertIssue[];
  hasErrors: boolean;
  html: string | null; // 有 error 时为 null（与 CLI 校验关卡语义一致）
  quizJson: string;
  diagnosis: string;
}

export interface ConvertInput {
  name: string;
  bytes: Uint8Array;
}

export interface ConvertDeps {
  loadPyodide: (opts?: Record<string, unknown>) => Promise<PyodideInterface>;
  readModule: (filename: string) => Promise<Uint8Array>;
}

import type { PyodideInterface } from 'pyodide';

const PYODIDE_VERSION = '0.28.3';
const BUNDLE_DIR = '/quizforge_py/quizforge';
const BUNDLE_MODULES = [
  '__init__.py', 'model.py', 'patterns.py', 'parse.py',
  'render.py', 'validate.py', 'browser_ingest.py',
];

// Python 侧桥接：摄取 → 解析 → 校验 → 渲染（与 CLI 管线一致，无 LLM）
const BRIDGE_PY = `
import json, sys
sys.path.insert(0, "/quizforge_py")
from quizforge import browser_ingest
from quizforge.parse import parse_blocks, quiz_to_dict, diagnose_blocks
from quizforge.validate import validate_quiz, has_errors
from quizforge.render import render_html

blocks = browser_ingest.load(FILENAME)
quiz = parse_blocks(blocks, source_file=FILENAME)
issues = validate_quiz(quiz)
errs = has_errors(issues)
result = {
    "title": quiz.title,
    "questionCount": len(quiz.questions),
    "lowConfidenceCount": sum(1 for q in quiz.questions if q.low_confidence),
    "ignored": quiz.ignored_summary,
    "issues": [{"level": i.level, "questionId": i.question_id, "message": i.message} for i in issues],
    "hasErrors": errs,
    "html": None if errs or not quiz.questions else render_html(quiz, shuffle=True),
    "quizJson": json.dumps(quiz_to_dict(quiz), ensure_ascii=False),
    "diagnosis": diagnose_blocks(blocks) if not quiz.questions else "",
}
json.dumps(result, ensure_ascii=False)
`;

let pyodidePromise: Promise<PyodideInterface> | null = null;

async function getPyodide(deps: ConvertDeps): Promise<PyodideInterface> {
  if (!pyodidePromise) {
    pyodidePromise = deps.loadPyodide().then(async (py) => {
      py.FS.mkdir('/quizforge_py');
      py.FS.mkdir(BUNDLE_DIR);
      for (const name of BUNDLE_MODULES) {
        py.FS.writeFile(`${BUNDLE_DIR}/${name}`, await deps.readModule(name));
      }
      return py;
    });
    pyodidePromise.catch(() => { pyodidePromise = null; });
  }
  return pyodidePromise;
}

export async function runConvert(
  input: ConvertInput,
  deps: ConvertDeps,
): Promise<ConvertResult> {
  const py = await getPyodide(deps);
  py.FS.writeFile(`/tmp_${input.name}`, input.bytes);
  py.globals.set('FILENAME', `/tmp_${input.name}`);
  try {
    const out = await py.runPythonAsync(BRIDGE_PY);
    return JSON.parse(String(out)) as ConvertResult;
  } finally {
    try { py.FS.unlink(`/tmp_${input.name}`); } catch { /* ignore */ }
  }
}

// ---------- 浏览器默认依赖（CDN + fetch public bundle）----------

const CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

declare global {
  interface Window { loadPyodide?: (opts?: Record<string, unknown>) => Promise<PyodideInterface> }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`加载失败: ${src}`));
    document.head.appendChild(s);
  });
}

export const browserDeps: ConvertDeps = {
  async loadPyodide(opts) {
    if (!window.loadPyodide) {
      await loadScript(`${CDN}pyodide.js`);
    }
    const loader = window.loadPyodide;
    if (!loader) throw new Error('Pyodide 加载失败（检查网络）');
    return loader({ indexURL: CDN, ...opts });
  },
  async readModule(filename) {
    const base = import.meta.env.BASE_URL;
    const res = await fetch(`${base}quizforge_py/quizforge/${filename}`);
    if (!res.ok) throw new Error(`bundle 模块缺失: ${filename}`);
    return new Uint8Array(await res.arrayBuffer());
  },
};
