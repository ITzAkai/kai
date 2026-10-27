// Metadados extras no estilo do Kai (Metadata/ e details-enhancer):
// - notas de várias fontes (IMDb do Cinemeta; MDBList com chave; AniList para animes, sem chave);
// - sinopse/título em PT-BR, logo e elenco com fotos via TMDB (com chave).
import { getJSON, postJSON, cachedJSON } from '../lib/http.js';
import * as store from '../lib/store.js';
import { getJSONViaProxy } from './server.js';
import { t, apiLang, current } from '../lib/i18n.js';

const TMDB = 'https://api.themoviedb.org/3/';
const TMDB_IMG = 'https://image.tmdb.org/t/p/';
const ARM = 'https://arm.haglund.dev/api/v2/';

function imdbOf(id) {
  const m = String(id || '').match(/^tt\d+/);
  return m ? m[0] : null;
}

function tmdbKey() {
  return (store.settings().tmdbKey || '').trim();
}

export function hasTmdb() {
  return !!tmdbKey();
}

function tmdb(path, params) {
  const q = ['api_key=' + encodeURIComponent(tmdbKey())];
  Object.keys(params || {}).forEach((k) => q.push(k + '=' + encodeURIComponent(params[k])));
  return cachedJSON(TMDB + path + '?' + q.join('&'), 6 * 3600000, { quiet: true });
}

// Movies whose digital (streaming / rent / buy) release in `region` falls on `ymd` (YYYY-MM-DD).
export function digitalReleases(ymd, region) {
  if (!tmdbKey()) return Promise.resolve(null);
  return tmdb('discover/movie', {
    with_release_type: 4,
    'release_date.gte': ymd,
    'release_date.lte': ymd,
    region: region,
    sort_by: 'popularity.desc',
    include_adult: 'false',
    language: apiLang(),
  }).then((r) =>
    ((r && r.results) || []).map((m) => ({
      tmdb: m.id,
      name: m.title,
      poster: m.poster_path ? TMDB_IMG + 'w342' + m.poster_path : null,
      score: m.vote_average ? Math.round(m.vote_average * 10) : 0,
    }))
  );
}

// IMDb → { id, type: 'movie' | 'tv', overview, title } em PT-BR.
export function tmdbFind(imdb) {
  if (!tmdbKey() || !imdb) return Promise.resolve(null);
  return tmdb('find/' + imdb, { external_source: 'imdb_id', language: apiLang() }).then((r) => {
    const m = (r.movie_results || [])[0];
    const tv = (r.tv_results || [])[0];
    const hit = m || tv;
    if (!hit) return null;
    return { id: hit.id, type: m ? 'movie' : 'tv', overview: hit.overview || '', title: hit.title || hit.name || '' };
  });
}

function pickLogo(logos) {
  const pref = current() === 'ar' ? ['ar', 'en', null] : ['en', null];
  for (let i = 0; i < pref.length; i++) {
    const l = (logos || []).find((x) => x.iso_639_1 === pref[i]);
    if (l) return TMDB_IMG + 'w500' + l.file_path;
  }
  return null;
}

// Detalhes localizados: título, sinopse, logo e elenco com fotos.
export function localized(meta) {
  const imdb = imdbOf(meta.id);
  return tmdbFind(imdb).then((f) => {
    if (!f) return null;
    return tmdb(f.type + '/' + f.id, { language: apiLang(), append_to_response: 'credits,images', include_image_language: 'en,ar,null' }).then((d) => ({
      tmdbId: f.id,
      tmdbType: f.type,
      title: d.title || d.name || f.title,
      overview: d.overview || f.overview,
      tagline: d.tagline || '',
      logo: pickLogo(d.images && d.images.logos),
      cast: ((d.credits && d.credits.cast) || []).slice(0, 14).map((c) => ({
        id: c.id,
        name: c.name,
        character: c.character || '',
        photo: c.profile_path ? TMDB_IMG + 'w185' + c.profile_path : null,
      })),
    }));
  });
}

