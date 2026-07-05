import { useMemo } from 'react';
import { QUESTIONS } from '../data';
import { checkBlankAnswer } from './PracticeSession';
import { 
  BookOpen, 
  ArrowRight, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  userAnswers: { [qId: number]: string | string[] };
  onStartPractice: (qId: number) => void;
  onClearAnswers: () => void;
  filterMode: 'all' | 'choice' | 'blank';
  onFilterChange: (mode: 'all' | 'choice' | 'blank') => void;
}

export default function Dashboard({
  userAnswers,
  onStartPractice,
  onClearAnswers,
  filterMode,
  onFilterChange
}: DashboardProps) {
  
  // Calculate distinct stats
  const stats = useMemo(() => {
    let answered = 0;
    let correct = 0;
    
    const targetSet = filterMode === 'choice' 
      ? QUESTIONS.filter(q => q.type === 'choice')
      : filterMode === 'blank'
        ? QUESTIONS.filter(q => q.type === 'blank')
        : QUESTIONS;
        
    targetSet.forEach(q => {
      const uAns = userAnswers[q.id];
      if (uAns === undefined) return;
      
      answered++;
      if (q.type === 'choice') {
        if (uAns === q.answer) {
          correct++;
        }
      } else {
        const standardList = Array.isArray(q.answer) ? q.answer : [q.answer];
        const userList = Array.isArray(uAns) ? uAns : [uAns];
        const isAllCorrect = standardList.every((std, idx) => checkBlankAnswer(userList[idx] || '', std));
        if (isAllCorrect) {
          correct++;
        }
      }
    });
    
    const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    
    // Find first unanswered qId in the active category
    let firstUnansweredQId = targetSet[0]?.id || 1;
    for (let i = 0; i < targetSet.length; i++) {
      if (userAnswers[targetSet[i].id] === undefined) {
        firstUnansweredQId = targetSet[i].id;
        break;
      }
    }
    
    return {
      answered,
      correct,
      total: targetSet.length,
      accuracy,
      firstUnansweredQId
    };
  }, [userAnswers, filterMode]);

  // Is any active question answered?
  const isStarted = stats.answered > 0;

  // Filter questions and track original 1-based index
  const visibleQuestions = useMemo(() => {
    const withIdx = QUESTIONS.map((q, idx) => ({ q, originalIdx: idx }));
    if (filterMode === 'choice') {
      return withIdx.filter(item => item.q.type === 'choice');
    }
    if (filterMode === 'blank') {
      return withIdx.filter(item => item.q.type === 'blank');
    }
    return withIdx;
  }, [filterMode]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Title Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg border border-slate-800"
      >
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs font-mono font-medium text-blue-400">
            <Sparkles size={13} /> 数据库设计与原理
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            经典原题刷题系统 <span className="text-blue-400">（无删减版）</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            为您收录全部官方经典试题（单项选择题 50 道，核心填空题 30 道，共 80 道原题），支持标准顺序解答、即时对错反馈与详细考点解析。
          </p>
        </div>
      </motion.div>

      {/* Chapter separation toggle tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
            练习模式
          </h3>
          <p className="text-sm font-bold text-slate-800">
            您可以将单选题与填空题切换，进行分卷练习：
          </p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto border border-slate-200 shrink-0">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              filterMode === 'all' 
                ? 'bg-white shadow-sm text-blue-600' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            全部原题 (1~80)
          </button>
          <button
            onClick={() => onFilterChange('choice')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              filterMode === 'choice' 
                ? 'bg-white shadow-sm text-blue-600' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            仅看单选题 (1~50)
          </button>
          <button
            onClick={() => onFilterChange('blank')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              filterMode === 'blank' 
                ? 'bg-white shadow-sm text-blue-600' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            仅看填空题 (51~80)
          </button>
        </div>
      </div>

      {/* Stats and Action Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2 flex flex-col justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold font-sans uppercase tracking-wider">
              {filterMode === 'all' ? '复习总进度' : filterMode === 'choice' ? '单选复习进度' : '填空复习进度'}
            </p>
            <p className="text-2xl font-bold text-slate-800">{stats.answered} <span className="text-xs text-slate-400">/ {stats.total} 题</span></p>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-1">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${(stats.answered / stats.total) * 100}%` }}
            />
          </div>
        </div>

        {/* Accuracy Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
          <p className="text-xs text-slate-500 font-semibold font-sans uppercase tracking-wider">分类正确率</p>
          <p className="text-2xl font-bold text-slate-800">
            {isStarted ? `${stats.accuracy}%` : '- -'}
          </p>
          <p className="text-[11px] text-slate-400">已答对 {stats.correct} 道，答错 {stats.answered - stats.correct} 道</p>
        </div>

        {/* Clear Progress Block */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center items-center md:items-end gap-3">
          <button
            onClick={() => onStartPractice(stats.firstUnansweredQId)}
            className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isStarted ? "继续顺序刷题" : "开始学习该部分"}
            <ArrowRight size={16} />
          </button>
          
          {isStarted && (
            <button
              onClick={() => {
                if (confirm('确认重置您的所有答题记录吗？此操作无法撤销。')) {
                  onClearAnswers();
                }
              }}
              className="text-xs text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1 py-1"
            >
              <RotateCcw size={12} /> 清空做题记录
            </button>
          )}
        </div>
      </div>

      {/* Grid containing all original questions */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 font-sans">
            <BookOpen size={16} className="text-blue-500" />
            已筛选真题章节导航 ({filterMode === 'all' ? '1 ~ 80' : filterMode === 'choice' ? '1 ~ 50' : '51 ~ 80'} 题)
          </h2>
          <div className="flex gap-4 text-[10px] text-slate-400 font-semibold uppercase tracking-wider font-sans">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-slate-50 border border-slate-200 inline-block" /> 未答</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-50 border border-emerald-200 inline-block" /> 正确</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-rose-50 border border-rose-200 inline-block" /> 错误</span>
          </div>
        </div>

        {/* Grid Cells */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2.5 pt-2">
          {visibleQuestions.map(({ q, originalIdx }) => {
            const uAns = userAnswers[q.id];
            
            let cellStyle = "bg-slate-50 border-slate-200 text-slate-600 hover:bg-blue-50 hover:border-blue-300";

            if (uAns !== undefined) {
              let isCorrect = false;
              if (q.type === 'choice') {
                isCorrect = uAns === q.answer;
              } else {
                const standardList = Array.isArray(q.answer) ? q.answer : [q.answer];
                const userList = Array.isArray(uAns) ? uAns : [uAns];
                isCorrect = standardList.every((std, i) => checkBlankAnswer(userList[i] || '', std));
              }

              if (isCorrect) {
                cellStyle = "bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100/50";
              } else {
                cellStyle = "bg-rose-50 border-rose-200 text-rose-800 hover:bg-rose-100/50";
              }
            }

            return (
              <button
                key={q.id}
                onClick={() => onStartPractice(q.id)}
                className={`aspect-square rounded-xl border text-sm font-bold font-mono transition-all flex flex-col items-center justify-center cursor-pointer relative py-2 ${cellStyle}`}
                title={`第 ${originalIdx + 1} 题 (${q.type === 'choice' ? '单选' : '填空'}): ${q.question.replace(/\[.*?\]/g, '( ______ )')}`}
              >
                <span>{originalIdx + 1}</span>
                <span className="text-[9px] font-sans font-normal text-slate-400 mt-0.5">
                  {q.type === 'choice' ? '单选' : '填空'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
