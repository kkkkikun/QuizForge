import type { Question } from '../../types';

interface ChoiceQuestionProps {
  question: Question;
  isAnswered: boolean;
  savedAnswer: string | string[] | undefined;
  isCorrect: boolean;
  onAnswer: (v: string) => void;
}

// 单选：点选即锁，答后高亮正误选项
export default function ChoiceQuestion({ question, isAnswered, savedAnswer, isCorrect, onAnswer }: ChoiceQuestionProps) {
  return (
    <div className="grid grid-cols-1 gap-3 pt-2 font-sans">
      {question.options?.map(opt => {
        const letter = opt.charAt(0); // A, B, C, D
        const isSelected = savedAnswer === letter;
        const isCorrectAnswer = question.answer === letter;

        let cardStyle = 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/20 text-slate-700';
        if (isAnswered) {
          if (isSelected) {
            cardStyle = isCorrect
              ? 'border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
              : 'border-2 border-rose-500 bg-rose-50 text-rose-950 font-bold';
          } else if (isCorrectAnswer) {
            cardStyle = 'border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
          } else {
            cardStyle = 'border-slate-100 bg-slate-50/50 text-slate-400 opacity-60';
          }
        }

        return (
          <button
            key={letter}
            type="button"
            disabled={isAnswered}
            onClick={() => onAnswer(letter)}
            className={`text-left p-4 rounded-xl border text-sm transition-all flex items-center gap-3.5 cursor-pointer w-full ${cardStyle}`}
          >
            <span className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center font-mono text-xs font-bold leading-none ${
              isSelected
                ? isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                : isAnswered && isCorrectAnswer
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-500 border border-slate-200'
            }`}>
              {letter}
            </span>
            <span className="text-sm font-medium leading-normal">{opt}</span>
          </button>
        );
      })}
    </div>
  );
}
