import type { Question } from '../types';

// 错题反馈：预填 GitHub Issue（题库纠错模板字段 id 与 .github/ISSUE_TEMPLATE/question-error.yml 对齐）

const ISSUE_NEW = 'https://github.com/kkkkikun/QuizForge/issues/new';

export function buildIssueNewUrl(): string {
  return `${ISSUE_NEW}?template=feature.yml`;
}

export function buildQuestionIssueUrl(quizId: string, quizTitle: string, q: Question): string {
  const params = new URLSearchParams({
    template: 'question-error.yml',
    title: `[题库纠错] ${quizTitle} · #${q.id}`,
    quiz_id: quizId,
    question_id: String(q.id),
    stem: q.question.slice(0, 120),
  });
  return `${ISSUE_NEW}?${params.toString()}`;
}
