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
import { topbar, toast, menu, confirmDialog, refreshProfileChips } from '../ui.js';
import * as router from '../router.js';
import { openLogin } from './login.js';
import { avatar, switchProfile, createProfile } from './profiles.js';
import { t } from '../lib/i18n.js';

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
    toast(t('Procurando atualização...'));
    update
      .check()
      .then((info) => {
        if (!info) return toast(t('Você já está na versão mais nova (v{v}).', { v: update.VERSION }));
        return update.canSelfUpdate().then((can) => {
          if (!can) {
            // Sem Homebrew Channel (só modo desenvolvedor) o app não consegue se instalar sozinho.
            menu(
              t('Versão {v} disponível', { v: info.version }),
              [
                { label: t('Como atualizar'), sub: t('No PC: webOS Dev Manager → instalar o .ipk da release') },
                { label: info.pageUrl, sub: t('Página da release') },
              ],
              { center: true }
            );
            return;
          }
          confirmDialog(t('Instalar a versão {v}? O app vai fechar e reabrir.', { v: info.version }), t('Atualizar'), () => {
            update
              .install(info, (st) => toast(st, 8000))
              .then(() => toast(t('Atualizado! Reabrindo...')))
              .catch((e) => toast(t('Não foi possível atualizar: {msg}', { msg: e.message }), 6000));
          });
        });
      })
      .catch((e) => toast(t('Não foi possível verificar: {msg}', { msg: e.message }), 5000));
  }

  function installFromUrl(url, name) {
    if (!stremio.isLoggedIn()) return toast(t('Entre na conta primeiro'));
    confirmDialog(t('Instalar {name} na sua conta Stremio?', { name: name }), t('Instalar'), () => {
      toast(t('Instalando...'));
      stremio
        .installAddon(url)
        .then((m) => addons.load(true).then(() => m))
        .then((m) => {
          router.dropTab('home');
          toast(t('{name} instalado na sua conta', { name: m.name || 'Addon' }));
          render();
        })
        .catch((e) => toast(t('Não foi possível instalar: {msg}', { msg: e.message }), 5000));
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

    // ---- Idioma do app (vale para a TV inteira; o nome fica bilíngue para quem não lê o atual) ----
    const LANGS = [
      { id: 'auto', label: t('Automático (idioma da TV)') },
      { id: 'pt', label: 'Português' },
      { id: 'en', label: 'English' },
    ];
    body.appendChild(h('div.set-section', { text: 'Idioma / Language' }));
    body.appendChild(
      row('Idioma / Language', '', (LANGS.find((l) => l.id === s.language) || LANGS[0]).label, () =>
        menu('Idioma / Language', LANGS.map((l) => ({ label: l.label, value: l.id, checked: l.id === s.language })), {
          onPick: (v) => {
            if (v === s.language) return;
            store.saveSettings({ language: v });
            window.location.reload(); // recarrega para todas as telas mudarem de idioma
          },
        })
      )
    );

    // ---- Perfil (cada perfil tem sua conta Stremio, histórico e preferências) ----
    const prof = store.activeProfile();
    const allProfiles = store.profiles();
    body.appendChild(h('div.set-section', { text: t('Perfil') }));
    const nameInput = h('input.input', { type: 'text', value: prof.name });
    nameInput.__submit = (v) => {
      const name = v.trim();
      if (!name) return;
      store.updateProfile(prof.id, { name: name });
      refreshProfileChips();
      toast(t('Nome do perfil salvo'));
      render();
    };
    body.appendChild(
      h('div.set-row', { focusable: true, onSelect: () => nav.select(nameInput) }, [
        h('div.label', null, [avatar(prof, 'small'), ' ' + t('Nome do perfil'), h('small', { text: t('Este perfil usa a conta Stremio abaixo') })]),
        nameInput,
      ])
    );
    body.appendChild(
      row(t('Cor do perfil'), '', '', () =>
        menu(
          t('Cor do perfil'),
          store.COLORS.map((c, i) => ({ label: [t('Roxo'), t('Rosa'), t('Verde-água'), t('Laranja'), t('Azul'), t('Vermelho'), t('Verde'), t('Cinza')][i], value: c, checked: c === prof.color })),
          {
            onPick: (c) => {
              store.updateProfile(prof.id, { color: c });
              refreshProfileChips();
              render();
            },
          }
        ),
        h('div.avatar.small', { style: { backgroundColor: prof.color }, text: ' ' })
      )
    );
    if (allProfiles.length > 1) {
      body.appendChild(
        row(t('Trocar de perfil'), t('{n} perfis nesta TV', { n: allProfiles.length }), '', () =>
          menu(
            t('Trocar de perfil'),
            allProfiles.map((p) => ({ label: p.name, value: p.id, checked: p.id === prof.id })),
            { onPick: (id) => id !== prof.id && switchProfile(id) }
          )
        )
      );
    }
    body.appendChild(row(t('Adicionar perfil'), t('Para outra pessoa, com outra conta Stremio'), '', () => createProfile()));
    if (allProfiles.length > 1) {
      body.appendChild(
        row(t('Perguntar "Quem está assistindo?" ao abrir'), '', '', () => {
          store.saveSettings({ askProfile: !store.settings().askProfile });
          render();
        }, toggle(s.askProfile))
      );
      body.appendChild(
        row(t('Apagar este perfil'), t('Remove deste aparelho a conta e as preferências do perfil (a conta Stremio continua existindo)'), '', () =>
          confirmDialog(t('Apagar o perfil "{name}" desta TV?', { name: prof.name }), t('Apagar'), () => {
            store.removeProfile(prof.id);
            switchProfile(store.activeProfile().id);
          })
        )
      );
    }

    body.appendChild(h('div.set-section', { text: t('Conta Stremio') }));
    if (stremio.isLoggedIn()) {
      const u = stremio.user();
      body.appendChild(row(t('Conectado'), t('Addons e biblioteca sincronizados com a conta'), (u && u.email) || t('conta Stremio'), null));
      body.appendChild(
        row(t('Atualizar addons e biblioteca'), t('Busca de novo a lista de addons instalados'), '', () => {
          Promise.all([addons.load(true), stremio.getLibrary()])
            .then(() => {
              toast(t('Atualizado'));
              router.dropTab('home');
            })
            .catch((e) => toast(t('Erro: {msg}', { msg: e.message })));
        })
      );
      body.appendChild(
        row(t('Sair da conta'), '', '', () =>
          confirmDialog(t('Sair da conta Stremio?'), t('Sair'), () => {
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
        row(t('Entrar na conta'), t('Traz seus addons (Torrentio, debrid...) e a biblioteca'), '', () =>
          openLogin(() => {
            Promise.all([stremio.refreshUser().catch(() => {}), addons.load(true), stremio.getLibrary()]).then(() => {
              router.dropTab('home');
              render();
            });
          })
        )
      );
    }

    body.appendChild(h('div.set-section', { text: t('Servidor de streaming (PC)') }));
    const st = server.lastStatus();
    const stText = !s.serverUrl ? t('não configurado') : st.ok && st.url === server.baseUrl() ? t('conectado ✓') : t('sem resposta');
    const urlInput = h('input.input', { type: 'text', value: s.serverUrl || '', placeholder: 'ex.: 192.168.0.10' });
    urlInput.__submit = (v) => {
      store.saveSettings({ serverUrl: v.trim() });
      server.check().then((r) => {
        toast(r.ok ? t('Servidor conectado') : t('Servidor não respondeu em {url}', { url: server.baseUrl() }));
        render();
      });
    };
    body.appendChild(
      h('div.set-row', { focusable: true, onSelect: () => nav.select(urlInput) }, [
        h('div.label', null, [t('Endereço do PC'), h('small', { text: t('Rode o stremio-service no PC (porta 11470). Status: {s}', { s: stText }) })]),
        urlInput,
      ])
    );
    body.appendChild(
      row(t('Procurar na rede'), t('Varre a rede local atrás do servidor'), '', () => {
        toast(t('Procurando servidor na rede...'), 20000);
        server
          .scan()
          .then((ip) => {
            if (!ip) return toast(t('Nenhum servidor encontrado. Ele está aberto no PC?'));
            store.saveSettings({ serverUrl: ip });
            return server.check().then(() => {
              toast(t('Servidor encontrado em {ip}', { ip: ip }));
              render();
            });
          })
          .catch((e) => toast(t('Falha na busca: {msg}', { msg: e.message })));
      })
    );
    body.appendChild(
      row(t('Testar conexão'), '', '', () =>
        server.check().then((r) => {
          toast(r.ok ? t('Servidor OK') + (r.version ? ' (v' + r.version + ')' : '') : t('Sem resposta de {url}', { url: server.baseUrl() || '-' }));
          render();
        })
      )
    );

    body.appendChild(h('div.set-section', { text: t('Aparência (Kai)') }));
    const heroName = t((hero.SOURCES.find((x) => x.id === s.heroSource) || hero.SOURCES[0]).name);
    body.appendChild(
      row(t('Hero Banner'), t('Destaques no topo da tela inicial'), heroName, () =>
        menu(
          t('Fonte do Hero Banner'),
          hero.SOURCES.map((x) => ({ label: t(x.name), value: x.id, checked: x.id === s.heroSource })),
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
      row(t('Tema OLED (preto puro)'), t('Fundo totalmente preto'), '', () => {
        const on = !store.settings().oled;
        store.saveSettings({ oled: on });
        document.body.classList.toggle('oled', on);
        render();
      }, toggle(s.oled))
    );
    body.appendChild(
      row(t('Escolha inteligente'), t('Assistir já toca a melhor fonte; o botão Fontes mostra a lista'), '', () => {
        store.saveSettings({ smartChoice: store.settings().smartChoice === false });
        render();
      }, toggle(s.smartChoice !== false))
    );
    body.appendChild(
      row(t('Rolagem animada'), t('Mais bonita, porém mais pesada na TV'), '', () => {
        const on = !store.settings().smoothScroll;
        store.saveSettings({ smoothScroll: on });
        nav.setSmooth(on);
        render();
      }, toggle(s.smoothScroll))
    );

    body.appendChild(h('div.set-section', { text: t('Legendas e áudio') }));
    const subName = (SUB_LANGS.find((x) => JSON.stringify(x.value) === JSON.stringify(s.subtitleLangs)) || { label: (s.subtitleLangs || []).join(', ') }).label;
    body.appendChild(
      row(t('Idioma da legenda'), t('Escolhida sozinha ao abrir o vídeo'), t(subName), () =>
        menu(t('Idioma da legenda'), SUB_LANGS.map((x) => ({ label: t(x.label), value: x.value, checked: x.label === subName })), {
          onPick: (v) => {
            store.saveSettings({ subtitleLangs: v });
            render();
          },
        })
      )
    );
    body.appendChild(
      row(t('Ligar legenda automaticamente'), t('Se o áudio não estiver no seu idioma'), '', () => {
        store.saveSettings({ subtitlesAuto: !store.settings().subtitlesAuto });
        render();
      }, toggle(s.subtitlesAuto))
    );
    const audName = (AUDIO_LANGS.find((x) => JSON.stringify(x.value) === JSON.stringify(s.audioLangs)) || AUDIO_LANGS[0]).label;
    body.appendChild(
      row(t('Áudio preferido'), t('Precisa do servidor do PC para ler as faixas'), t(audName), () =>
        menu(t('Áudio preferido'), AUDIO_LANGS.map((x) => ({ label: t(x.label), value: x.value, checked: x.label === audName })), {
          onPick: (v) => {
            store.saveSettings({ audioLangs: v });
            render();
          },
        })
      )
    );

    // ---- Aparência da legenda (padrão Kai: Nata Sans, negrito, contorno fino + sombra) ----
    body.appendChild(h('div.set-section', { text: t('Aparência da legenda') }));
    const preview = h('div.subs', null, h('span', { html: t('Oi. Meu nome é Peter Parker.') + '\n<i>' + t('Você não lembra de mim...') + '</i>' }));
    substyle.apply(preview, s);
    body.appendChild(h('div.sub-preview', null, preview));
    const lb = substyle.labels(s);
    const choose = (title, sub, list, key, value, label) =>
      body.appendChild(
        row(title, sub, t(String(label)), () =>
          menu(title, list.map((x) => ({ label: t(String(x.label)), value: x.id, checked: x.id === value })), {
            onPick: (v) => {
              const patch = {};
              patch[key] = v;
              store.saveSettings(patch);
              render();
            },
          })
        )
      );
    choose(t('Fonte'), t('Vale para legendas de addons (OpenSubtitles etc.)'), substyle.FONTS, 'subtitleFont', s.subtitleFont, lb.font);
    choose(t('Estilo'), t('Contorno, sombra ou caixa de fundo'), substyle.STYLES, 'subtitleStyle', s.subtitleStyle, lb.style);
    choose(t('Cor do texto'), '', substyle.COLORS, 'subtitleColor', s.subtitleColor, lb.color);
    choose(
      t('Tamanho'),
      '',
      substyle.SIZES.map((v) => ({ id: v, label: v + '%' })),
      'subtitleSize',
      s.subtitleSize || 100,
      (s.subtitleSize || 100) + '%'
    );
    choose(t('Posição'), t('Distância da borda de baixo'), substyle.POSITIONS, 'subtitlePosition', s.subtitlePosition, lb.position);
    body.appendChild(
      row(t('Negrito'), t('O Kai usa negrito'), '', () => {
        store.saveSettings({ subtitleBold: store.settings().subtitleBold === false });
        render();
      }, toggle(s.subtitleBold !== false))
    );
    body.appendChild(
      h('div.hint', { style: { padding: '6px 4px 0' }, text: t('Legendas embutidas no arquivo são desenhadas pela própria TV: só cor, tamanho, posição e caixa se aplicam a elas.') })
    );

    // ---- Player ----
    body.appendChild(h('div.set-section', { text: t('Player') }));
    choose(
      t('Pular abertura e encerramento'),
      t('IntroDB (séries e filmes) e AniSkip (animes)'),
      [
        { id: 'prompt', label: t('Mostrar botão "Pular"') },
        { id: 'auto', label: t('Pular automaticamente') },
        { id: 'off', label: t('Desligado') },
      ],
      'skipMode',
      s.skipMode,
      { prompt: t('Mostrar botão'), auto: t('Automático'), off: t('Desligado') }[s.skipMode] || t('Mostrar botão')
    );

    // ---- Metadados (opcional, como no Kai) ----
    body.appendChild(h('div.set-section', { text: t('Metadados extras (opcional)') }));
    const keyRow = (title, sub, key, placeholder) => {
      const input = h('input.input', { type: 'text', value: s[key] || '', placeholder: placeholder });
      input.__submit = (v) => {
        const patch = {};
        patch[key] = v.trim();
        store.saveSettings(patch);
        toast(v.trim() ? t('Chave salva') : t('Chave removida'));
        render();
      };
      body.appendChild(
        h('div.set-row', { focusable: true, onSelect: () => nav.select(input) }, [
          h('div.label', null, [title, h('small', { text: sub })]),
          input,
        ])
      );
    };
    keyRow(t('Chave TMDB'), t('Sinopses e títulos em PT-BR, logos e elenco com fotos (grátis em themoviedb.org)'), 'tmdbKey', 'API key (v3)');
    keyRow(t('Chave MDBList'), t('Notas do Rotten Tomatoes, Metacritic, Trakt e Letterboxd (grátis em mdblist.com)'), 'mdblistKey', 'API key');

    body.appendChild(h('div.set-section', { text: t('Addons') }));
    const list = addons.list();
    body.appendChild(
      row(t('Addons ativos'), stremio.isLoggedIn() ? t('Gerencie pela sua conta em web.stremio.com') : t('Sem conta: Cinemeta, OpenSubtitles e os adicionados aqui'), t('{n} addon(s)', { n: list.length }), () =>
        menu(t('Addons ativos'), list.map((a) => ({ label: a.manifest.name || a.manifest.id, sub: a.transportUrl })), {})
      )
    );
    // Addons recomendados (só aparecem se ainda não estiverem instalados).
    RECOMMENDED.filter((r) => !list.some((a) => a.transportUrl === r.url || (a.manifest && a.manifest.id === r.id))).forEach((r) =>
      body.appendChild(row(t('Instalar {name}', { name: r.name }), t(r.desc), '', () => installFromUrl(r.url, r.name)))
    );
    const addInput = h('input.input', { type: 'text', placeholder: 'https://.../manifest.json' });
    addInput.__submit = (v) => {
      const u = v.trim();
      if (!/^https?:\/\/.+manifest\.json/.test(u)) return toast(t('Cole a URL do manifest.json do addon'));
      if (stremio.isLoggedIn()) return installFromUrl(u, t('o addon'));
      const cur = store.settings().localAddons || [];
      store.saveSettings({ localAddons: cur.concat([u]) });
      addons.load(true).then(() => {
        router.dropTab('home');
        toast(t('Addon adicionado'));
        render();
      });
    };
    body.appendChild(
      h('div.set-row', { focusable: true, onSelect: () => nav.select(addInput) }, [
        h('div.label', null, [t('Adicionar addon por URL'), h('small', { text: stremio.isLoggedIn() ? t('Instala na sua conta Stremio') : t('Fica só nesta TV') })]),
        addInput,
      ])
    );

    body.appendChild(h('div.set-section', { text: t('Sobre e depuração') }));
    const logInput = h('input.input', { type: 'text', value: s.devlogUrl || '', placeholder: 'http://IP-DO-PC:8099/log' });
    logInput.__submit = (v) => {
      store.saveSettings({ devlogUrl: v.trim() });
      log.setRemote(v.trim());
      log.info(t('Log remoto ligado'));
      toast(v.trim() ? t('Enviando logs para o PC') : t('Log remoto desligado'));
    };
    body.appendChild(
      h('div.set-row', { focusable: true, onSelect: () => nav.select(logInput) }, [
        h('div.label', null, [t('Log remoto'), h('small', { text: t('npm run logs no PC') })]),
        logInput,
      ])
    );
    body.appendChild(row(t('Versão'), device || 'Stremio Kai Timeworn', 'v' + update.VERSION, null));
    body.appendChild(
      row(t('Procurar atualização'), t('Baixa a versão nova do GitHub ({repo})', { repo: update.REPO }), '', () => checkForUpdate())
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
