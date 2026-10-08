/* tools/check-refs.js — cek silang referensi DOM antara index.html dan app.js.
   Menangkap bug "selector tidak ketemu" tanpa perlu browser.
   Jalankan: node tools/check-refs.js */
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');

const errs = [];

/* 1. simbol ikon */
const symbols = new Set([...html.matchAll(/<symbol\s+id="([^"]+)"/g)].map(m => m[1]));
const uses = new Set();
for (const m of html.matchAll(/<use\s+href="#([^"]+)"/g)) uses.add(m[1]);
for (const m of app.matchAll(/#i-' \+ name/g)) { /* dinamis, dicek terpisah */ }
const data = fs.readFileSync(path.join(root, 'data.js'), 'utf8');
const dynamicIcons = [
  ...[...app.matchAll(/icon\('([a-z-]+)'/g)].map(m => 'i-' + m[1]),
  ...[...data.matchAll(/icon:\s*'([a-z-]+)'/g)].map(m => 'i-' + m[1])
];
dynamicIcons.forEach(n => uses.add(n));
[...uses].forEach(u => { if (!symbols.has(u)) errs.push(`ikon dipakai tapi simbolnya tidak ada: #${u}`); });
[...symbols].forEach(s => { if (!uses.has(s) && s !== 'brandLogo') errs.push(`simbol ikon tidak pernah dipakai: #${s}`); });

/* 2. id statis di html */
const staticIds = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));

/* 3. id yang dibuat app.js secara dinamis (dari string innerHTML) */
const runtimeIds = new Set([...app.matchAll(/id="([a-zA-Z][\w-]*)"/g)].map(m => m[1]));
[...app.matchAll(/id="'\s*\+/g)].forEach(() => {});

/* 4. selector yang dipanggil app.js */
const q = new Set();
for (const m of app.matchAll(/\$\('#([\w-]+)'/g)) q.add(m[1]);
for (const m of app.matchAll(/getElementById\('([\w-]+)'\)/g)) q.add(m[1]);
for (const m of app.matchAll(/\$\$\('\.([\w-]+)'/g)) { /* kelas, dicek di bawah */ }

const knownIds = new Set([...staticIds, ...runtimeIds]);
[...q].forEach(id => {
  if (!knownIds.has(id)) errs.push(`app.js mencari #${id} tapi tidak ada di html maupun tidak dibuat saat runtime`);
});

/* 5. kelas yang dipakai app.js harus punya definisi di css */
const appClasses = new Set();
for (const m of app.matchAll(/class="([^"']+)"/g)) {
  m[1].split(/\s+/).forEach(c => { if (c && !c.includes("'") && !c.includes('+')) appClasses.add(c); });
}
const cssClasses = new Set([...css.matchAll(/\.([a-zA-Z][\w-]*)/g)].map(m => m[1]));
[...appClasses].forEach(c => {
  if (/^(is-|has-|js-)/.test(c)) return;         // kelas state, opsional di CSS
  if (['el', 'card', 'btn', 'pill'].includes(c)) return;
  if (!cssClasses.has(c)) errs.push(`kelas dipakai di app.js tapi tidak ada di styles.css: .${c}`);
});

/* 6. aset yang di-precache service worker harus ada */
const assets = [...sw.matchAll(/'\.\/([^']+)'/g)].map(m => m[1]).filter(p => p && p !== '');
assets.forEach(p => {
  if (p === '' || p.endsWith('/')) return;
  if (!fs.existsSync(path.join(root, p))) errs.push(`sw.js mem-precache berkas yang tidak ada: ${p}`);
});

/* 7. aset yang dirujuk html/css harus ada */
const refs = [
  ...[...html.matchAll(/(?:href|src)="\.\/([^"]+)"/g)].map(m => m[1]),
  ...[...css.matchAll(/url\('\.\/([^']+)'\)/g)].map(m => m[1])
];
refs.forEach(p => { if (!fs.existsSync(path.join(root, p))) errs.push(`aset dirujuk tapi tidak ada: ${p}`); });

/* 8. tag judul harus seimbang — bug "dibuka h3, ditutup h2" tidak terlihat di jsdom
      karena parser memperbaikinya diam-diam, jadi harus dicek statis. */
for (const lvl of [1, 2, 3, 4, 5, 6]) {
  const open = (app.match(new RegExp('<' + 'h' + lvl + '[ >]', 'g')) || []).length
             + (html.match(new RegExp('<' + 'h' + lvl + '[ >]', 'g')) || []).length;
  const close = (app.match(new RegExp('</' + 'h' + lvl + '>', 'g')) || []).length
              + (html.match(new RegExp('</' + 'h' + lvl + '>', 'g')) || []).length;
  if (open !== close) errs.push(`tag h${lvl} tidak seimbang: ${open} dibuka, ${close} ditutup`);
}

/* 9. manifest ikon harus ada */
const man = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
man.icons.forEach(i => {
  const p = i.src.replace(/^\.\//, '');
  if (!fs.existsSync(path.join(root, p))) errs.push(`ikon manifest tidak ada: ${i.src}`);
});

console.log('simbol ikon      :', symbols.size);
console.log('ikon terpakai    :', uses.size);
console.log('id statis        :', staticIds.size, '| id runtime:', runtimeIds.size);
console.log('selector app.js  :', q.size);
console.log('aset precache sw :', assets.filter(p => p && !p.endsWith('/')).length);
console.log('aset dirujuk html/css :', refs.length);
console.log('ikon manifest    :', man.icons.length);
console.log('\nERR:', errs.length ? errs : 'TIDAK ADA');
process.exit(errs.length ? 1 : 0);
