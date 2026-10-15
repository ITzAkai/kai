// Fontes do Hero Banner (como no Kai): Cinemeta Popular ou listas do MDBList (Snoak).
import { cachedJSON } from '../lib/http.js';
import * as store from '../lib/store.js';
import { fetchMeta } from './addons.js';
import { hasTmdb, tmdbFind } from './extras.js';
import { getJSONViaProxy } from './server.js';

export const SOURCES = [
  { id: 'cinemeta', name: 'Cinemeta · Populares' },
  { id: 'cinemeta-featured', name: 'Cinemeta · Mais bem avaliados' },
  { id: 'mdblist', name: 'MDBList · Tendências (Snoak)' },
  { id: 'off', name: 'Desligado' },
];

const CINEMETA = 'https://cinemeta-catalogs.strem.io/top/catalog/';
const MDBLIST = {
  movie: 'https://mdblist.com/lists/snoak/trending-movies/json',
  series: 'https://mdblist.com/lists/snoak/trakt-s-trending-shows/json',
};

export function background(id) {
  return 'https://images.metahub.space/background/medium/' + id + '/img';
}

export function logo(id) {
  return 'https://images.metahub.space/logo/medium/' + id + '/img';
}

function fromMeta(m) {
  return {
    id: m.id || m.imdb_id,
    type: m.type,
    name: m.name,
    description: m.description || '',
    year: m.releaseInfo || m.year || '',
    genres: m.genres || m.genre || [],
    rating: m.imdbRating || '',
    runtime: m.runtime || '',
    background: m.background || background(m.id || m.imdb_id),
    logo: m.logo || logo(m.id || m.imdb_id),
    poster: m.poster,
  };
}

function interleave(a, b) {
  const out = [];
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i]) out.push(a[i]);
    if (b[i]) out.push(b[i]);
  }
  return out;
}

function cinemeta(catalogId) {
  return Promise.all(
    ['movie', 'series'].map((t) =>
      cachedJSON(CINEMETA + t + '/' + catalogId + '.json', 3600000)
        .then((r) => (r.metas || []).slice(0, 8).map(fromMeta))
        .catch(() => [])
    )
  ).then((r) => interleave(r[0], r[1]));
}

function mdblist() {
  return Promise.all(
    ['movie', 'series'].map((t) =>
      getJSONViaProxy(MDBLIST[t], { timeout: 15000 })
        .then((list) =>
          Promise.all(
            (list || [])
              .filter((x) => x.imdb_id)
              .slice(0, 6)
              .map((x) =>
                fetchMeta(t, x.imdb_id)
                  .then(fromMeta)
                  .catch(() => null)
              )
          )
        )
        .then((l) => l.filter(Boolean))
    )
  ).then((r) => interleave(r[0], r[1]));
}

// Com chave TMDB, sinopses e títulos do banner em PT-BR.
function localize(items) {
  if (!hasTmdb()) return items;
  return Promise.all(
    items.map((it) =>
      tmdbFind(it.id)
        .then((f) => {
          if (f && f.overview) it.description = f.overview;
          if (f && f.title) it.name = f.title;
          return it;
        })
        .catch(() => it)
    )
  );
}

export function load() {
  return loadRaw().then((items) => localize(items.slice(0, 12)));
}

function loadRaw() {
  const src = store.settings().heroSource;
  if (src === 'off') return Promise.resolve([]);
  if (src === 'mdblist') {
    // Sem CORS no MDBList: se a TV bloquear, cai para o Cinemeta.
    return mdblist()
      .then((l) => (l.length ? l : cinemeta('top')))
      .catch(() => cinemeta('top'));
  }
  return cinemeta(src === 'cinemeta-featured' ? 'imdbRating' : 'top');
}
