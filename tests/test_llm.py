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
