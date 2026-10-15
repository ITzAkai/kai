// Chamadas ao barramento Luna do webOS via PalmServiceBridge (sem webOSTV.js).
const pending = new Set();

export function hasLuna() {
  return typeof window.PalmServiceBridge === 'function';
}

export function luna(service, method, params) {
  return new Promise((resolve, reject) => {
    if (!hasLuna()) return reject(new Error('Luna indisponível'));
    const bridge = new window.PalmServiceBridge();
    pending.add(bridge);
    bridge.onservicecallback = (msg) => {
      pending.delete(bridge);
      let res;
      try {
        res = JSON.parse(msg);
      } catch (e) {
        return reject(new Error('Resposta Luna inválida'));
      }
      if (res && res.returnValue === false) {
        const err = new Error(service + '/' + method + ': ' + (res.errorText || res.errorCode || 'falhou'));
        err.result = res;
        reject(err);
      } else resolve(res);
    };
    bridge.call(service.replace(/\/$/, '') + '/' + method, JSON.stringify(params || {}));
  });
}

export function platformBack() {
  try {
    if (window.webOSSystem && window.webOSSystem.platformBack) return window.webOSSystem.platformBack();
    if (window.PalmSystem && window.PalmSystem.platformBack) return window.PalmSystem.platformBack();
  } catch (e) {
    /* ignore */
  }
  window.close();
}

// IP da TV, para varrer a rede atrás do servidor do Stremio.
export function getTvIp() {
  return luna('luna://com.webos.service.connectionmanager', 'getStatus', {}).then((r) => {
    const w = (r.wired && r.wired.ipAddress) || (r.wifi && r.wifi.ipAddress);
    if (!w) throw new Error('Sem IP');
    return w;
  });
}

export function deviceInfo() {
  return luna('luna://com.webos.service.tv.systemproperty', 'getSystemInfo', {
    keys: ['modelName', 'firmwareVersion', 'sdkVersion'],
  });
}

// Apps de streaming que o webOS deixa abertos em segundo plano e que comem a pouca RAM da TV.
const HEAVY = /netflix|youtube|amazon|primevideo|disney|hbo|\.max\b|globoplay|spotify|twitch|plex|crunchyroll|paramount|starplus|appletv/i;

export function closeHeavyBackgroundApps() {
  if (!hasLuna()) return Promise.resolve([]);
  return luna('luna://com.webos.applicationManager', 'running', {})
    .then((r) => {
      const ids = ((r && r.running) || []).map((a) => a.id).filter((id) => id && HEAVY.test(id));
      return Promise.all(
        ids.map((id) =>
          luna('luna://com.webos.applicationManager', 'closeByAppId', { id: id })
            .then(() => id)
            .catch(() => null)
        )
      ).then((list) => list.filter(Boolean));
    })
    .catch(() => []);
}
