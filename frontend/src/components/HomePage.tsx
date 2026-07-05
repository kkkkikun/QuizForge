import { Link } from 'react-router-dom';
import { QUIZZES } from '../data';
import { BookOpen, ArrowRight, FileQuestion } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
      <nav className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-base tracking-tight text-slate-950">QuizForge 题库</span>
        </div>
      </nav>

      <main className="flex-grow px-4 md:px-6 py-10 max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">选择题库</h1>
          <p className="text-slate-500 text-sm mt-1">共 {QUIZZES.length} 个题库，点击进入刷题。进度按题库分别保存在本机。</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {QUIZZES.map(q => {
            const choice = q.questions.filter(x => x.type === 'choice' || x.type === 'multiple').length;
            const blank = q.questions.filter(x => x.type === 'blank').length;
            return (
              <Link
                to={`/quiz/${q.id}`}
                key={q.id}
                className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all flex flex-col gap-3"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <FileQuestion className="w-5 h-5 text-blue-600" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">{q.title}</h2>
                <p className="text-xs text-slate-500">共 {q.questions.length} 题 · 选择 {choice} · 填空 {blank}</p>
              </Link>
            );
          })}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 px-6 text-center text-xs text-slate-400">
        <div className="max-w-4xl mx-auto">
          <p>由 QuizForge 生成 · 规则 + LLM 解析</p>
        </div>
      </footer>
    </div>
  );
}
