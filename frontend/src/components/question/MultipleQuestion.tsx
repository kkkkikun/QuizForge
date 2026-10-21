import { useState } from 'react';
import type { Question } from '../../types';

interface MultipleQuestionProps {
  question: Question;
  isAnswered: boolean;
  savedAnswer: string | string[] | undefined;
  isCorrect: boolean;
  onAnswer: (v: string[]) => void;
}

// 多选：勾选暂存 + 提交核对；答后按标准答案高亮
export default function MultipleQuestion({ question, isAnswered, savedAnswer, isCorrect, onAnswer }: MultipleQuestionProps) {
  const [multiInputs, setMultiInputs] = useState<string[]>([]);
  const stdSet = new Set(question.answer as string[]);

  const handleToggle = (letter: string) => {
    if (isAnswered) return;
    setMultiInputs(prev => prev.includes(letter) ? prev.filter(l => l !== letter) : [...prev, letter]);
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
        <div className="grid grid-cols-1 gap-3">
          {question.options?.map(opt => {
            const letter = opt.charAt(0);
            const isSelected = isAnswered
              ? (savedAnswer as string[]).includes(letter)
              : multiInputs.includes(letter);
            const isCorrectOpt = stdSet.has(letter);
            let cardStyle = 'border-slate-200 bg-white hover:border-blue-300 text-slate-700';
            if (isAnswered) {
              if (isCorrectOpt) cardStyle = 'border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
              else if (isSelected) cardStyle = 'border-2 border-rose-500 bg-rose-50 text-rose-950 font-bold';
              else cardStyle = 'border-slate-100 bg-slate-50/50 text-slate-400 opacity-60';
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
                  onChange={() => handleToggle(letter)}
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
          onClick={() => onAnswer(multiInputs)}
          disabled={multiInputs.length === 0}
          className="w-full py-3 px-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all cursor-pointer"
        >
          核对答案并查看解析
        </button>
      )}
    </div>
  );
}
