import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Clock, Flag, XCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import type { AnswerMap, Question } from '../types';
import { formatClock, scoreExam } from '../lib/exam';
import ChoiceQuestion from './question/ChoiceQuestion';
import MultipleQuestion from './question/MultipleQuestion';
import BlankQuestion from './question/BlankQuestion';
import GroupQuestion from './question/GroupQuestion';

interface ExamSessionProps {
  questions: Question[];
  durationMin: number;
  onSubmit: (answers: AnswerMap, usedSec: number) => void;
  onExit: () => void;
}

// 模拟考试答题态：不判分、可改、倒计时；到时自动交卷
export default function ExamSession({ questions, durationMin, onSubmit, onExit }: ExamSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [remainSec, setRemainSec] = useState(durationMin * 60);
  const startRef = useRef(Date.now());
  const submittedRef = useRef(false);

  const q = questions[currentIndex];
  const total = questions.length;

  const finish = (final: AnswerMap) => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    onSubmit(final, Math.round((Date.now() - startRef.current) / 1000));
  };

  useEffect(() => {
    const t = setInterval(() => {
      setRemainSec(prev => {
        if (prev <= 1) {
          finish(answers);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);

  const answeredCount = useMemo(
    () => Object.values(answers).filter(a => Array.isArray(a) ? a.length > 0 : a !== '').length,
    [answers]
  );

  const setAnswer = (qId: number, v: string | string[]) => {
    setAnswers(prev => ({ ...prev, [qId]: v }));
  };

  const confirmSubmit = () => {
    const unanswered = total - answeredCount;
    const msg = unanswered > 0
      ? `还有 ${unanswered} 题未作答，确认交卷吗？`
      : '确认交卷吗？';
    if (window.confirm(msg)) finish(answers);
  };

  if (!q) return null;
  const draft = answers[q.id];
  const danger = remainSec <= 300;

  return (
    <div className="max-w-2xl mx-auto space-y-4 py-2">
      {/* 顶栏：进度 + 倒计时 */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between sticky top-14 z-20">
        <button
          onClick={() => { if (window.confirm('退出将放弃本场考试，确认吗？')) onExit(); }}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors px-3 min-h-11 rounded-lg hover:bg-slate-50"
        >
          <ArrowLeft size={16} /> 退出考试
        </button>
        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg font-mono">
          {currentIndex + 1} / {total} · 已答 {answeredCount}
        </span>
        <span className={`inline-flex items-center gap-1 text-sm font-bold font-mono px-3 py-1.5 rounded-lg ${
          danger ? 'bg-rose-50 text-rose-600 animate-pulse' : 'bg-blue-50 text-blue-600'
        }`}>
          <Clock size={14} /> {formatClock(remainSec)}
        </span>
      </div>

      {/* 题卡（复用练习题型组件；isAnswered 恒 false = 不判分不锁定） */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <span className="text-xs font-bold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-md">
          {q.type === 'group' ? '组题' : q.type === 'multiple' ? '多选题' : q.type === 'blank' ? '填空题' : '单选题'}
        </span>
        <h2 className="text-base md:text-lg font-bold text-slate-900 leading-relaxed whitespace-pre-line">{q.question}</h2>
        {q.images && q.images.length > 0 && (
          <div className="space-y-3">
            {q.images.map((src, i) => (
              <img key={i} src={src} alt={`题目配图 ${i + 1}`} loading="lazy"
                className="block max-w-full max-h-80 rounded-xl border border-slate-200 bg-white mx-auto" />
            ))}
          </div>
        )}

        {q.type === 'choice' ? (
          <ChoiceQuestion
            key={q.id}
            question={q}
            isAnswered={false}
            savedAnswer={typeof draft === 'string' ? draft : undefined}
            isCorrect={false}
            onAnswer={(v) => setAnswer(q.id, v)}
          />
        ) : q.type === 'multiple' ? (
          <MultipleQuestion
            key={q.id}
            question={q}
            isAnswered={false}
            savedAnswer={undefined}
            initialDraft={Array.isArray(draft) ? draft : []}
            onDraftChange={(v) => setAnswer(q.id, v)}
            onAnswer={() => {}}
            hideSubmit
          />
        ) : q.type === 'group' ? (
          <GroupQuestion
            key={q.id}
            question={q}
            isAnswered={false}
            savedAnswer={undefined}
            initialDraft={Array.isArray(draft) ? draft : undefined}
            mutable
            onDraftChange={(v) => setAnswer(q.id, v)}
            onAnswer={() => {}}
          />
        ) : (
          <BlankQuestion
            key={q.id}
            question={q}
            isAnswered={false}
            savedAnswer={undefined}
            initialDraft={Array.isArray(draft) ? draft : []}
            onDraftChange={(v) => setAnswer(q.id, v)}
            onAnswer={() => {}}
            hideSubmit
          />
        )}
      </div>

      {/* 底部操作栏 */}
      <div className="sticky bottom-0 z-20 -mx-2 px-2 pt-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent">
        <div className="bg-white/95 backdrop-blur border border-slate-200 rounded-2xl shadow-lg shadow-slate-900/5 p-2 flex items-center gap-2">
          <button
            onClick={() => setCurrentIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="min-h-11 min-w-20 px-4 rounded-xl font-semibold text-sm border transition-all flex items-center justify-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed border-slate-200 text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
          >
            <ArrowLeft size={16} /> 上一题
          </button>
          <span className="flex-1 text-center text-xs font-bold font-mono text-slate-400">
            {answeredCount}/{total}
          </span>
          {currentIndex < total - 1 ? (
            <button
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="min-h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer shrink-0"
            >
              下一题 <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={confirmSubmit}
              className="min-h-11 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-all cursor-pointer shrink-0 inline-flex items-center gap-1.5"
            >
              <Flag size={15} /> 交卷
            </button>
          )}
        </div>
        {currentIndex === total - 1 && total > 1 && (
          <div className="pt-2 flex justify-center">
            <button onClick={confirmSubmit} className="text-xs font-bold text-emerald-700 hover:text-emerald-600 py-1.5 cursor-pointer">
              直接交卷
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
