import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import type { Question } from '../../types';

interface GroupQuestionProps {
  question: Question;
  isAnswered: boolean;
  savedAnswer: string | string[] | undefined;
  onAnswer: (v: string[]) => void;
  onRedo?: () => void;
}

// 组题：子题点选即锁、全组答完才保存；支持一键重做本组
export default function GroupQuestion({ question, isAnswered, savedAnswer, onAnswer, onRedo }: GroupQuestionProps) {
  const gn = question.subQuestions?.length || 0;
  const [groupInputs, setGroupInputs] = useState<string[]>(() =>
    isAnswered && Array.isArray(savedAnswer) ? [...savedAnswer] : Array(gn).fill('')
  );

  const handlePick = (sIdx: number, letter: string) => {
    if (isAnswered || groupInputs[sIdx]) return;   // 整组已保存 / 该子题已锁
    const updated = [...groupInputs];
    updated[sIdx] = letter;
    setGroupInputs(updated);
    if (gn > 0 && updated.length === gn && updated.every(x => x)) {
      onAnswer(updated);                            // 全部子题答完 → 保存
    }
  };

  const handleRedo = () => {
    if (isAnswered) onRedo?.();
    setGroupInputs(Array(gn).fill(''));
  };

  return (
    <div className="space-y-5 pt-2">
      {question.subQuestions?.map((sub, sIdx) => {
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
                    onClick={() => handlePick(sIdx, letter)}
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
      {(isAnswered || groupInputs.some(x => x)) && (
        <button
          type="button"
          onClick={handleRedo}
          className="w-full py-2.5 px-5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-blue-600 hover:border-blue-300 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw size={13} /> 重做本组
        </button>
      )}
    </div>
  );
}
