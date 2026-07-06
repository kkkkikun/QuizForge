"""数据模型：Block（摄取产物）、Question / Quiz（解析产物）。

层间靠这些数据类解耦：摄取 → Block 流；解析 → Quiz；渲染读 Quiz。
"""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class Block:
    """摄取层统一中间表示。"""

    source: str            # "docx" | "pdf" | "txt"
    style: str             # 样式名 / "text"
    text: str
    kind: str = "para"     # heading | para | table | image
    highlight: str = ""    # 被高亮（如黄色）的文本，用于标记答案


@dataclass
class Question:
    id: int
    type: str = ""                          # single | multiple | blank
    section: str = ""
    stem: str = ""
    options: dict[str, str] | None = None   # blank 题为 None
    answer: list[str] = field(default_factory=list)        # 恒为数组
    accepted: list[str] = field(default_factory=list)      # 填空备选可接受答案
    tolerant: bool = False                                  # 填空容错匹配
    low_confidence: bool = False
    note: str | None = None                                # 如「本题含图，已省略」
    source: str = "rule"                                   # rule | llm（结构化来源）
    sub_questions: list = field(default_factory=list)      # group 题型的子题列表


@dataclass
class Quiz:
    title: str = ""
    source_file: str = ""
    questions: list[Question] = field(default_factory=list)
    ignored_summary: dict[str, int] = field(default_factory=dict)
