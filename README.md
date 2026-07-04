# QuizForge

期末选填题速刷工具：输入 Word/PDF 复习资料 → Agent 解析（规则 + LLM 兜底 + 滤噪）→ **单文件自包含静态网页**，只保留「核对答案 + 无限重做」。

## 安装
```bash
uv sync
```

## 使用
```bash
uv run quizforge ./data/数据库原理题库.docx        # → 数据库原理题库.html，双击即开
```

LLM 兜底为**可选增强**（不配也能跑，纯规则 + 标记存疑）：
```bash
export LLM_API_KEY=sk-xxx          # 或 DEEPSEEK_API_KEY
export LLM_BASE_URL=https://api.deepseek.com   # 默认即此
export LLM_MODEL=deepseek-chat     # 中转模型按实际填
```

## 常用选项
- `-o <path>`：输出路径
- `--no-llm`：强制纯规则
- `--interactive`：低置信题目逐题确认
- `--keep-explanation`：保留「解析」为折叠块
- `--no-shuffle`：不乱序

## 开发
```bash
uv run pytest                      # 测试（两份 data/*.docx 为回归基线）
```
设计见 `openspec/changes/quizforge-mvp/design.md`。
