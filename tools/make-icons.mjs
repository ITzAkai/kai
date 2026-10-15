// Gera os ícones PNG do app (80x80 e 130x130) sem dependências: fundo roxo Kai + "play".
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'static');

const crcTable = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}

function icon(size) {
  const rows = [];
  const r = size * 0.22; // raio do canto
  for (let y = 0; y < size; y++) {
    const row = Buffer.alloc(1 + size * 4);
    for (let x = 0; x < size; x++) {
      // Supersampling 4x4 para bordas suaves.
      let cover = 0;
      let play = 0;
      for (let sy = 0; sy < 4; sy++) {
        for (let sx = 0; sx < 4; sx++) {
          const px = x + (sx + 0.5) / 4;
          const py = y + (sy + 0.5) / 4;
          const dx = Math.max(r - px, px - (size - r), 0);
          const dy = Math.max(r - py, py - (size - r), 0);
          if (dx * dx + dy * dy <= r * r) cover++;
          // Triângulo "play" centralizado.
          const u = px / size;
          const v = py / size;
          if (u >= 0.38 && u <= 0.7 && Math.abs(v - 0.5) <= (0.7 - u) * 0.62) play++;
        }
      }
      const t = (x + y) / (2 * size);
      // Gradiente #9d85ff → #5b3fd6.
      let R = Math.round(157 + (91 - 157) * t);
      let G = Math.round(133 + (63 - 133) * t);
      let B = Math.round(255 + (214 - 255) * t);
      const p = play / 16;
      R = Math.round(R + (255 - R) * p);
      G = Math.round(G + (255 - G) * p);
      B = Math.round(B + (255 - B) * p);
      const o = 1 + x * 4;
      row[o] = R;
      row[o + 1] = G;
      row[o + 2] = B;
      row[o + 3] = Math.round((cover / 16) * 255);
    }
    rows.push(row);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bits
  ihdr[9] = 6; // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(Buffer.concat(rows))),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

fs.writeFileSync(path.join(out, 'icon.png'), icon(80));
fs.writeFileSync(path.join(out, 'largeIcon.png'), icon(130));
console.log('[icons] icon.png (80) e largeIcon.png (130) gerados');
