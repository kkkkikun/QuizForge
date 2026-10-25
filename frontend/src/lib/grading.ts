import type { AnswerMap, Question } from '../types';

// 判分逻辑（纯函数）：PracticeSession 与 Dashboard 共用，保证统计与答题页口径一致。

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

  // 纯数字答案：用户输入中的完整数字串须恰好包含该值（"第1层"✓含"1"；"123"✗不匹配"12"）
  if (correct.match(/^\d+$/)) {
    const nums: string[] = user.match(/\d+/g) || [];
    if (nums.includes(correct)) return true;
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

// 统一判分入口：未作答 → false；按题型分派比较规则
export function gradeQuestion(q: Question, saved: string | string[] | undefined): boolean {
  if (saved === undefined) return false;
  if (q.type === 'choice') return saved === q.answer;
  if (q.type === 'multiple') {
    const std = q.answer as string[];
    const user = Array.isArray(saved) ? saved : [saved];
    return std.length === user.length && std.every(a => user.includes(a));
  }
  if (q.type === 'group') {
    if (!Array.isArray(saved)) return false;
    return (q.subQuestions || []).every((s, i) => saved[i] === s.answer);
  }
  const stdList = Array.isArray(q.answer) ? q.answer : [q.answer];
  const userList = Array.isArray(saved) ? saved : [saved];
  return stdList.every((std, idx) => checkBlankAnswer(userList[idx] || '', std));
}

export const isOptionsType = (t: string): boolean =>
  t === 'choice' || t === 'multiple' || t === 'group';

// 错题本：已作答且判错的题（由答题记录实时推导，无需额外存储）
export function collectWrongQuestions(questions: Question[], answers: AnswerMap): Question[] {
  return questions.filter(q => answers[q.id] !== undefined && !gradeQuestion(q, answers[q.id]));
}
