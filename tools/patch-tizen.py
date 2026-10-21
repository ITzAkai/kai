import sys

root = sys.argv[1]


def patch(path, pairs):
    p = root + '/' + path
    s = open(p, encoding='utf-8').read()
    for a, b in pairs:
        assert a in s, (path, a)
        s = s.replace(a, b, 1)
    open(p, 'w', encoding='utf-8', newline='\n').write(s)


patch('src/js/lib/luna.js', [
    ('''// Chamadas ao barramento Luna do webOS via PalmServiceBridge (sem webOSTV.js).
const pending = new Set();''', '''// Chamadas ao barramento Luna do webOS via PalmServiceBridge (sem webOSTV.js).
// On Samsung Tizen there is no Luna: hasLuna() is false and the helpers below use Tizen APIs.
import { isTizen } from './platform.js';

const pending = new Set();'''),
    ('''export function platformBack() {
  try {''', '''export function platformBack() {
  try {
    if (window.tizen && window.tizen.application) return window.tizen.application.getCurrentApplication().exit();'''),
    ('''export function getTvIp() {
  return luna(''', '''export function getTvIp() {
  if (!hasLuna()) return tizenIp();
  return luna('''),
    ('''export function deviceInfo() {
  return luna(''', '''export function deviceInfo() {
  const pi = window.webapis && window.webapis.productinfo;
  if (pi) {
    return Promise.resolve({
      modelName: pi.getRealModel ? pi.getRealModel() : pi.getModel(),
      firmwareVersion: pi.getFirmware(),
      sdkVersion: '',
      platform: 'Tizen',
    });
  }
  if (isTizen()) return Promise.resolve({ modelName: 'Samsung', firmwareVersion: '', sdkVersion: '' });
  return luna('''),
    ('''// Apps de streaming que o webOS deixa''', '''// Samsung: the Product API when the app is packaged, otherwise the old WebRTC trick
// (the TV's Chromium 47 still reports the local address in ICE candidates).
function tizenIp() {
  try {
    const net = window.webapis && window.webapis.network;
    const ip = net && net.getIp && net.getIp();
    if (ip) return Promise.resolve(ip);
  } catch (e) {
    /* fall through */
  }
  const RTC = window.RTCPeerConnection || window.webkitRTCPeerConnection;
  if (!RTC) return Promise.reject(new Error('Sem IP'));
  return new Promise((resolve, reject) => {
    const pc = new RTC({ iceServers: [] });
    const done = (fn, v) => {
      try {
        pc.close();
      } catch (e) {
        /* ignore */
      }
      fn(v);
    };
    const timer = setTimeout(() => done(reject, new Error('Sem IP')), 3000);
    pc.onicecandidate = (e) => {
      const m = e && e.candidate && /(\\d+\\.\\d+\\.\\d+\\.\\d+)/.exec(e.candidate.candidate);
      if (m && !/^(0\\.|127\\.)/.test(m[1])) {
        clearTimeout(timer);
        done(resolve, m[1]);
      }
    };
    pc.createDataChannel('ip');
    pc.createOffer((o) => pc.setLocalDescription(o, () => {}, () => {}), () => {});
  });
}

// Apps de streaming que o webOS deixa'''),
])

patch('src/js/lib/nav.js', [
    ('''import { $$ } from './dom.js';
''', '''import { $$ } from './dom.js';
import { isTizen } from './platform.js';

const TIZEN = isTizen();
'''),
    ('  BACK: 461,', '  BACK: TIZEN ? 10009 : 461, // Samsung Return / LG Back'),
    ('  PLAYPAUSE: 179,', '  PLAYPAUSE: TIZEN ? 10252 : 179,'),
    ('  CH_UP: 33,\n  CH_DOWN: 34,', '  CH_UP: TIZEN ? 427 : 33,\n  CH_DOWN: TIZEN ? 428 : 34,'),
])

patch('src/js/api/update.js', [
    ('''export function check() {''', '''export function check() {
  // The release feed belongs to the LG build; the Samsung port updates through TizenBrew.
  if (isTizen()) return Promise.resolve(null);'''),
    ('''import { luna, hasLuna } from '../lib/luna.js';''', '''import { luna, hasLuna } from '../lib/luna.js';
import { isTizen } from '../lib/platform.js';'''),
])
print('patched')
