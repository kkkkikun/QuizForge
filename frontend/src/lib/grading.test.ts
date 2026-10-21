import { checkBlankAnswer, gradeQuestion, isOptionsType } from './grading';
import type { Question } from '../types';

const single: Question = {
  id: 1, type: 'choice', question: '核心是', tags: [],
  options: ['A. 数据', 'B. 数据库', 'C. 系统', 'D. 应用'], answer: 'B',
};

const multi: Question = {
  id: 2, type: 'multiple', question: '选关系型', tags: [],
  options: ['A. MySQL', 'B. Redis', 'C. PostgreSQL'], answer: ['A', 'C'],
};

const blank: Question = {
  id: 3, type: 'blank', question: '三级结构是指[模式]', tags: [], answer: ['外模式/模式'],
};

const group: Question = {
  id: 4, type: 'group', question: 'Unit 1 · Passage', tags: [], answer: '',
  subQuestions: [
    { question: '第 1 题', options: ['A. x', 'B. y'], answer: 'A' },
    { question: '第 2 题', options: ['A. x', 'B. y'], answer: 'B' },
  ],
};

describe('gradeQuestion 统一判分', () => {
  it('未作答一律判错（不计正确率）', () => {
    expect(gradeQuestion(single, undefined)).toBe(false);
    expect(gradeQuestion(blank, undefined)).toBe(false);
  });

  it('单选：严格字母比较', () => {
    expect(gradeQuestion(single, 'B')).toBe(true);
    expect(gradeQuestion(single, 'A')).toBe(false);
  });

  it('多选：集合相等（全选对/漏选/多选/错选均错）', () => {
    expect(gradeQuestion(multi, ['A', 'C'])).toBe(true);
    expect(gradeQuestion(multi, ['C', 'A'])).toBe(true);
    expect(gradeQuestion(multi, ['A'])).toBe(false);
    expect(gradeQuestion(multi, ['A', 'B', 'C'])).toBe(false);
    expect(gradeQuestion(multi, ['A', 'B'])).toBe(false);
  });

  it('组题：子题按位置逐一比较，全对才算对', () => {
    expect(gradeQuestion(group, ['A', 'B'])).toBe(true);
    expect(gradeQuestion(group, ['A', 'A'])).toBe(false);
    expect(gradeQuestion(group, ['A'])).toBe(false);
    expect(gradeQuestion(group, 'A')).toBe(false);
  });

  it('填空：走容错比较', () => {
    expect(gradeQuestion(blank, ['外模式/模式'])).toBe(true);
    expect(gradeQuestion(blank, ['外模式'])).toBe(true);
    expect(gradeQuestion(blank, ['内模式'])).toBe(false);
  });

  it('checkBlankAnswer 空输入判错（冒烟）', () => {
    expect(checkBlankAnswer('', 'x')).toBe(false);
  });

  it('isOptionsType 题型归类', () => {
    expect(isOptionsType('choice')).toBe(true);
    expect(isOptionsType('group')).toBe(true);
    expect(isOptionsType('blank')).toBe(false);
  });
});
