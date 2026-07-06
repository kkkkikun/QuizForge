"""共享正则模式（ingest / parse 复用）。"""

import re

# 章节标题：选择题 / 单选题 / 多选题 / 填空题 / 判断题 / 简答题 / 计算题 …
SECTION_HEADER_RE = re.compile(r"^(选择|单选|多选|填空|判断|简答|计算|应用|综合)题")

# 选项起点：行首或空白/Tab 后的 A-D + 分隔符(. 、 ))
OPTION_START_RE = re.compile(r"(?:^|[\t ])([A-D])([.、)])\s*")

# 题首序号：1. / 1、 / 1)
QUESTION_NUM_RE = re.compile(r"^\s*\d+[.、)]?\s*")

# 内联答案：括号内仅含 A-D 字母（如 (B) / （AC）），不限位置
PAREN_ANSWER_RE = re.compile(r"[（(]\s*([A-D]{1,4})\s*[)）]")

# 行级答案：答案：B / 正确答案：AC / 答：B
ANSWER_LINE_RE = re.compile(r"(?:正确答案|参考答案|答案|答)\s*[:：]\s*([A-D]{1,4})")

# 填空标记：___ / （ ） / ( ) / 〔 〕
BLANK_RE = re.compile(r"_{2,}|[（(]\s*[)）]|〔\s*〕")

# 解析/解答/分析（题后说明文字，MVP 默认丢弃）
EXPLAIN_RE = re.compile(r"(?:解析|【解析】|分析\s*[:：]|解答\s*[:：])")

# 分值标记（N分）→ 大题/计算题特征
SCORE_RE = re.compile(r"[（(]\s*\d+\s*分\s*[)）]")

# CET 题库模块/题型标题（顶层分节）
CET_SECTION_RE = re.compile(
    r"^(听力|阅读|综合训练|翻译|写作|十五选十|匹配|选词填空|仔细阅读|长篇阅读)$"
)
# CET 子分组（Unit / News report / Passage 等，作题干上下文，不分新节）
CET_SUBCONTEXT_RE = re.compile(
    r"^(Unit\s*\d+|News report\s*\d+|Passage\s*\d+|Conversation\s*\d+|Section\s+[A-Z])$"
)
# 答案序列行（匹配题：空格分隔的数字/字母 A-O，≥2 个 token）
ANSWER_SEQ_RE = re.compile(r"^(?:\d{1,2}|[A-O])(?:\s+(?:\d{1,2}|[A-O]))+\s*$")
