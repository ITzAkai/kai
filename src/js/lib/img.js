// Versões menores das imagens. A TV tem ~180 MB livres e o que pesa é a imagem DECODIFICADA:
// pôster 500x750 ≈ 1,5 MB; original do Kitsu 2715x3840 ≈ 41 MB (!). O cartão tem só 210x315.
import { getJSON } from './http.js';

export function smallPoster(url) {
  if (!url) return url;
  return String(url)
    .replace(/(images\.metahub\.space\/poster\/)(medium|large)\//, '$1small/') // 300x450
    .replace(/(image\.tmdb\.org\/t\/p\/)[^/]+\//, '$1w185/') // 185x278
    .replace(/(artworks\.thetvdb\.com\/banners\/(?:[^?]*\/)?posters\/[^/?]+?)(?:_t)?\.(jpg|png)/, '$1_t.$2') // 340x500
    .replace(/(static\.tvmaze\.com\/uploads\/images\/)(original_untouched|large_landscape|medium_landscape)\//, '$1medium_portrait/')
    .replace(/(kitsu\.app\/anime\/poster_images\/\d+\/)(original|large|medium)\.(jpg|jpeg|png)/, '$1small.jpg'); // Kitsu antigo: 284x402
}

export function smallBackground(url) {
  if (!url) return url;
  return String(url)
    .replace(/(images\.metahub\.space\/background\/)(medium|large)\//, '$1small/') // 480x270
    .replace(/(image\.tmdb\.org\/t\/p\/)[^/]+\//, '$1w300/')
    .replace(/(kitsu\.app\/anime\/(?:poster|cover)_images\/\d+\/)(original|large)\.(jpg|jpeg|png)/, '$1small.jpg')
    .replace(/(artworks\.thetvdb\.com\/banners\/(?:[^?]*\/)?(?:posters|fanart)\/[^/?]+?)(?:_t)?\.(jpg|png)/, '$1_t.$2');
}

export function smallThumb(url) {
  if (!url) return url;
  return String(url)
    .replace(/(image\.tmdb\.org\/t\/p\/)[^/]+\//, '$1w300/')
    .replace(/(artworks\.thetvdb\.com\/banners\/(?:[^?]*\/)?episodes\/[^/?]+?)(?:_t)?\.(jpg|png)/, '$1_t.$2');
}

// ---------- Kitsu ----------
// O endereço da versão pequena tem outro hash, então vem da API (um pedido por lote de até 20).
const KITSU_RE = /(?:media\.kitsu\.app|kitsu-production-media\.[^/]+)\/anime\/(?:poster_images\/)?(\d+)\/(poster_image|cover_image)\/(?!small-|tiny-|medium-|large-)/;
const kitsuCache = {}; // "id:kind" -> Promise<url|null>
let batch = {};
let batchTimer = null;

export function kitsuInfo(url) {
  const m = String(url || '').match(KITSU_RE);
  return m ? { id: m[1], kind: m[2] === 'cover_image' ? 'cover' : 'poster' } : null;
}

function flush() {
  const ids = Object.keys(batch);
  const waiting = batch;
  batch = {};
  batchTimer = null;
  for (let i = 0; i < ids.length; i += 20) {
    const chunk = ids.slice(i, i + 20);
    getJSON(
      'https://kitsu.io/api/edge/anime?filter%5Bid%5D=' + chunk.join(',') + '&fields%5Banime%5D=posterImage,coverImage&page%5Blimit%5D=20',
      { quiet: true, timeout: 15000 }
    )
      .then((r) => {
        const found = {};
        ((r && r.data) || []).forEach((a) => (found[a.id] = a.attributes || {}));
        chunk.forEach((id) => {
          const at = found[id] || {};
          const p = at.posterImage || {};
          const c = at.coverImage || {};
          waiting[id].forEach((w) => w.resolve(w.kind === 'cover' ? c.small || c.tiny || null : p.small || p.tiny || null));
        });
      })
      .catch(() => chunk.forEach((id) => waiting[id].forEach((w) => w.resolve(null))));
  }
}

export function kitsuSmall(info) {
  const key = info.id + ':' + info.kind;
  if (!kitsuCache[key]) {
    kitsuCache[key] = new Promise((resolve) => {
      (batch[info.id] = batch[info.id] || []).push({ kind: info.kind, resolve: resolve });
      if (!batchTimer) batchTimer = setTimeout(flush, 60);
    });
  }
  return kitsuCache[key];
}
