export type QuestionType = 'choice' | 'multiple' | 'blank' | 'group';

export interface SubQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface Question {
  id: number;
  type: QuestionType;
  question: string;         // The question stem, e.g. "数据库技术的核心是"
  options?: string[];       // Options for multiple choice (['A. 数据', 'B. 数据库管理系统', ...])
  answer: string | string[]; // Standard answer. For choice, e.g. 'B'. For blank, string array of correct blanks.
  explanation?: string;     // Short explanation/remarks
  tags: string[];           // Topics, e.g. "数据库系统基础" or "SQL常用查询"
  subQuestions?: SubQuestion[];  // group 题型的子题
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}
