// Player: <video> nativo da TV (decodificação por hardware), legendas próprias, faixas via Luna.
import { h, clear } from '../lib/dom.js';
import * as nav from '../lib/nav.js';
import { KEY } from '../lib/nav.js';
import { luna, hasLuna, closeHeavyBackgroundApps } from '../lib/luna.js';
import * as subs from '../lib/subs.js';
import * as substyle from '../lib/substyle.js';
import * as store from '../lib/store.js';
import { log } from '../lib/log.js';
import { getText } from '../lib/http.js';
import * as server from '../api/server.js';
import * as addons from '../api/addons.js';
import * as stremio from '../api/stremio.js';
import * as skip from '../api/skip.js';
import { menu, toast, fmtTime, timeHM } from '../ui.js';
import * as router from '../router.js';
import { sortedVideos, openDetails } from './details.js';

const HIDE_MS = 5000;
const SAVE_MS = 15000;
const LANG_NAMES = {
  por: 'Português', pob: 'Português (BR)', pt: 'Português', 'pt-br': 'Português (BR)', eng: 'Inglês', en: 'Inglês',
  spa: 'Espanhol', es: 'Espanhol', jpn: 'Japonês', ja: 'Japonês', fre: 'Francês', fra: 'Francês', fr: 'Francês',
  ger: 'Alemão', deu: 'Alemão', de: 'Alemão', ita: 'Italiano', it: 'Italiano', kor: 'Coreano', ko: 'Coreano',
  chi: 'Chinês', zho: 'Chinês', rus: 'Russo', ara: 'Árabe', hin: 'Hindi', und: 'Indefinido',
};

function langName(code) {
  if (!code) return 'Desconhecido';
  return LANG_NAMES[String(code).toLowerCase()] || code;
}

export function openPlayer(opts) {
  router.push(PlayerView(opts));
}

