import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QUIZZES } from '../data';
import type { AnswerMap, FilterMode, Question } from '../types';
import { collectWrongQuestions } from '../lib/grading';
import Dashboard from './Dashboard';
import PracticeSession from './PracticeSession';
import { BookOpen } from 'lucide-react';

// 进入题库时从 localStorage 恢复答题记录（惰性初始化；切题库靠 key 重挂载重新执行）
function loadAnswers(storageKey: string): AnswerMap {
  if (!storageKey) return {};
  try {
    const cached = localStorage.getItem(storageKey);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
}

export default function QuizPage() {
  const { id } = useParams<{ id: string }>();
  const quiz = QUIZZES.find(q => q.id === id);

  const [activeState, setActiveState] = useState<'dashboard' | 'session'>('dashboard');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  // 练习列表在进入答题时快照：刷题中作答变化不会改变本次列表（错题卷重做答对后尤其重要）
  const [questionsList, setQuestionsList] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerMap>(() =>
    loadAnswers(quiz ? `quizforge-answers-${quiz.id}` : '')
  );

  const QUESTIONS: Question[] = quiz?.questions ?? [];
  const storageKey = quiz ? `quizforge-answers-${quiz.id}` : '';

  useEffect(() => {
    if (quiz) document.title = quiz.title;
  }, [quiz]);

  const computeList = (mode: FilterMode): Question[] => {
    if (mode === 'choice') return QUESTIONS.filter(q => q.type === 'choice' || q.type === 'multiple' || q.type === 'group');
    if (mode === 'blank') return QUESTIONS.filter(q => q.type === 'blank');
    if (mode === 'wrong') return collectWrongQuestions(QUESTIONS, userAnswers);
    return QUESTIONS;
  };

  if (!quiz) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <p className="text-slate-600">题库不存在：{id}</p>
          <Link to="/" className="text-blue-600 font-semibold hover:underline">← 返回首页</Link>
        </div>
      </div>
    );
  }

  const handleAnswer = (qId: number, v: string | string[]) => {
    const updated = { ...userAnswers, [qId]: v };
    setUserAnswers(updated);
    try { localStorage.setItem(storageKey, JSON.stringify(updated)); } catch { /* ignore */ }
  };
  const handleClearAnswers = () => {
    setUserAnswers({});
    try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
  };
  const handleClearOne = (qId: number) => {
    const updated = { ...userAnswers };
    delete updated[qId];
    setUserAnswers(updated);
    try { localStorage.setItem(storageKey, JSON.stringify(updated)); } catch { /* ignore */ }
  };
  const handleStartPractice = (qId: number) => {
    const list = computeList(filterMode);
    const idx = list.findIndex(q => q.id === qId);
    setQuestionsList(list);
    setCurrentIndex(idx !== -1 ? idx : 0);
    setActiveState('session');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
      <nav className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-slate-950 block leading-tight">{quiz.title}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block leading-none pt-0.5">QuizForge</span>
            </div>
          </Link>
          <Link to="/" className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">← 全部题库</Link>
        </div>
      </nav>

      <main className="flex-grow px-4 md:px-6 py-6 max-w-4xl mx-auto w-full">
        {activeState === 'dashboard' ? (
          <Dashboard
            questions={QUESTIONS}
            userAnswers={userAnswers}
            onStartPractice={handleStartPractice}
            onClearAnswers={handleClearAnswers}
            filterMode={filterMode}
            onFilterChange={setFilterMode}
          />
        ) : (
          <PracticeSession
            questionsList={questionsList}
            initialIndex={currentIndex}
            userAnswers={userAnswers}
            quizId={quiz.id}
            quizTitle={quiz.title}
            onAnswer={handleAnswer}
            onExit={() => setActiveState('dashboard')}
            onRedo={handleClearOne}
          />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 px-6 text-center text-xs text-slate-400">
        <div className="max-w-4xl mx-auto"><p>© 2026 {quiz.title} · 由 QuizForge 生成</p></div>
      </footer>
    </div>
  );
}
