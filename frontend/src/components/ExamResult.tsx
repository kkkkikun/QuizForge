import { CheckCircle2, XCircle, Clock, Trophy, ArrowLeft } from 'lucide-react';
import type { AnswerMap, Question } from '../types';
import { gradeQuestion } from '../lib/grading';
import { formatClock } from '../lib/exam';

interface ExamResultProps {
  questions: Question[];
  answers: AnswerMap;
  usedSec: number;
  onRetry: () => void;
  onExit: () => void;
}

const answerText = (q: Question, a: string | string[] | undefined): string => {
  if (a === undefined) return '未作答';
  return Array.isArray(a) ? a.join('、') : a;
};

const correctText = (q: Question): string => {
  if (q.type === 'choice') return String(q.answer);
  if (q.type === 'multiple') return (q.answer as string[]).join('、');
  if (q.type === 'group') return (q.subQuestions || []).map(s => s.answer).join('、');
  return Array.isArray(q.answer) ? q.answer.join(' / ') : String(q.answer);
};

// 成绩单：得分概览 + 逐题回看（你的答案 vs 正确答案）
export default function ExamResult({ questions, answers, usedSec, onRetry, onExit }: ExamResultProps) {
  let correct = 0, answered = 0;
  const rows = questions.map(q => {
    const a = answers[q.id];
    const done = a !== undefined && (Array.isArray(a) ? a.length > 0 : a !== '');
    const ok = done && gradeQuestion(q, a);
    if (done) answered++;
    if (ok) correct++;
    return { q, a, done, ok: !!ok };
  });
  const rate = questions.length ? Math.round((correct / questions.length) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-5 py-4">
      {/* 概览 */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 flex items-center justify-center">
          <Trophy className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <p className="text-4xl font-bold text-slate-900">
            {correct}<span className="text-lg text-slate-400"> / {questions.length}</span>
          </p>
          <p className="text-sm text-slate-500 mt-1">
            正确率 {rate}% · 作答 {answered} 题 · 用时 {formatClock(usedSec)}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button onClick={onRetry}
            className="min-h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all cursor-pointer">
            再来一场
          </button>
          <button onClick={onExit}
            className="min-h-11 px-6 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-1.5">
            <ArrowLeft size={14} /> 返回题库
          </button>
        </div>
      </div>

      {/* 逐题回看 */}
      <div className="space-y-3">
        {rows.map(({ q, a, done, ok }, i) => (
          <div key={q.id} className={`bg-white rounded-2xl border p-5 space-y-2 ${
            ok ? 'border-emerald-200' : done ? 'border-rose-200' : 'border-slate-200'
          }`}>
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-bold text-slate-800 leading-relaxed">
                {i + 1}. {q.question.replace(/\[.*?\]/g, '(___)').slice(0, 80)}
              </p>
              {done ? (
                ok ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                   : <XCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
              ) : (
                <Clock size={18} className="text-slate-300 shrink-0 mt-0.5" />
              )}
            </div>
            {!ok && (
              <p className="text-xs space-y-0.5">
                <span className="text-slate-400">你的答案：</span>
                <span className="text-rose-600 font-bold">{answerText(q, a)}</span>
                <span className="text-slate-400 ml-2">正确答案：</span>
                <span className="text-emerald-600 font-bold">{correctText(q)}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
