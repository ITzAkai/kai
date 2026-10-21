// Which TV we are running on. Samsung Tizen exposes window.tizen (packaged app / TizenBrew);
// its plain Internet browser does not, so the user agent is checked too.
export function isTizen() {
  return typeof window.tizen === 'object' || /Tizen/i.test(navigator.userAgent || '');
}

// Media and colour keys on Samsung must be registered before they reach the page.
export function registerTizenKeys() {
  const input = window.tizen && window.tizen.tvinputdevice;
  if (!input) return;
  ['MediaPlayPause', 'MediaPlay', 'MediaPause', 'MediaStop', 'MediaFastForward', 'MediaRewind',
    'ColorF0Red', 'ColorF1Green', 'ColorF2Yellow', 'ColorF3Blue', 'ChannelUp', 'ChannelDown'].forEach((k) => {
    try {
      input.registerKey(k);
    } catch (e) {
      /* key not on this remote */
    }
  });
}
