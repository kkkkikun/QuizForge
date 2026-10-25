import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileUp, Loader2, Download, ShieldCheck, CheckCircle2, AlertTriangle, XCircle, FlaskConical } from 'lucide-react';
import { browserDeps, runConvert } from '../lib/convert';
import { extractPdfText } from '../lib/pdf';
import type { ConvertResult } from '../lib/convert';

type Phase = 'idle' | 'loading' | 'done' | 'error';

export default function ConvertPage() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<ConvertResult | null>(null);
  const [fileName, setFileName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleConvert = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setPhase('loading');
    setResult(null);
    setMessage('正在加载解析引擎（首次约 10MB，之后有浏览器缓存）…');
    try {
      let name = file.name;
      let bytes = new Uint8Array(await file.arrayBuffer());
      if (file.name.toLowerCase().endsWith('.pdf')) {
        setMessage('正在提取 PDF 文字…');
        const text = await extractPdfText(bytes);
        name = file.name.replace(/\.pdf$/i, '.txt');
        bytes = new TextEncoder().encode(text);
      }
      setMessage('正在解析（文件不出浏览器）…');
      const r = await runConvert({ name, bytes }, browserDeps);
      setResult(r);
      setPhase('done');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : String(e));
      setPhase('error');
    }
  };

  const download = (content: string, suffix: string, type: string) => {
    if (!fileName && !result) return;
    const base = (fileName || 'quiz').replace(/\.[^.]+$/, '');
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${base}${suffix}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <nav className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-30 shadow-sm">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors min-h-11">
            <ArrowLeft size={16} /> 返回题库
          </Link>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600">
            <FlaskConical size={14} /> 在线转换 · Beta
          </span>
        </div>
      </nav>

      <main className="flex-grow px-4 py-8 max-w-2xl mx-auto w-full space-y-6">
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div>
            <h1 className="font-bold text-xl">把复习资料变成刷题网页</h1>
            <p className="text-sm text-slate-500 mt-1">
              选择 <b>.docx</b> / <b>.txt</b> / <b>.pdf（文字版）</b> 题库文档，在浏览器里解析，下载双击即开的单文件答题网页。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <label className="flex-1 flex items-center gap-3 px-4 py-3 border-2 border-dashed border-slate-200 rounded-xl hover:border-blue-300 transition-colors cursor-pointer">
              <FileUp size={18} className="text-blue-600 shrink-0" />
              <span className="text-sm truncate flex-1">
                {fileName || '选择文件（.docx / .txt / .pdf）'}
              </span>
              <input
                ref={fileRef}
                type="file"
                accept=".docx,.txt,.pdf"
                className="hidden"
                onChange={(e) => {
                  setFileName(e.target.files?.[0]?.name || '');
                  setPhase('idle');
                  setResult(null);
                }}
              />
            </label>
            <button
              onClick={handleConvert}
              disabled={!fileName || phase === 'loading'}
              className="min-h-11 px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {phase === 'loading' && <Loader2 size={16} className="animate-spin" />}
              {phase === 'loading' ? '解析中…' : '开始转换'}
            </button>
          </div>

          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-emerald-600 shrink-0" />
            文件全程不离开你的浏览器（解析引擎在本机运行，不上传任何内容）。首次使用需联网加载引擎。
            扫描版 PDF 无法识别，请先转存 docx。
          </p>
        </section>

        {phase === 'error' && (
          <section className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-sm text-rose-700 space-y-1">
            <p className="font-bold flex items-center gap-1.5"><XCircle size={15} /> 转换失败</p>
            <p className="break-all">{message}</p>
          </section>
        )}

        {result && (
          <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg">{result.title || '解析结果'}</h2>
              <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md ${
                result.hasErrors || result.questionCount === 0
                  ? 'bg-rose-50 text-rose-700'
                  : 'bg-emerald-50 text-emerald-700'
              }`}>
                {result.hasErrors || result.questionCount === 0
                  ? <><XCircle size={13} /> 未通过校验</>
                  : <><CheckCircle2 size={13} /> 可用</>}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-50 rounded-xl py-3">
                <p className="text-xl font-bold">{result.questionCount}</p>
                <p className="text-xs text-slate-400">题目</p>
              </div>
              <div className="bg-slate-50 rounded-xl py-3">
                <p className="text-xl font-bold">{result.lowConfidenceCount}</p>
                <p className="text-xs text-slate-400">存疑（无答案标记）</p>
              </div>
              <div className="bg-slate-50 rounded-xl py-3">
                <p className="text-xl font-bold">{result.issues.filter(i => i.level === 'warning').length}</p>
                <p className="text-xs text-slate-400">警告</p>
              </div>
            </div>

            {result.questionCount === 0 && result.diagnosis && (
              <pre className="text-xs bg-slate-50 border border-slate-100 rounded-xl p-4 whitespace-pre-wrap text-slate-600">{result.diagnosis}</pre>
            )}

            {result.issues.length > 0 && (
              <ul className="text-xs space-y-1.5 max-h-44 overflow-y-auto">
                {result.issues.map((i, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    {i.level === 'error'
                      ? <XCircle size={13} className="text-rose-500 shrink-0 mt-0.5" />
                      : <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" />}
                    <span>{i.questionId !== null ? `题 ${i.questionId}：` : ''}{i.message}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={() => result.html && download(result.html, '.html', 'text/html')}
                disabled={!result.html}
                className="flex-1 min-h-11 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all cursor-pointer"
              >
                <Download size={15} /> 下载答题网页（HTML）
              </button>
              <button
                onClick={() => download(result.quizJson, '.json', 'application/json')}
                className="flex-1 min-h-11 inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition-all cursor-pointer"
              >
                <Download size={15} /> 下载题库 JSON
              </button>
            </div>
            <p className="text-xs text-slate-400">
              存疑题的答案建议用命令行版 <code className="font-mono">quizforge 文件.json --review</code> 核对后重新生成。
            </p>
          </section>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 px-6 text-center text-xs text-slate-400">
        <div className="max-w-2xl mx-auto"><p>QuizForge 在线转换 · 解析引擎运行于你的浏览器</p></div>
      </footer>
    </div>
  );
}
