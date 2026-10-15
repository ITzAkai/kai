// Proxy de diagnóstico entre a TV e o stremio-service: registra cada pedido HTTP do player
// (Range, duração, bytes, quem fechou a conexão). Uso: node tools/diag-proxy.mjs [porta] [keepAliveMs]
import http from 'node:http';

const port = Number(process.argv[2] || 11471);
const keepAlive = Number(process.argv[3] || 5000);
const upstream = { host: '127.0.0.1', port: 11470 };
let seq = 0;
const t0 = Date.now();
const ts = () => ((Date.now() - t0) / 1000).toFixed(1).padStart(7);

const server = http.createServer((req, res) => {
  const id = ++seq;
  const started = Date.now();
  let bytes = 0;
  const sock = req.socket;
  sock.__reqs = (sock.__reqs || 0) + 1;
  console.log(`${ts()} #${id} sock${sock.__id} req${sock.__reqs} ${req.method} ${req.url.split('?')[0].slice(0, 60)} range=${req.headers.range || '-'} conn=${req.headers.connection || '-'}`);
  const up = http.request({ ...upstream, method: req.method, path: req.url, headers: { ...req.headers, host: '127.0.0.1:11470' } }, (ur) => {
    res.writeHead(ur.statusCode, ur.headers);
    ur.on('data', (c) => (bytes += c.length));
    ur.pipe(res);
  });
  up.on('error', (e) => {
    console.log(`${ts()} #${id} erro upstream ${e.message}`);
    res.destroy();
  });
  req.pipe(up);
  res.on('finish', () => console.log(`${ts()} #${id} fim ${(bytes / 1048576).toFixed(1)}MB em ${((Date.now() - started) / 1000).toFixed(1)}s`));
  res.on('close', () => {
    if (!res.writableFinished) {
      console.log(`${ts()} #${id} TV fechou no meio após ${(bytes / 1048576).toFixed(1)}MB, ${((Date.now() - started) / 1000).toFixed(1)}s`);
      up.destroy();
    }
  });
});

let sockSeq = 0;
server.on('connection', (s) => {
  s.__id = ++sockSeq;
  console.log(`${ts()} conexão nova sock${s.__id} de ${s.remoteAddress}`);
  s.on('close', () => console.log(`${ts()} sock${s.__id} fechado`));
});
server.keepAliveTimeout = keepAlive;
server.headersTimeout = keepAlive + 5000;
server.listen(port, () => console.log(`proxy de diagnóstico na porta ${port}, keepAlive=${keepAlive}ms`));
