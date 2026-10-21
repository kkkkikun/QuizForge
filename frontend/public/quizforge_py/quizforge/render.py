"""渲染层：Quiz JSON → 单文件自包含 HTML + 原生 JS 答题引擎。"""

from __future__ import annotations

import html as _html
import json
import re

from .model import Quiz
from .parse import quiz_to_dict

# LaTeX 检测：$...$ / $$...$$ / \( / \begin
_LATEX_RE = re.compile(r"\$\$.*?\$\$|\$[^$\n]+\$|\\\(|\\\[|\\begin\{")

# 仅在检测到 LaTeX 时引入（CDN，需联网；常规 unicode 数学无需）
_KATEX_BLOCK = (
    '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16/dist/katex.min.css">\n'
    '<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16/dist/katex.min.js"></script>\n'
    '<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16/dist/contrib/auto-render.min.js"></script>'
)


def has_latex(quiz: Quiz) -> bool:
    blobs: list[str] = []
    for q in quiz.questions:
        blobs.append(q.stem or "")
        if q.options:
            blobs.extend(q.options.values())
    return any(_LATEX_RE.search(b) for b in blobs)


def render_html(quiz: Quiz, shuffle: bool = True) -> str:
    data = quiz_to_dict(quiz)
    data_json = json.dumps(data, ensure_ascii=False).replace("<", "\\u003c")
    katex = _KATEX_BLOCK if has_latex(quiz) else ""
    return (
        _TEMPLATE
        .replace("__DATA__", data_json)
        .replace("__TITLE__", _html.escape(quiz.title or "题库"))
        .replace("__KATEX__", katex)
        .replace("__SHUFFLE__", "true" if shuffle else "false")
        .replace("__N__", str(len(quiz.questions)))
    )


