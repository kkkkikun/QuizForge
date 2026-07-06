import { useMemo } from 'react';
import type { Question } from '../types';
import { checkBlankAnswer } from './PracticeSession';
import { BookOpen, ArrowRight, RotateCcw } from 'lucide-react';

interface DashboardProps {
  questions: Question[];
  userAnswers: { [qId: number]: string | string[] };
  onStartPractice: (qId: number) => void;
  onClearAnswers: () => void;
  filterMode: 'all' | 'choice' | 'blank';
  onFilterChange: (mode: 'all' | 'choice' | 'blank') => void;
}

const isOptionsType = (t: string) => t === 'choice' || t === 'multiple' || t === 'group';

function isCorrect(q: Question, uAns: string | string[] | undefined): boolean {
  if (uAns === undefined) return false;
  if (q.type === 'group') {
    if (!Array.isArray(uAns)) return false;
    return (q.subQuestions || []).every((s, i) => uAns[i] === s.answer);
  }
  if (q.type === 'choice') return uAns === q.answer;
  if (q.type === 'multiple') {
    const std = q.answer as string[];
    const user = Array.isArray(uAns) ? uAns : [uAns];
    return std.length === user.length && std.every(a => user.includes(a));
  }
  const stdList = Array.isArray(q.answer) ? q.answer : [q.answer];
  const userList = Array.isArray(uAns) ? uAns : [uAns];
  return stdList.every((std, idx) => checkBlankAnswer(userList[idx] || '', std));
}

const typeLabel = (t: string) => (t === 'choice' ? '单选' : t === 'multiple' ? '多选' : t === 'group' ? '组题' : '填空');

export default function Dashboard({
  questions, userAnswers, onStartPractice, onClearAnswers, filterMode, onFilterChange,
}: DashboardProps) {
  const counts = useMemo(() => ({
    all: questions.length,
    choice: questions.filter(q => isOptionsType(q.type)).length,
    blank: questions.filter(q => q.type === 'blank').length,
  }), [questions]);

  const targetSet = useMemo(() => {
    if (filterMode === 'choice') return questions.filter(q => isOptionsType(q.type));
    if (filterMode === 'blank') return questions.filter(q => q.type === 'blank');
    return questions;
  }, [questions, filterMode]);

  const stats = useMemo(() => {
    let answered = 0, correct = 0;
    let firstUnansweredQId = targetSet[0]?.id || 1;
    for (const q of targetSet) {
      if (userAnswers[q.id] === undefined) { firstUnansweredQId = q.id; break; }
    }
    targetSet.forEach(q => {
      if (userAnswers[q.id] === undefined) return;
      answered++;
      if (isCorrect(q, userAnswers[q.id])) correct++;
    });
    return {
      answered, correct, total: targetSet.length,
      accuracy: answered > 0 ? Math.round((correct / answered) * 100) : 0,
      firstUnansweredQId,
    };
  }, [targetSet, userAnswers]);

  const isStarted = stats.answered > 0;

  const visibleQuestions = useMemo(() => {
    const withIdx = questions.map((q, idx) => ({ q, originalIdx: idx }));
    if (filterMode === 'choice') return withIdx.filter(it => isOptionsType(it.q.type));
    if (filterMode === 'blank') return withIdx.filter(it => it.q.type === 'blank');
    return withIdx;
  }, [questions, filterMode]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Filter tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">练习模式</h3>
          <p className="text-sm font-bold text-slate-800">按题型筛选，分卷练习：</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto border border-slate-200 shrink-0">
          {([['all', `全部 (${counts.all})`], ['choice', `选择 (${counts.choice})`], ['blank', `填空 (${counts.blank})`]] as const).map(([mode, label]) => (
            <button
              key={mode}
              onClick={() => onFilterChange(mode)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                filterMode === mode ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2 flex flex-col justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              {filterMode === 'all' ? '复习总进度' : filterMode === 'choice' ? '选择复习进度' : '填空复习进度'}
            </p>
            <p className="text-2xl font-bold text-slate-800">{stats.answered} <span className="text-xs text-slate-400">/ {stats.total} 题</span></p>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${stats.total ? (stats.answered / stats.total) * 100 : 0}%` }} />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">正确率</p>
          <p className="text-2xl font-bold text-slate-800">{isStarted ? `${stats.accuracy}%` : '- -'}</p>
          <p className="text-[11px] text-slate-400">答对 {stats.correct}，答错 {stats.answered - stats.correct}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center items-center md:items-end gap-3">
          <button
            onClick={() => onStartPractice(stats.firstUnansweredQId)}
            className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isStarted ? '继续刷题' : '开始练习'} <ArrowRight size={16} />
          </button>
          {isStarted && (
            <button
              onClick={() => { if (confirm('确认清空本题库的答题记录吗？')) onClearAnswers(); }}
              className="text-xs text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1 py-1"
            >
              <RotateCcw size={12} /> 清空记录
            </button>
          )}
        </div>
      </div>

      {/* Navigation grid */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <BookOpen size={16} className="text-blue-500" /> 题号导航 ({stats.total} 题)
          </h2>
          <div className="flex gap-4 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-slate-50 border border-slate-200 inline-block" />未答</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-50 border border-emerald-200 inline-block" />正确</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-rose-50 border border-rose-200 inline-block" />错误</span>
          </div>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2.5 pt-2">
          {visibleQuestions.map(({ q, originalIdx }) => {
            const uAns = userAnswers[q.id];
            let cellStyle = "bg-slate-50 border-slate-200 text-slate-600 hover:bg-blue-50 hover:border-blue-300";
            if (uAns !== undefined) {
              cellStyle = isCorrect(q, uAns)
                ? "bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100/50"
                : "bg-rose-50 border-rose-200 text-rose-800 hover:bg-rose-100/50";
            }
            return (
              <button
                key={q.id}
                onClick={() => onStartPractice(q.id)}
                className={`aspect-square rounded-xl border text-sm font-bold font-mono transition-all flex flex-col items-center justify-center cursor-pointer py-2 ${cellStyle}`}
                title={`第 ${originalIdx + 1} 题 (${typeLabel(q.type)}): ${q.question.replace(/\[.*?\]/g, '( ___ )')}`}
              >
                <span>{originalIdx + 1}</span>
                <span className="text-[9px] font-normal text-slate-400 mt-0.5">{typeLabel(q.type)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
