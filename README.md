# Stremio Kai for Samsung TVs

Stremio on older Samsung smart TVs (2017 and newer, Tizen 3.0+) that can't run the official
Stremio app. It runs inside [TizenBrew](https://github.com/reisxd/TizenBrew) and brings the
[Stremio Kai](https://github.com/allecsc/Stremio-Kai) look and features to the TV, fully
controlled with the normal Samsung remote.

This is a Samsung port of [Stremio Kai Timeworn](https://github.com/creachec/Stremio-Kai-Timeworn),
which does the same for old LG webOS TVs.

> **Unofficial.** Not affiliated with Stremio, Stremio Kai, Samsung or LG. The app hosts no
> content: it only shows what the add-ons on **your** Stremio account provide.

![Home screen (from the original LG build; the Samsung build looks the same)](docs/screenshot-home.png)

## Features

- **Your Stremio account.** Sign in with a code (on your phone at link.stremio.com) or by email.
  Add-ons, library and "Continue watching" come from your account, and progress syncs back.
- **Stremio Kai look.** Rotating hero banner, dark or OLED theme, ratings from several sources,
  synopses and cast with photos (with a TMDB key).
- **Smart source list.** Direct (debrid) links first, filter by add-on, and 4K, HDR,
  Dolby Vision and REMUX tags.
- **Player.** Uses the TV's own hardware player (H.264, HEVC, HDR10), skips intros and outros
  (IntroDB and AniSkip), automatic subtitles, next episode on the same source, and reconnects
  if a video stalls.
- **Profiles.** "Who's watching?" screen, each profile on its own Stremio account.
- **Remote control.** Arrows, OK, Return, play/pause, fast-forward/rewind and colour keys.
  No mouse pointer needed.

## Requirements

- A Samsung TV from **2017 or newer** (Tizen 3.0+). Tested on a 2017 UA65MU8500 (Tizen 3.0).
- **TizenBrew** installed on the TV, with Developer Mode on and Host PC IP set to `127.0.0.1`.
  See the [TizenBrew install guide](https://github.com/reisxd/TizenBrew/blob/main/docs/README.md).
- For playback, **one** of:
  - a **debrid** service (Real-Debrid, AllDebrid, etc.) in your Stremio add-ons: plays directly,
    no PC needed;
  - [stremio-service](https://github.com/Stremio/stremio-service/releases) running on a PC on
    the same network, for torrent streams. The TV is too weak to download torrents itself.

## Install

1. On the TV, open **TizenBrew → Module Manager → Add module**.
2. Choose **GitHub** and enter:
   ```
   ITzAkai/stremio-kai-tizen
   ```
3. Open **Stremio Kai** from TizenBrew.
4. On first launch, set up the torrent server, or choose **Skip** if you use debrid,
   then sign in to your Stremio account.

Updates are picked up by TizenBrew automatically.

## What changed for Samsung

Compared with the LG build:

- Samsung **Return**, media, colour and channel keys (registered through TizenBrew).
- Exiting the app through the Tizen application API.
- Finding the TV's IP address (to scan the network for stremio-service) without LG's system services.
- TV model shown in Settings via Samsung's product info.
- No update checks against the LG release feed. Updates come through TizenBrew.
- English by default (the LG build defaults to Portuguese).

## Known limitations

- **Audio and subtitle track switching** inside a video used LG's media service. On Samsung it
  may not work yet. Please open an issue if it doesn't on your TV.
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

- [Stremio Kai Timeworn](https://github.com/creachec/Stremio-Kai-Timeworn) by binhoc: the
  LG webOS build this port is based on.
- [Stremio Kai](https://github.com/allecsc/Stremio-Kai) by allecsc: the original design and features.
- [TizenBrew](https://github.com/reisxd/TizenBrew) by reisxd: runs this app on Samsung TVs.
- [Stremio](https://www.stremio.com/).

## License

[GPL-3.0](LICENSE), the same as the original project.
