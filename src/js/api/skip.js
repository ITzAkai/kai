// Trechos para pular (abertura, recapitulação, encerramento), como o notify_skip do Kai:
// 1) IntroDB (por IMDb + temporada/episódio) tem prioridade;
// 2) AniSkip (por ID do MyAnimeList) para animes, com o ID convertido via arm.haglund.dev.
import { getJSON } from '../lib/http.js';
import * as server from './server.js';
import { log } from '../lib/log.js';

const INTRODB = 'https://api.introdb.app/segments';
const ANISKIP = 'https://api.aniskip.com/v2/skip-times/';
const ARM = 'https://arm.haglund.dev/api/v2/';

// O IntroDB só libera CORS para o próprio site; se a TV bloquear, vai pelo proxy do servidor do PC.
function getJSONWithProxy(url) {
  return server.getJSONViaProxy(url, { timeout: 10000 });
}

function fromIntroDb(data) {
  const out = [];
  const map = { intro: 'intro', recap: 'recap', outro: 'outro' };
  Object.keys(map).forEach((k) => {
    const s = data && data[k];
    if (s && isFinite(s.start_sec) && isFinite(s.end_sec) && s.end_sec > s.start_sec) out.push({ type: map[k], start: s.start_sec, end: s.end_sec, source: 'IntroDB' });
  });
  return out;
}

function fromAniSkip(data) {
  const map = { op: 'intro', 'mixed-op': 'intro', recap: 'recap', ed: 'outro', 'mixed-ed': 'outro' };
  return ((data && data.found && data.results) || [])
    .filter((r) => map[r.skipType] && r.interval)
    .map((r) => ({ type: map[r.skipType], start: r.interval.startTime, end: r.interval.endTime, source: 'AniSkip' }));
}

// IDs de anime: "kitsu:123:5", "mal:123:5", "anilist:123:5" → { source, id, episode }
function parseAnimeId(videoId) {
  const m = String(videoId).match(/^(kitsu|mal|anilist):(\d+)(?::(\d+))?/);
  return m ? { source: m[1] === 'mal' ? 'myanimelist' : m[1], id: m[2], episode: m[3] ? parseInt(m[3], 10) : 1 } : null;
}

const malCache = {};
function malFromAnime(a) {
  if (a.source === 'myanimelist') return Promise.resolve(parseInt(a.id, 10));
  const key = a.source + ':' + a.id;
  if (!malCache[key])
    malCache[key] = getJSON(ARM + 'ids?source=' + a.source + '&id=' + a.id, { quiet: true }).then((r) => (r && r.myanimelist) || null);
  return malCache[key];
}

// IMDb + temporada → MAL (o arm devolve uma entrada por temporada do TVDB/TMDB).
function malFromImdb(imdb, season) {
  const key = imdb + ':' + season;
  if (!malCache[key])
    malCache[key] = getJSON(ARM + 'imdb?id=' + imdb, { quiet: true })
      .then((list) => {
        const arr = Array.isArray(list) ? list : [];
        const hit =
          arr.find((x) => x.myanimelist && (x['thetvdb-season'] === season || x['themoviedb-season'] === season)) ||
          (arr.length === 1 ? arr[0] : null);
        return hit ? hit.myanimelist : null;
      })
      .catch(() => null);
  return malCache[key];
}

export function isAnime(meta) {
  const g = (meta.genres || meta.genre || []).map((x) => String(x).toLowerCase());
  return /^(kitsu|mal|anilist):/.test(meta.id) || g.indexOf('anime') >= 0 || (g.indexOf('animation') >= 0 && /japan/i.test(meta.country || ''));
}

export function getSegments(meta, video, durationSec) {
  const anime = parseAnimeId(video.id);
  const imdb = /^tt\d+/.test(meta.id) ? meta.id.match(/^tt\d+/)[0] : null;
  const season = video.season;
  const episode = video.episode;

  const intro = imdb
    ? getJSONWithProxy(INTRODB + '?imdb_id=' + imdb + (isFinite(season) && isFinite(episode) ? '&season=' + season + '&episode=' + episode : ''))
        .then(fromIntroDb)
        .catch(() => [])
    : Promise.resolve([]);

  return intro.then((segs) => {
    if (segs.length) return segs;
    let malPromise = null;
    let ep = episode;
    if (anime) {
      malPromise = malFromAnime(anime);
      ep = anime.episode;
    } else if (imdb && isAnime(meta) && isFinite(episode)) malPromise = malFromImdb(imdb, season || 1);
    if (!malPromise) return [];
    return malPromise
      .then((mal) => {
        if (!mal || !ep) return [];
        const q = ['op', 'ed', 'recap', 'mixed-op', 'mixed-ed'].map((t) => 'types%5B%5D=' + t).join('&');
        return getJSON(ANISKIP + mal + '/' + ep + '?' + q + '&episodeLength=' + Math.round(durationSec || 0), { quiet: true }).then(fromAniSkip);
      })
      .catch(() => []);
  }).then((segs) => {
    if (segs.length) log.info('Pular: ' + segs.map((s) => s.type + ' ' + s.start.toFixed(0) + '-' + s.end.toFixed(0) + ' (' + s.source + ')').join(', '));
    return segs;
  });
}
