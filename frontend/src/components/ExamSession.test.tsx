import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import QuizPage from './QuizPage';

// 模拟考试全流程：配置 → 作答（不即时判分）→ 交卷 → 成绩单
function setup() {
  render(
    <MemoryRouter initialEntries={['/quiz/db']}>
      <Routes><Route path="/quiz/:id" element={<QuizPage />} /></Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
  vi.spyOn(window, 'confirm').mockReturnValue(true);
});

it('完整考试流程：开始 → 答对/答错 → 交卷 → 成绩单回看', async () => {
  setup();
  await screen.findByRole('button', { name: /开始练习/ });
  await userEvent.click(screen.getByText(/模拟考试/));

  // 配置页：默认 10 题/20 分钟（db 48 题）
  expect(screen.getByText(/题库共 48 题/)).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: /^开始考试/ }));

  // 考试态：第一题答 B（正确）
  await screen.findByText('单选题');
  await userEvent.click(screen.getAllByRole('button', { name: /B\. / })[0]);
  // 不应出现即时判分
  expect(screen.queryByText('答对了!')).not.toBeInTheDocument();

  // 下一题答 A（db 第二题答案非 A 即错——直接点 A）
  await userEvent.click(screen.getByRole('button', { name: /下一题/ }));
  await userEvent.click(screen.getAllByRole('button', { name: /A\. / })[0]);

  // 交卷（最后一题才显示交卷？在中间题直接「直接交卷」不可见——用退出考试 confirm 交卷？
  // 走到底部：先验证进度指示
  expect(screen.getByText(/已答 2/)).toBeInTheDocument();
  // 跳到最后一题交卷：点「下一题」直到出现交卷（10 题，逐题点击成本高——直接触发末题）
  for (let i = 0; i < 10; i++) {
    const next = screen.queryByRole('button', { name: /下一题/ });
    if (!next) break;
    await userEvent.click(next);
  }
  await userEvent.click(screen.getByRole('button', { name: '交卷' }));

  // 成绩单
  const summary = await screen.findByText(/正确率 \d+% · 作答 2 题/);
  expect(summary).toBeInTheDocument();
  expect(screen.getByText('再来一场')).toBeInTheDocument();
}, 30000);
