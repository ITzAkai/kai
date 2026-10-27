// Watched markers, kept per profile on this TV: how far each episode/film got, and which are
// finished (90% or more). Stremio's own watched data is a zlib-compressed bitfield the TV's
// old engine can't read cheaply, so the app tracks it itself from what plays here.
import * as store from './store.js';

const KEY = 'watched';
const DONE = 0.9;
const MAX = 3000;

function all() {
  return store.get(KEY, {}) || {};
}

// Remembers progress (0..1) for a video id; at 90% it counts as watched.
export function record(videoId, fraction) {
  if (!videoId || !(fraction > 0.02)) return;
  const map = all();
  delete map[videoId]; // re-insert so the newest entries survive trimming
  map[videoId] = fraction >= DONE ? 1 : Math.round(fraction * 1000) / 1000;
  const keys = Object.keys(map);
  for (let i = 0; i < keys.length - MAX; i++) delete map[keys[i]];
  store.set(KEY, map);
}

export function isWatched(videoId) {
  return all()[videoId] === 1;
}

// Partial progress (0..1), or 0 when not started or already watched.
export function progress(videoId) {
  const v = all()[videoId];
  return v && v < 1 ? v : 0;
}
