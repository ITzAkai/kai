// Log no console e, opcionalmente, enviado para o servidor de logs no PC (npm run logs).
let remoteUrl = '';
const buffer = [];
let flushing = false;

// Esconde chaves de debrid/API que aparecem nas URLs dos addons (ex.: Torrentio).
function redact(text) {
  return text.replace(
    /((?:realdebrid|alldebrid|premiumize|debridlink|easydebrid|offcloud|torbox|putio|apikey|api_key|token|authKey)(?:=|%3D|:))[A-Za-z0-9._-]{8,}/gi,
    '$1***'
  );
}

function send(level, args) {
  const raw = Array.prototype.map
    .call(args, (a) => {
      if (a instanceof Error) return a.message + (a.stack ? '\n' + a.stack : '');
      if (typeof a === 'object') {
        try {
          return JSON.stringify(a);
        } catch (e) {
          return String(a);
        }
      }
      return String(a);
    })
    .join(' ');
  const text = redact(raw);
  try {
    (console[level] || console.log).call(console, '[kai] ' + text);
  } catch (e) {
    /* ignore */
  }
  if (!remoteUrl) return;
  buffer.push({ t: Date.now(), level: level, text: text });
  if (buffer.length > 200) buffer.shift();
  flush();
}

function flush() {
  if (flushing || !buffer.length || !remoteUrl) return;
  flushing = true;
  const batch = buffer.splice(0, buffer.length);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', remoteUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.timeout = 5000;
  xhr.onloadend = () => {
    flushing = false;
    if (buffer.length) setTimeout(flush, 200);
  };
  xhr.send(JSON.stringify(batch));
}

export const log = {
  info: function () {
    send('log', arguments);
  },
  warn: function () {
    send('warn', arguments);
  },
  error: function () {
    send('error', arguments);
  },
  setRemote: function (url) {
    remoteUrl = url || '';
    flush();
  },
};

window.onerror = function (msg, src, line, col, err) {
  log.error('ERRO JS:', msg, (src || '') + ':' + line + ':' + col, err && err.stack ? err.stack : '');
};
