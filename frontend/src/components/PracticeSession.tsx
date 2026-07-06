import { useState, useEffect, useMemo, ReactNode } from 'react';
import type { Question } from '../types';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  BookOpen,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';

// Smart comparison function for fill-in-the-blank questions
export function checkBlankAnswer(userInput: string, correctAnswer: string): boolean {
  if (!userInput) return false;
  const user = userInput.trim().toLowerCase().replace(/['"“”‘’]/g, '');
  const correct = correctAnswer.trim().toLowerCase().replace(/['"“”‘’]/g, '');
  
  if (user === correct) return true;

  // 容忍空格差异（如匹配题 "7 9 1..." vs "791..."）
  if (user.replace(/\s+/g, '') === correct.replace(/\s+/g, '')) return true;
  
  // Strip common redundant suffixes for high-tolerance matches
  const cleanUser = user.replace(/(阶段|系统|模型|约束|结构|文件|触发器|约束)/g, '');
  const cleanCorrect = correct.replace(/(阶段|系统|模型|约束|结构|文件|触发器|约束)/g, '');
  
  if (cleanUser && cleanCorrect && cleanUser === cleanCorrect) return true;
  
  // Support slash variations (e.g. "E-R图/ E-R模型")
  if (correct.includes('/')) {
    const options = correct.split('/').map(s => s.trim());
    return options.some(opt => checkBlankAnswer(userInput, opt));
  }
  
  // Support multiple alternatives (e.g. "SET或SELECT")
  if (correct.includes('或')) {
    const options = correct.split('或').map(s => s.trim());
    return options.some(opt => checkBlankAnswer(userInput, opt));
  }

  // Support character index matches like "1次" with "1"
  if (correct.match(/^\d+$/) && user.includes(correct)) {
    return true;
  }
  
  // Support parenthesized abbreviations: "数据库管理系统(DBMS)" matches "数据库管理系统" or "dbms"
  if (correct.includes('(')) {
    const parenthesizedRegex = /([^(]+)\(([^)]+)\)/;
    const match = correct.match(parenthesizedRegex);
    if (match) {
      const option1 = match[1].trim();
      const option2 = match[2].trim();
      if (user === option1 || user === option2) return true;
    }
  }

  // Support parenthesized abbreviation with space or different brackets
  if (correct.includes('（')) {
    const parenthesizedRegex = /([^（]+)（([^）]+)）/;
    const match = correct.match(parenthesizedRegex);
    if (match) {
      const option1 = match[1].trim();
      const option2 = match[2].trim();
      if (user === option1 || user === option2) return true;
    }
  }
  
  return false;
}

// Dynamically hides the bracket answers in fill-in-the-blank question texts
export function renderQuestionStem(question: string, type: string, isAnswered: boolean): ReactNode {
  if (type !== 'blank') {
    return question;
  }
  const parts = question.split(/\[(.*?)\]/g);
  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          // This is the answer inside the bracket
          if (isAnswered) {
            return (
              <span key={index} className="px-2 py-0.5 mx-1 bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold rounded font-mono inline-block text-xs">
                {part.trim()}
              </span>
            );
          } else {
            return (
              <span key={index} className="inline-block px-3 py-0.5 mx-1 font-bold border-b-2 border-dashed border-blue-500 text-blue-600 bg-blue-50/20 text-xs rounded-sm min-w-[70px] text-center">
                (  )
              </span>
            );
          }
        }
        return part;
      })}
    </>
  );
}

interface PracticeSessionProps {
  questionsList: Question[];
  initialIndex: number;
  userAnswers: { [qId: number]: string | string[] };
  onAnswer: (qId: number, answer: string | string[]) => void;
  onExit: () => void;
}

