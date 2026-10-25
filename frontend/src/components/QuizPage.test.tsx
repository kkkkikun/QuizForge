import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import QuizPage from './QuizPage';

function renderQuiz(id: string) {
  render(
    <MemoryRouter initialEntries={[`/quiz/${id}`]}>
      <Routes>
        <Route path="/quiz/:id" element={<QuizPage />} />
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
});

describe('QuizPage 状态流转（真实 db 题库，无填空题）', () => {
  it('切到「填空」卷：开始按钮禁用，进入则空卷兜底', async () => {
    renderQuiz('db');
    await screen.findByRole('button', { name: /开始练习/ });
    await userEvent.click(screen.getByRole('button', { name: /开始练习/ }));
    await userEvent.click(screen.getAllByRole('button', { name: /A\. / })[0]);
    await userEvent.click(screen.getByText('返回主页'));
    await userEvent.click(screen.getByRole('button', { name: /填空 \(0\)/ }));
    // 空卷下显示「开始练习」且禁用（卷内 answered=0，isStarted 随卷计算）
    const start = screen.getByRole('button', { name: /开始练习/ });
    expect(start).toBeDisabled();
  });

  it('答错一题 → 错题卷含 1 题 → 可进入错题重刷', async () => {
    renderQuiz('db');
    await screen.findByRole('button', { name: /开始练习/ });
    await userEvent.click(screen.getByRole('button', { name: /开始练习/ }));
    await userEvent.click(screen.getAllByRole('button', { name: /A\. / })[0]);
    expect(await screen.findByText('答错了!')).toBeInTheDocument();
    await userEvent.click(screen.getByText('返回主页'));

    await userEvent.click(screen.getByRole('button', { name: /错题 \(1\)/ }));
    expect(screen.getByText(/错题重刷进度/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /刷题/ }));
    // 错题卷里还是那道题
    expect(await screen.findByText(/第 1 \/ 1 题/)).toBeInTheDocument();
    // 重做（group 才有重做按钮；单选走错题卷仍显示已答状态）
    expect(screen.getByText('答错了!')).toBeInTheDocument();
  });

  it('localStorage 持久化：答错后重进题库仍记录', async () => {
    renderQuiz('db');
    await screen.findByRole('button', { name: /开始练习/ });
    await userEvent.click(screen.getByRole('button', { name: /开始练习/ }));
    await userEvent.click(screen.getAllByRole('button', { name: /A\. / })[0]);
    expect(localStorage.getItem('quizforge-answers-db')).toBeTruthy();
  });
});

describe('Dashboard 统计', () => {
  it('进度与正确率随作答更新', async () => {
    renderQuiz('db');
    await screen.findByRole('button', { name: /开始练习/ });
    await userEvent.click(screen.getByRole('button', { name: /开始练习/ }));
    await userEvent.click(screen.getAllByRole('button', { name: /A\. / })[0]);  // 错
    await userEvent.click(screen.getByText('返回主页'));
    expect(screen.getByText('/ 48 题')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();  // 正确率 0
    expect(screen.getByText('答对 0，答错 1')).toBeInTheDocument();
  });
});
