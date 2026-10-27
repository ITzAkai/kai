// Assistente da primeira execução (como o welcome-wizard do Kai): conta, servidor do PC e legendas.
import { h, clear } from '../lib/dom.js';
import * as nav from '../lib/nav.js';
import * as store from '../lib/store.js';
import * as stremio from '../api/stremio.js';
import * as server from '../api/server.js';
import * as addons from '../api/addons.js';
import { toast, refreshProfileChips } from '../ui.js';
import * as router from '../router.js';
import { openLogin } from './login.js';
import { t, current as currentLang } from '../lib/i18n.js';

export function maybeShowWizard() {
  const s = store.settings();
  if (s.wizardDone) return;
  // Quem já entrou na conta e configurou o servidor não precisa do assistente.
  if (stremio.isLoggedIn() && s.serverUrl) {
    store.saveSettings({ wizardDone: true });
    return;
  }
  router.push(WizardView());
}

function WizardView() {
  const el = h('div.view');
  const card = h('div.wizard-card');
  el.appendChild(h('div.wizard', null, card));
  let step = 0;

  function finish() {
    store.saveSettings({ wizardDone: true });
    router.pop();
    // A tela inicial (embaixo do assistente) recarrega com a conta/addons novos.
    const home = router.currentView();
    if (home && home.reload) home.reload();
  }

  function btn(label, primary, fn) {
    return h('div.btn', { focusable: true, cls: primary ? 'primary' : '', text: label, onSelect: fn });
  }

  // Instalação nova: o primeiro passo é dar nome ao perfil.
  const steps = (store.activeProfile().unnamed ? [stepName] : []).concat([stepAccount, stepServer, stepSubs]);

  function render() {
    clear(card);
    card.appendChild(h('div.wizard-step', { text: t('PASSO {n} DE {total}', { n: step + 1, total: steps.length }) }));
    steps[step]();
    nav.focusFirst(card);
  }

  function next() {
    step++;
    if (step >= steps.length) finish();
    else render();
  }

  function stepName() {
    card.appendChild(h('h1', { text: t('Bem-vindo! Quem vai usar este perfil?') }));
    card.appendChild(h('p', { text: t('Dê um nome ao perfil. Depois você pode criar outros perfis, cada um com a própria conta Stremio e histórico.') }));
    const err = h('div.err-text');
    const input = h('input.input', { type: 'text', placeholder: t('Ex.: Ana, Pedro, Sala'), maxlength: '20', focusable: true, 'data-autofocus': '' });
    const save = () => {
      const name = String(input.value || '').trim();
      if (!name) {
        err.textContent = t('Digite um nome para o perfil.');
        return;
      }
      store.updateProfile(store.activeProfile().id, { name: name, unnamed: false });
      refreshProfileChips();
      next();
    };
    input.__submit = save;
    card.appendChild(input);
    card.appendChild(err);
    card.appendChild(h('div.actions', { 'data-group': '' }, [btn(t('Continuar'), true, save)]));
  }

  function stepAccount() {
    card.appendChild(h('h1', { text: t('Bem-vindo ao Stremio Kai') }));
    if (stremio.isLoggedIn()) {
      card.appendChild(h('p', { text: t('Você já está conectado à sua conta Stremio. Seus addons e sua biblioteca já estão aqui.') }));
      card.appendChild(h('div.actions', { 'data-group': '' }, [btn(t('Continuar'), true, next)]));
      return;
    }
    card.appendChild(h('p', { text: t('Entre com a sua conta Stremio para trazer seus addons (Torrentio, debrid, Anime Kitsu...) e a biblioteca.') }));
    card.appendChild(
      h('div.actions', { 'data-group': '' }, [
        btn(t('Entrar na conta'), true, () =>
          openLogin(() => {
            Promise.all([stremio.refreshUser().catch(() => {}), addons.load(true), stremio.getLibrary()]).then(next, next);
          })
        ),
        btn(t('Pular'), false, next),
      ])
    );
  }

  function stepServer() {
    card.appendChild(h('h1', { text: t('Servidor de torrents no PC') }));
    const status = h('p', {
      text: server.isAvailable()
        ? t('Servidor conectado em {url}. Torrents liberados.', { url: server.baseUrl() })
        : t('Para tocar torrents, deixe o stremio-service aberto num PC da rede. Links de debrid funcionam sem ele.'),
    });
    card.appendChild(status);
    card.appendChild(
      h('div.actions', { 'data-group': '' }, [
        btn(t('Procurar na rede'), true, () => {
          status.textContent = t('Procurando o servidor na rede...');
          server
            .scan((done, total) => (status.textContent = t('Procurando o servidor na rede...') + ' ' + Math.round((done / total) * 100) + '%'))
            .then((ip) => {
              if (!ip) {
                status.textContent = t('Nenhum servidor encontrado. Você pode configurar depois em Ajustes.');
                return;
              }
              store.saveSettings({ serverUrl: ip });
              return server.check().then(() => {
                status.textContent = t('Servidor encontrado em {ip}', { ip: ip }) + '!';
                toast(t('Servidor do PC conectado'));
              });
            })
            .catch(() => (status.textContent = t('Não foi possível procurar. Configure depois em Ajustes.')));
        }),
        btn(server.isAvailable() ? t('Continuar') : t('Pular'), false, next),
      ])
    );
  }

  function stepSubs() {
    card.appendChild(h('h1', { text: t('Legendas') }));
    card.appendChild(h('p', { text: t('Em qual idioma o app deve ligar a legenda sozinho quando o áudio não for no seu idioma?') }));
    const ar = { label: t('Árabe'), value: ['ara', 'ar'] };
    const en = { label: t('Inglês'), value: ['eng', 'en'] };
    // O idioma do app vem primeiro.
    const choices = (currentLang() === 'ar' ? [ar, en] : [en, ar]).concat([{ label: t('Não ligar sozinho'), value: [] }]);
    card.appendChild(
      h(
        'div.opts',
        { 'data-group': '', 'data-vertical': '' },
        choices.map((c) =>
          h('div.opt', {
            focusable: true,
            text: c.label,
            onSelect: () => {
              store.saveSettings({ subtitleLangs: c.value, subtitlesAuto: c.value.length > 0 });
              finish();
            },
          })
        )
      )
    );
  }

  render();

  return {
    el: el,
    onBack: () => {
      if (step > 0) {
        step--;
        render();
      } else finish();
      return true;
    },
  };
}
