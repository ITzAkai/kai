// Recebe os logs que o app envia da TV (Ajustes → Log remoto → http://IP-DO-PC:8099/log).
import http from 'node:http';
import os from 'node:os';

const port = Number(process.env.PORT || 8099);
const colors = { log: '\x1b[37m', warn: '\x1b[33m', error: '\x1b[31m' };

http
  .createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.end();
    if (req.method !== 'POST') return res.end('ok');
    let body = '';
    req.on('data', (d) => (body += d));
    req.on('end', () => {
      try {
        for (const e of JSON.parse(body)) {
          const t = new Date(e.t).toLocaleTimeString();
          console.log(`${colors[e.level] || ''}[${t}] ${e.level.toUpperCase()} ${e.text}\x1b[0m`);
        }
      } catch {
        console.log(body);
      }
      res.end('ok');
    });
  })
  .listen(port, () => {
    const ips = Object.values(os.networkInterfaces())
      .flat()
      .filter((i) => i && i.family === 'IPv4' && !i.internal)
      .map((i) => i.address);
    console.log(`[logs] ouvindo na porta ${port}. Na TV use: ${ips.map((ip) => `http://${ip}:${port}/log`).join('  ou  ')}`);
  });
