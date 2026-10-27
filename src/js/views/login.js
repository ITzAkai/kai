// Login: por código (link.stremio.com no celular) ou e-mail e senha digitados na TV.
import { h, clear } from '../lib/dom.js';
import * as nav from '../lib/nav.js';
import * as stremio from '../api/stremio.js';
import { toast } from '../ui.js';
import * as router from '../router.js';
import { t } from '../lib/i18n.js';

export function openLogin(onDone) {
  router.push(LoginView(onDone));
}

function LoginView(onDone) {
  const el = h('div.view');
  const codeEl = h('div.code', { text: '····' });
  const qr = h('img.qr', { alt: '' });
  const codeStatus = h('p', { text: t('Gerando código...') });
  const email = h('input.input', { type: 'email', placeholder: t('E-mail'), focusable: true });
  const pass = h('input.input', { type: 'password', placeholder: t('Senha'), focusable: true });
  const err = h('div.err');
  const btn = h('div.btn.primary', { focusable: true, text: t('Entrar'), onSelect: () => doLogin() });
  pass.__submit = () => doLogin();
  email.__submit = () => nav.focus(pass);

  el.appendChild(
    h('div.login', null,
      h('div.login-card', null, [
        h('div.login-col', null, [
          h('h1', { text: t('Entrar com o celular') }),
          h('p', { html: t('No celular ou PC, abra <b>link.stremio.com</b> e digite o código:') }),
          codeEl,
          qr,
          codeStatus,
        ]),
        h('div.login-col', null, [
          h('h1', { text: t('Ou com e-mail') }),
          h('p', { text: t('Use a mesma conta do Stremio. Seus addons e a biblioteca vêm junto.') }),
          email,
          pass,
          err,
          h('div', { 'data-group': '' }, [btn, h('div.btn', { focusable: true, text: t('Cancelar'), onSelect: () => router.pop() })]),
        ]),
      ])
    )
  );

  let alive = true;
  let pollTimer = null;
  let code = null;

  function newCode() {
    stremio
      .createLinkCode()
      .then((r) => {
        if (!alive) return;
        code = r.code;
        codeEl.textContent = r.code;
        qr.src = r.qrcode;
        codeStatus.textContent = t('Aguardando confirmação...');
        poll(0);
      })
      .catch(() => {
        codeStatus.textContent = t('Não foi possível gerar o código. Use o e-mail ao lado.');
      });
  }

  function poll(n) {
    clearTimeout(pollTimer);
    if (!alive) return;
    if (n > 100) {
      codeStatus.textContent = t('Código expirou. Gerando outro...');
      return newCode();
    }
    pollTimer = setTimeout(() => {
      stremio
        .readLinkCode(code)
        .then((ok) => (ok ? done() : poll(n + 1)))
        .catch(() => poll(n + 1));
    }, 3000);
  }

  function doLogin() {
    clear(err);
    if (!email.value || !pass.value) {
      err.textContent = t('Preencha e-mail e senha.');
      return;
    }
    err.textContent = t('Entrando...');
    stremio
      .login(email.value.trim(), pass.value)
      .then(() => done())
      .catch((e) => (err.textContent = e.message || t('Falha no login')));
  }

  function done() {
    if (!alive) return;
    alive = false;
    toast(t('Conectado à conta Stremio'));
    router.pop();
    if (onDone) onDone();
  }

  newCode();

  return {
    el: el,
    destroy: () => {
      alive = false;
      clearTimeout(pollTimer);
    },
  };
}
