import { useState } from 'react';
import { ArrowLeft, Timer, ListChecks } from 'lucide-react';

interface ExamSetupViewProps {
  total: number;
  onStart: (count: number, durationMin: number) => void;
  onExit: () => void;
}

const COUNT_OPTIONS = [10, 20, 30];
const DURATION_OPTIONS = [10, 20, 30, 45];

// 考试配置：题数 + 时长（开始后不可暂停，中途退出视为放弃）
export default function ExamSetupView({ total, onStart, onExit }: ExamSetupViewProps) {
  const counts = [...COUNT_OPTIONS.filter(n => n < total), total];
  const [count, setCount] = useState(counts[0]);
  const [duration, setDuration] = useState(20);

  return (
    <div className="max-w-xl mx-auto space-y-5 py-4">
      <button
        onClick={onExit}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors min-h-11 px-3 -ml-3 rounded-lg hover:bg-slate-50"
      >
        <ArrowLeft size={16} /> 返回题库
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-7">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold text-slate-900">模拟考试</h1>
          <p className="text-sm text-slate-500">随机抽题 · 限时作答 · 交卷后统一判分</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <ListChecks size={14} /> 题数（题库共 {total} 题）
          </p>
          <div className="flex gap-2">
            {counts.map(n => (
              <button key={n} onClick={() => setCount(n)}
                className={`flex-1 min-h-11 rounded-xl font-bold text-sm border transition-all cursor-pointer ${
                  count === n ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                }`}>
                {n === total ? `全部 ${n}` : n}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <Timer size={14} /> 时长
          </p>
          <div className="flex gap-2">
            {DURATION_OPTIONS.map(m => (
              <button key={m} onClick={() => setDuration(m)}
                className={`flex-1 min-h-11 rounded-xl font-bold text-sm border transition-all cursor-pointer ${
                  duration === m ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                }`}>
                {m} 分钟
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => onStart(count, duration)}
          className="w-full min-h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all cursor-pointer"
        >
          开始考试（{count} 题 / {duration} 分钟）
        </button>
        <p className="text-xs text-slate-400 text-center">中途退出或刷新视为放弃本场考试；计时到点自动交卷。</p>
      </div>
    </div>
  );
}
