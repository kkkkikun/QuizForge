import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Flag } from 'lucide-react';
import { buildIssueNewUrl } from '../lib/issue';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

// 全局错误边界：任何渲染异常兜底（白屏 → 可反馈的错误页），不吞错误到静默
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[QuizForge] 渲染异常:', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans p-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 max-w-md w-full text-center space-y-4">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
          <h1 className="font-bold text-lg text-slate-900">页面出了点问题</h1>
          <p className="text-sm text-slate-500 break-all">
            {this.state.error.message || '渲染时发生异常'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => { this.setState({ error: null }); }}
              className="min-h-11 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
            >
              <RotateCcw size={15} /> 重试
            </button>
            <a
              href={buildIssueNewUrl()}
              target="_blank"
              rel="noreferrer"
              className="min-h-11 px-5 bg-white border border-slate-200 hover:border-rose-300 hover:text-rose-600 text-slate-700 font-semibold text-sm rounded-xl transition-all inline-flex items-center justify-center gap-1.5"
            >
              <Flag size={15} /> 反馈这个问题
            </a>
          </div>
          <p className="text-xs text-slate-400">你的答题进度保存在本机，不会因此丢失。</p>
        </div>
      </div>
    );
  }
}
