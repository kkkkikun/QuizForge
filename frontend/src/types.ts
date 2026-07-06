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

export interface QuizSession {
  sessionId: string;
  startTime: number;
  endTime?: number;
  type: 'choice' | 'blank' | 'mixed';
  questions: Question[];
  userAnswers: { [questionId: string]: string | string[] }; // user answers indexed by question id (as string)
  score: number;
  isCompleted: boolean;
  scoringHistory?: { questionId: number; isCorrect: boolean }[];
}

export interface WrongQuestionItem {
  questionId: number;
  type: QuestionType;
  wrongCount: number;
  lastAttemptTime: number;
  userAnswer: string | string[];
}

export interface UserStats {
  totalPracticeCount: number; // overall questions answered counter
  totalCorrectCount: number;
  sessionsCompletedCount: number;
  choiceProgress: number; // how many total distinct choices practiced
  blankProgress: number;  // how many total distinct blanks practiced
}
