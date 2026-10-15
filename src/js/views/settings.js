// Ajustes: conta, servidor do PC, Hero Banner, tema OLED, legendas, addons e depuração.
import { h, clear } from '../lib/dom.js';
import * as nav from '../lib/nav.js';
import * as store from '../lib/store.js';
import { log } from '../lib/log.js';
import { deviceInfo } from '../lib/luna.js';
import * as substyle from '../lib/substyle.js';
import * as update from '../api/update.js';
import * as stremio from '../api/stremio.js';
import * as server from '../api/server.js';
import * as addons from '../api/addons.js';
import * as hero from '../api/hero.js';
import { topbar, toast, menu, confirmDialog } from '../ui.js';
import * as router from '../router.js';
import { openLogin } from './login.js';
import { avatar, switchProfile, createProfile } from './profiles.js';

const SUB_LANGS = [
  { label: 'Português (BR) e Português', value: ['pob', 'por', 'pt', 'pt-br'] },
  { label: 'Inglês', value: ['eng', 'en'] },
  { label: 'Espanhol', value: ['spa', 'es'] },
  { label: 'Nenhum (não ligar sozinho)', value: [] },
];
const AUDIO_LANGS = [
  { label: 'Original do arquivo', value: [] },
  { label: 'Português (dublado) quando houver', value: ['por', 'pt', 'pob'] },
  { label: 'Inglês quando houver', value: ['eng', 'en'] },
  { label: 'Japonês quando houver', value: ['jpn', 'ja'] },
];

// Addons úteis que o app aproveita (Anime Kitsu: catálogos de anime e IDs do calendário/AniSkip).
const RECOMMENDED = [
  { id: 'community.anime.kitsu', name: 'Anime Kitsu', url: 'https://anime-kitsu.strem.fun/manifest.json', desc: 'Catálogos e detalhes de animes (usado pelo calendário)' },
  { id: 'org.stremio.opensubtitlesv3', name: 'OpenSubtitles v3', url: 'https://opensubtitles-v3.strem.io/manifest.json', desc: 'Legendas em português para quase tudo' },
];

