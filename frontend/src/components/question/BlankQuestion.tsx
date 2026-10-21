import { useState } from 'react';
import { Check, XCircle } from 'lucide-react';
import type { Question } from '../../types';
import { checkBlankAnswer } from '../../lib/grading';

interface BlankQuestionProps {
  question: Question;
  isAnswered: boolean;
  savedAnswer: string | string[] | undefined;
  onAnswer: (v: string[]) => void;
}

// 填空：多空输入 + 提交核对；答后逐空标注正误并给标准答案
export default function BlankQuestion({ question, isAnswered, savedAnswer, onAnswer }: BlankQuestionProps) {
  const blankCount = Array.isArray(question.answer) ? question.answer.length : 1;
  const [inputs, setInputs] = useState<string[]>(() => {
    if (isAnswered) {
      return Array.isArray(savedAnswer) ? [...savedAnswer] : savedAnswer ? [savedAnswer] : Array(blankCount).fill('');
    }
    return Array(blankCount).fill('');
  });

  const handleChange = (index: number, val: string) => {
    if (isAnswered) return;
    const updated = [...inputs];
    updated[index] = val;
    setInputs(updated);
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-4">
        {Array.from({ length: blankCount }).map((_, bIdx) => {
          const uVal = inputs[bIdx] || '';
          const stdAns = Array.isArray(question.answer) ? question.answer[bIdx] : (question.answer as string);
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
                  onChange={(e) => handleChange(bIdx, e.target.value)}
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

      {!isAnswered && (
        <button
          type="button"
          onClick={() => onAnswer(inputs)}
          disabled={inputs.some(v => !v.trim())}
          className="w-full py-3 px-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          核对答案并查看解析
        </button>
      )}
    </div>
  );
}
