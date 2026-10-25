import { test, expect } from '@playwright/test';

// E2E 冒烟：核心刷题闭环（首页 → 题库 → 答题 → 判分 → 错题卷）
test('首页 → db 题库 → 答一题 → 错题卷含该题', async ({ page }) => {
  await page.goto('/QuizForge/');
  await expect(page.getByText('选择题库')).toBeVisible();
  await expect(page.getByRole('link', { name: /数据库原理题库/ }).first()).toBeVisible();

  await page.getByRole('link', { name: /数据库原理题库/ }).first().click();
  await expect(page.getByRole('button', { name: /开始练习/ })).toBeVisible();

  // 进入答题：答第一题（B 为标准答案，选 A 制造错题）
  await page.getByRole('button', { name: /开始练习/ }).click();
  await page.getByRole('button', { name: /A\. / }).first().click();
  await expect(page.getByText('答错了!')).toBeVisible();

  // 返回 → 错题卷
  await page.getByRole('button', { name: '返回主页' }).click();
  await expect(page.getByRole('button', { name: /错题 \(1\)/ })).toBeVisible();
  await page.getByRole('button', { name: /错题 \(1\)/ }).click();
  await expect(page.getByText(/错题重刷进度/)).toBeVisible();

  // 进度持久化（localStorage）
  const stored = await page.evaluate(() => localStorage.getItem('quizforge-answers-db'));
  expect(stored).toBeTruthy();
});

test('模拟考试冒烟：配置 → 考试态不即时判分', async ({ page }) => {
  await page.goto('/QuizForge/');
  await page.getByRole('link', { name: /数据库原理题库/ }).first().click();
  await page.getByRole('button', { name: /开始练习/ }).waitFor();
  await page.getByText(/模拟考试/).click();
  await expect(page.getByText(/题库共 48 题/)).toBeVisible();
  await page.getByRole('button', { name: /^开始考试/ }).click();
  await page.getByText('单选题').first().waitFor();
  await page.getByRole('button', { name: /A\. / }).first().click();
  // 考试态不出现即时判分
  await expect(page.getByText('答错了!')).toHaveCount(0);
  await expect(page.getByText(/已答 1/)).toBeVisible();
});

test('在线转换页可达', async ({ page }) => {
  await page.goto('/QuizForge/convert');
  await expect(page.getByText('把复习资料变成刷题网页')).toBeVisible();
});