function PlayerView(opts) {
  const meta = opts.meta;
  let video = opts.video;
  let stream = opts.stream;
  const settings = store.settings();

  const videoEl = h('video', { preload: 'auto' });
  const subsEl = h('div.subs');
  const titleEl = h('div.p-title');
  const clockEl = h('div.p-clock');
  const posEl = h('div.pos');
  const bufEl = h('div.buf');
  const knobEl = h('div.knob');
  const seekLabel = h('div.seek-label');
  const bar = h('div.p-bar', { focusable: true, onSelect: () => togglePlay() }, [bufEl, posEl, knobEl, seekLabel]);
  const curTimeEl = h('span');
  const durEl = h('span');
  const playBtn = h('div.btn', { focusable: true, onSelect: () => togglePlay() });
  const audioBtn = h('div.btn', { focusable: true, html: '<span class="ico">♫</span>Áudio', onSelect: () => audioMenu() });
  const subsBtn = h('div.btn', { focusable: true, html: '<span class="ico">≡</span>Legendas', onSelect: () => subsMenu() });
  const srcBtn = h('div.btn', { focusable: true, html: '<span class="ico">⇄</span>Fontes', onSelect: () => sourcesMenu() });
  const nextBtn = h('div.btn', { focusable: true, html: '<span class="ico">⏭</span>Próximo', onSelect: () => playNext() });
  const buttons = h('div.p-buttons', { 'data-group': '' }, [playBtn, audioBtn, subsBtn, srcBtn, nextBtn]);
  const spinner = h('div.p-center', null, h('div.spinner'));
  const msgEl = h('div.p-msg');
  const skipFill = h('i');
  const skipBtn = h('div.btn', { focusable: true, onSelect: () => doSkip() });
  const skipBox = h('div.p-skip', null, [skipBtn, h('div.bar', null, skipFill)]);
  const overlay = h('div.p-overlay', null, [
    h('div.p-top', null, [titleEl, clockEl]),
    h('div.p-bottom', null, [bar, h('div.p-times', null, [curTimeEl, h('div.spacer'), durEl]), buttons]),
  ]);
  const el = h('div.view.player', null, [videoEl, subsEl, overlay, skipBox, spinner, msgEl]);

  const renderer = subs.Renderer(subsEl);
  substyle.apply(subsEl, settings);

  let alive = true;
  let controlsOn = false;
  let hideTimer = null;
  let ticker = null;
  let saveTimer = null;
  let watchTimer = null;
  let statusTimer = null;
  let mediaUrl = '';
  let viaServer = false;
  let lastTick = 0;
  let watchedDelta = 0;
  let pendingStart = opts.startTime || 0;
  let seekTarget = null;
  let seekCommitTimer = null;
  let seekRepeats = 0;
  let embedded = null; // { audio: [], subs: [] } do servidor
  let addonSubs = null;
  let currentSub = { kind: 'off' };
  let currentAudio = null;
  let triedTranscode = false;

  const seriesInfo = () => (opts.isSeries ? { season: video.season, episode: video.episode } : null);

  function setTitle() {
    clear(titleEl);
    titleEl.appendChild(document.createTextNode(meta.name || ''));
    if (opts.isSeries) titleEl.appendChild(h('small', { text: 'T' + video.season + ' E' + video.episode + ' · ' + (video.name || video.title || '') }));
    nextBtn.style.display = opts.isSeries && nextVideo() ? '' : 'none';
  }

  function nextVideo() {
    const vids = sortedVideos(meta);
    const i = vids.findIndex((v) => v.id === video.id);
    return i >= 0 && i + 1 < vids.length ? vids[i + 1] : null;
  }

  // ---------- Carregamento ----------
  function start() {
    setTitle();
    showSpinner(true);
    message('');
    embedded = null;
    tracksPromise = null;
    addonSubs = null;
    renderer.clear();
    currentSub = { kind: 'off' };
    segments = [];
    segmentsLoaded = false;
    nativeOffDone = false;
    hideSkip();
    server
      .toPlayable(stream, seriesInfo())
      .then((res) => {
        if (!alive) return;
        mediaUrl = res.url;
        viaServer = res.viaServer;
        log.info('Tocando', mediaUrl);
        // Só src + autoplay, como o player oficial do Stremio no webOS: load()/play() extras
        // faziam a TV abrir o stream duas vezes.
        hasPlayed = false;
        videoEl.autoplay = true;
        videoEl.src = mediaUrl;
        freeBackgroundMemory();
        loadSubtitles();
        // Faixas embutidas só quando o usuário abre o menu: o ffprobe do servidor lê o arquivo
        // e, num torrent, rouba prioridade do trecho que está tocando.
      })
      .catch((e) => fail(e.message));
  }

  let tracksPromise = null;
  function loadEmbeddedTracks() {
    if (!server.isAvailable()) return Promise.resolve(null);
    if (!tracksPromise) {
      const forUrl = mediaUrl;
      tracksPromise = server
        .tracks(mediaUrl)
        .then((t) => {
          if (!alive || !t || forUrl !== mediaUrl) return null;
          embedded = t;
          log.info('Faixas embutidas', JSON.stringify(t));
          return t;
        })
        .catch(() => {
          tracksPromise = null;
          return null;
        });
    }
    return tracksPromise;
  }

  function loadSubtitles() {
    const forVideo = video;
    addonSubs = null;
    addons
      .fetchSubtitles(meta.type, video.id, {}, (list) => {
        if (!alive || forVideo !== video) return;
        addonSubs = (addonSubs || []).concat(list);
        autoPick();
      })
      .catch(() => {
        if (!addonSubs) addonSubs = [];
      });
  }

  // Seleção automática no estilo do Smart Track Selector do Kai (versão leve).
  // Legenda: prefere a dos addons (arquivo pequeno à parte, não mexe no vídeo). Faixas embutidas
  // só são lidas se o usuário pediu um áudio preferido, e só depois de o vídeo estar rodando.
  let autoDone = { sub: false, audio: false };
  function autoPick() {
    const prefSubs = (settings.subtitleLangs || []).map((x) => x.toLowerCase());
    const prefAudio = (settings.audioLangs || []).map((x) => x.toLowerCase());
    if (!autoDone.audio && prefAudio.length && embedded && embedded.audio.length > 1) {
      autoDone.audio = true;
      const already = embedded.audio[0] && prefAudio.indexOf(String(embedded.audio[0].lang).toLowerCase()) >= 0;
      if (!already) {
        const idx = embedded.audio.findIndex((t) => prefAudio.indexOf(String(t.lang).toLowerCase()) >= 0);
        if (idx > 0) selectEmbeddedAudio(idx);
      }
    }
    if (autoDone.sub || !settings.subtitlesAuto || !prefSubs.length || !addonSubs) return;
    for (let p = 0; p < prefSubs.length; p++) {
      const s = addonSubs.find((x) => String(x.lang).toLowerCase() === prefSubs[p]);
      if (s) {
        autoDone.sub = true;
        selectAddonSub(s, true);
        return;
      }
    }
  }

  // Áudio preferido configurado: lê as faixas uma vez, 20s depois de o vídeo começar.
  function scheduleAudioPick() {
    if (!(settings.audioLangs || []).length || !server.isAvailable()) return;
    setTimeout(() => {
      if (alive && hasPlayed) loadEmbeddedTracks().then(() => autoPick());
    }, 20000);
  }

  // ---------- Eventos do vídeo ----------
  videoEl.addEventListener('loadedmetadata', () => {
    if (pendingStart > 0) {
      try {
        videoEl.currentTime = pendingStart / 1000;
        autoResume = true;
      } catch (e) {
        /* ignore */
      }
      pendingStart = 0;
    }
    updateTimes();
    loadSegments();
  });
  videoEl.addEventListener('playing', () => {
    if (!hasPlayed) scheduleAudioPick();
    hasPlayed = true;
    showSpinner(false);
    message('');
    updatePlayBtn();
    scheduleHide();
  });
  videoEl.addEventListener('pause', () => {
    updatePlayBtn();
    showControls();
    saveProgress();
  });
  videoEl.addEventListener('waiting', () => showSpinner(true));
  videoEl.addEventListener('canplay', () => showSpinner(false));
  videoEl.addEventListener('timeupdate', () => {
    const now = Date.now();
    if (!videoEl.paused && lastTick) {
      const d = now - lastTick;
      if (d > 0 && d < 3000) watchedDelta += d;
    }
    lastTick = now;
    renderer.update(videoEl.currentTime);
    if (controlsOn) updateTimes();
  });
  videoEl.addEventListener('ended', () => {
    saveProgress();
    if (opts.isSeries && nextVideo()) playNext();
    else router.pop();
  });
  videoEl.addEventListener('error', () => {
    const err = videoEl.error;
    log.warn('Erro de vídeo', err && err.code, mediaUrl);
    if (!alive) return;
    if (!triedTranscode && server.isAvailable()) {
      fail('A TV não conseguiu tocar este arquivo diretamente.', true);
    } else fail('A TV não conseguiu tocar este arquivo (formato ou codec não suportado).');
  });

  // ---------- Pular abertura / recapitulação / encerramento ----------
  let segments = [];
  let segmentsLoaded = false;
  let activeSeg = null;
  const doneSegs = {};

  function loadSegments() {
    if (segmentsLoaded || store.settings().skipMode === 'off') return;
    segmentsLoaded = true;
    const forVideo = video;
    skip
      .getSegments(meta, video, videoEl.duration)
      .then((list) => {
        if (alive && forVideo === video) segments = list;
      })
      .catch(() => {});
  }

  function segLabel(seg) {
    if (seg.type === 'intro') return 'Pular abertura';
    if (seg.type === 'recap') return 'Pular recapitulação';
    return opts.isSeries && nextVideo() ? 'Próximo episódio' : 'Pular encerramento';
  }

  function segKey(seg) {
    return video.id + ':' + seg.type + ':' + seg.start;
  }

  function checkSkip() {
    if (!segments.length || seekTarget !== null) return;
    const t = videoEl.currentTime;
    const seg = segments.find((x) => t >= x.start && t < x.end - 0.5) || null;
    if (seg !== activeSeg) {
      activeSeg = seg;
      if (!seg || doneSegs[segKey(seg)]) {
        hideSkip();
        if (seg) activeSeg = null;
        return;
      }
      if (store.settings().skipMode === 'auto') {
        doSkip();
        return;
      }
      skipBtn.innerHTML = '<span class="ico">⏭</span>' + segLabel(seg);
      skipBox.classList.add('show');
      if (controlsOn) nav.focus(skipBtn, { noScroll: true });
    }
    if (activeSeg) skipFill.style.width = Math.max(0, Math.min(100, ((t - activeSeg.start) / (activeSeg.end - activeSeg.start)) * 100)) + '%';
  }

  function hideSkip() {
    skipBox.classList.remove('show');
    if (nav.current() === skipBtn) nav.focus(bar, { noScroll: true });
  }

  function dismissSkip() {
    if (activeSeg) doneSegs[segKey(activeSeg)] = true;
    activeSeg = null;
    hideSkip();
  }

  function doSkip() {
    const seg = activeSeg;
    if (!seg) return;
    doneSegs[segKey(seg)] = true;
    activeSeg = null;
    hideSkip();
    if (seg.type === 'outro' && opts.isSeries && nextVideo()) {
      playNext();
      return;
    }
    const d = videoEl.duration;
    try {
      videoEl.currentTime = Math.min(seg.end, isFinite(d) ? d - 1 : seg.end);
    } catch (e) {
      /* ignore */
    }
    if (store.settings().skipMode === 'auto') toast(seg.type === 'intro' ? 'Abertura pulada' : seg.type === 'recap' ? 'Recapitulação pulada' : 'Encerramento pulado');
  }

  // ---------- Diagnóstico e recuperação de travamentos ----------
  function bufferedInfo() {
    try {
      const b = videoEl.buffered;
      const out = [];
      for (let i = 0; i < b.length; i++) out.push(b.start(i).toFixed(0) + '-' + b.end(i).toFixed(0));
      return out.join(',');
    } catch (e) {
      return '?';
    }
  }

  function diag(ev) {
    log.info(
      'video',
      ev,
      't=' + videoEl.currentTime.toFixed(1),
      'dur=' + (isFinite(videoEl.duration) ? videoEl.duration.toFixed(0) : '?'),
      'ready=' + videoEl.readyState,
      'net=' + videoEl.networkState,
      'buf=' + bufferedInfo()
    );
  }
  ['waiting', 'stalled', 'suspend', 'abort', 'emptied', 'seeking', 'seeked', 'ended', 'loadeddata'].forEach((ev) =>
    videoEl.addEventListener(ev, () => diag(ev))
  );

  // O player do webOS às vezes para de pedir dados no meio de arquivos longos via HTTP
  // e fica "carregando" para sempre. Se o tempo não anda por 15s sem pausa, reabre o stream no mesmo ponto.
  let lastT = -1;
  let hasPlayed = false; // só vigia depois que o vídeo começou (o torrent pode demorar a iniciar)
  let gaveUp = false;
  let autoResume = false;
  videoEl.addEventListener('seeked', () => {
    if (autoResume) {
      autoResume = false;
      const p = videoEl.play();
      if (p && p.catch) p.catch(() => {});
    }
  });

  function stuckMenu(t) {
    showSpinner(false);
    menu(
      'O vídeo parou de carregar',
      [
        { label: 'Tentar de novo', sub: 'Reabre o vídeo em ' + fmtTime(t), value: 'retry', checked: true },
        { label: 'Escolher outra fonte', value: 'src' },
        { label: 'Voltar', value: 'back' },
      ],
      {
        center: true,
        onPick: (v) => {
          if (v === 'retry') {
            gaveUp = false;
            recoveries = 0;
            reopenAt(t);
          } else if (v === 'src') sourcesMenu();
          else router.pop();
        },
      }
    );
  }

  // Memória: fecha apps pesados que o webOS deixa em segundo plano (ex.: Netflix ~80 MB)
  // e pede para a tela inicial soltar as fileiras enquanto o vídeo toca.
  function freeBackgroundMemory() {
    closeHeavyBackgroundApps().then((closed) => closed.length && log.info('Apps fechados em segundo plano: ' + closed.join(', ')));
    const home = router.tabView('home');
    if (home && home.freeMemory) home.freeMemory();
  }
  let stuckSince = 0;
  let recoveries = 0;
  let lastRecoveryAt = 0;
  function watchdog() {
    if (!alive || gaveUp || !hasPlayed || !mediaUrl || videoEl.paused || seekTarget !== null || videoEl.ended) {
      stuckSince = 0;
      return;
    }
    const t = videoEl.currentTime;
    if (Math.abs(t - lastT) > 0.05) {
      lastT = t;
      stuckSince = 0;
      if (Date.now() - lastRecoveryAt > 120000) recoveries = 0;
      return;
    }
    if (!stuckSince) {
      stuckSince = Date.now();
      return;
    }
    const stuckFor = Date.now() - stuckSince;
    if (stuckFor > 15000) {
      stuckSince = 0;
      if (recoveries >= 3) {
        diag('travado-desisti');
        gaveUp = true; // para de vigiar até o usuário escolher (antes reabria o aviso sem parar)
        stuckMenu(t);
        return;
      }
      recoveries++;
      lastRecoveryAt = Date.now();
      diag('travado-recuperando#' + recoveries);
      reopenAt(t);
    }
  }

  function reopenAt(t) {
    showSpinner(true);
    toast('Reconectando ao vídeo...');
    pendingStart = Math.max(0, t - 1) * 1000;
    const src = videoEl.currentSrc || mediaUrl;
    try {
      videoEl.pause();
      videoEl.removeAttribute('src');
      videoEl.load();
    } catch (e) {
      /* ignore */
    }
    // Reabre do zero: o ponto certo é aplicado no loadedmetadata e o play vem depois do seek.
    setTimeout(() => {
      if (!alive) return;
      hasPlayed = false;
      videoEl.autoplay = true;
      videoEl.src = src;
      nativeOffDone = false;
      // Legenda embutida nativa precisa ser reaplicada no novo mediaId.
      if (currentSub.kind === 'embedded' && !currentSub.extracted) {
        const idx = currentSub.index;
        setTimeout(() => alive && selectEmbeddedSub(idx), 2500);
      }
    }, 300);
  }

  function fail(text, offerTranscode) {
    showSpinner(false);
    const box = h('div', null, [text, h('small', { text: 'Tente outra fonte (de preferência MP4/MKV com H.264 ou HEVC e áudio AAC/AC3).' })]);
    clear(msgEl);
    msgEl.appendChild(box);
    const opts2 = [{ label: 'Escolher outra fonte', value: 'src' }];
    if (offerTranscode) opts2.unshift({ label: 'Converter no PC (experimental)', sub: 'O servidor converte para HLS que a TV aceita', value: 'hls' });
    opts2.push({ label: 'Voltar', value: 'back' });
    menu('Problema na reprodução', opts2, {
      center: true,
      onPick: (v) => {
        if (v === 'hls') transcode();
        else if (v === 'src') sourcesMenu();
        else router.pop();
      },
    });
  }

  function transcode() {
    triedTranscode = true;
    const base = server.baseUrl();
    const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    const q = ['mediaURL=' + encodeURIComponent(mediaUrl)];
    ['h264', 'h265', 'hevc'].forEach((c) => q.push('videoCodecs=' + c));
    ['aac', 'mp3', 'ac3', 'eac3'].forEach((c) => q.push('audioCodecs=' + c));
    q.push('maxAudioChannels=6');
    const url = base + 'hlsv2/' + id + '/master.m3u8?' + q.join('&');
    pendingStart = videoEl.currentTime * 1000 || pendingStart;
    showSpinner(true);
    message('');
    log.info('Transcodificando', url);
    videoEl.src = url;
    videoEl.load();
    videoEl.play();
  }

  // ---------- Controles ----------
  function togglePlay() {
    if (videoEl.paused) videoEl.play();
    else videoEl.pause();
    showControls();
  }

  function updatePlayBtn() {
    playBtn.innerHTML = videoEl.paused ? '<span class="ico">▶</span>Tocar' : '<span class="ico">❚❚</span>Pausar';
  }

  function updateTimes() {
    const d = videoEl.duration;
    const t = seekTarget !== null ? seekTarget : videoEl.currentTime;
    const pct = d > 0 && isFinite(d) ? Math.min(100, (t / d) * 100) : 0;
    posEl.style.width = pct + '%';
    knobEl.style.left = pct + '%';
    seekLabel.style.left = pct + '%';
    curTimeEl.textContent = fmtTime(t);
    durEl.textContent = isFinite(d) ? fmtTime(d) : '--:--';
    try {
      const b = videoEl.buffered;
      for (let i = 0; i < b.length; i++) {
        if (b.start(i) <= videoEl.currentTime + 1 && b.end(i) >= videoEl.currentTime) {
          bufEl.style.width = (d > 0 ? Math.min(100, (b.end(i) / d) * 100) : 0) + '%';
        }
      }
    } catch (e) {
      /* ignore */
    }
    // Relógio + horário de término (player-clock-eta do Kai).
    const now = new Date();
    clear(clockEl);
    clockEl.appendChild(document.createTextNode(timeHM(now)));
    if (d > 0 && isFinite(d)) {
      const end = new Date(now.getTime() + Math.max(0, d - videoEl.currentTime) * 1000);
      clockEl.appendChild(h('small', { text: 'Termina às ' + timeHM(end) }));
    }
  }

  function showControls(focusEl) {
    if (!controlsOn) {
      controlsOn = true;
      el.classList.add('controls-on');
      updateTimes();
      updatePlayBtn();
      if (!nav.current() || !overlay.contains(nav.current())) nav.focus(focusEl || bar);
    } else if (focusEl) nav.focus(focusEl);
    scheduleHide();
  }

  function hideControls() {
    controlsOn = false;
    el.classList.remove('controls-on');
    clearTimeout(hideTimer);
  }

  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!videoEl.paused && seekTarget === null && nav.topLayer() && nav.topLayer().root === el) hideControls();
    }, HIDE_MS);
  }

  function showSpinner(on) {
    spinner.style.display = on ? '' : 'none';
  }

  function message(text) {
    msgEl.textContent = text;
  }

  // Busca acumulada: segurar a seta acelera (10s → 30s → 60s).
  function seekBy(dir) {
    const d = videoEl.duration;
    if (!(d > 0) || !isFinite(d)) return;
    if (seekTarget === null) {
      seekTarget = videoEl.currentTime;
      seekRepeats = 0;
    }
    seekRepeats++;
    const step = seekRepeats > 15 ? 60 : seekRepeats > 5 ? 30 : 10;
    seekTarget = Math.max(0, Math.min(d - 2, seekTarget + dir * step));
    bar.classList.add('seeking');
    seekLabel.textContent = fmtTime(seekTarget);
    showControls(bar);
    updateTimes();
    clearTimeout(seekCommitTimer);
    seekCommitTimer = setTimeout(commitSeek, 700);
  }

  function commitSeek() {
    if (seekTarget === null) return;
    try {
      videoEl.currentTime = seekTarget;
    } catch (e) {
      /* ignore */
    }
    seekTarget = null;
    bar.classList.remove('seeking');
    if (videoEl.paused) videoEl.play();
    scheduleHide();
  }

  function cancelSeek() {
    clearTimeout(seekCommitTimer);
    seekTarget = null;
    bar.classList.remove('seeking');
    updateTimes();
  }

  // ---------- Faixas ----------
  function mediaId() {
    const id = String(videoEl.mediaId || '').trim();
    return id && id !== '<invalid mediaId>' ? id : null;
  }

  function selectEmbeddedAudio(index) {
    const native = videoEl.audioTracks;
    if (native && native.length > index) {
      for (let i = 0; i < native.length; i++) native[i].enabled = i === index;
      currentAudio = index;
      return;
    }
    const id = mediaId();
    if (!id || !hasLuna()) return toast('Troca de áudio indisponível agora.');
    luna('luna://com.webos.media', 'selectTrack', { mediaId: id, type: 'audio', index: index })
      .then(() => (currentAudio = index))
      .catch((e) => toast('Falha ao trocar áudio: ' + e.message));
  }

  // O player da TV às vezes liga sozinho a legenda padrão do MKV; desliga assim que houver mediaId.
  let nativeOffDone = false;
  function nativeSubsOff() {
    const id = mediaId();
    if (!id || !hasLuna()) return;
    nativeOffDone = true;
    luna('luna://com.webos.media', 'setSubtitleEnable', { mediaId: id, enable: false }).catch(() => {});
  }

  // Legenda embutida: se o arquivo já está 100% no PC, o servidor extrai a faixa (WebVTT, blocos
  // de 10s) e o app desenha no estilo Kai, sem os códigos ASS crus ({\an8}) do player da TV.
  // Com o torrent ainda baixando, não extrai: o ffmpeg leria o arquivo e roubaria a prioridade do download.
  function selectEmbeddedSub(index) {
    renderer.clear();
    server.streamProgress(mediaUrl).then((p) => {
      if (!alive) return;
      if (p !== null && p >= 0.999) extractedSub(index);
      else nativeEmbeddedSub(index);
    });
  }

  function extractedSub(index) {
    nativeSubsOff();
    const cs = { kind: 'embedded', index: index, extracted: true, sid: 'kai' + Math.random().toString(36).slice(2), segs: {}, cues: [], busy: false };
    currentSub = cs;
    ensureSegments();
  }

  function ensureSegments() {
    const cs = currentSub;
    if (!cs.extracted || cs.busy || !alive) return;
    const n = Math.floor(videoEl.currentTime / 10) + 1;
    const k = !cs.segs[n] ? n : !cs.segs[n + 1] ? n + 1 : 0;
    if (!k) return;
    cs.segs[k] = 'loading';
    cs.busy = true; // um bloco por vez
    const url = server.baseUrl() + 'hlsv2/' + cs.sid + '/subtitle' + cs.index + '/segment' + k + '.vtt?mediaURL=' + encodeURIComponent(mediaUrl);
    getText(url, { timeout: 30000, quiet: true })
      .then((txt) => {
        if (currentSub !== cs) return;
        const seen = {};
        cs.cues.forEach((c) => (seen[c.start + '|' + c.text] = true));
        subs.parse(txt).forEach((c) => {
          if (!seen[c.start + '|' + c.text]) cs.cues.push(c);
        });
        cs.cues.sort((a, b) => a.start - b.start);
        renderer.set(cs.cues);
        renderer.update(videoEl.currentTime);
      })
      .catch(() => delete cs.segs[k])
      .then(() => (cs.busy = false));
  }

  function nativeEmbeddedSub(index) {
    const id = mediaId();
    if (!id || !hasLuna()) {
      // mediaId pode demorar a existir logo após abrir o vídeo.
      setTimeout(() => alive && mediaId() && nativeEmbeddedSub(index), 1200);
      return;
    }
    substyle.applyNative(id, store.settings());
    luna('luna://com.webos.media', 'setSubtitleEnable', { mediaId: id, enable: true })
      .then(() => luna('luna://com.webos.media', 'selectTrack', { mediaId: id, type: 'text', index: index }))
      .then(() => {
        currentSub = { kind: 'embedded', index: index };
      })
      .catch((e) => toast('Falha na legenda embutida: ' + e.message));
  }

  function disableEmbeddedSubs() {
    const id = mediaId();
    if (id && hasLuna() && currentSub.kind === 'embedded' && !currentSub.extracted) {
      luna('luna://com.webos.media', 'setSubtitleEnable', { mediaId: id, enable: false }).catch(() => {});
    }
  }

  function selectAddonSub(s, silent) {
    disableEmbeddedSubs();
    currentSub = { kind: 'addon', id: s.id || s.url };
    subs
      .load(s.url, server.subtitlesProxy(s.url))
      .then((cues) => {
        if (!alive || currentSub.id !== (s.id || s.url)) return;
        renderer.set(cues);
        if (!silent) toast('Legenda: ' + langName(s.lang));
      })
      .catch(() => toast('Não foi possível baixar a legenda.'));
  }

  // Menus de faixas: lê as faixas embutidas só agora, quando o usuário pede.
  function withTracks(open) {
    if (embedded || !server.isAvailable()) return open();
    toast('Lendo as faixas do arquivo...', 2500);
    loadEmbeddedTracks().then(() => alive && open());
  }

  function audioMenu() {
    withTracks(openAudioMenu);
  }

  function openAudioMenu() {
    const native = videoEl.audioTracks;
    let list = [];
    if (native && native.length) {
      for (let i = 0; i < native.length; i++) {
        list.push({ label: langName(native[i].language) + (native[i].label ? ' · ' + native[i].label : ''), value: i, checked: native[i].enabled });
      }
    } else if (embedded && embedded.audio.length) {
      list = embedded.audio.map((t, i) => ({
        label: langName(t.lang) + (t.label ? ' · ' + t.label : ''),
        sub: [t.codec, t.channels ? t.channels + ' canais' : ''].filter(Boolean).join(' · '),
        value: i,
        checked: currentAudio === null ? i === 0 : currentAudio === i,
      }));
    }
    menu('Áudio', list, {
      empty: server.isAvailable() ? 'Só uma faixa de áudio.' : 'Para listar as faixas, conecte o servidor do PC em Ajustes.',
      onPick: (i) => selectEmbeddedAudio(i),
    });
  }

  function subsMenu() {
    withTracks(openSubsMenu);
  }

  function openSubsMenu() {
    const opts2 = [{ label: 'Desligada', value: { kind: 'off' }, checked: currentSub.kind === 'off' }];
    if (embedded && embedded.subs.length) {
      embedded.subs.forEach((t, i) =>
        /PGS|VOBSUB|DVD/i.test(t.codec || '') ? null : opts2.push({
          label: langName(t.lang) + (t.label ? ' · ' + t.label : ''),
          sub: 'Embutida no arquivo' + (t.codec ? ' · ' + t.codec : ''),
          value: { kind: 'embedded', index: i },
          checked: currentSub.kind === 'embedded' && currentSub.index === i,
        })
      );
    }
    const pref = (settings.subtitleLangs || []).map((x) => x.toLowerCase());
    const sorted = (addonSubs || []).slice().sort((a, b) => {
      const ia = pref.indexOf(String(a.lang).toLowerCase());
      const ib = pref.indexOf(String(b.lang).toLowerCase());
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
    sorted.slice(0, 60).forEach((s) =>
      opts2.push({
        label: langName(s.lang),
        sub: s.addon || 'Addon',
        value: { kind: 'addon', sub: s },
        checked: currentSub.kind === 'addon' && currentSub.id === (s.id || s.url),
      })
    );
    opts2.push({ label: 'Atraso da legenda: ' + renderer.offset().toFixed(1) + 's', sub: 'Ajustar sincronia', value: { kind: 'delay' } });
    opts2.push({ label: 'Tamanho: ' + (store.settings().subtitleSize || 100) + '%', value: { kind: 'size' } });
    menu('Legendas', opts2, {
      empty: addonSubs === null ? 'Carregando legendas...' : 'Nenhuma legenda.',
      onPick: (v) => {
        if (v.kind === 'off' || v.kind === 'embedded' || v.kind === 'addon') autoDone.sub = true;
        if (v.kind === 'off') {
          disableEmbeddedSubs();
          renderer.clear();
          currentSub = { kind: 'off' };
        } else if (v.kind === 'embedded') selectEmbeddedSub(v.index);
        else if (v.kind === 'addon') selectAddonSub(v.sub);
        else if (v.kind === 'delay') delayMenu();
        else if (v.kind === 'size') sizeMenu();
      },
    });
  }

  function delayMenu() {
    const vals = [-5, -3, -2, -1, -0.5, -0.25, 0, 0.25, 0.5, 1, 2, 3, 5];
    menu(
      'Atraso da legenda',
      vals.map((v) => ({ label: (v > 0 ? '+' : '') + v + 's', sub: v < 0 ? 'Legenda aparece antes' : v > 0 ? 'Legenda aparece depois' : 'Sem ajuste', value: v, checked: renderer.offset() === v })),
      { onPick: (v) => renderer.setOffset(v) }
    );
  }

  function sizeMenu() {
    const vals = [70, 85, 100, 115, 130, 150];
    const cur = store.settings().subtitleSize || 100;
    menu(
      'Tamanho da legenda',
      vals.map((v) => ({ label: v + '%', value: v, checked: v === cur })),
      {
        onPick: (v) => {
          const next = store.saveSettings({ subtitleSize: v });
          substyle.apply(subsEl, next);
          if (currentSub.kind === 'embedded') substyle.applyNative(mediaId(), next);
        },
      }
    );
  }

  function sourcesMenu() {
    const list = (opts.streams || []).map((s, i) => ({
      label: ((s.name || s.addon || '') + '').replace(/\n/g, ' '),
      sub: ((s.title || s.description || '') + '').replace(/\n/g, ' · '),
      value: i,
      checked: s === stream,
    }));
    menu('Fontes', list, {
      onPick: (i) => {
        const s = opts.streams[i];
        if (!s || s === stream) return;
        if (server.needsServer(s) && !server.isAvailable()) return toast('Essa fonte precisa do servidor do PC.');
        saveProgress();
        pendingStart = videoEl.currentTime * 1000;
        stream = s;
        triedTranscode = false;
        autoDone = { sub: false, audio: false };
        start();
      },
    });
  }

  // Próximo episódio: mantém o mesmo "bingeGroup" (mesma qualidade/fonte) quando possível.
  function playNext() {
    const nv = nextVideo();
    if (!nv) return;
    saveProgress();
    const group = stream.behaviorHints && stream.behaviorHints.bingeGroup;
    showSpinner(true);
    message('Procurando o próximo episódio...');
    addons.fetchStreams(meta.type, nv.id).then((list) => {
      if (!alive) return;
      const match = group ? list.find((s) => s.behaviorHints && s.behaviorHints.bingeGroup === group) : null;
      if (match && (!server.needsServer(match) || server.isAvailable())) {
        video = nv;
        stream = match;
        opts.streams = list;
        pendingStart = 0;
        triedTranscode = false;
        autoDone = { sub: false, audio: false };
        start();
      } else {
        router.pop();
        openDetails(meta.type, meta.id, { videoId: nv.id, autoStreams: true });
      }
    });
  }

  // ---------- Progresso ----------
  function saveProgress() {
    const d = videoEl.duration;
    if (!(d > 0) || !isFinite(d) || !videoEl.currentTime) return;
    const delta = watchedDelta;
    watchedDelta = 0;
    if (meta.id === 'dev') return; // teste de desenvolvimento: não mexe na biblioteca
    stremio.saveProgress(meta, video.id, videoEl.currentTime * 1000, d * 1000, delta);
  }

  // ---------- Teclas ----------
  function onKey(e) {
    const k = e.keyCode;
    const cur = nav.current();
    switch (k) {
      case KEY.PLAY:
        videoEl.play();
        showControls();
        return true;
      case KEY.PAUSE:
        videoEl.pause();
        return true;
      case KEY.PLAYPAUSE:
        togglePlay();
        return true;
      case KEY.STOP:
        close();
        return true;
      case KEY.FF:
        seekBy(1);
        return true;
      case KEY.RW:
        seekBy(-1);
        return true;
      case KEY.BACK:
      case KEY.ESC:
      case KEY.BACKSPACE:
        if (seekTarget !== null) cancelSeek();
        else if (activeSeg && !controlsOn) dismissSkip();
        else if (controlsOn && !videoEl.paused) hideControls();
        else close();
        return true;
    }
    if (!controlsOn && activeSeg) {
      if (k === KEY.ENTER) {
        doSkip();
        return true;
      }
    }
    if (!controlsOn) {
      if (k === KEY.LEFT) seekBy(-1);
      else if (k === KEY.RIGHT) seekBy(1);
      else if (k === KEY.ENTER) togglePlay();
      else if (k === KEY.DOWN) showControls(playBtn);
      else showControls(bar);
      return true;
    }
    scheduleHide();
    if (cur === bar) {
      if (k === KEY.LEFT) {
        seekBy(-1);
        return true;
      }
      if (k === KEY.RIGHT) {
        seekBy(1);
        return true;
      }
      if (k === KEY.UP) {
        hideControls();
        return true;
      }
    }
    return false;
  }

  function close() {
    saveProgress();
    router.pop();
  }

  return {
    el: el,
    onKey: onKey,
    onShow: () => {
      if (!ticker) {
        start();
        ticker = setInterval(() => {
          if (controlsOn) updateTimes();
          renderer.update(videoEl.currentTime);
          checkSkip();
          if (!nativeOffDone && !(currentSub.kind === 'embedded' && !currentSub.extracted)) nativeSubsOff();
          if (currentSub.extracted) ensureSegments();
        }, 250);
        saveTimer = setInterval(() => {
          if (!videoEl.paused) saveProgress();
        }, SAVE_MS);
        watchTimer = setInterval(watchdog, 2000);
        // Build de desenvolvimento: estado do buffer a cada 10s no log remoto.
        if (__KAI_DEVLOG__) statusTimer = setInterval(() => !videoEl.paused && diag('status'), 10000);
      }
      showControls(bar);
    },
    onBack: () => {
      close();
      return true;
    },
    destroy: () => {
      alive = false;
      clearInterval(ticker);
      clearInterval(saveTimer);
      clearInterval(watchTimer);
      clearInterval(statusTimer);
      clearTimeout(hideTimer);
      clearTimeout(seekCommitTimer);
      disableEmbeddedSubs();
      try {
        videoEl.pause();
        videoEl.removeAttribute('src');
        videoEl.load();
      } catch (e) {
        /* ignore */
      }
    },
  };
}
