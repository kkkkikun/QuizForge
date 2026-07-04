"""LLM 兜底层测试：配置（env/降级）+ adjudicate（mock，不打真实 API）。"""

from quizforge.llm import LLMClient, LLMConfig


def _clean_env(monkeypatch):
    monkeypatch.delenv("LLM_API_KEY", raising=False)
    monkeypatch.delenv("DEEPSEEK_API_KEY", raising=False)


def test_config_no_key_disabled(monkeypatch):
    _clean_env(monkeypatch)
    assert not LLMConfig().available()


def test_config_with_key(monkeypatch):
    monkeypatch.setenv("LLM_API_KEY", "sk-test")
    cfg = LLMConfig()
    assert cfg.available()
    assert cfg.model  # 有默认模型


def test_config_deepseek_key_alias(monkeypatch):
    _clean_env(monkeypatch)
    monkeypatch.setenv("DEEPSEEK_API_KEY", "sk-ds")
    assert LLMConfig().available()


def test_config_no_llm_flag(monkeypatch):
    monkeypatch.setenv("LLM_API_KEY", "sk-test")
    cfg = LLMConfig.from_args(no_llm=True)
    assert not cfg.available()


def test_config_custom_model_base_url(monkeypatch):
    monkeypatch.setenv("LLM_API_KEY", "sk-test")
    monkeypatch.setenv("LLM_MODEL", "v4-flash")
    monkeypatch.setenv("LLM_BASE_URL", "https://relay.example.com")
    cfg = LLMConfig()
    assert cfg.model == "v4-flash"
    assert cfg.base_url == "https://relay.example.com"


def test_adjudicate_disabled_returns_none(monkeypatch):
    _clean_env(monkeypatch)
    assert LLMClient(LLMConfig()).adjudicate("1.xxx") is None


def test_adjudicate_parses_question(monkeypatch):
    monkeypatch.setenv("LLM_API_KEY", "sk-test")
    c = LLMClient(LLMConfig())
    captured = {}

    def fake_complete(prompt):
        captured["prompt"] = prompt
        return ('{"is_question": true, "type": "single", '
                '"stem": "题干", "options": {"A":"甲","B":"乙"}, "answer": ["B"]}')

    c._complete = fake_complete
    r = c.adjudicate("1.xxx (B)\nA.甲\nB.乙")
    assert r["is_question"] is True
    assert r["answer"] == ["B"]
    assert r["options"]["B"] == "乙"
    assert "json" in captured["prompt"].lower()


def test_adjudicate_handles_not_question(monkeypatch):
    monkeypatch.setenv("LLM_API_KEY", "sk-test")
    c = LLMClient(LLMConfig())
    c._complete = lambda p: '{"is_question": false, "category": "knowledge"}'
    r = c.adjudicate("知识点说明文字")
    assert r["is_question"] is False


def test_adjudicate_strips_code_fence(monkeypatch):
    monkeypatch.setenv("LLM_API_KEY", "sk-test")
    c = LLMClient(LLMConfig())
    c._complete = lambda p: '```json\n{"is_question": true, "answer": ["A"]}\n```'
    r = c.adjudicate("x")
    assert r == {"is_question": True, "answer": ["A"]}


# ---------------- 多 provider（OpenAI 系 / Anthropic）----------------


def test_provider_anthropic_by_key(monkeypatch):
    _clean_env(monkeypatch)
    monkeypatch.setenv("ANTHROPIC_API_KEY", "sk-ant")
    cfg = LLMConfig()
    assert cfg.provider == "anthropic"
    assert cfg.api_key == "sk-ant"
    assert cfg.model.startswith("claude")
    assert cfg.available()


def test_provider_explicit_override(monkeypatch):
    _clean_env(monkeypatch)
    monkeypatch.setenv("LLM_API_KEY", "sk-oai")
    monkeypatch.setenv("LLM_PROVIDER", "anthropic")
    cfg = LLMConfig()
    assert cfg.provider == "anthropic"
    assert cfg.api_key == "sk-oai"  # LLM_API_KEY 跨 provider 复用


def test_provider_openai_default(monkeypatch):
    _clean_env(monkeypatch)
    monkeypatch.setenv("DEEPSEEK_API_KEY", "sk-ds")
    cfg = LLMConfig()
    assert cfg.provider == "openai"
    assert cfg.model == "deepseek-chat"
    assert "deepseek" in cfg.base_url


def test_max_calls_cap(monkeypatch):
    monkeypatch.setenv("LLM_API_KEY", "sk-test")
    cfg = LLMConfig(max_calls=1)
    c = LLMClient(cfg)
    c._complete = lambda p: '{"is_question": false, "category": "x"}'
    assert c.adjudicate("a") is not None  # 第 1 次
    assert c.adjudicate("b") is None      # 超出上限


class _FakeBlock:
    def __init__(self, t):
        self.text = t


class _FakeResp:
    def __init__(self, t):
        self.content = [_FakeBlock(t)]


class _FakeMessages:
    def __init__(self, t):
        self._t = t

    def create(self, **kw):
        return _FakeResp(self._t)


class _FakeAnthropic:
    def __init__(self, t):
        self.messages = _FakeMessages(t)


def test_anthropic_complete_path(monkeypatch):
    _clean_env(monkeypatch)
    monkeypatch.setenv("ANTHROPIC_API_KEY", "sk-ant")
    c = LLMClient(LLMConfig())
    assert c.config.provider == "anthropic"
    payload = '{"is_question": true, "type": "single", "answer": ["A"]}'
    c._make_anthropic = lambda: _FakeAnthropic(payload)
    r = c.adjudicate("1.题干\nA.a\nB.b")
    assert r["is_question"] is True
    assert r["answer"] == ["A"]


# ---------------- 批量结构化提取（--llm-parse 用）----------------


def test_extract_questions_parses_list(monkeypatch):
    monkeypatch.setenv("LLM_API_KEY", "sk-test")
    c = LLMClient(LLMConfig())
    c._complete = lambda p: (
        '[{"type":"single","stem":"q1","options":{"A":"x","B":"y"},"answer":["A"]},'
        '{"type":"blank","stem":"q2 ___","options":null,"answer":["z"]}]'
    )
    qs = c.extract_questions("文本")
    assert len(qs) == 2
    assert qs[0]["answer"] == ["A"]
    assert qs[1]["type"] == "blank"


def test_extract_questions_empty(monkeypatch):
    monkeypatch.setenv("LLM_API_KEY", "sk-test")
    c = LLMClient(LLMConfig())
    c._complete = lambda p: "[]"
    assert c.extract_questions("x") == []


def test_extract_questions_disabled(monkeypatch):
    _clean_env(monkeypatch)
    assert LLMClient(LLMConfig()).extract_questions("x") == []


def test_extract_questions_strips_fence(monkeypatch):
    monkeypatch.setenv("LLM_API_KEY", "sk-test")
    c = LLMClient(LLMConfig())
    c._complete = lambda p: '```json\n[{"type":"single","answer":["A"]}]\n```'
    qs = c.extract_questions("x")
    assert len(qs) == 1 and qs[0]["answer"] == ["A"]
