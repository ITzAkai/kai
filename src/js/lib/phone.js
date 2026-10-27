// Phone remote, TV side. The TizenBrew service (service/remote-service.js) serves the remote page
// to phones at http://<TV IP>:8095; here the app long-polls it and replays what the phone sends
// as remote-control keys, so every screen works without knowing about the phone.
import qrcode from 'qrcode-generator';
import { toast } from '../ui.js';
import { t } from './i18n.js';

export const PORT = 8095;
const BASE = 'http://127.0.0.1:' + PORT;
const ENTER = 13;

let last = 0;
let started = false;

function request(url, timeout) {
  return new Promise((resolve, reject) => {
    const x = new XMLHttpRequest();
    x.open('GET', url);
    x.timeout = timeout;
    x.onload = () => {
      try {
        resolve(x.status === 200 ? JSON.parse(x.responseText) : null);
      } catch (e) {
        reject(e);
      }
    };
    x.onerror = x.ontimeout = () => reject(new Error('remote service unreachable'));
    x.send();
  });
}

// A plain Event with keyCode set: the app's key handlers only read keyCode.
function fireKey(code) {
  const e = document.createEvent('Event');
  e.initEvent('keydown', true, true);
  e.keyCode = code;
  e.which = code;
  (document.activeElement || document.body).dispatchEvent(e);
}

function typeText(text, submit) {
  const el = document.activeElement;
  if (!el || (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA')) {
    toast(t('Selecione um campo de texto na TV primeiro.'), 4000);
    return;
  }
  el.value = text;
  const ev = document.createEvent('Event');
  ev.initEvent('input', true, true);
  el.dispatchEvent(ev);
  if (submit) fireKey(ENTER); // same as confirming on the TV keyboard
}

// "Now playing" for the phone: the player reports what's on screen; the phone shows it and can seek.
export function nowPlaying(state) {
  const x = new XMLHttpRequest();
  x.open('POST', BASE + '/api/state');
  x.onerror = () => {};
  x.send(JSON.stringify(state || null));
}

let seekHandler = null;
export function onSeek(fn) {
  seekHandler = fn;
}

// Search from the phone (typed or spoken): opens the Search tab and runs it, from any screen.
let searchHandler = null;
export function onSearch(fn) {
  searchHandler = fn;
}

function handle(ev) {
  if (ev.type === 'key') fireKey(ev.code);
  else if (ev.type === 'text') typeText(ev.text, ev.submit);
  else if (ev.type === 'search' && searchHandler && ev.text) searchHandler(ev.text);
  else if (ev.type === 'seek' && seekHandler) seekHandler(ev.to);
}

// Polls forever; when the service isn't running (e.g. outside TizenBrew) it checks again slowly.
function poll(wait) {
  setTimeout(() => {
    request(BASE + '/api/events?since=' + last, 35000)
      .then((r) => {
        if (r) {
          (r.events || []).forEach(handle);
          last = r.last || last;
        }
        poll(0);
      })
      .catch(() => poll(Math.min((wait || 2000) * 2, 60000)));
  }, wait);
}

export function start() {
  if (started) return;
  started = true;
  // Skip whatever was pressed before the app opened.
  request(BASE + '/api/info', 3000)
    .then((r) => {
      if (r) last = r.last || 0;
    })
    .catch(() => {})
    .then(() => poll(0));
}

// { ip, port, pin, url } for Settings, or null when the service isn't running.
export function info() {
  return request(BASE + '/api/info', 4000)
    .then((r) => (r && r.ip ? { ip: r.ip, port: r.port, pin: r.pin, url: 'http://' + r.ip + ':' + r.port + '/#pin=' + r.pin } : null))
    .catch(() => null);
}

// QR code as an image (GIF data URL), readable from across the room.
export function qrImage(text, size) {
  const qr = qrcode(0, 'M');
  qr.addData(text);
  qr.make();
  const cell = Math.max(2, Math.floor(size / (qr.getModuleCount() + 8)));
  return qr.createDataURL(cell, cell * 4);
}
