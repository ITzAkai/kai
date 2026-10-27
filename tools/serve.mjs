// Servidor estático do dist/ para testar no navegador do PC (simula a TV em 1920x1080).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.env.PORT || 5173);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.woff2': 'font/woff2' };

// Addon de teste (só para desenvolvimento): http://localhost:5173/test-addon/manifest.json
const TEST_VIDEO = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_5MB.mp4';
const TEST_LONG = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'; // ~10 min (HLS)
function testAddon(p, res) {
  const json = (o) => {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify(o));
  };
  if (p === '/test-addon/manifest.json') {
    return json({ id: 'kai.test', version: '1.0.0', name: 'Teste Kai', description: 'Fontes de teste', resources: ['stream', 'subtitles'], types: ['movie', 'series'], catalogs: [], idPrefixes: ['tt'] });
  }
  if (p.startsWith('/test-addon/stream/')) {
    return json({
      streams: [
        { name: 'Teste\nMP4 720p', title: 'Big Buck Bunny (10s)\nH.264 · AAC', url: TEST_VIDEO, behaviorHints: { bingeGroup: 'kai-test' } },
        { name: 'Teste\nHLS longo', title: 'Big Buck Bunny (10 min)\nHLS', url: TEST_LONG, behaviorHints: { bingeGroup: 'kai-test-long' } },
      ],
    });
  }
  if (p.startsWith('/test-addon/subtitles/')) {
    return json({ subtitles: [{ id: 'teste-pt', lang: 'pob', url: 'http://localhost:' + port + '/test-addon/teste.srt' }] });
  }
  if (p === '/test-addon/teste.srt') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
    return res.end('1\n00:00:01,000 --> 00:00:04,000\nLegenda de teste <i>em itálico</i>\n\n2\n00:00:05,000 --> 00:00:09,000\nSegunda linha\nquebrada em duas\n');
  }
  res.writeHead(404);
  res.end();
}

http
  .createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    if (p.startsWith('/test-addon/')) return testAddon(p, res);
    const file = path.join(dist, p === '/' ? 'index.html' : p);
    if (!file.startsWith(dist) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404);
      return res.end('not found');
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, () => console.log(`[serve] http://localhost:${port}`));
