var REMOTE_PAGE = "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover\">\n<meta name=\"theme-color\" content=\"#0d0b14\">\n<meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n<title>Stremio Kai remote</title>\n<style>\n  :root { --bg: #0d0b14; --card: #1b1826; --key: #262236; --text: #f2f0f8; --muted: #9a94ad; --accent: #7b5bf5; }\n  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }\n  html, body { margin: 0; background: var(--bg); color: var(--text); font: 16px/1.4 system-ui, -apple-system, \"Segoe UI\", Roboto, \"Noto Sans Arabic\", sans-serif; }\n  body { min-height: 100vh; display: flex; flex-direction: column; align-items: center; padding: max(16px, env(safe-area-inset-top)) 16px max(24px, env(safe-area-inset-bottom)); }\n  header { width: 100%; max-width: 420px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }\n  .brand { font-size: 20px; } .brand b { color: #9d85ff; }\n  .status { font-size: 13px; color: var(--muted); }\n  .status.ok { color: #8fe3aa; } .status.bad { color: #ff8f8f; }\n  main { width: 100%; max-width: 420px; display: flex; flex-direction: column; gap: 22px; }\n  button { font: inherit; color: var(--text); background: var(--key); border: 0; border-radius: 18px; cursor: pointer; touch-action: manipulation; user-select: none; -webkit-user-select: none; }\n  button:active { transform: scale(0.96); background: #332d47; }\n  .pad { position: relative; width: min(300px, 78vw); height: min(300px, 78vw); margin: 4px auto 0; border-radius: 50%; background: var(--card); }\n  .pad button { position: absolute; width: 33%; height: 33%; border-radius: 50%; background: transparent; font-size: 30px; color: #d8d2ea; }\n  .pad button:active { background: rgba(255,255,255,0.08); }\n  .pad .up { top: 2%; left: 33.5%; } .pad .down { bottom: 2%; left: 33.5%; }\n  .pad .left { left: 2%; top: 33.5%; } .pad .right { right: 2%; top: 33.5%; }\n  .pad .ok { left: 31%; top: 31%; width: 38%; height: 38%; background: var(--accent); color: #fff; font-size: 20px; font-weight: 700; }\n  .pad .ok:active { background: #6847e8; }\n  .row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }\n  .row.two { grid-template-columns: 1fr 1fr; }\n  .row button { height: 58px; font-size: 22px; }\n  .row button small { display: block; font-size: 11px; color: var(--muted); margin-top: 2px; }\n  .type { display: flex; gap: 10px; }\n  .type input { flex: 1; min-width: 0; font: inherit; color: var(--text); background: var(--card); border: 2px solid #2d2840; border-radius: 16px; padding: 14px 16px; outline: none; }\n  .type input:focus { border-color: var(--accent); }\n  .type button { padding: 0 20px; background: var(--accent); font-weight: 700; }\n  .hint { color: var(--muted); font-size: 13px; text-align: center; margin: -10px 0 0; }\n  .type .mic { padding: 0 16px; background: var(--key); font-size: 22px; }\n  .type .mic.on { background: #e5484d; }\n  .pin { display: none; flex-direction: column; gap: 14px; align-items: center; text-align: center; padding-top: 30px; }\n  .pin input { width: 200px; text-align: center; font-size: 34px; letter-spacing: 12px; color: var(--text); background: var(--card); border: 2px solid #2d2840; border-radius: 16px; padding: 12px; outline: none; }\n  .pin button { padding: 14px 40px; background: var(--accent); font-weight: 700; }\n  body.locked main { display: none; } body.locked .pin { display: flex; }\n</style>\n</head>\n<body class=\"locked\">\n<header>\n  <div class=\"brand\">Stremio <b>Kai</b> remote</div>\n  <div class=\"status\" id=\"status\">…</div>\n</header>\n\n<section class=\"pin\">\n  <div>Enter the PIN shown on the TV<br><small style=\"color:var(--muted)\">Settings → Phone remote</small></div>\n  <input id=\"pin\" inputmode=\"numeric\" maxlength=\"4\" autocomplete=\"off\" placeholder=\"····\">\n  <button id=\"pinGo\">Connect</button>\n</section>\n\n<main>\n  <div class=\"pad\">\n    <button class=\"up\" data-key=\"38\" aria-label=\"Up\">▲</button>\n    <button class=\"left\" data-key=\"37\" aria-label=\"Left\">◀</button>\n    <button class=\"ok\" data-key=\"13\">OK</button>\n    <button class=\"right\" data-key=\"39\" aria-label=\"Right\">▶</button>\n    <button class=\"down\" data-key=\"40\" aria-label=\"Down\">▼</button>\n  </div>\n  <div class=\"row\">\n    <button data-key=\"10009\">↩<small>Back</small></button>\n    <button data-key=\"10252\">⏯<small>Play / pause</small></button>\n    <button data-key=\"413\">⏹<small>Stop</small></button>\n  </div>\n  <div class=\"row two\">\n    <button data-key=\"412\">⏪<small>Rewind</small></button>\n    <button data-key=\"417\">⏩<small>Forward</small></button>\n  </div>\n  <div class=\"row two\">\n    <button data-key=\"428\">⏪ Aa<small>Subtitles earlier</small></button>\n    <button data-key=\"427\">Aa ⏩<small>Subtitles later</small></button>\n  </div>\n  <form class=\"type\" id=\"searchForm\">\n    <input id=\"query\" type=\"search\" placeholder=\"Search on the TV…\" autocomplete=\"off\" enterkeyhint=\"search\">\n    <button type=\"button\" id=\"mic\" class=\"mic\" aria-label=\"Voice search\" hidden>🎤</button>\n    <button type=\"submit\">Search</button>\n  </form>\n  <p class=\"hint\" id=\"voiceHint\">Speak your search: tap 🎤 on your phone's keyboard, or the mic button.</p>\n  <form class=\"type\" id=\"typeForm\">\n    <input id=\"text\" placeholder=\"Type on the TV…\" autocomplete=\"off\" enterkeyhint=\"send\">\n    <button type=\"submit\">Send</button>\n  </form>\n  <p class=\"hint\">Typing fills the selected text box on the TV (search, sign-in…).</p>\n</main>\n\n<script>\n(function () {\n  var pin = '';\n  var statusEl = document.getElementById('status');\n  function status(text, cls) { statusEl.textContent = text; statusEl.className = 'status ' + (cls || ''); }\n\n  // The QR code on the TV opens this page with #pin=1234, so scanning connects straight away.\n  var m = location.hash.match(/pin=(\\d{4})/);\n  try { pin = (m && m[1]) || localStorage.getItem('kaiRemotePin') || ''; } catch (e) { pin = (m && m[1]) || ''; }\n  if (m) history.replaceState(null, '', location.pathname);\n\n  function check(p) {\n    return fetch('/api/check?pin=' + encodeURIComponent(p)).then(function (r) { return r.ok; }).catch(function () { return false; });\n  }\n  function unlock(p) {\n    return check(p).then(function (ok) {\n      if (!ok) { status('Wrong PIN', 'bad'); document.body.classList.add('locked'); return false; }\n      pin = p;\n      try { localStorage.setItem('kaiRemotePin', p); } catch (e) {}\n      document.body.classList.remove('locked');\n      status('Connected', 'ok');\n      return true;\n    });\n  }\n  document.getElementById('pinGo').onclick = function () { unlock(document.getElementById('pin').value.trim()); };\n  document.getElementById('pin').onkeydown = function (e) { if (e.key === 'Enter') unlock(this.value.trim()); };\n\n  function post(url, body) {\n    return fetch(url + (url.indexOf('?') < 0 ? '?' : '&') + 'pin=' + encodeURIComponent(pin), { method: 'POST', body: body || '' })\n      .then(function (r) {\n        if (r.status === 401) { status('PIN changed: enter it again', 'bad'); document.body.classList.add('locked'); }\n        else status('Connected', 'ok');\n      })\n      .catch(function () { status('TV not reachable', 'bad'); });\n  }\n\n  // Holding an arrow repeats it, like the real remote.\n  Array.prototype.forEach.call(document.querySelectorAll('[data-key]'), function (b) {\n    var code = b.getAttribute('data-key');\n    var repeat = null, delay = null;\n    var arrow = /^3[7-9]$|^40$/.test(code);\n    function stop() { clearTimeout(delay); clearInterval(repeat); delay = repeat = null; }\n    b.addEventListener('pointerdown', function (e) {\n      e.preventDefault();\n      if (navigator.vibrate) navigator.vibrate(10);\n      post('/api/key?code=' + code);\n      if (arrow) delay = setTimeout(function () { repeat = setInterval(function () { post('/api/key?code=' + code); }, 140); }, 400);\n    });\n    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) { b.addEventListener(ev, stop); });\n  });\n\n  document.getElementById('typeForm').onsubmit = function (e) {\n    e.preventDefault();\n    var input = document.getElementById('text');\n    if (!input.value) return;\n    post('/api/text?submit=1', input.value).then(function () { input.value = ''; });\n  };\n\n  // Search on the TV from anywhere in the app (typed, keyboard dictation, or the mic button).\n  var query = document.getElementById('query');\n  function search(q) {\n    q = (q || '').trim();\n    if (q.length < 2) return;\n    post('/api/search', q).then(function () { query.value = ''; status('Searching on the TV…', 'ok'); });\n  }\n  document.getElementById('searchForm').onsubmit = function (e) { e.preventDefault(); search(query.value); };\n\n  // The browser's speech recognition only runs on secure (https) pages; on the TV's local\n  // address the keyboard's own dictation button does the same job, so the hint stays.\n  var Rec = window.SpeechRecognition || window.webkitSpeechRecognition;\n  if (!(Rec && window.isSecureContext)) document.getElementById('voiceHint').textContent = \"Speak your search: tap 🎤 on your phone's keyboard, then Search.\";\n  if (Rec && window.isSecureContext) {\n    var mic = document.getElementById('mic');\n    mic.hidden = false;\n    mic.onclick = function () {\n      var r = new Rec();\n      r.lang = navigator.language || 'en-US';\n      r.interimResults = false;\n      mic.classList.add('on');\n      r.onresult = function (e) { var q = e.results[0][0].transcript; query.value = q; search(q); };\n      r.onend = function () { mic.classList.remove('on'); };\n      r.onerror = function () { mic.classList.remove('on'); status('Mic not available: use the keyboard 🎤', 'bad'); };\n      r.start();\n    };\n  }\n\n  if (pin) unlock(pin); else status('Locked');\n})();\n</script>\n</body>\n</html>\n";
// Phone remote: a TizenBrew service (Node.js 4 on the TV, so plain ES5).
// - Serves the remote page to phones on the same Wi-Fi at http://<TV IP>:8095
// - Phones send key presses and text, guarded by a 4-digit PIN shown in the app's Settings.
// - The app on the TV long-polls /api/events from 127.0.0.1 and replays them as remote keys.
'use strict';

