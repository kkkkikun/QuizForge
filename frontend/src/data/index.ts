import type { Quiz } from '../types';

// 由 quizforge --react-frontend 生成：清单（轻量）+ 各题库独立 JSON 按需加载
export interface QuizMeta {
  id: string;
  title: string;
  questionCount: number;
  choice: number;
  blank: number;
}

export const QUIZZES: QuizMeta[] = [
  {
    "id": "db",
    "title": "数据库原理题库",
    "questionCount": 48,
    "choice": 48,
    "blank": 0
  },
  {
    "id": "net",
    "title": "2026年重点复习题库",
    "questionCount": 68,
    "choice": 49,
    "blank": 19
  },
  {
    "id": "cet4",
    "title": "大英四级速记（CET-4）",
    "questionCount": 32,
    "choice": 28,
    "blank": 4
  },
  {
    "id": "thermal",
    "title": "热物理在工程技术中的应用",
    "questionCount": 9,
    "choice": 8,
    "blank": 1
  }
];

const modules = import.meta.glob<{ default: Quiz }>('./*.json');
const cache: Record<string, Quiz> = {};

export async function getQuiz(id: string): Promise<Quiz | undefined> {
  if (cache[id]) return cache[id];
  const load = modules[`./${id}.json`];
  if (!load) return undefined;
  cache[id] = (await load()).default;
  return cache[id];
}
