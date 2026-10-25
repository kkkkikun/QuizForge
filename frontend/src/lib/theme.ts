// 主题（浅色/深色）：localStorage 记忆，未设置时跟随系统
export type Theme = 'light' | 'dark';

const KEY = 'quizforge-theme';

export function getStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

export function setTheme(theme: Theme) {
  try { localStorage.setItem(KEY, theme); } catch { /* ignore */ }
  applyTheme(theme);
}

export function initTheme() {
  const stored = getStoredTheme();
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  applyTheme(stored ?? (prefersDark ? 'dark' : 'light'));
}