export function SettingsView() {
  const el = h('div.view');
  const scroller = h('div.scroll-y', { 'data-scroll-y': '' });
  const bar = topbar('settings', router.goTab);
  const body = h('div.settings');
  scroller.appendChild(bar);
  scroller.appendChild(body);
  el.appendChild(scroller);

  let device = '';
  deviceInfo()
    .then((d) => {
      device = [d.modelName, d.firmwareVersion, d.sdkVersion ? 'webOS ' + d.sdkVersion : ''].filter(Boolean).join(' · ');
    })
    .catch(() => {});

  function row(label, sub, value, onSelect, extra) {
    return h('div.set-row', { focusable: true, onSelect: onSelect }, [
      h('div.label', null, [label, sub ? h('small', { text: sub }) : null]),
      extra || h('div.value', { text: value || '' }),
    ]);
  }

  function checkForUpdate() {
    toast('Procurando atualização...');
    update
      .check()
      .then((info) => {
        if (!info) return toast('Você já está na versão mais nova (v' + update.VERSION + ').');
        return update.canSelfUpdate().then((can) => {
          if (!can) {
            // Sem Homebrew Channel (só modo desenvolvedor) o app não consegue se instalar sozinho.
            menu(
              'Versão ' + info.version + ' disponível',
              [
                { label: 'Como atualizar', sub: 'No PC: webOS Dev Manager → instalar o .ipk da release' },
                { label: info.pageUrl, sub: 'Página da release' },
              ],
              { center: true }
            );
            return;
          }
          confirmDialog('Instalar a versão ' + info.version + '? O app vai fechar e reabrir.', 'Atualizar', () => {
            update
              .install(info, (st) => toast(st, 8000))
              .then(() => toast('Atualizado! Reabrindo...'))
              .catch((e) => toast('Não foi possível atualizar: ' + e.message, 6000));
          });
        });
      })
      .catch((e) => toast('Não foi possível verificar: ' + e.message, 5000));
  }

  function installFromUrl(url, name) {
    if (!stremio.isLoggedIn()) return toast('Entre na conta primeiro');
    confirmDialog('Instalar ' + name + ' na sua conta Stremio?', 'Instalar', () => {
      toast('Instalando...');
      stremio
        .installAddon(url)
        .then((m) => addons.load(true).then(() => m))
        .then((m) => {
          router.dropTab('home');
          toast((m.name || 'Addon') + ' instalado na sua conta');
          render();
        })
        .catch((e) => toast('Não foi possível instalar: ' + e.message, 5000));
    });
  }

  function toggle(on) {
    return h('div.toggle', { cls: on ? 'on' : '' }, h('i'));
  }

  function render() {
    const s = store.settings();
    const keep = nav.current();
    const keepIndex = keep ? Array.prototype.indexOf.call(body.querySelectorAll('.set-row'), keep) : -1;
    clear(body);

    // ---- Perfil (cada perfil tem sua conta Stremio, histórico e preferências) ----
    const prof = store.activeProfile();
    const allProfiles = store.profiles();
    body.appendChild(h('div.set-section', { text: 'Perfil' }));
    const nameInput = h('input.input', { type: 'text', value: prof.name });
    nameInput.__submit = (v) => {
      const name = v.trim();
      if (!name) return;
      store.updateProfile(prof.id, { name: name });
      toast('Nome do perfil salvo');
      render();
    };
    body.appendChild(
      h('div.set-row', { focusable: true, onSelect: () => nav.select(nameInput) }, [
        h('div.label', null, [avatar(prof, 'small'), ' Nome do perfil', h('small', { text: 'Este perfil usa a conta Stremio abaixo' })]),
        nameInput,
      ])
    );
    body.appendChild(
      row('Cor do perfil', '', '', () =>
        menu(
          'Cor do perfil',
          store.COLORS.map((c, i) => ({ label: ['Roxo', 'Rosa', 'Verde-água', 'Laranja', 'Azul', 'Vermelho', 'Verde', 'Cinza'][i], value: c, checked: c === prof.color })),
          {
            onPick: (c) => {
              store.updateProfile(prof.id, { color: c });
              render();
            },
          }
        ),
        h('div.avatar.small', { style: { backgroundColor: prof.color }, text: ' ' })
      )
    );
    if (allProfiles.length > 1) {
      body.appendChild(
        row('Trocar de perfil', allProfiles.length + ' perfis nesta TV', '', () =>
          menu(
            'Trocar de perfil',
            allProfiles.map((p) => ({ label: p.name, value: p.id, checked: p.id === prof.id })),
            { onPick: (id) => id !== prof.id && switchProfile(id) }
          )
        )
      );
    }
    body.appendChild(row('Adicionar perfil', 'Para outra pessoa, com outra conta Stremio', '', () => createProfile()));
    if (allProfiles.length > 1) {
      body.appendChild(
        row('Perguntar "Quem está assistindo?" ao abrir', '', '', () => {
          store.saveSettings({ askProfile: !store.settings().askProfile });
          render();
        }, toggle(s.askProfile))
      );
      body.appendChild(
        row('Apagar este perfil', 'Remove deste aparelho a conta e as preferências do perfil (a conta Stremio continua existindo)', '', () =>
          confirmDialog('Apagar o perfil "' + prof.name + '" desta TV?', 'Apagar', () => {
            store.removeProfile(prof.id);
            switchProfile(store.activeProfile().id);
          })
        )
      );
    }

    body.appendChild(h('div.set-section', { text: 'Conta Stremio' }));
    if (stremio.isLoggedIn()) {
      const u = stremio.user();
      body.appendChild(row('Conectado', 'Addons e biblioteca sincronizados com a conta', (u && u.email) || 'conta Stremio', null));
      body.appendChild(
        row('Atualizar addons e biblioteca', 'Busca de novo a lista de addons instalados', '', () => {
          Promise.all([addons.load(true), stremio.getLibrary()])
            .then(() => {
              toast('Atualizado');
              router.dropTab('home');
            })
            .catch((e) => toast('Erro: ' + e.message));
        })
      );
      body.appendChild(
        row('Sair da conta', '', '', () =>
          confirmDialog('Sair da conta Stremio?', 'Sair', () => {
            stremio.logout();
            addons.load(true).then(() => {
              router.dropTab('home');
              render();
            });
          })
        )
      );
    } else {
      body.appendChild(
        row('Entrar na conta', 'Traz seus addons (Torrentio, debrid...) e a biblioteca', '', () =>
          openLogin(() => {
            Promise.all([stremio.refreshUser().catch(() => {}), addons.load(true), stremio.getLibrary()]).then(() => {
              router.dropTab('home');
              render();
            });
          })
        )
      );
    }

    body.appendChild(h('div.set-section', { text: 'Servidor de streaming (PC)' }));
    const st = server.lastStatus();
    const stText = !s.serverUrl ? 'não configurado' : st.ok && st.url === server.baseUrl() ? 'conectado ✓' : 'sem resposta';
    const urlInput = h('input.input', { type: 'text', value: s.serverUrl || '', placeholder: 'ex.: 192.168.0.10' });
    urlInput.__submit = (v) => {
      store.saveSettings({ serverUrl: v.trim() });
      server.check().then((r) => {
        toast(r.ok ? 'Servidor conectado' : 'Servidor não respondeu em ' + server.baseUrl());
        render();
      });
    };
    body.appendChild(
      h('div.set-row', { focusable: true, onSelect: () => nav.select(urlInput) }, [
        h('div.label', null, ['Endereço do PC', h('small', { text: 'Rode o stremio-service no PC (porta 11470). Status: ' + stText })]),
        urlInput,
      ])
    );
    body.appendChild(
      row('Procurar na rede', 'Varre a rede local atrás do servidor', '', () => {
        toast('Procurando servidor na rede...', 20000);
        server
          .scan()
          .then((ip) => {
            if (!ip) return toast('Nenhum servidor encontrado. Ele está aberto no PC?');
            store.saveSettings({ serverUrl: ip });
            return server.check().then(() => {
              toast('Servidor encontrado em ' + ip);
              render();
            });
          })
          .catch((e) => toast('Falha na busca: ' + e.message));
      })
    );
    body.appendChild(
      row('Testar conexão', '', '', () =>
        server.check().then((r) => {
          toast(r.ok ? 'Servidor OK' + (r.version ? ' (v' + r.version + ')' : '') : 'Sem resposta de ' + (server.baseUrl() || '(vazio)'));
          render();
        })
      )
    );

    body.appendChild(h('div.set-section', { text: 'Aparência (Kai)' }));
    const heroName = (hero.SOURCES.find((x) => x.id === s.heroSource) || hero.SOURCES[0]).name;
    body.appendChild(
      row('Hero Banner', 'Destaques no topo da tela inicial', heroName, () =>
        menu(
          'Fonte do Hero Banner',
          hero.SOURCES.map((x) => ({ label: x.name, value: x.id, checked: x.id === s.heroSource })),
          {
            onPick: (v) => {
              store.saveSettings({ heroSource: v });
              router.dropTab('home');
              render();
            },
          }
        )
      )
    );
    body.appendChild(
      row('Tema OLED (preto puro)', 'Fundo totalmente preto', '', () => {
        const on = !store.settings().oled;
        store.saveSettings({ oled: on });
        document.body.classList.toggle('oled', on);
        render();
      }, toggle(s.oled))
    );
    body.appendChild(
      row('Rolagem animada', 'Mais bonita, porém mais pesada na TV', '', () => {
        const on = !store.settings().smoothScroll;
        store.saveSettings({ smoothScroll: on });
        nav.setSmooth(on);
        render();
      }, toggle(s.smoothScroll))
    );

    body.appendChild(h('div.set-section', { text: 'Legendas e áudio' }));
    const subName = (SUB_LANGS.find((x) => JSON.stringify(x.value) === JSON.stringify(s.subtitleLangs)) || { label: (s.subtitleLangs || []).join(', ') }).label;
    body.appendChild(
      row('Idioma da legenda', 'Escolhida sozinha ao abrir o vídeo', subName, () =>
        menu('Idioma da legenda', SUB_LANGS.map((x) => ({ label: x.label, value: x.value, checked: x.label === subName })), {
          onPick: (v) => {
            store.saveSettings({ subtitleLangs: v });
            render();
          },
        })
      )
    );
    body.appendChild(
      row('Ligar legenda automaticamente', 'Se o áudio não estiver no seu idioma', '', () => {
        store.saveSettings({ subtitlesAuto: !store.settings().subtitlesAuto });
        render();
      }, toggle(s.subtitlesAuto))
    );
    const audName = (AUDIO_LANGS.find((x) => JSON.stringify(x.value) === JSON.stringify(s.audioLangs)) || AUDIO_LANGS[0]).label;
    body.appendChild(
      row('Áudio preferido', 'Precisa do servidor do PC para ler as faixas', audName, () =>
        menu('Áudio preferido', AUDIO_LANGS.map((x) => ({ label: x.label, value: x.value, checked: x.label === audName })), {
          onPick: (v) => {
            store.saveSettings({ audioLangs: v });
            render();
          },
        })
      )
    );

    // ---- Aparência da legenda (padrão Kai: Nata Sans, negrito, contorno fino + sombra) ----
    body.appendChild(h('div.set-section', { text: 'Aparência da legenda' }));
    const preview = h('div.subs', null, h('span', { html: 'Oi. Meu nome é Peter Parker.\n<i>Você não lembra de mim...</i>' }));
    substyle.apply(preview, s);
    body.appendChild(h('div.sub-preview', null, preview));
    const lb = substyle.labels(s);
    const choose = (title, sub, list, key, value, label) =>
      body.appendChild(
        row(title, sub, label, () =>
          menu(title, list.map((x) => ({ label: x.label, value: x.id, checked: x.id === value })), {
            onPick: (v) => {
              const patch = {};
              patch[key] = v;
              store.saveSettings(patch);
              render();
            },
          })
        )
      );
    choose('Fonte', 'Vale para legendas de addons (OpenSubtitles etc.)', substyle.FONTS, 'subtitleFont', s.subtitleFont, lb.font);
    choose('Estilo', 'Contorno, sombra ou caixa de fundo', substyle.STYLES, 'subtitleStyle', s.subtitleStyle, lb.style);
    choose('Cor do texto', '', substyle.COLORS, 'subtitleColor', s.subtitleColor, lb.color);
    choose(
      'Tamanho',
      '',
      substyle.SIZES.map((v) => ({ id: v, label: v + '%' })),
      'subtitleSize',
      s.subtitleSize || 100,
      (s.subtitleSize || 100) + '%'
    );
    choose('Posição', 'Distância da borda de baixo', substyle.POSITIONS, 'subtitlePosition', s.subtitlePosition, lb.position);
    body.appendChild(
      row('Negrito', 'O Kai usa negrito', '', () => {
        store.saveSettings({ subtitleBold: store.settings().subtitleBold === false });
        render();
      }, toggle(s.subtitleBold !== false))
    );
    body.appendChild(
      h('div.hint', { style: { padding: '6px 4px 0' }, text: 'Legendas embutidas no arquivo são desenhadas pela própria TV: só cor, tamanho, posição e caixa se aplicam a elas.' })
    );

    // ---- Player ----
    body.appendChild(h('div.set-section', { text: 'Player' }));
    choose(
      'Pular abertura e encerramento',
      'IntroDB (séries e filmes) e AniSkip (animes)',
      [
        { id: 'prompt', label: 'Mostrar botão "Pular"' },
        { id: 'auto', label: 'Pular automaticamente' },
        { id: 'off', label: 'Desligado' },
      ],
      'skipMode',
      s.skipMode,
      { prompt: 'Mostrar botão', auto: 'Automático', off: 'Desligado' }[s.skipMode] || 'Mostrar botão'
    );

    // ---- Metadados (opcional, como no Kai) ----
    body.appendChild(h('div.set-section', { text: 'Metadados extras (opcional)' }));
    const keyRow = (title, sub, key, placeholder) => {
      const input = h('input.input', { type: 'text', value: s[key] || '', placeholder: placeholder });
      input.__submit = (v) => {
        const patch = {};
        patch[key] = v.trim();
        store.saveSettings(patch);
        toast(v.trim() ? 'Chave salva' : 'Chave removida');
        render();
      };
      body.appendChild(
        h('div.set-row', { focusable: true, onSelect: () => nav.select(input) }, [
          h('div.label', null, [title, h('small', { text: sub })]),
          input,
        ])
      );
    };
    keyRow('Chave TMDB', 'Sinopses e títulos em PT-BR, logos e elenco com fotos (grátis em themoviedb.org)', 'tmdbKey', 'API key (v3)');
    keyRow('Chave MDBList', 'Notas do Rotten Tomatoes, Metacritic, Trakt e Letterboxd (grátis em mdblist.com)', 'mdblistKey', 'API key');

    body.appendChild(h('div.set-section', { text: 'Addons' }));
    const list = addons.list();
    body.appendChild(
      row('Addons ativos', stremio.isLoggedIn() ? 'Gerencie pela sua conta em web.stremio.com' : 'Sem conta: Cinemeta, OpenSubtitles e os adicionados aqui', list.length + ' addon(s)', () =>
        menu('Addons ativos', list.map((a) => ({ label: a.manifest.name || a.manifest.id, sub: a.transportUrl })), {})
      )
    );
    // Addons recomendados (só aparecem se ainda não estiverem instalados).
    RECOMMENDED.filter((r) => !list.some((a) => a.transportUrl === r.url || (a.manifest && a.manifest.id === r.id))).forEach((r) =>
      body.appendChild(row('Instalar ' + r.name, r.desc, '', () => installFromUrl(r.url, r.name)))
    );
    const addInput = h('input.input', { type: 'text', placeholder: 'https://.../manifest.json' });
    addInput.__submit = (v) => {
      const u = v.trim();
      if (!/^https?:\/\/.+manifest\.json/.test(u)) return toast('Cole a URL do manifest.json do addon');
      if (stremio.isLoggedIn()) return installFromUrl(u, 'o addon');
      const cur = store.settings().localAddons || [];
      store.saveSettings({ localAddons: cur.concat([u]) });
      addons.load(true).then(() => {
        router.dropTab('home');
        toast('Addon adicionado');
        render();
      });
    };
    body.appendChild(
      h('div.set-row', { focusable: true, onSelect: () => nav.select(addInput) }, [
        h('div.label', null, ['Adicionar addon por URL', h('small', { text: stremio.isLoggedIn() ? 'Instala na sua conta Stremio' : 'Fica só nesta TV' })]),
        addInput,
      ])
    );

    body.appendChild(h('div.set-section', { text: 'Sobre e depuração' }));
    const logInput = h('input.input', { type: 'text', value: s.devlogUrl || '', placeholder: 'http://IP-DO-PC:8099/log' });
    logInput.__submit = (v) => {
      store.saveSettings({ devlogUrl: v.trim() });
      log.setRemote(v.trim());
      log.info('Log remoto ligado');
      toast(v.trim() ? 'Enviando logs para o PC' : 'Log remoto desligado');
    };
    body.appendChild(
      h('div.set-row', { focusable: true, onSelect: () => nav.select(logInput) }, [
        h('div.label', null, ['Log remoto', h('small', { text: 'npm run logs no PC' })]),
        logInput,
      ])
    );
    body.appendChild(row('Versão', device || 'Stremio Kai Timeworn', 'v' + update.VERSION, null));
    body.appendChild(
      row('Procurar atualização', 'Baixa a versão nova do GitHub (' + update.REPO + ')', '', () => checkForUpdate())
    );

    const rows = body.querySelectorAll('.set-row');
    if (keepIndex >= 0 && rows[keepIndex]) nav.focus(rows[keepIndex]);
  }

  render();

  return {
    el: el,
    onShow: () => {
      server.check().then(() => render());
    },
    destroy: () => bar.__destroy && bar.__destroy(),
  };
}
