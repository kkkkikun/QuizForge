import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, ShieldCheck, Flag, FilePlus2, Github } from 'lucide-react';

const ISSUE_NEW = 'https://github.com/kkkkikun/QuizForge/issues/new';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <nav className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-30 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors min-h-11">
            <ArrowLeft size={16} /> 返回题库
          </Link>
          <span className="inline-flex items-center gap-2">
            <span className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </span>
            <span className="font-bold text-sm tracking-tight text-slate-950">关于 QuizForge</span>
          </span>
        </div>
      </nav>

      <main className="flex-grow px-4 py-8 max-w-3xl mx-auto w-full space-y-6">
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <h2 className="font-bold text-lg">这是什么</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            QuizForge 把老师的复习资料（Word / PDF）一键转换成可刷题的网页：只保留「核对答案 + 无限重做」，
            专为期末突击复习设计。进度按题库保存在本机，随时回来继续。
          </p>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <h2 className="font-bold text-lg">怎么用</h2>
          <ol className="text-sm text-slate-600 leading-relaxed list-decimal pl-5 space-y-1.5">
            <li>首页选择题库进入，按题型分卷练习（全部 / 选择 / 填空）</li>
            <li>单选点选即判，多选和填空提交后核对，答错的题进「错题」卷可反复重刷</li>
            <li>题目导航网格里绿色=答对、红色=答错，点任意格子直接跳题</li>
          </ol>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <h2 className="font-bold text-lg flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-600" /> 隐私说明</h2>
          <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-5 space-y-1.5">
            <li>你的答题进度只保存在<b>你自己的设备</b>（浏览器 localStorage），不注册、不上传、无统计</li>
            <li>清空浏览器数据会清空进度；不同设备/浏览器之间不同步</li>
            <li>题目内容来自你上传给站长（课程负责人）的复习资料，仅在生成题库时处理</li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <h2 className="font-bold text-lg">发现问题 / 想要新题库</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`${ISSUE_NEW}?template=new-quiz.yml`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all"
            >
              <FilePlus2 size={16} /> 请求新题库
            </a>
            <a
              href={`${ISSUE_NEW}?template=question-error.yml`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200 hover:border-rose-300 hover:text-rose-600 text-slate-700 font-semibold text-sm rounded-xl transition-all"
            >
              <Flag size={16} /> 反馈题目错误
            </a>
          </div>
          <p className="text-xs text-slate-400">
            提示：刷题时每道题卡片底部都有「这道题有问题？」按钮，会自动带上题库和题号。
          </p>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <h2 className="font-bold text-lg flex items-center gap-2"><Github size={18} /> 开源</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            QuizForge 是开源项目（MIT 协议），解析引擎与答题站点代码见{' '}
            <a href="https://github.com/kkkkikun/QuizForge" target="_blank" rel="noreferrer" className="text-blue-600 font-semibold hover:underline">
              github.com/kkkkikun/QuizForge
            </a>
            ，欢迎 Issue 和 PR。
          </p>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 px-6 text-center text-xs text-slate-400">
        <div className="max-w-3xl mx-auto"><p>© 2026 QuizForge · 由 QuizForge 生成</p></div>
      </footer>
    </div>
  );
}
