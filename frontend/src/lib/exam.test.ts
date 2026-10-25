import { pickExamQuestions, scoreExam, formatClock, shuffleExam } from './exam';
import type { Question } from '../types';

const q = (id: number): Question => ({
  id, type: 'choice', question: `题${id}`, tags: [],
  options: ['A. x', 'B. y', 'C. z', 'D. w'], answer: 'B',
});

describe('exam 模拟考试逻辑', () => {
  it('pickExamQuestions：抽样不超过总量、顺序按原题序', () => {
    const all = Array.from({ length: 30 }, (_, i) => q(i + 1));
    const picked = pickExamQuestions(all, 10);
    expect(picked).toHaveLength(10);
    const ids = picked.map(x => x.id);
    expect([...ids].sort((a, b) => a - b)).toEqual(ids);  // 保持原顺序
    expect(new Set(ids).size).toBe(10);                    // 无重复
    expect(pickExamQuestions(all, 100)).toHaveLength(30);  // 超量=全量乱序
  });

  it('scoreExam：只统计已作答，判分走统一规则', () => {
    const all = [q(1), q(2), q(3)];
    const score = scoreExam(all, { 1: 'B', 2: 'A' });  // 第3题未答
    expect(score).toEqual({ total: 3, answered: 2, correct: 1 });
  });

  it('formatClock', () => {
    expect(formatClock(0)).toBe('00:00');
    expect(formatClock(65)).toBe('01:05');
    expect(formatClock(-5)).toBe('00:00');
  });

  it('shuffleExam 不改原数组且元素一致', () => {
    const arr = [1, 2, 3, 4, 5];
    const out = shuffleExam(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
    expect([...out].sort()).toEqual(arr);
  });
});
