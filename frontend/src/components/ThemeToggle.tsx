import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { getStoredTheme, setTheme } from '../lib/theme';

// 深浅色切换：默认跟随系统，点击切换并记忆
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [dark, setDark] = useState<boolean>(() =>
    getStoredTheme()
      ? getStoredTheme() === 'dark'
      : document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    if (!getStoredTheme()) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const onChange = () => { setDark(mq.matches); };
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    setTheme(next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? '切换到浅色模式' : '切换到深色模式'}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer ${className}`}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