export default function PracticeSession({
  questionsList,
  initialIndex,
  userAnswers,
  onAnswer,
  onExit
}: PracticeSessionProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  
  // Fill-in-the-blank temporary values
  const [blankInputs, setBlankInputs] = useState<string[]>([]);

  // Multi-select temporary values
  const [multiInputs, setMultiInputs] = useState<string[]>([]);

  // Group temporary values（每子题的已选字母）
  const [groupInputs, setGroupInputs] = useState<string[]>([]);

  // Active question details
  const activeQuestion = questionsList[currentIndex];
  const totalQuestions = questionsList.length;
  const qId = activeQuestion.id;

  // Has the user answered the current question?
  const savedAnswer = userAnswers[qId];
  const isAnswered = savedAnswer !== undefined;

  // Calculate blank count
  const blankCount = useMemo(() => {
    if (activeQuestion.type !== 'blank') return 0;
    const standardAns = activeQuestion.answer;
    return Array.isArray(standardAns) ? standardAns.length : 1;
  }, [activeQuestion]);

  // Sync inputs when current question changes
  useEffect(() => {
    if (activeQuestion.type === 'blank') {
      if (isAnswered) {
        if (Array.isArray(savedAnswer)) {
          setBlankInputs([...savedAnswer]);
        } else {
          setBlankInputs([savedAnswer]);
        }
      } else {
        setBlankInputs(Array(blankCount).fill(''));
      }
    } else if (activeQuestion.type === 'multiple') {
      setMultiInputs(isAnswered ? (Array.isArray(savedAnswer) ? [...savedAnswer] : [savedAnswer]) : []);
    } else if (activeQuestion.type === 'group') {
      const gn = activeQuestion.subQuestions?.length || 0;
      setGroupInputs(isAnswered && Array.isArray(savedAnswer) ? [...savedAnswer] : Array(gn).fill(''));
    }
  }, [currentIndex, activeQuestion, isAnswered, savedAnswer, blankCount]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Grade helper for active question
  const isCorrectActiveQuestion = useMemo(() => {
    if (!isAnswered) return false;
    
    if (activeQuestion.type === 'choice') {
      return savedAnswer === activeQuestion.answer;
    } else if (activeQuestion.type === 'multiple') {
      const std = activeQuestion.answer as string[];
      const user = Array.isArray(savedAnswer) ? savedAnswer : [savedAnswer];
      return std.length === user.length && std.every(a => user.includes(a));
    } else if (activeQuestion.type === 'group') {
      if (!isAnswered || !Array.isArray(savedAnswer)) return false;
      return (activeQuestion.subQuestions || []).every((s, i) => savedAnswer[i] === s.answer);
    } else {
      const standardList = Array.isArray(activeQuestion.answer) 
        ? activeQuestion.answer 
        : [activeQuestion.answer];
      const userList = Array.isArray(savedAnswer) ? savedAnswer : [savedAnswer];
      
      return standardList.every((std, idx) => {
        const uVal = userList[idx] || '';
        return checkBlankAnswer(uVal, std);
      });
    }
  }, [activeQuestion, isAnswered, savedAnswer]);

  // Choice selection handler
  const handleSelectChoice = (optionChar: string) => {
    if (isAnswered) return; // Answer locked
    onAnswer(qId, optionChar);
  };

  // Blank input change
  const handleBlankInputChange = (index: number, val: string) => {
    if (isAnswered) return;
    const updated = [...blankInputs];
    updated[index] = val;
    setBlankInputs(updated);
  };

  // Blank submit
  const handleBlankSubmit = () => {
    if (isAnswered) return;
    onAnswer(qId, blankInputs);
  };

  // Multi-select toggle
  const handleMultiToggle = (letter: string) => {
    if (isAnswered) return;
    setMultiInputs(prev => prev.includes(letter) ? prev.filter(l => l !== letter) : [...prev, letter]);
  };

  // Multi-select submit
  const handleMultiSubmit = () => {
    if (isAnswered) return;
    onAnswer(qId, multiInputs);
  };

  // Group: 点选某子题的选项（点选即锁该子题；全部答完则保存整组）
  const handleGroupPick = (sIdx: number, letter: string) => {
    if (isAnswered) return;
    if (groupInputs[sIdx]) return;          // 该子题已锁
    const updated = [...groupInputs];
    updated[sIdx] = letter;
    setGroupInputs(updated);
    const n = activeQuestion.subQuestions?.length || 0;
    if (updated.length === n && updated.every(x => x)) {
      onAnswer(qId, updated);               // 全部子题答完 → 保存
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-2">
      {/* Top Header Controls */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-50"
        >
          <ArrowLeft size={16} /> 返回主页
        </button>

        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg font-mono">
          第 {currentIndex + 1} / {totalQuestions} 题
        </span>
      </div>

      {/* Primary Question Slide Box */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Question Flag / Status */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
            {activeQuestion.type === 'choice' ? '单选题' : activeQuestion.type === 'multiple' ? '多选题' : activeQuestion.type === 'group' ? '组题' : '核心填空题'}
          </span>
          
          {isAnswered && (
            <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md ${
              isCorrectActiveQuestion ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}>
              {isCorrectActiveQuestion ? (
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

        {/* Answers inputs / choices area */}
        {activeQuestion.type === 'choice' ? (
          <div className="grid grid-cols-1 gap-3 pt-2 font-sans">
            {activeQuestion.options?.map(opt => {
              const letter = opt.charAt(0); // A, B, C, D
              const isSelected = savedAnswer === letter;
              const isCorrectAnswer = activeQuestion.answer === letter;
              
              let cardStyle = "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/20 text-slate-700";
              
              if (isAnswered) {
                if (isSelected) {
                  cardStyle = isCorrectActiveQuestion 
                    ? "border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-bold"
                    : "border-2 border-rose-500 bg-rose-50 text-rose-950 font-bold";
                } else if (isCorrectAnswer) {
                  cardStyle = "border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
                } else {
                  cardStyle = "border-slate-100 bg-slate-50/50 text-slate-400 opacity-60";
                }
              }

              return (
                <button
                  key={letter}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectChoice(letter)}
                  className={`text-left p-4 rounded-xl border text-sm transition-all flex items-center gap-3.5 cursor-pointer w-full ${cardStyle}`}
                >
                  <span className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center font-mono text-xs font-bold leading-none ${
                    isSelected 
                      ? isCorrectActiveQuestion ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
                      : isAnswered && isCorrectAnswer
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-500 border border-slate-200"
                  }`}>
                    {letter}
                  </span>
                  <span className="text-sm font-medium leading-normal">{opt}</span>
                </button>
              );
            })}
          </div>
        ) : activeQuestion.type === 'multiple' ? (
          <div className="space-y-4 pt-2">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="grid grid-cols-1 gap-3">
                {activeQuestion.options?.map(opt => {
                  const letter = opt.charAt(0);
                  const stdSet = new Set(activeQuestion.answer as string[]);
                  const isSelected = isAnswered
                    ? (savedAnswer as string[]).includes(letter)
                    : multiInputs.includes(letter);
                  const isCorrectOpt = stdSet.has(letter);
                  let cardStyle = "border-slate-200 bg-white hover:border-blue-300 text-slate-700";
                  if (isAnswered) {
                    if (isCorrectOpt) cardStyle = "border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
                    else if (isSelected) cardStyle = "border-2 border-rose-500 bg-rose-50 text-rose-950 font-bold";
                    else cardStyle = "border-slate-100 bg-slate-50/50 text-slate-400 opacity-60";
                  }
                  return (
                    <label
                      key={letter}
                      className={`text-left p-4 rounded-xl border text-sm transition-all flex items-center gap-3.5 ${isAnswered ? '' : 'cursor-pointer'} ${cardStyle}`}
                    >
                      <input
                        type="checkbox"
                        disabled={isAnswered}
                        checked={isSelected}
                        onChange={() => handleMultiToggle(letter)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="w-7 h-7 shrink-0 rounded-full flex items-center justify-center font-mono text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">{letter}</span>
                      <span className="font-medium leading-normal">{opt}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            {!isAnswered && (
              <button
                type="button"
                onClick={handleMultiSubmit}
                disabled={multiInputs.length === 0}
                className="w-full py-3 px-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all cursor-pointer"
              >
                核对答案并查看解析
              </button>
            )}
          </div>
        ) : activeQuestion.type === 'group' ? (
          <div className="space-y-5 pt-2">
            {activeQuestion.subQuestions?.map((sub, sIdx) => {
              const sel = isAnswered ? (savedAnswer as string[])[sIdx] : (groupInputs[sIdx] || '');
              const locked = sel !== '';
              return (
                <div key={sIdx} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
                  <p className="text-sm font-bold text-slate-800">{sIdx + 1}. {sub.question}</p>
                  <div className="grid grid-cols-1 gap-2">
                    {sub.options.map(opt => {
                      const letter = opt.charAt(0);
                      const isSel = sel === letter;
                      const isCorr = sub.answer === letter;
                      let style = 'border-slate-200 bg-white hover:border-blue-300 text-slate-700';
                      if (locked) {
                        if (isCorr) style = 'border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                        else if (isSel) style = 'border-2 border-rose-500 bg-rose-50 text-rose-950 font-bold';
                        else style = 'border-slate-100 bg-slate-50/50 text-slate-400 opacity-60';
                      }
                      return (
                        <button key={letter} type="button" disabled={locked}
                          onClick={() => handleGroupPick(sIdx, letter)}
                          className={`text-left p-3 rounded-xl border text-sm transition-all flex items-center gap-3 ${locked ? '' : 'cursor-pointer'} ${style}`}>
                          <span className="w-6 h-6 shrink-0 rounded-full flex items-center justify-center font-mono text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">{letter}</span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-4">
              {Array.from({ length: blankCount }).map((_, bIdx) => {
                const uVal = blankInputs[bIdx] || '';
                const stdAns = Array.isArray(activeQuestion.answer) 
                  ? activeQuestion.answer[bIdx] 
                  : (activeQuestion.answer as string);
                
                const isSingleCorrect = isAnswered && checkBlankAnswer(uVal, stdAns);

                return (
                  <div key={bIdx} className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 block">
                      第 {bIdx + 1} 空
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        disabled={isAnswered}
                        placeholder="请输入您的解答"
                        value={uVal}
                        onChange={(e) => handleBlankInputChange(bIdx, e.target.value)}
                        className={`w-full px-4 py-2.5 text-sm rounded-xl border font-mono transition-all focus:outline-none focus:ring-1 ${
                          isAnswered
                            ? isSingleCorrect
                              ? 'border-emerald-300 bg-emerald-50/30 text-emerald-950 font-bold'
                              : 'border-rose-300 bg-rose-50/30 text-rose-950 font-bold'
                            : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500 text-slate-800 bg-white'
                        }`}
                      />
                      {isAnswered && (
                        <div className="absolute right-3">
                          {isSingleCorrect ? (
                            <Check className="text-emerald-600 shrink-0" size={18} />
                          ) : (
                            <XCircle className="text-rose-600 shrink-0" size={18} />
                          )}
                        </div>
                      )}
                    </div>
                    {isAnswered && !isSingleCorrect && (
                      <p className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1 pl-1 pt-1">
                        <span>标准答案: </span>
                        <code className="text-xs bg-emerald-50 border border-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono font-bold">
                          {stdAns}
                        </code>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Check blank answers button */}
            {!isAnswered && (
              <button
                type="button"
                onClick={handleBlankSubmit}
                disabled={blankInputs.some(v => !v.trim())}
                className="w-full py-3 px-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                核对答案并查看解析
              </button>
            )}
          </div>
        )}

        {/* Dynamic Explanation (Only shown if already answered) */}
        {isAnswered && activeQuestion.explanation && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-xl border flex gap-3 text-xs leading-relaxed ${
              isCorrectActiveQuestion 
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
      </div>

      {/* Row Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`py-3 px-5 rounded-xl font-semibold text-xs border transition-all flex items-center gap-1 ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed border-none text-slate-300'
              : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50 cursor-pointer'
          }`}
        >
          <ArrowLeft size={14} /> 上一题
        </button>

        {currentIndex < totalQuestions - 1 ? (
          <button
            onClick={handleNext}
            className="py-3 px-5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold text-xs rounded-xl transition-all flex items-center gap-1 cursor-pointer"
          >
            下一题 <ArrowRight size={14} />
          </button>
        ) : (
          <button
            onClick={onExit}
            className="py-3 px-6 bg-slate-905 text-slate-950 border border-slate-300 hover:bg-slate-100 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            完成并返回主页
          </button>
        )}
      </div>
    </div>
  );
}
