// 浏览器端 PDF 文本提取（文字版）：pdfjs 逐页取文本 → 按行拼纯文本。
// 扫描版（每页取不到文本）抛错，由页面提示转存 docx。

export class ScannedPdfInBrowserError extends Error {
  constructor() {
    super('这个 PDF 几乎取不到文字（疑似扫描/图片版）。请用 WPS/Word 打开后另存为 .docx 再转换。');
    this.name = 'ScannedPdfInBrowserError';
  }
}

export async function extractPdfText(bytes: Uint8Array): Promise<string> {
  // node（vitest）用 legacy 构建自带 worker 处理；浏览器走 vite 的 ?url 资源
  const isNode = typeof window === 'undefined';
  const pdfjs: typeof import('pdfjs-dist') = isNode
    ? await import('pdfjs-dist/legacy/build/pdf.mjs')
    : await import('pdfjs-dist');
  if (!isNode) {
    pdfjs.GlobalWorkerOptions.workerSrc = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
  }

  const doc = await pdfjs.getDocument({ data: bytes }).promise;
  const pageTexts: string[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    // items 按位置排序后拼行：transform[5] 是 y，hasEOL 标记换行
    let line = '';
    const lines: string[] = [];
    for (const item of content.items as Array<{ str: string; hasEOL: boolean }>) {
      line += item.str;
      if (item.hasEOL) {
        lines.push(line.trimEnd());
        line = '';
      }
    }
    if (line) lines.push(line);
    pageTexts.push(lines.join('\n'));
  }
  const full = pageTexts.join('\n').trim();
  if (full.replace(/\s/g, '').length < 20) {
    throw new ScannedPdfInBrowserError();
  }
  return full;
}
