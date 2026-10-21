import type { ReactNode } from 'react';

// 填空题题干渲染：作答前隐藏 [答案] 为空位占位，作答后揭示
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
