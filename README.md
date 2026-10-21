# Stremio Kai for Tizen

Stremio for Samsung Tizen TVs, including older models (2017 and newer, Tizen 3.0+) that can't
run the official Stremio app. It runs as a [TizenBrew](https://github.com/reisxd/TizenBrew)
app module and brings the [Stremio Kai](https://github.com/allecsc/Stremio-Kai) look and
features to Tizen, fully controlled with the Samsung remote.

> **Unofficial.** Not affiliated with Stremio, Stremio Kai or Samsung. The app hosts no
> content: it only shows what the add-ons on **your** Stremio account provide.

![Home screen](docs/screenshot-home.png)

## Features

- **Your Stremio account.** Sign in with a code (on your phone at link.stremio.com) or by email.
  Add-ons, library and "Continue watching" come from your account, and progress syncs back.
- **Stremio Kai look.** Rotating hero banner, dark or OLED theme, ratings from several sources,
  synopses and cast with photos (with a TMDB key).
- **Smart source list.** Direct (debrid) links first, filter by add-on, and 4K, HDR,
  Dolby Vision and REMUX tags.
- **Player.** Uses the TV's hardware player (H.264, HEVC, HDR10), skips intros and outros
  (IntroDB and AniSkip), automatic subtitles, next episode on the same source, and reconnects
  if a video stalls.
- **Profiles.** "Who's watching?" screen, each profile on its own Stremio account.
- **Built for the Samsung remote.** Arrows, OK, Return, play/pause, fast-forward/rewind,
  colour and channel keys. No pointer needed.
- **Light enough for old Tizen.** Plain JavaScript compiled down for the old web engine on
  Tizen 3.0 (Chromium 47); no WebAssembly required.

## Requirements

- A Samsung TV running **Tizen 3.0 or newer** (2017 onwards). Tested on a 2017 UA65MU8500 (Tizen 3.0).
- **TizenBrew** on the TV (installation steps below).
- For playback, **one** of:
  - a **debrid** service (Real-Debrid, AllDebrid, etc.) in your Stremio add-ons: plays directly
    on the TV, no PC needed;
  - [stremio-service](https://github.com/Stremio/stremio-service/releases) running on a PC on
    the same network, for torrent streams. Tizen TVs can't run the torrent engine themselves.

## Installing on a Samsung TV

You need a PC on the same Wi-Fi as the TV for steps 1 and 2. After that, the TV works on its own.

### 1. Turn on Developer Mode

1. Find your PC's IP address (on Windows: open Command Prompt and run `ipconfig`; look for
   **IPv4 Address**, e.g. `192.168.1.20`). The TV and PC must be on the same network.
2. On the TV, press **Home** and open **Apps**.
3. On the Apps screen, type **1 2 3 4 5** with the remote's number keys (or the on-screen
   keypad on remotes without numbers).
4. In the **Developer Mode** window, switch **Developer mode** to **On**, enter your PC's IP
   address under **Host PC IP**, and select **OK**.
5. **Restart the TV**: hold the remote's power button until the TV turns off and back on,
   or unplug it for 30 seconds. Developer Mode only starts after a full restart.

### 2. Install TizenBrew

1. On the PC, download the latest **TizenBrew Installer** for your system from
   [TizenBrewInstaller releases](https://github.com/reisxd/TizenBrewInstaller/releases/latest) and run it.
2. Make sure the TV is on, then click **Install TizenBrew**. (On Tizen 7 or newer, it asks you
   to sign in to a Samsung account to create a certificate; follow its steps.)
3. TizenBrew appears in the TV's **Apps**.

See the [TizenBrew install guide](https://github.com/reisxd/TizenBrew/blob/main/docs/README.md)
for other install methods.

### 3. Point Developer Mode at the TV itself

TizenBrew needs this to run:

1. On the TV, open **Apps** and type **1 2 3 4 5** again.
2. Keep **Developer mode** **On**, change **Host PC IP** to **127.0.0.1**, and select **OK**.
3. Restart the TV again.

Leave Developer Mode on from now on, or TizenBrew won't open.

### 4. Add Stremio Kai

1. Open **TizenBrew** and go to **Module Manager → Add module**.
2. Choose **GitHub** (not NPM) and enter:
   ```
   ITzAkai/stremio-kai-tizen
   ```
3. **Stremio Kai** now appears in TizenBrew. Open it.

### 5. First launch

1. The setup asks for a **torrent server**. If you use debrid, choose **Skip**. For torrents,
   start [stremio-service](https://github.com/Stremio/stremio-service/releases) on a PC on the
   same network and choose **Scan network**.
2. Sign in to your Stremio account: go to **link.stremio.com** on your phone and enter the code
   shown on the TV, or sign in with email.
3. Your add-ons and library load from your account. Pick something and play.

TizenBrew picks up updates to Stremio Kai automatically.

### Troubleshooting

- **TizenBrew won't open:** check that Developer Mode is still **On** with Host PC IP
  **127.0.0.1**. A TV firmware update or factory reset turns it off.
- **The installer can't find the TV:** make sure the Host PC IP in step 1 is the PC's current IP,
  the TV was restarted afterwards, and both are on the same network (not a guest network).
- **A video won't play:** try a debrid (direct) source, or check that stremio-service is
  running on the PC for torrent sources.

## Tizen integration

- Samsung **Return**, media, colour and channel keys, registered through the Tizen
  TVInputDevice API.
- Exits through the Tizen application API.
- Finds the TV's IP address (to scan the network for stremio-service) through Samsung's
  network API, with a WebRTC fallback.
- Shows the TV model in Settings through Samsung's product info API.
- Updates through TizenBrew.

## Known limitations

- **Audio and subtitle track switching** inside a video doesn't use Samsung's player API yet,
  so it may not work on every TV. Please open an issue if it doesn't on yours.
- The AI enhancements of the PC version of Stremio Kai (SVP, VapourSynth, Anime4K) are not
  included: TVs can't run them.

## Building

Needs Node.js.

```
npm install
npm run build
```

The built app is written to `dist/`, which TizenBrew loads (`appPath` in `package.json`).

## Credits

- [Stremio Kai](https://github.com/allecsc/Stremio-Kai) by allecsc: the original design and features.
- [Stremio Kai Timeworn](https://github.com/creachec/Stremio-Kai-Timeworn) by binhoc: the
  lightweight TV build this Tizen version is based on.
- [TizenBrew](https://github.com/reisxd/TizenBrew) by reisxd: runs this app on Samsung TVs.
- [Stremio](https://www.stremio.com/).

## License

[GPL-3.0](LICENSE), the same as the projects it is based on.
