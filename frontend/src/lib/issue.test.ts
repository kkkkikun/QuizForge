import { buildQuestionIssueUrl } from './issue';
import type { Question } from '../types';

const q: Question = {
  id: 123, type: 'choice', question: '数据库技术的核心是[DBMS]', tags: [],
  options: ['A. 数据', 'B. 数据库管理系统'], answer: 'B',
};

describe('buildQuestionIssueUrl 错题反馈链接', () => {
  it('指向题库纠错模板并预填全部定位字段', () => {
    const url = buildQuestionIssueUrl('db', '数据库原理题库', q);
    expect(url.startsWith('https://github.com/kkkkikun/QuizForge/issues/new?')).toBe(true);
    expect(url).toContain('template=question-error.yml');
    expect(url).toContain('quiz_id=db');
    expect(url).toContain('question_id=123');
  });

  it('标题含题库与题号，题干摘要被安全编码', () => {
    const url = buildQuestionIssueUrl('cet4', '大英四级速记（CET-4）', q);
    const params = new URLSearchParams(url.split('?')[1]);
    expect(params.get('title')).toBe('[题库纠错] 大英四级速记（CET-4） · #123');
    expect(params.get('quiz_id')).toBe('cet4');
    expect(params.get('stem')).toBe('数据库技术的核心是[DBMS]');
  });
});
