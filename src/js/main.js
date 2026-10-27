// Ponto de entrada do Stremio Kai para webOS.
import './polyfills.js';
import { log } from './lib/log.js';
import { t, init as initI18n } from './lib/i18n.js';
import * as nav from './lib/nav.js';
import { loadVisibleImages } from './lib/dom.js';
import * as store from './lib/store.js';
import * as stremio from './api/stremio.js';
import * as server from './api/server.js';
import * as addons from './api/addons.js';
import * as router from './router.js';
import { HomeView } from './views/home.js';
import { SearchView } from './views/search.js';
import { LibraryView } from './views/library.js';
import { SettingsView } from './views/settings.js';
import { CalendarView } from './views/calendar.js';
import { maybeShowWizard } from './views/wizard.js';
import { openPlayer } from './views/player.js';
import * as update from './api/update.js';
import { toast } from './ui.js';
import * as profiles from './views/profiles.js';
import { openLogin } from './views/login.js';
import { registerTizenKeys } from './lib/platform.js';
import * as phone from './lib/phone.js';
import * as theme from './lib/theme.js';

function boot() {
  const s = store.settings();
  initI18n(s.language);
  if (s.devlogUrl) log.setRemote(s.devlogUrl);
  log.info('Iniciando', navigator.userAgent);

  registerTizenKeys();
  phone.start();
  phone.onSearch((q) => {
    router.goTab('search');
    const view = router.currentView();
    if (view && view.search) view.search(q);
  });
  nav.install();
  // Imagens e fileiras sob demanda depois que a rolagem para (segurar a seta não recalcula a cada passo).
  nav.setSmooth(s.smoothScroll);
  let scrollTimer = null;
  nav.onScroll((node) => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const v = router.currentView();
      loadVisibleImages(v ? v.el : node.closest('.view') || node);
      if (v && v.onScroll) v.onScroll();
    }, 120);
  });

  router.registerTab('home', HomeView);
  router.registerTab('search', SearchView);
  router.registerTab('library', LibraryView);
  router.registerTab('settings', SettingsView);
  router.registerTab('calendar', CalendarView);

  // "Quem está assistindo?" (com mais de um perfil) antes de carregar a conta.
  if (profiles.needsPicker()) {
    const bootEl = document.getElementById('boot');
    if (bootEl) bootEl.style.display = 'none';
    profiles.showPicker(() => {
      if (bootEl) bootEl.style.display = '';
      start();
    });
  } else start();

  // Ao voltar do segundo plano, revalida o servidor do PC.
  document.addEventListener('webOSRelaunch', () => {
    server.check();
    devLaunch();
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) server.check();
  });
}

// Carrega o perfil escolhido: conta, biblioteca, addons e a tela inicial.
function start() {
  stremio.reloadProfile();
  const s = store.settings();
  document.body.classList.toggle('oled', !!s.oled);
  theme.apply(s.theme);
  log.info('Perfil', store.activeProfile().name);

  // Atualiza a conta em segundo plano; a tela inicial abre com o cache.
  if (stremio.isLoggedIn()) {
    stremio.refreshUser().catch(() => {});
    stremio.getLibrary().catch(() => {});
  }

  Promise.all([server.check(), addons.load().catch(() => null)]).then(() => {
    const bootEl = document.getElementById('boot');
    if (bootEl) bootEl.parentNode.removeChild(bootEl);
    router.goTab('home');
    if (profiles.isNewProfilePendingLogin() && !stremio.isLoggedIn()) {
      // Perfil novo: entra na conta Stremio deste perfil (para ter o histórico próprio).
      profiles.clearNewProfileFlag();
      openLogin(() => {
        Promise.all([stremio.refreshUser().catch(() => {}), addons.load(true), stremio.getLibrary()]).then(() => {
          const home = router.tabView('home');
          if (home && home.reload) home.reload();
        });
      });
    } else maybeShowWizard();
    devLaunch();
    // Aviso de versão nova (no máximo uma vez por dia).
    if (update.shouldAutoCheck()) {
      setTimeout(() => {
        update
          .check()
          .then((info) => info && toast(t('Atualização disponível: Ajustes → Procurar atualização'), 7000))
          .catch(() => {});
      }, 8000);
    }
  });
}

// Só em builds de desenvolvimento (KAI_DEVLOG): abre o player direto com uma URL passada pelo
// luna-send (params.devPlay), para reproduzir travamentos sem precisar navegar com o controle.
function devLaunch() {
  if (!__KAI_DEVLOG__ || !window.PalmSystem) return;
  let params = {};
  try {
    params = JSON.parse(window.PalmSystem.launchParams || '{}') || {};
  } catch (e) {
    return;
  }
  // devPlay64: URL em base64 (o webOS escapa "&" nos parâmetros de lançamento).
  if (params.devPlay64) params.devPlay = window.atob(params.devPlay64);
  if (!params.devPlay) return;
  log.info('devPlay', params.devPlay);
  openPlayer({
    meta: { id: 'dev', type: 'movie', name: params.devTitle || 'Teste' },
    video: { id: 'dev' },
    stream: { url: params.devPlay },
    streams: [],
    startTime: (params.devStart || 0) * 1000,
    isSeries: false,
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
