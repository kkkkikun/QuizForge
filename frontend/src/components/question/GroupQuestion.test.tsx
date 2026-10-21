import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GroupQuestion from './GroupQuestion';
import type { Question } from '../../types';

const groupQ: Question = {
  id: 9, type: 'group', question: 'Unit 1 · Conversation', tags: [], answer: '',
  subQuestions: [
    { question: '第 1 题', options: ['A. x', 'B. y'], answer: 'A' },
    { question: '第 2 题', options: ['A. x', 'B. y'], answer: 'B' },
  ],
};

describe('GroupQuestion 组题交互', () => {
  it('子题点选即锁，全组答完才保存', async () => {
    const onAnswer = vi.fn();
    render(<GroupQuestion question={groupQ} isAnswered={false} savedAnswer={undefined} onAnswer={onAnswer} />);

    // 第 1 题选 A：只答一半不保存
    await userEvent.click(screen.getAllByRole('button', { name: /A\. x/ })[0]);
    expect(onAnswer).not.toHaveBeenCalled();
    expect(screen.getAllByRole('button', { name: /A\. x/ })[0]).toBeDisabled();

    // 第 2 题选 B → 整组按子题顺序保存
    await userEvent.click(screen.getAllByRole('button', { name: /B\. y/ })[1]);
    expect(onAnswer).toHaveBeenCalledWith(['A', 'B']);
  });

  it('已保存的组展示重做按钮，重做触发回调', async () => {
    const onRedo = vi.fn();
    render(<GroupQuestion question={groupQ} isAnswered savedAnswer={['A', 'B']} onAnswer={vi.fn()} onRedo={onRedo} />);

    expect(screen.getByText('重做本组')).toBeInTheDocument();
    await userEvent.click(screen.getByText('重做本组'));
    expect(onRedo).toHaveBeenCalledTimes(1);
  });
});
