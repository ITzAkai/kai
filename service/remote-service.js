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
var browseData = null;
var nowPlaying = null;
var nowPlayingAt = 0;
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

function readBody(req, cb, limit) {
  var data = '';
  req.on('data', function (c) {
    data += c;
    if (data.length > (limit || 4096)) req.destroy();
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

// Volume: the app can't change it itself, so it presses the TV's own volume keys through
// Samsung's remote-control API (the one phone remote apps use), on this TV only. The first time,
// the TV may ask to allow "Stremio Kai Remote".
var tvWs = null;
var tvQueue = [];
function tvKey(keyName, cb) {
  var WebSocket;
  try {
    WebSocket = require('ws');
  } catch (e) {
    return cb('no websocket module');
  }
  var msg = JSON.stringify({
    method: 'ms.remote.control',
    params: { Cmd: 'Click', DataOfCmd: keyName, Option: 'false', TypeOfRemote: 'SendRemoteKey' }
  });
  if (tvWs && tvWs.readyState === 1) {
    tvWs.send(msg);
    return cb(null);
  }
  tvQueue.push({ msg: msg, cb: cb });
  if (tvWs) return;
  var name = new Buffer('Stremio Kai Remote').toString('base64');
  tvWs = new WebSocket('ws://127.0.0.1:8001/api/v2/channels/samsung.remote.control?name=' + name);
  var flush = function (err) {
    var q = tvQueue;
    tvQueue = [];
    q.forEach(function (item) {
      if (!err && tvWs && tvWs.readyState === 1) tvWs.send(item.msg);
      item.cb(err);
    });
  };
  tvWs.on('message', function (data) {
    // The TV answers ms.channel.connect once the connection is allowed.
    if (String(data).indexOf('ms.channel.connect') >= 0) flush(null);
    else if (String(data).indexOf('ms.channel.unauthorized') >= 0) flush('not allowed on the TV');
  });
  tvWs.on('error', function () {
    tvWs = null;
    flush('TV remote API unreachable');
  });
  tvWs.on('close', function () {
    tvWs = null;
  });
  setTimeout(function () {
    if (tvQueue.length) flush('waiting for the TV to allow the remote');
  }, 15000);
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

  if (url.pathname === '/api/state' && req.method === 'POST') {
    if (!isLocal(req)) return send(res, 403, { error: 'local only' });
    return readBody(req, function (body) {
      try {
        nowPlaying = JSON.parse(body);
      } catch (e) {
        nowPlaying = null;
      }
      nowPlayingAt = Date.now();
      send(res, 200, { ok: true });
    });
  }

  if (url.pathname === '/api/browse' && req.method === 'POST') {
    if (!isLocal(req)) return send(res, 403, { error: 'local only' });
    return readBody(req, function (body) {
      try {
        browseData = JSON.parse(body);
      } catch (e) {
        /* keep the last good lists */
      }
      send(res, 200, { ok: true });
    }, 500000);
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
  if (url.pathname === '/api/browse') {
    if (q.pin !== PIN) return send(res, 401, { ok: false });
    return send(res, 200, browseData || { continueWatching: [], newEpisodes: [], library: [] });
  }
  if (url.pathname === '/api/open' && req.method === 'POST') {
    if (q.pin !== PIN) return send(res, 401, { ok: false });
    if (!q.id || (q.type !== 'movie' && q.type !== 'series')) return send(res, 400, { ok: false });
    push({ type: 'open', kind: q.type, item: String(q.id).slice(0, 200), video: q.video ? String(q.video).slice(0, 200) : '' });
    return send(res, 200, { ok: true });
  }
  if (url.pathname === '/api/state') {
    if (q.pin !== PIN) return send(res, 401, { ok: false });
    // The player reports every few seconds; a stale report means it's no longer playing.
    var fresh = nowPlaying && Date.now() - nowPlayingAt < 20000;
    return send(res, 200, { playing: fresh ? nowPlaying : null, at: nowPlayingAt });
  }
  if (url.pathname === '/api/seek' && req.method === 'POST') {
    if (q.pin !== PIN) return send(res, 401, { ok: false });
    var to = parseInt(q.to, 10);
    if (!(to >= 0)) return send(res, 400, { ok: false });
    push({ type: 'seek', to: to });
    return send(res, 200, { ok: true });
  }
  if (url.pathname === '/api/volume' && req.method === 'POST') {
    if (q.pin !== PIN) return send(res, 401, { ok: false });
    var keyName = { up: 'KEY_VOLUP', down: 'KEY_VOLDOWN', mute: 'KEY_MUTE' }[q.dir];
    if (!keyName) return send(res, 400, { ok: false });
    return tvKey(keyName, function (err) {
      send(res, err ? 502 : 200, { ok: !err, error: err || undefined });
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
