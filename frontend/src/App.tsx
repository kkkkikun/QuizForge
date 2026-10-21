import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import AboutPage from './components/AboutPage';

// 与 vite base 一致（dev 与 Pages 部署都用 /QuizForge/）
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

// key=id：切换题库时重挂载 QuizPage，视图状态与答题记录随之重新初始化
function QuizRoute() {
  const { id } = useParams<{ id: string }>();
  return <QuizPage key={id} />;
}

export default function App() {
  return (
    <BrowserRouter basename={BASE}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz/:id" element={<QuizRoute />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}