// Actor profile: photo, dates, birthplace, biography in the app's language (English when TMDB
// has none in Arabic) and their films and series, most popular first.
export function person(id) {
  return tmdb('person/' + id, { language: apiLang(), append_to_response: 'combined_credits' }).then((p) => {
    const bio = p.biography
      ? Promise.resolve(p.biography)
      : current() === 'ar'
      ? tmdb('person/' + id, { language: 'en-US' }).then((e) => (e && e.biography) || '')
      : Promise.resolve('');
    return bio.then((biography) => {
      const seen = {};
      const credits = ((p.combined_credits && p.combined_credits.cast) || [])
        .concat(((p.combined_credits && p.combined_credits.crew) || []).filter((c) => c.job === 'Director'))
        .filter((c) => {
          const key = c.media_type + c.id;
          if (!c.poster_path || seen[key] || (c.media_type !== 'movie' && c.media_type !== 'tv')) return false;
          // Talk shows and award ceremonies where the actor appears as themselves aren't their work.
          if (c.media_type === 'tv' && /^(Self|Himself|Herself|Host)/i.test(c.character || '')) return false;
          seen[key] = true;
          return true;
        })
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        .map((c) => ({
          tmdb: c.id,
          type: c.media_type,
          name: c.title || c.name,
          poster: TMDB_IMG + 'w342' + c.poster_path,
          year: String(c.release_date || c.first_air_date || '').slice(0, 4),
          role: c.character || c.job || '',
        }));
      return {
        name: p.name,
        photo: p.profile_path ? TMDB_IMG + 'h632' + p.profile_path : null,
        birthday: p.birthday,
        deathday: p.deathday,
        place: p.place_of_birth || '',
        department: p.known_for_department || '',
        biography: biography,
        credits: credits,
      };
    });
  });
}

// TMDB movie/tv id → IMDb id, which Stremio's catalogs use.
export function tmdbImdb(type, id) {
  return tmdb(type + '/' + id + '/external_ids', {}).then((r) => (r && r.imdb_id) || null);
}

// Episódios de uma temporada em PT-BR: { [número]: { name, overview, still } }
export function seasonPt(tmdbId, season) {
  if (!tmdbKey()) return Promise.resolve({});
  return tmdb('tv/' + tmdbId + '/season/' + season, { language: apiLang() }).then((r) => {
    const map = {};
    (r.episodes || []).forEach((e) => {
      map[e.episode_number] = { name: e.name, overview: e.overview, still: e.still_path ? TMDB_IMG + 'w300' + e.still_path : null };
    });
    return map;
  });
}

// ---------- Notas ----------
function mdblist(meta) {
  const key = (store.settings().mdblistKey || '').trim();
  const imdb = imdbOf(meta.id);
  if (!key || !imdb) return Promise.resolve([]);
  const type = meta.type === 'series' ? 'show' : 'movie';
  return getJSONViaProxy('https://api.mdblist.com/imdb/' + type + '/' + imdb + '?apikey=' + encodeURIComponent(key), { timeout: 12000 })
    .then((d) => {
      const out = [];
      (d.ratings || []).forEach((r) => {
        const v = r.value;
        if (v === null || v === undefined || v === 0) return;
        const src = String(r.source || '').toLowerCase();
        if (src === 'tomatoes') out.push({ cls: 'rt', label: 'RT', value: v + '%' });
        else if (src === 'popcorn' || src === 'tomatoesaudience') out.push({ cls: 'rt', label: t('Público'), value: v + '%' });
        else if (src === 'metacritic') out.push({ cls: 'mc', label: 'MC', value: String(v) });
        else if (src === 'trakt') out.push({ cls: 'trakt', label: 'Trakt', value: v + '%' });
        else if (src === 'letterboxd') out.push({ cls: 'lb', label: 'LB', value: Number(v).toFixed(1) });
        else if (src === 'tmdb') out.push({ cls: 'tmdb', label: 'TMDB', value: v + '%' });
      });
      return out;
    })
    .catch(() => []);
}

function anilistScore(meta) {
  const m = String(meta.id).match(/^(kitsu|mal|anilist):(\d+)/);
  let idPromise;
  if (m && m[1] === 'anilist') idPromise = Promise.resolve({ anilist: parseInt(m[2], 10) });
  else if (m) idPromise = getJSON(ARM + 'ids?source=' + (m[1] === 'mal' ? 'myanimelist' : m[1]) + '&id=' + m[2], { quiet: true });
  else if (imdbOf(meta.id)) idPromise = getJSON(ARM + 'imdb?id=' + imdbOf(meta.id), { quiet: true }).then((l) => (Array.isArray(l) && l[0]) || null);
  else return Promise.resolve([]);
  return idPromise
    .then((ids) => {
      if (!ids || !ids.anilist) return [];
      return postJSON('https://graphql.anilist.co', { query: 'query($id:Int){Media(id:$id,type:ANIME){averageScore}}', variables: { id: ids.anilist } }, { quiet: true }).then((r) => {
        const sc = r && r.data && r.data.Media && r.data.Media.averageScore;
        return sc ? [{ cls: 'al', label: 'AniList', value: sc + '%' }] : [];
      });
    })
    .catch(() => []);
}

export function ratings(meta, anime) {
  const base = meta.imdbRating ? [{ cls: 'imdb', label: 'IMDb', value: String(meta.imdbRating) }] : [];
  return Promise.all([mdblist(meta), anime ? anilistScore(meta) : Promise.resolve([])]).then((r) => base.concat(r[0], r[1]));
}
