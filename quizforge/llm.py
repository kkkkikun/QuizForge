"""LLM 兜底层：可配置 OpenAI 兼容客户端；无 key 自动降级（不调用）。

配置来源（优先级：构造参数 > 环境变量 > 默认）：
- LLM_API_KEY 或 DEEPSEEK_API_KEY
- LLM_BASE_URL（默认 https://api.deepseek.com）
- LLM_MODEL（默认 deepseek-chat；中转模型按实际填，如 v4-flash）
"""

from __future__ import annotations

import json
import os
import re

_DEFAULT_BASE_URL = "https://api.deepseek.com"
_DEFAULT_MODEL = "deepseek-chat"

_PROMPT_TEMPLATE = """你是题库解析助手。判断下面这段【文档原文】是不是一道「单选/多选/填空」题目。
- 若是题目：抽取为结构化 JSON，字段：is_question(true), type("single"|"multiple"|"blank"), stem(题干，去掉题号与答案标记), options(选择题给 {"A":"...","B":"..."}，填空给 null), answer(答案字母数组如 ["B"] 或填空的可接受答案数组)。
- 若不是题目（知识点说明/前言/章节标题/大题题干等）：返回 {"is_question": false, "category": "knowledge"|"header"|"essay"}。
只输出一个 JSON 对象，不要任何解释或代码块标记。

文档原文：
{block}
"""


class LLMConfig:
    def __init__(
        self,
        base_url: str | None = None,
        model: str | None = None,
        api_key: str | None = None,
        enabled: bool = True,
    ):
        self.base_url = base_url or os.getenv("LLM_BASE_URL", _DEFAULT_BASE_URL)
        self.model = model or os.getenv("LLM_MODEL", _DEFAULT_MODEL)
        self.api_key = (
            api_key
            or os.getenv("LLM_API_KEY")
            or os.getenv("DEEPSEEK_API_KEY")
        )
        self.enabled = enabled

    @classmethod
    def from_args(
        cls,
        no_llm: bool = False,
        base_url: str | None = None,
        model: str | None = None,
        api_key: str | None = None,
    ) -> "LLMConfig":
        return cls(base_url=base_url, model=model, api_key=api_key, enabled=not no_llm)

    def available(self) -> bool:
        return self.enabled and bool(self.api_key)


class LLMClient:
    def __init__(self, config: LLMConfig):
        self.config = config

    def adjudicate(self, block_text: str) -> dict | None:
        """让 LLM 判定一段原文：返回结构化 dict 或 None（不可用/解析失败）。"""
        if not self.config.available():
            return None
        prompt = _PROMPT_TEMPLATE.replace("{block}", block_text)
        raw = self._complete(prompt)
        return _parse_json(raw)

    def _complete(self, prompt: str) -> str:
        """实际调用 OpenAI 兼容接口（可被子类/测试覆盖）。"""
        from openai import OpenAI

        client = OpenAI(api_key=self.config.api_key, base_url=self.config.base_url)
        resp = client.chat.completions.create(
            model=self.config.model,
            messages=[{"role": "user", "content": prompt}],
            temperature=0,
        )
        return resp.choices[0].message.content or ""


_FENCE_RE = re.compile(r"```(?:json)?\s*(.*?)```", re.DOTALL)


def _parse_json(text: str) -> dict | None:
    if not text:
        return None
    m = _FENCE_RE.search(text)
    candidate = m.group(1) if m else text
    candidate = candidate.strip()
    # 容错：截取第一个 { 到最后一个 }
    start, end = candidate.find("{"), candidate.rfind("}")
    if start != -1 and end != -1 and end > start:
        candidate = candidate[start : end + 1]
    try:
        obj = json.loads(candidate)
    except json.JSONDecodeError:
        return None
    return obj if isinstance(obj, dict) else None
