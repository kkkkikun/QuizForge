import { useState, useRef, useEffect, useMemo } from 'react';
import type { Question } from '../types';
import { gradeQuestion } from '../lib/grading';
import { renderQuestionStem } from '../lib/stem';
import { buildQuestionIssueUrl } from '../lib/issue';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  BookOpen,
  Flag,
} from 'lucide-react';
import { motion } from 'motion/react';
import ChoiceQuestion from './question/ChoiceQuestion';
import MultipleQuestion from './question/MultipleQuestion';
import BlankQuestion from './question/BlankQuestion';
import GroupQuestion from './question/GroupQuestion';

interface PracticeSessionProps {
  questionsList: Question[];
  initialIndex: number;
  userAnswers: { [qId: number]: string | string[] };
  quizId: string;
  quizTitle: string;
  onAnswer: (qId: number, answer: string | string[]) => void;
  onExit: () => void;
  onRedo?: (qId: number) => void;
}

const typeBadge = (t: string) =>
  t === 'choice' ? '单选题' : t === 'multiple' ? '多选题' : t === 'group' ? '组题' : '核心填空题';

export default function PracticeSession({
  questionsList,
  initialIndex,
  userAnswers,
  quizId,
  quizTitle,
  onAnswer,
  onExit,
  onRedo
}: PracticeSessionProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Active question details（questionsList 可能为空：如本题库无填空题却切到「填空」卷）
  const activeQuestion = questionsList[currentIndex];
  const totalQuestions = questionsList.length;

  // 横向滑动手势切题（输入框内起手的滑动不触发）
  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('input, textarea')) {
      touchStart.current = null;
      return;
    }
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0 && currentIndex < totalQuestions - 1) setCurrentIndex(currentIndex + 1);
    if (dx > 0 && currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  // 键盘作答：A-D/1-4 选项（choice 直接选 / multiple 切换勾选 / group 作用于首个未锁子题），←/→ 翻题
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return;
      const q = questionsList[currentIndex];
      if (!q) return;
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (currentIndex < totalQuestions - 1) setCurrentIndex(currentIndex + 1);
        return;
      }
      if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
        return;
      }
      const k = e.key.toUpperCase();
      const letter = /^[A-D]$/.test(k) ? k
        : /^[1-4]$/.test(k) ? 'ABCD'[Number(k) - 1] : null;
      if (!letter) return;
      // 键盘选项仅支持单选（多选/组题的草稿在子组件内，保持鼠标/触摸操作）
      if (q.type === 'choice' && userAnswers[q.id] === undefined) {
        if (q.options?.some(o => o.charAt(0) === letter)) onAnswer(q.id, letter);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, questionsList, userAnswers, totalQuestions]);

  // Has the user answered the current question?
  const qId = activeQuestion?.id ?? -1;
  const savedAnswer = userAnswers[qId];
  const isAnswered = savedAnswer !== undefined;
  const isCorrect = useMemo(
    () => (activeQuestion ? gradeQuestion(activeQuestion, savedAnswer) : false),
    [activeQuestion, savedAnswer]
  );

  // 空卷兜底（筛选模式下无题）：避免 activeQuestion 未定义时白屏
  if (!activeQuestion) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 py-2">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center space-y-4">
          <p className="text-sm text-slate-600">本题库在该练习模式下没有题目。</p>
          <button
            onClick={onExit}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all cursor-pointer"
          >
            返回主页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-2">
      {/* Top Header Controls */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors px-3 min-h-11 rounded-lg hover:bg-slate-50"
        >
          <ArrowLeft size={16} /> 返回主页
        </button>

        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg font-mono">
          第 {currentIndex + 1} / {totalQuestions} 题
        </span>
      </div>

      {/* Primary Question Slide Box（支持横向滑动切题） */}
      <div
        className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Question Flag / Status */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
            {typeBadge(activeQuestion.type)}
          </span>

          {isAnswered && (
            <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md ${
              isCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}>
              {isCorrect ? (
                <><CheckCircle2 size={13} /> 答对了!</>
              ) : (
                <><XCircle size={13} /> 答错了!</>
              )}
            </span>
          )}
        </div>

        {/* Stem */}
        <h2 className="text-base md:text-lg font-bold text-slate-900 leading-relaxed font-sans whitespace-pre-line">
          {renderQuestionStem(activeQuestion.question, activeQuestion.type, isAnswered)}
        </h2>

        {/* 题目配图 */}
        {activeQuestion.images && activeQuestion.images.length > 0 && (
          <div className="space-y-3">
            {activeQuestion.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`题目配图 ${i + 1}`}
                loading="lazy"
                className="block max-w-full max-h-80 rounded-xl border border-slate-200 bg-white mx-auto"
              />
            ))}
          </div>
        )}

        {/* Answers inputs / choices area（key=id：切题重挂载，重置组件内草稿状态） */}
        {activeQuestion.type === 'choice' ? (
          <ChoiceQuestion
            key={qId}
            question={activeQuestion}
            isAnswered={isAnswered}
            savedAnswer={savedAnswer}
            isCorrect={isCorrect}
            onAnswer={(v) => onAnswer(qId, v)}
          />
        ) : activeQuestion.type === 'multiple' ? (
          <MultipleQuestion
            key={qId}
            question={activeQuestion}
            isAnswered={isAnswered}
            savedAnswer={savedAnswer}
            onAnswer={(v) => onAnswer(qId, v)}
          />
        ) : activeQuestion.type === 'group' ? (
          <GroupQuestion
            key={qId}
            question={activeQuestion}
            isAnswered={isAnswered}
            savedAnswer={savedAnswer}
            onAnswer={(v) => onAnswer(qId, v)}
            onRedo={() => onRedo?.(qId)}
          />
        ) : (
          <BlankQuestion
            key={qId}
            question={activeQuestion}
            isAnswered={isAnswered}
            savedAnswer={savedAnswer}
            onAnswer={(v) => onAnswer(qId, v)}
          />
        )}

        {/* Dynamic Explanation (Only shown if already answered) */}
        {isAnswered && activeQuestion.explanation && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-xl border flex gap-3 text-xs leading-relaxed ${
              isCorrect
                ? 'bg-emerald-50/40 border-emerald-100 text-emerald-900'
                : 'bg-rose-50/40 border-rose-100/60 text-rose-950'
            }`}
          >
            <div className="space-y-1.5">
              <h4 className="font-bold flex items-center gap-1 text-slate-800 text-[12px] font-sans">
                <BookOpen size={13} />
                考点详解与解说
              </h4>
              <p className="font-sans leading-relaxed text-[13px] text-slate-700">
                {activeQuestion.explanation}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {activeQuestion.tags.map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full font-semibold border bg-white text-slate-500 border-slate-200">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        {/* 报告题目问题（预填 GitHub Issue） */}
        <a
          href={buildQuestionIssueUrl(quizId, quizTitle, activeQuestion)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-rose-500 transition-colors self-start px-2 py-1.5 -mx-2"
        >
          <Flag size={12} /> 这道题有问题？报告给我们
        </a>
      </div>

      {/* 底部操作栏：sticky 拇指可达 + iOS 安全区适配 */}
      <div className="sticky bottom-0 z-20 -mx-2 px-2 pt-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent">
        <div className="bg-white/95 backdrop-blur border border-slate-200 rounded-2xl shadow-lg shadow-slate-900/5 p-2 flex items-center gap-2">
          <button
            onClick={() => setCurrentIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="min-h-11 min-w-20 px-4 rounded-xl font-semibold text-sm border transition-all flex items-center justify-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed border-slate-200 text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
          >
            <ArrowLeft size={16} /> 上一题
          </button>

          <span className="flex-1 text-center text-xs font-bold font-mono text-slate-400 whitespace-nowrap">
            {currentIndex + 1} / {totalQuestions}
          </span>

          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="min-h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer shrink-0"
            >
              下一题 <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={onExit}
              className="min-h-11 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-all cursor-pointer shrink-0"
            >
              完成并返回
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
