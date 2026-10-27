// "New episodes": episodes released in the last DAYS days for the series in your Stremio library,
// newest first, leaving out the ones already watched on this TV. Looks at the CHECK most recently
// used series, a few at a time (the TV has little memory); metadata comes from the add-ons' cache.
import * as stremio from './stremio.js';
import * as addons from './addons.js';
import * as watched from '../lib/watched.js';
import * as store from '../lib/store.js';

const DAYS = 7;
const CHECK = 25;
const PARALLEL = 3;

function librarySeries() {
  return stremio
    .cachedLibrary()
    .filter((it) => it.type === 'series' && (!it.removed || (it.state && it.state.timeOffset > 0)))
    .sort((a, b) => String(b._mtime || '').localeCompare(String(a._mtime || '')))
    .slice(0, CHECK);
}

function recent(meta, it) {
  const now = Date.now();
  const from = now - DAYS * 86400000;
  return (meta.videos || [])
    .filter((v) => {
      const t = Date.parse(v.released);
      return v.id && v.season && t >= from && t <= now && !watched.isWatched(v.id);
    })
    .map((v) => ({
      seriesId: it._id,
      type: 'series',
      name: meta.name || it.name,
      poster: meta.poster || it.poster,
      background: meta.background,
      thumbnail: v.thumbnail,
      videoId: v.id,
      season: v.season,
      episode: v.episode,
      title: v.name || v.title || '',
      released: Date.parse(v.released),
    }));
}

// The last list found, so the row can show at once while a fresh one loads.
export function cached() {
  return (store.get('newEpisodes', []) || []).filter((e) => !watched.isWatched(e.videoId) && Date.now() - e.released <= DAYS * 86400000);
}

// Resolves to the list, newest release first (after the add-ons are loaded).
export function load() {
  return addons.load().then(scan).then((list) => {
    store.set('newEpisodes', list.slice(0, 40));
    return list;
  });
}

function scan() {
  const series = librarySeries();
  const out = [];
  let i = 0;
  const worker = () => {
    if (i >= series.length) return Promise.resolve();
    const it = series[i++];
    return addons
      .fetchMeta('series', it._id)
      .then((meta) => {
        recent(meta, it).forEach((e) => out.push(e));
      })
      .catch(() => {})
      .then(worker);
  };
  const workers = [];
  for (let n = 0; n < PARALLEL; n++) workers.push(worker());
  return Promise.all(workers).then(() => out.sort((a, b) => b.released - a.released));
}
