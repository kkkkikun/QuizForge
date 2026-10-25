import type { AnswerMap, Question } from '../types';
import { gradeQuestion } from './grading';

// 模拟考试核心逻辑：随机组卷 + 计时 + 成绩

export interface ExamConfig {
  count: number;        // 抽题数
  durationMin: number;  // 时长（分钟）
}

export function pickExamQuestions(questions: Question[], count: number): Question[] {
  if (count >= questions.length) return shuffleExam([...questions]);
  const pool = shuffleExam([...questions]);
  return pool.slice(0, count).sort((a, b) => a.id - b.id);  // 抽出后按原顺序作答
}

export function shuffleExam<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface ExamScore {
  total: number;
  answered: number;
  correct: number;
}

export function scoreExam(questions: Question[], answers: AnswerMap): ExamScore {
  let correct = 0, answered = 0;
  for (const q of questions) {
    const a = answers[q.id];
    const done = a !== undefined && (Array.isArray(a) ? a.length > 0 : a !== '');
    if (!done) continue;
    answered++;
    if (gradeQuestion(q, a)) correct++;
  }
  return { total: questions.length, answered, correct };
}

export function formatClock(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}
