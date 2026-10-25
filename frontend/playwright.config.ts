import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  retries: 1,
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:4173/QuizForge/',
    // 本地无 playwright 下载网络时，可直接复用系统 chromium：PW_CHROME=/path/to/chrome
    // channel chromium：headless 用完整浏览器而非独立 headless-shell（便于 executablePath 复用）
    channel: process.env.PW_CHROME ? 'chromium' : undefined,
    launchOptions: {
      executablePath: process.env.PW_CHROME || undefined,
      args: ['--no-sandbox'],
    },
  },
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: 'npm run preview -- --port 4173 --strictPort',
        url: 'http://localhost:4173/QuizForge/',
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
});