var http = require('http');
var os = require('os');

var PORT = 8095;
var HOLD_MS = 25000; // long-poll hold time
var KEEP = 50; // events kept for late pollers
var PIN = String(1000 + Math.floor(Math.random() * 9000));

var events = [];
var nextId = 1;
var waiting = [];

// The address phones reach the TV on: a home-network (private) IPv4 first, any other IPv4 after.
function tvIp() {
  var nets = os.networkInterfaces();
  var names = Object.keys(nets);
  var other = '';
  for (var i = 0; i < names.length; i++) {
    var list = nets[names[i]];
    for (var j = 0; j < list.length; j++) {
      var a = list[j];
      if (a.family !== 'IPv4' || a.internal) continue;
      if (/^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)/.test(a.address)) return a.address;
      if (!other) other = a.address;
    }
  }
  return other;
}

function isLocal(req) {
  var a = req.socket.remoteAddress || '';
  return a === '127.0.0.1' || a === '::1' || a === '::ffff:127.0.0.1';
}

function send(res, status, body, type) {
  res.writeHead(status, {
    'Content-Type': type || 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store'
  });
  res.end(typeof body === 'string' ? body : JSON.stringify(body));
}

function push(ev) {
  ev.id = nextId++;
  events.push(ev);
  if (events.length > KEEP) events.shift();
  var w = waiting;
  waiting = [];
  w.forEach(function (fn) { fn(); });
}

