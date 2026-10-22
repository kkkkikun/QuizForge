import { render, screen } from '@testing-library/react';
import PracticeSession from './PracticeSession';
import type { Question } from '../types';

const imgQ: Question = {
  id: 11, type: 'choice', question: '图示为静电除尘的原理示意图，尘埃受力方向为',
  tags: [], answer: 'A',
  options: ['A. 与电场方向相同', 'B. 与电场方向相反'],
  images: ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUg'],
};

const list = [imgQ];

describe('PracticeSession 题目配图渲染', () => {
  it('带 images 的题在题干下渲染 <img>（data URI）', () => {
    render(
      <PracticeSession
        questionsList={list}
        initialIndex={0}
        userAnswers={{}}
        quizId="thermal"
        quizTitle="热物理"
        onAnswer={() => {}}
        onExit={() => {}}
      />,
    );
    const img = screen.getByAltText('题目配图 1');
    expect(img).toHaveAttribute('src', imgQ.images![0]);
  });

  it('无 images 的题不渲染图片占位', () => {
    const plain = { ...imgQ, id: 12, images: undefined };
    render(
      <PracticeSession
        questionsList={[plain]}
        initialIndex={0}
        userAnswers={{}}
        quizId="thermal"
        quizTitle="热物理"
        onAnswer={() => {}}
        onExit={() => {}}
      />,
    );
    expect(screen.queryByAltText('题目配图 1')).not.toBeInTheDocument();
  });
});
