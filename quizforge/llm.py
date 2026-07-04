"""LLM 兜底层：兼容 OpenAI 系（DeepSeek / OpenAI / 中转）与 Anthropic（A社）。

Provider 判定（优先级：构造参数 > 环境变量 > 默认）：
- LLM_PROVIDER=openai|anthropic（显式强制）
- 否则：设了 ANTHROPIC_API_KEY → anthropic；设了 LLM/DEEPSEEK/OPENAI_API_KEY → openai

各 provider 的 key / base_url / model：
- openai：LLM_API_KEY 或 DEEPSEEK_API_KEY 或 OPENAI_API_KEY；
          base_url 默认 https://api.deepseek.com；model 默认 deepseek-chat
- anthropic：ANTHROPIC_API_KEY 或 LLM_API_KEY；base_url 默认官方；model 默认 claude-haiku-4-5-20251001
"""

from __future__ import annotations

import json
import os
import re

_OAI_BASE_URL = "https://api.deepseek.com"
_OAI_MODEL = "deepseek-chat"
_ANT_MODEL = "claude-haiku-4-5-20251001"

_PROMPT_TEMPLATE = """你是题库解析助手。判断下面这段【文档原文】是不是一道「单选/多选/填空」题目。
- 若是题目：抽取为结构化 JSON，字段：is_question(true), type("single"|"multiple"|"blank"), stem(题干，去掉题号与答案标记), options(选择题给 {"A":"...","B":"..."}，填空给 null), answer(答案字母数组如 ["B"] 或填空的可接受答案数组)。
- 若不是题目（知识点说明/前言/章节标题/大题题干等）：返回 {"is_question": false, "category": "knowledge"|"header"|"essay"}。
只输出一个 JSON 对象，不要任何解释或代码块标记。

文档原文：
{block}
"""

_EXTRACT_TEMPLATE = """从下面【文本】中提取所有「单选/多选/填空」题目，输出为 JSON 数组。
每题字段：type("single"|"multiple"|"blank"), stem(题干，去掉题号与答案标记), options(选择题给 {"A":"...","B":"..."}，填空给 null), answer(答案数组，选择题给字母如 ["B"]，填空给可接受答案)。
只输出 JSON 数组，不要解释或代码块标记；若没有任何题目，输出 []。

文本：
{block}
"""


def _detect_provider(api_key: str | None) -> str:
    explicit = os.getenv("LLM_PROVIDER")
    if explicit:
        return explicit.lower()
    if os.getenv("ANTHROPIC_API_KEY"):
        return "anthropic"
    if api_key or os.getenv("LLM_API_KEY") or os.getenv("DEEPSEEK_API_KEY") or os.getenv("OPENAI_API_KEY"):
        return "openai"
    return "openai"


class LLMConfig:
    def __init__(
        self,
        provider: str | None = None,
        base_url: str | None = None,
        model: str | None = None,
        api_key: str | None = None,
        enabled: bool = True,
        max_calls: int | None = None,
    ):
        self.provider = (provider or _detect_provider(api_key)).lower()
        self.max_calls = max_calls
        self.enabled = enabled
        if self.provider == "anthropic":
            self.api_key = api_key or os.getenv("ANTHROPIC_API_KEY") or os.getenv("LLM_API_KEY")
            self.base_url = base_url or os.getenv("LLM_BASE_URL") or None
            self.model = model or os.getenv("LLM_MODEL") or _ANT_MODEL
        else:  # openai 系
            self.api_key = (
                api_key or os.getenv("LLM_API_KEY") or os.getenv("DEEPSEEK_API_KEY")
                or os.getenv("OPENAI_API_KEY")
            )
            self.base_url = base_url or os.getenv("LLM_BASE_URL") or _OAI_BASE_URL
            self.model = model or os.getenv("LLM_MODEL") or _OAI_MODEL

    @classmethod
    def from_args(
        cls,
        no_llm: bool = False,
        provider: str | None = None,
        base_url: str | None = None,
        model: str | None = None,
        api_key: str | None = None,
        max_calls: int | None = None,
    ) -> "LLMConfig":
        return cls(
            provider=provider, base_url=base_url, model=model, api_key=api_key,
            enabled=not no_llm, max_calls=max_calls,
        )

    def available(self) -> bool:
        return self.enabled and bool(self.api_key)


class LLMClient:
    def __init__(self, config: LLMConfig):
        self.config = config
        self._calls = 0

    def adjudicate(self, block_text: str) -> dict | None:
        """让 LLM 判定一段原文；返回结构化 dict 或 None（不可用/超上限/解析失败）。"""
        if not self.config.available():
            return None
        if self.config.max_calls is not None and self._calls >= self.config.max_calls:
            return None
        self._calls += 1
        prompt = _PROMPT_TEMPLATE.replace("{block}", block_text)
        raw = self._complete(prompt)
        return _parse_json(raw)

    def extract_questions(self, text: str) -> list[dict]:
        """批量结构化：从一段文本抽取所有题目（--llm-parse 用）。"""
        if not self.config.available():
            return []
        if self.config.max_calls is not None and self._calls >= self.config.max_calls:
            return []
        self._calls += 1
        prompt = _EXTRACT_TEMPLATE.replace("{block}", text)
        raw = self._complete(prompt)
        return _parse_json_list(raw)

    def _complete(self, prompt: str) -> str:
        if self.config.provider == "anthropic":
            return self._complete_anthropic(prompt)
        return self._complete_openai(prompt)

    def _complete_openai(self, prompt: str) -> str:
        from openai import OpenAI

        client = OpenAI(api_key=self.config.api_key, base_url=self.config.base_url)
        resp = client.chat.completions.create(
            model=self.config.model,
            messages=[{"role": "user", "content": prompt}],
            temperature=0,
        )
        return resp.choices[0].message.content or ""

    def _complete_anthropic(self, prompt: str) -> str:
        client = self._make_anthropic()
        resp = client.messages.create(
            model=self.config.model,
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}],
        )
        return resp.content[0].text

    def _make_anthropic(self):
        from anthropic import Anthropic

        kwargs: dict = {"api_key": self.config.api_key}
        if self.config.base_url:
            kwargs["base_url"] = self.config.base_url
        return Anthropic(**kwargs)


_FENCE_RE = re.compile(r"```(?:json)?\s*(.*?)```", re.DOTALL)


def _parse_json(text: str) -> dict | None:
    if not text:
        return None
    m = _FENCE_RE.search(text)
    candidate = m.group(1) if m else text
    candidate = candidate.strip()
    start, end = candidate.find("{"), candidate.rfind("}")
    if start != -1 and end != -1 and end > start:
        candidate = candidate[start : end + 1]
    try:
        obj = json.loads(candidate)
    except json.JSONDecodeError:
        return None
    return obj if isinstance(obj, dict) else None


def _parse_json_list(text: str) -> list:
    if not text:
        return []
    m = _FENCE_RE.search(text)
    candidate = m.group(1) if m else text
    candidate = candidate.strip()
    start, end = candidate.find("["), candidate.rfind("]")
    if start != -1 and end != -1 and end > start:
        candidate = candidate[start : end + 1]
    try:
        obj = json.loads(candidate)
    except json.JSONDecodeError:
        return []
    return obj if isinstance(obj, list) else []
