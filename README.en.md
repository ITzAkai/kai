# Stremio Kai Timeworn

[Português](README.md) · **English**

The look and features of [Stremio Kai](https://github.com/allecsc/Stremio-Kai) on **older LG TVs running webOS 3.x**, which can't run the official Stremio app.

Kai's AI plugins (SVP, VapourSynth, Anime4K) are left out because the TV can't handle them. Everything else was rebuilt for the TV's old browser, Chromium 38.

> **Unofficial** project, not affiliated with Stremio, Stremio Kai or LG. The app hosts no content: it only shows what the add-ons in **your** Stremio account provide.

![Home screen on the TV](docs/screenshot-home.png)

## Features

- **Your Stremio account:** sign in with a code (on your phone, at link.stremio.com) or with e-mail. Add-ons, library and "Continue watching" come from the account, and progress syncs back to it.
- **Kai look and feel:**
  - rotating Hero Banner, sourced from Cinemeta or MDBList;
  - dark or OLED theme;
  - Montserrat font;
  - ratings from several sources (IMDb, AniList; Rotten Tomatoes and Metacritic with an MDBList key);
  - localized synopses and cast photos (with a TMDB key).
- **Source list like Kai on PC:**
  - Debrid (RD) first, then Torrentio, then the rest;
  - filter by add-on;
  - counter of add-ons still loading;
  - 4K, HDR, Dolby Vision and REMUX tags, plus a Mbps estimate.
- **Player:**
  - uses the TV's native player, with hardware decoding of H.264, HEVC and HDR10;
  - skips intros and outros (IntroDB and AniSkip);
  - automatic subtitles in your language, in Kai's style (Nata Sans), configurable;
  - audio track switching;
  - clock with "ends at";
  - next episode from the same source;
  - automatic reconnection if the video stalls.
- **Weekly anime calendar** (AniList).
- **Built for the TV:** remote and Magic Remote pointer navigation, and care for the little memory available (small images, lazy loading).
- **Updates from inside the app:** Settings → Check for update. On TVs with Homebrew Channel it installs by itself.

## Compatibility

| | |
|---|---|
| Tested | LG 43UJ6565 (2017), webOS 3.5, firmware 06.10.55 |
| Should work | other LG TVs with webOS 3.x or newer (untested) |
| Video | MP4/MKV with H.264 or HEVC. HDR10 yes; Dolby Vision only if the TV supports it |
| Network | Prefer Ethernet. The UJ6565's Wi-Fi measured ~30 Mbps: 4K REMUX won't play smoothly, 4K WEB-DL and 1080p will |

## How videos reach the TV

- **Debrid (Real-Debrid, AllDebrid, etc.):** with Torrentio set up with a debrid service in your account, links are direct and play without a PC.
- **Torrents:** the TV can't run Stremio's torrent engine. Keep [stremio-service](https://github.com/Stremio/stremio-service/releases) running on a PC on the same network. On the TV, use **Settings → Server → Scan network**.

## Installing on the TV

You'll need a PC on the same network as the TV and the `.ipk` file from the [latest release](https://github.com/creachec/Stremio-Kai-Timeworn/releases/latest).

Pick **one** of the paths:

### Option 1: LG Developer Mode (no root)

This is LG's official path and works on any TV. One catch: **the developer session expires every 50 hours**, and apps installed through it are removed if you don't renew it.

1. On the PC, create a free account at [webostv.developer.lge.com](https://webostv.developer.lge.com/) and confirm your e-mail.
2. On the TV, open the **LG Content Store**, then find and install the **Developer Mode** app.
3. Open Developer Mode and sign in with the account from step 1.
4. Turn on **Dev Mode Status**. The TV restarts.
5. Open Developer Mode again and turn on **Key Server**. Write down the **IP** and **Passphrase** shown on screen.
6. On the PC, install [webOS Dev Manager](https://github.com/webosbrew/dev-manager-desktop/releases).
7. In Dev Manager, add the TV: *Developer Mode* type, with the IP and passphrase from step 5.
8. Under **Apps**, click install and choose the `com.kai.stremio_X.Y.Z_all.ipk` file you downloaded.
9. **Stremio Kai Timeworn** shows up in the TV's app list.

**To keep the app:** open Developer Mode on the TV every now and then and press **Extend** to renew the 50 hours. Dev Manager can also renew it from the PC.

### Option 2: Rooted TV (webOS Homebrew Channel)

This path is permanent: nothing expires, and the app updates itself from Settings.

1. Check whether your TV's firmware can be rooted at [cani.rootmy.tv](https://cani.rootmy.tv/) and follow the method it lists (RootMyTV, DejaVuln, faultmanager…). **Do it at your own risk.**
2. Once rooted, the **Homebrew Channel** app shows up on the TV ([project](https://github.com/webosbrew/webos-homebrew-channel)).
3. On the PC, use [webOS Dev Manager](https://github.com/webosbrew/dev-manager-desktop/releases) and add the TV. In Homebrew Channel → Settings, turn on **SSH Server** and restart the TV (the default root password is `alpine`; change it or use an SSH key).
4. Install the `.ipk` with Dev Manager, as in step 8 of option 1.

Later versions install from the TV itself, under **Settings → Check for update**.

### First run

1. Open the app. A wizard asks you to sign in to Stremio (easiest with the phone code), scans for the PC server and asks for your subtitle language.
2. In **Settings**, adjust subtitle font and size, the Hero Banner and the OLED theme. From inside the app you can install **Anime Kitsu** and **OpenSubtitles**, and paste optional (free) TMDB and MDBList keys.

> The app's interface is in Brazilian Portuguese.

## Privacy and security

- Your account, keys and preferences stay **on the TV only** (the app's local storage). The app only talks to Stremio, to the add-ons you installed and to public metadata APIs (Cinemeta, TMDB/MDBList if you set them up, AniList, IntroDB, AniSkip).
- Data coming from add-ons never becomes code. The app has a Content Security Policy that only lets its own code run.
- Remote logging (for development) is **off** by default and only sends to an address you type in. Debrid and API keys are redacted from logs.
- Updating through Homebrew Channel verifies the file's **SHA-256** before installing.

## Development

Requires Node.js 20 or newer.

```bash
npm install
npm run build      # builds dist/ (ES5 JavaScript for Chromium 38)
npm run serve      # test in a desktop browser at http://localhost:5173 (1920x1080)
npm run release    # builds release/: .ipk + manifest with SHA-256
```

To install straight onto a rooted TV over SSH (key at `~/.ssh/webos_tv`):

```bash
TV_IP=192.168.x.y KAI_DEVLOG=http://PC-IP:8099/log npm run deploy
```

With `npm run logs` running on the PC, you see the TV's log live.

Code layout:
- `src/js/lib/`: remote navigation, networking, Luna, images, subtitles.
- `src/js/api/`: Stremio account, add-on protocol, streaming server, ratings, intro skipping, updates.
- `src/js/views/`: the screens.
- `src/static/`: HTML, CSS (Kai theme) and icons.
- `tools/`: build, deploy, release, remote log, diagnostic proxy.

## Credits

- [Stremio Kai](https://github.com/allecsc/Stremio-Kai) by allecsc: look, ideas and the subtitle style.
- [Stremio](https://github.com/Stremio): account API, add-on protocol, stremio-service and `stremio-video` (reference for the webOS player).
- [webOS Homebrew](https://www.webosbrew.org/): Homebrew Channel, Dev Manager and documentation.
- Data: [IntroDB](https://introdb.app), [AniSkip](https://aniskip.com), [AniList](https://anilist.co), [arm-server](https://arm.haglund.dev), Cinemeta, TMDB and MDBList.
- Fonts [Montserrat](https://fonts.google.com/specimen/Montserrat) and [Nata Sans](https://fonts.google.com/specimen/Nata+Sans) (SIL Open Font License).

## License

[GPL-3.0](LICENSE), same as Stremio Kai.
