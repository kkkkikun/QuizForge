import { useState, useEffect, useMemo } from 'react';
import Dashboard from './components/Dashboard';
import PracticeSession from './components/PracticeSession';
import { QUESTIONS, TITLE } from './data';
import { BookOpen } from 'lucide-react';

const STORAGE_ANSWERS_KEY = 'db_expert_exam_answers_v3';

export default function App() {
  const [activeState, setActiveState] = useState<'dashboard' | 'session'>('dashboard');
  const [filterMode, setFilterMode] = useState<'all' | 'choice' | 'blank'>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: string | string[] }>({});

  // Filtered list of questions based on active mode
  const questionsList = useMemo(() => {
    if (filterMode === 'choice') {
      return QUESTIONS.filter(q => q.type === 'choice' || q.type === 'multiple');
    }
    if (filterMode === 'blank') {
      return QUESTIONS.filter(q => q.type === 'blank');
    }
    return QUESTIONS;
  }, [filterMode]);

  // Load answers from localStorage on mount
  useEffect(() => {
    try {
      const cachedAnswers = localStorage.getItem(STORAGE_ANSWERS_KEY);
      if (cachedAnswers) {
        setUserAnswers(JSON.parse(cachedAnswers));
      }
    } catch (err) {
      console.warn('Could not read from local storage:', err);
    }
  }, []);

  // Save answer handler
  const handleAnswer = (qId: number, answerVal: string | string[]) => {
    const updated = { ...userAnswers, [qId]: answerVal };
    setUserAnswers(updated);
    try {
      localStorage.setItem(STORAGE_ANSWERS_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save to local storage:', err);
    }
  };

  // Clear answers handler
  const handleClearAnswers = () => {
    setUserAnswers({});
    try {
      localStorage.removeItem(STORAGE_ANSWERS_KEY);
    } catch (err) {
      console.error('Failed to remove from local storage:', err);
    }
  };

  // Launch practice using target question ID
  const handleStartPractice = (qId: number) => {
    const idxInFiltered = questionsList.findIndex(q => q.id === qId);
    setCurrentIndex(idxInFiltered !== -1 ? idxInFiltered : 0);
    setActiveState('session');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col justify-between">
      {/* Universal Top Nav */}
      <nav id="top-nav" className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div 
            onClick={() => setActiveState('dashboard')}
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-slate-950 block leading-tight">
                {TITLE}
              </span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block leading-none pt-0.5">
                QuizForge · 规则 + LLM 解析
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-[10px] font-bold">
              STANDARD SEQUENTIAL EDITION
            </span>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-grow px-4 md:px-6 py-6 max-w-4xl mx-auto w-full">
        {activeState === 'dashboard' ? (
          <Dashboard
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
            onAnswer={handleAnswer}
            onExit={() => setActiveState('dashboard')}
          />
        )}
      </main>

      {/* Universal footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-6 text-center text-xs text-slate-400 font-sans">
        <div className="max-w-4xl mx-auto space-y-1">
          <p>© 2026 {TITLE}</p>
          <p className="text-[11px] text-slate-400">
            支持单选/多选/填空，进度自动保存。由 QuizForge 生成。
          </p>
        </div>
      </footer>
    </div>
  );
}
