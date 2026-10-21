import { checkBlankAnswer, renderQuestionStem } from './PracticeSession';
import { render, screen } from '@testing-library/react';

describe('checkBlankAnswer 填空容错判分', () => {
  it('完全一致判对', () => {
    expect(checkBlankAnswer('数据库管理系统', '数据库管理系统')).toBe(true);
  });

  it('忽略大小写与首尾空格', () => {
    expect(checkBlankAnswer('  dbms ', 'DBMS')).toBe(true);
  });

  it('忽略引号差异', () => {
    expect(checkBlankAnswer("'E-R图'", '"e-r图"')).toBe(true);
  });

  it('容忍空格差异（匹配题数字串）', () => {
    expect(checkBlankAnswer('791', '7 9 1')).toBe(true);
    expect(checkBlankAnswer('7 9 1', '791')).toBe(true);
  });

  it('容错后缀剥离（系统/阶段/模型等）', () => {
    expect(checkBlankAnswer('关系', '关系系统')).toBe(true);
    expect(checkBlankAnswer('概念', '概念阶段')).toBe(true);
  });

  it('斜杠分隔备选答案', () => {
    expect(checkBlankAnswer('E-R模型', 'E-R图/E-R模型')).toBe(true);
    expect(checkBlankAnswer('E-R图', 'E-R图/E-R模型')).toBe(true);
  });

  it('「或」分隔备选答案', () => {
    expect(checkBlankAnswer('SELECT', 'SET或SELECT')).toBe(true);
  });

  it('纯数字答案支持包含匹配', () => {
    expect(checkBlankAnswer('第1层', '1')).toBe(true);
  });

  it('半角括号缩写：全称或缩写均可', () => {
    expect(checkBlankAnswer('DBMS', '数据库管理系统(DBMS)')).toBe(true);
    expect(checkBlankAnswer('数据库管理系统', '数据库管理系统(DBMS)')).toBe(true);
  });

  it('全角括号缩写：全称或缩写均可', () => {
    expect(checkBlankAnswer('DBMS', '数据库管理系统（DBMS）')).toBe(true);
  });

  it('空输入判错', () => {
    expect(checkBlankAnswer('', '答案')).toBe(false);
  });

  it('错误答案判错', () => {
    expect(checkBlankAnswer('网状模型', '关系模型')).toBe(false);
  });
});

describe('renderQuestionStem 填空空位渲染', () => {
  it('未作答时隐藏答案、显示空位占位', () => {
    render(<>{renderQuestionStem('数据库的三级结构是指[三级模式]', 'blank', false)}</>);
    expect(screen.queryByText('三级模式')).not.toBeInTheDocument();
    expect(screen.getByText(/\(\s+\)/)).toBeInTheDocument();
    expect(screen.getByText(/数据库的三级结构是指/)).toBeInTheDocument();
  });

  it('作答后揭示答案', () => {
    render(<>{renderQuestionStem('数据库的三级结构是指[三级模式]', 'blank', true)}</>);
    expect(screen.getByText('三级模式')).toBeInTheDocument();
    expect(screen.queryByText('(  )')).not.toBeInTheDocument();
  });

  it('非填空题原样渲染题干', () => {
    render(<>{renderQuestionStem('1+[答案] 等于几？', 'choice', false)}</>);
    expect(screen.getByText('1+[答案] 等于几？')).toBeInTheDocument();
  });
});