function since(id) {
  return events.filter(function (e) { return e.id > id; });
}

function readBody(req, cb) {
  var data = '';
  req.on('data', function (c) {
    data += c;
    if (data.length > 4096) req.destroy();
  });
  req.on('end', function () { cb(data); });
}

var page = null;
function remotePage() {
  if (page === null) {
    // Served from the module on jsDelivr next to this file, or inlined by the build.
    page = typeof REMOTE_PAGE === 'string' ? REMOTE_PAGE : '';
  }
  return page;
}

var server = http.createServer(function (req, res) {
  var url = require('url').parse(req.url, true);
  var q = url.query;

  if (req.method === 'OPTIONS') return send(res, 204, '');

  // ---- TV side (app on the same TV only) ----
  if (url.pathname === '/api/info') {
    if (!isLocal(req)) return send(res, 403, { error: 'local only' });
    return send(res, 200, { ip: tvIp(), port: PORT, pin: PIN, last: nextId - 1, version: 1 });
  }
  if (url.pathname === '/api/events') {
    if (!isLocal(req)) return send(res, 403, { error: 'local only' });
    var after = parseInt(q.since, 10) || 0;
    if (after > nextId) after = 0; // the service restarted
    var ready = since(after);
    if (ready.length) return send(res, 200, { events: ready, last: nextId - 1 });
    var done = false;
    var finish = function () {
      if (done) return;
      done = true;
      clearTimeout(timer);
      send(res, 200, { events: since(after), last: nextId - 1 });
    };
    var timer = setTimeout(finish, HOLD_MS);
    waiting.push(finish);
    req.on('close', function () { done = true; clearTimeout(timer); });
    return;
  }

  // ---- Phone side ----
  if (url.pathname === '/' || url.pathname === '/index.html') {
    return send(res, 200, remotePage(), 'text/html; charset=utf-8');
  }
  if (url.pathname === '/api/check') {
    return send(res, q.pin === PIN ? 200 : 401, { ok: q.pin === PIN });
  }
  if (url.pathname === '/api/key' && req.method === 'POST') {
    if (q.pin !== PIN) return send(res, 401, { ok: false });
    var code = parseInt(q.code, 10);
    if (!(code > 0 && code < 70000)) return send(res, 400, { ok: false });
    push({ type: 'key', code: code });
    return send(res, 200, { ok: true });
  }
  if (url.pathname === '/api/search' && req.method === 'POST') {
    if (q.pin !== PIN) return send(res, 401, { ok: false });
    return readBody(req, function (text) {
      push({ type: 'search', text: String(text).slice(0, 200) });
      send(res, 200, { ok: true });
    });
  }
  if (url.pathname === '/api/text' && req.method === 'POST') {
    if (q.pin !== PIN) return send(res, 401, { ok: false });
    return readBody(req, function (text) {
      push({ type: 'text', text: String(text).slice(0, 500), submit: q.submit === '1' });
      send(res, 200, { ok: true });
    });
  }
  send(res, 404, { error: 'not found' });
});

server.on('error', function () { /* port busy: an older copy is already serving */ });
server.listen(PORT, '0.0.0.0');
