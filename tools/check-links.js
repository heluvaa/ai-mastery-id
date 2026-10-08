/* tools/check-links.js — memeriksa semua URL sumber di data.js.
   Jalankan: node tools/check-links.js
   Catatan: beberapa situs (Cloudflare) membalas 403 untuk permintaan otomatis;
   403 dicatat sebagai BLOKIR, bukan MATI. Hanya 404/410/5xx yang dianggap MATI.
   Concurrency dibatasi (default 3) supaya tidak kena rate-limit seperti
   pemeriksaan paralel agresif yang menghasilkan false alarm. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFile } = require('child_process');

const root = path.join(__dirname, '..');
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'data.js'), 'utf8'), ctx);

const urls = [];
const seen = new Set();
const push = (s, where) => { if (!seen.has(s.url)) { seen.add(s.url); urls.push({ url: s.url, where, title: s.title }); } };
ctx.COURSE.modules.forEach(m => m.sources.forEach(s => push(s, 'Modul ' + m.n)));
ctx.COURSE.roadmap.forEach(r => r.sources.forEach(s => push(s, 'Roadmap: ' + r.title)));

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';
const CONC = Number(process.env.CONC || 3);

function curl(url) {
  return new Promise(res => {
    execFile('curl', ['-sS', '-L', '-o', '/dev/null', '-w', '%{http_code}',
      '--max-time', '25', '-A', UA, url], { timeout: 30000 }, (err, stdout) => {
      const code = String(stdout || '').trim();
      if (/^2\d\d$/.test(code)) res({ url, code, state: 'HIDUP' });
      else if (code === '403' || code === '429') res({ url, code, state: 'BLOKIR' });
      else if (!code || err) res({ url, code: code || 'ERR', state: 'GAGAL' });
      else res({ url, code, state: 'MATI' });
    });
  });
}

(async () => {
  console.log('Memeriksa ' + urls.length + ' URL unik (concurrency ' + CONC + ')...\n');
  const results = [];
  let i = 0;
  async function worker() {
    while (i < urls.length) {
      const item = urls[i++];
      const r = await curl(item.url);
      results.push(Object.assign({}, item, r));
      process.stdout.write(r.state === 'HIDUP' ? '.' : (r.state === 'BLOKIR' ? 'b' : 'x'));
    }
  }
  await Promise.all(Array.from({ length: CONC }, worker));

  const bad = results.filter(r => r.state !== 'HIDUP');
  console.log('\n\nHIDUP ' + results.filter(r => r.state === 'HIDUP').length + '/' + results.length);
  if (bad.length) {
    console.log('\nPERLU DIPERHATIKAN:');
    bad.forEach(r => console.log('  ' + r.state + ' [' + r.code + '] ' + r.url + '  (' + r.where + ')'));
  }
  const dead = results.filter(r => r.state === 'MATI' || r.state === 'GAGAL');
  console.log('\n' + (dead.length ? 'HASIL: GAGAL — ' + dead.length + ' tautan mati' : 'HASIL: LULUS — tidak ada tautan mati' +
    (bad.length ? ' (' + bad.length + ' diblokir bot, bukan mati)' : '')));
  process.exit(dead.length ? 1 : 0);
})();
