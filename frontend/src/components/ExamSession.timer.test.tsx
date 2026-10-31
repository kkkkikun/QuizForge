import { act, fireEvent, render, screen } from '@testing-library/react';
import ExamSession from './ExamSession';

const QUESTIONS = [
  { id: 1, type: 'choice' as const, question: '1+1=?', options: ['A. 1', 'B. 2'], answer: 'B', tags: [] },
  { id: 2, type: 'choice' as const, question: '2+2=?', options: ['A. 3', 'B. 4'], answer: 'B', tags: [] },
];

function setup(durationMin = 1) {
  const onSubmit = vi.fn();
  const onExit = vi.fn();
  render(
    <ExamSession questions={QUESTIONS} durationMin={durationMin} onSubmit={onSubmit} onExit={onExit} />
  );
  return { onSubmit, onExit };
}

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

it('倒计时不因作答而停滞：快速作答后剩余时间仍按秒递减', () => {
  vi.useFakeTimers();
  setup(1);
  expect(screen.getByText('01:00')).toBeInTheDocument();

  act(() => { vi.advanceTimersByTime(1000); });
  expect(screen.getByText('00:59')).toBeInTheDocument();

  // 半秒后作答 —— 旧实现会在这里重建 interval，把 1 秒刻度重置，剩余时间停住
  act(() => { vi.advanceTimersByTime(500); });
  act(() => { fireEvent.click(screen.getByRole('button', { name: /B\. 2/ })); });

  act(() => { vi.advanceTimersByTime(500); });
  expect(screen.getByText('00:58')).toBeInTheDocument();
});

it('倒计时 interval 只创建一次，不随作答重建', () => {
  vi.useFakeTimers();
  const setSpy = vi.spyOn(globalThis, 'setInterval');
  setup(1);
  const created = setSpy.mock.calls.length;
  expect(created).toBeGreaterThan(0);

  act(() => { fireEvent.click(screen.getByRole('button', { name: /B\. 2/ })); });
  act(() => { fireEvent.click(screen.getByRole('button', { name: /下一题/ })); });
  act(() => { fireEvent.click(screen.getByRole('button', { name: /B\. 4/ })); });

  expect(setSpy.mock.calls.length).toBe(created);
});