_TEMPLATE = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>__TITLE__</title>
__KATEX__
<style>
:root{--bg:#f6f7fb;--card:#fff;--ink:#1f2330;--muted:#6b7280;--line:#e5e7eb;--ok:#16a34a;--bad:#dc2626;--warn:#d97706;--accent:#4f46e5}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.7 -apple-system,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif}
header{position:sticky;top:0;z-index:10;background:rgba(255,255,255,.92);backdrop-filter:blur(8px);border-bottom:1px solid var(--line);padding:14px 18px}
header h1{margin:0 0 8px;font-size:18px}
.bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
button{cursor:pointer;border:1px solid var(--line);background:#fff;color:var(--ink);padding:6px 12px;border-radius:8px;font-size:14px}
button:hover{border-color:var(--accent);color:var(--accent)}
button.primary{background:var(--accent);color:#fff;border-color:var(--accent)}
.score{margin-top:8px;font-weight:600;color:var(--accent)}
.wrap{max-width:820px;margin:0 auto;padding:16px 14px 80px}
.q{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin-bottom:12px}
.q.low{border-color:var(--warn);background:#fffbeb}
.num{color:var(--muted);font-size:13px;margin-bottom:6px}
.num .warn{color:var(--warn);font-weight:600}
.num .src{background:#fef3c7;color:#b45309;padding:1px 6px;border-radius:999px;font-size:12px}
.num .typ{float:right;background:#eef2ff;color:var(--accent);padding:1px 8px;border-radius:999px;font-size:12px}
.stem{margin:0 0 10px;white-space:pre-wrap}
.opts{display:flex;flex-direction:column;gap:6px}
.opts label{display:flex;gap:8px;align-items:flex-start;padding:8px 10px;border:1px solid var(--line);border-radius:8px;cursor:pointer}
.opts label.ok{border-color:var(--ok);background:#f0fdf4}
.opts label.bad{border-color:var(--bad);background:#fef2f2}
.opts input{margin-top:3px}
.L{font-weight:700;color:var(--accent)}
.blank{width:100%;padding:8px 10px;border:1px solid var(--line);border-radius:8px;font-size:15px;font-family:inherit}
.norep{margin-top:6px;color:var(--warn);font-size:13px}
.ans{margin-top:6px;font-size:13px}
.ans.ok{color:var(--ok)}
.ans.bad{color:var(--bad)}
footer{color:var(--muted);font-size:12px;text-align:center}
</style>
</head>
<body>
<header>
  <h1>__TITLE__</h1>
  <div class="bar">
    <button class="primary" onclick="submit()">提交</button>
    <button onclick="redo()">重做</button>
    <button onclick="toggleShuffle()">乱序</button>
    <span style="color:var(--muted)">共 __N__ 题</span>
  </div>
  <div id="score" class="score" style="display:none"></div>
</header>
<div class="wrap" id="quiz"></div>
<footer>由 QuizForge 生成 · 进度自动保存在本机（localStorage）</footer>

<script id="quiz-data" type="application/json">__DATA__</script>
<script>
const DATA = JSON.parse(document.getElementById('quiz-data').textContent);
const STORE = 'quizforge:' + (DATA.source_file || DATA.title);
let order = [], answers = {}, submitted = false, shuffle = __SHUFFLE__;

function shuffleArr(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function esc(s){return String(s==null?'':s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));}
function typeLabel(q){return q.type==='multiple'?'多选':q.type==='blank'?'填空':'单选';}
function byId(id){return DATA.questions.find(x=>x.id===id);}

function save(){try{localStorage.setItem(STORE,JSON.stringify({answers,submitted,shuffle}));}catch(e){}}
function restore(){try{const s=JSON.parse(localStorage.getItem(STORE)||'{}');answers=s.answers||{};submitted=!!s.submitted;if(typeof s.shuffle==='boolean')shuffle=s.shuffle;}catch(e){}}
function rebuildOrder(){order=DATA.questions.map(q=>q.id);if(shuffle)shuffleArr(order);}

function markClass(q,L){
  if(!submitted)return '';
  const correct=q.answer||[];
  const picked=(answers[q.id]||[]).includes(L);
  if(correct.includes(L))return 'ok';
  if(picked)return 'bad';
  return '';
}

function card(q){
  const el=document.createElement('div');
  el.className='q'+(q.low_confidence?' low':'');
  let h='<div class="num">第 '+q.id+' 题'+(q.low_confidence?' <span class="warn">⚠️ 存疑，请核对</span>':'')+(q.source==='llm'?' <span class="src">LLM</span>':'')+'<span class="typ">'+typeLabel(q)+'</span></div>';
  h+='<div class="stem">'+esc(q.stem)+'</div>';
  if(q.type==='blank'){
    const cur=(answers[q.id]&&answers[q.id][0])||'';
    h+='<input class="blank" data-id="'+q.id+'" value="'+esc(cur)+'" '+(submitted?'disabled':'')+' oninput="onBlank('+q.id+',this.value)">';
    if(submitted){
      if(q.answer&&q.answer.length){
        const acc=[...q.answer,...(q.accepted||[])].map(s=>String(s).trim().toLowerCase());
        const ok=acc.includes((cur||'').trim().toLowerCase());
        h+='<div class="ans '+(ok?'ok':'bad')+'">'+(ok?'✓ ':'✗ ')+'正确答案：'+esc(q.answer.join(' / '))+'</div>';
      }else{
        h+='<div class="norep">无标准答案（存疑）</div>';
      }
    }
  }else{
    let keys=Object.keys(q.options||{});
    if(!submitted&&shuffle)shuffleArr(keys);
    h+='<div class="opts">';
    keys.forEach(L=>{
      const sel=(answers[q.id]||[]).includes(L);
      const inp=q.type==='multiple'?'checkbox':'radio';
      h+='<label class="'+markClass(q,L)+'"><input type="'+inp+'" name="q'+q.id+'" value="'+L+'" '+(sel?'checked':'')+' '+(submitted?'disabled':'')+' onchange="onPick('+q.id+')"> <span class="L">'+L+'</span>. '+esc(q.options[L])+'</label>';
    });
    h+='</div>';
  }
  el.innerHTML=h;
  return el;
}

function render(){
  const root=document.getElementById('quiz');
  root.innerHTML='';
  order.forEach(id=>root.appendChild(card(byId(id))));
  document.getElementById('score').style.display=submitted?'block':'none';
}

function onPick(id){
  const q=byId(id);
  if(q.type==='multiple'){
    answers[id]=[...document.querySelectorAll('input[name="q'+id+'"]:checked')].map(c=>c.value);
  }else{
    const c=document.querySelector('input[name="q'+id+'"]:checked');
    answers[id]=c?[c.value]:[];
  }
  save();
}
function onBlank(id,v){answers[id]=[v];save();}

function grade(){
  let score=0,total=0;
  DATA.questions.forEach(q=>{
    if(!q.answer||!q.answer.length)return;
    total++;
    const a=answers[q.id]||[];
    if(q.type==='blank'){
      const t=(a[0]||'').trim().toLowerCase();
      const acc=[...q.answer,...(q.accepted||[])].map(s=>String(s).trim().toLowerCase());
      if(acc.includes(t))score++;
    }else{
      const norm=x=>[...new Set(x)].sort().join(',');
      if(norm(a)===norm(q.answer))score++;
    }
  });
  return {score,total};
}

function submit(){
  submitted=true;
  const {score,total}=grade();
  const noAns=DATA.questions.length-total;
  let txt='得分 '+score+' / '+total;
  if(noAns>0)txt+='（另有 '+noAns+' 题无标准答案/存疑，未计入）';
  document.getElementById('score').innerHTML=txt;
  render();
  save();
  window.scrollTo({top:0,behavior:'smooth'});
}
function redo(){
  answers={};submitted=false;rebuildOrder();
  document.getElementById('score').style.display='none';
  render();save();
}
function toggleShuffle(){shuffle=!shuffle;rebuildOrder();if(!submitted)render();save();}

restore();rebuildOrder();render();
if(window.renderMathInElement){
  window.renderMathInElement(document.body,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}]});
}
</script>
</body>
</html>
"""
