export type QuestionType = 'choice' | 'multiple' | 'blank' | 'group';

// 练习筛选模式：全部 / 选择 / 填空 / 错题
export type FilterMode = 'all' | 'choice' | 'blank' | 'wrong';

// 答题记录：题目 id → 用户答案（单选为字母，多选/填空/组题为数组）
export type AnswerMap = { [qId: number]: string | string[] };

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
