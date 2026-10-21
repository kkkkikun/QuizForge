// @vitest-environment node
// 真实 Pyodide 集成测试：convert.ts 全链路（FS 写入 bundle + 桥接执行）在 npm pyodide 里运行。
// 需要先 `uv run python scripts/build_browser_bundle.py` 生成 public/quizforge_py/。

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { runConvert } from './convert';
import type { ConvertDeps } from './convert';

const here = fileURLToPath(new URL('.', import.meta.url));
const BUNDLE = resolve(here, '../../public/quizforge_py/quizforge');
const DATA = resolve(here, '../../../data');

const deps: ConvertDeps = {
  loadPyodide: async (opts?: Record<string, unknown>) => {
    const { loadPyodide } = await import('pyodide');
    return loadPyodide(opts);
  },
  readModule: async (name: string) =>
    new Uint8Array(readFileSync(resolve(BUNDLE, name))),
};

describe('runConvert 浏览器转换管线（真实 Pyodide）', () => {
  it('大英四.docx → 32 题（与 Python 侧一致），通过校验并产出 HTML', { timeout: 120_000 }, async () => {
    const bytes = new Uint8Array(readFileSync(resolve(DATA, '大英四.docx')));
    const r = await runConvert({ name: '大英四.docx', bytes }, deps);
    expect(r.questionCount).toBe(32);       // 28 组 + 4 匹配（Python 侧基线）
    expect(r.hasErrors).toBe(false);
    expect(r.html).toBeTruthy();
    expect(r.html!).toContain('大英四');
    // 已知源文档缺陷应为 warning 而非 error
    expect(r.issues.every(i => i.level === 'warning')).toBe(true);
  });

  it('txt 素材 → 正常解析', { timeout: 120_000 }, async () => {
    const txt = '单选题\n1.数据库技术的核心是（B）\nA.数据\nB.数据库管理系统\nC.操作系统\nD.应用程序\n';
    const r = await runConvert(
      { name: 'mini.txt', bytes: new TextEncoder().encode(txt) }, deps,
    );
    expect(r.questionCount).toBe(1);
    expect(r.quizJson).toContain('数据库技术的核心是');
  });

  it('0 题怪文档 → 给出诊断报告', { timeout: 120_000 }, async () => {
    const txt = '计算机网络期末复习\n本课程介绍基本概念。\n';
    const r = await runConvert(
      { name: 'weird.txt', bytes: new TextEncoder().encode(txt) }, deps,
    );
    expect(r.questionCount).toBe(0);
    expect(r.diagnosis).toContain('未识别到选择题候选');
    expect(r.html).toBeNull();
  });
});
