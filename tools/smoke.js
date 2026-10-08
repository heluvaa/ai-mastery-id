/* tools/smoke.js — uji fungsional penuh memakai jsdom.
   Menjalankan index.html + data.js + app.js di DOM sungguhan, lalu menelusuri
   semua alur: beranda, modul, kuis, flashcard, ujian, sertifikat, statistik,
   roadmap, dialog nama, dan penulisan localStorage.
   Jalankan: NODE_PATH=$HOME/node_modules node tools/smoke.js */
'use strict';
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const dataJs = fs.readFileSync(path.join(root, 'data.js'), 'utf8');
const appJs = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

const fail = [];
const pass = [];
const ok = (cond, msg) => (cond ? pass.push(msg) : fail.push(msg));

const canvasStub = () => {
  const grad = { addColorStop() {} };
  return new Proxy({
    measureText: t => ({ width: String(t).length * 20 }),
    createLinearGradient: () => grad,
    createRadialGradient: () => grad,
    getImageData: () => ({ data: [] })
  }, {
    get(t, k) {
      if (k in t) return t[k];
      return typeof k === 'string' ? () => {} : undefined;
    },
    set() { return true; }
  });
};

async function makeDom(seed) {
  const vc = new VirtualConsole();
  const consoleErrors = [];
  vc.on('jsdomError', e => consoleErrors.push('jsdomError: ' + e.message));
  vc.on('error', (...a) => consoleErrors.push('console.error: ' + a.join(' ')));

  // skrip disisipkan inline supaya jsdom memicu DOMContentLoaded sekali, seperti peramban.
  const inline = code => '<script>' + code.replace(/<\/script/g, '<\\/script') + '</script>';
  const page = html
    .replace('<script src="./data.js"></script>', () => inline(dataJs))
    .replace('<script src="./app.js"></script>', () => inline(appJs));

  const dom = new JSDOM(page, {
    url: 'https://example.test/',
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    virtualConsole: vc,
    beforeParse(window) {
      window.IntersectionObserver = class { constructor() {} observe() {} unobserve() {} disconnect() {} };
      window.scrollTo = () => {};
      window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
      window.confirm = () => true;
      try {
        Object.defineProperty(window.navigator, 'clipboard', {
          value: { writeText: () => Promise.resolve() }, configurable: true
        });
      } catch (e) { window.navigator.clipboard = { writeText: () => Promise.resolve() }; }
      window.document.execCommand = () => true;
      if (!window.URL.createObjectURL) window.URL.createObjectURL = () => 'blob:stub';
      if (!window.URL.revokeObjectURL) window.URL.revokeObjectURL = () => {};
      window.HTMLCanvasElement.prototype.getContext = function () { return canvasStub(); };
      window.HTMLCanvasElement.prototype.toBlob = function (cb) { cb(new window.Blob(['x'], { type: 'image/png' })); };
      if (window.HTMLDialogElement) {
        window.HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
        window.HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
      }
      Object.defineProperty(window.document, 'fonts', { value: { ready: Promise.resolve(), load: () => Promise.resolve() }, configurable: true });
      try { window.localStorage.clear(); } catch (e) {}
      if (seed) window.localStorage.setItem('aiMastery.v1', JSON.stringify(seed));
    }
  });

  const errs = [];
  dom.window.addEventListener('error', e => errs.push('window.error: ' + (e.message || e.error)));
  dom.window.onunhandledrejection = e => errs.push('unhandled: ' + e.reason);

  // tunggu sampai dokumen selesai dimuat — aplikasi boot sendiri, sekali
  await new Promise(res => {
    if (dom.window.document.readyState === 'complete') { setTimeout(res, 0); return; }
    dom.window.addEventListener('load', () => setTimeout(res, 0));
    setTimeout(res, 3000); // jaring pengaman
  });
  return { dom, errs, consoleErrors };
}

const click = (dom, el) => el && el.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true, cancelable: true }));
const $ = (dom, s) => dom.window.document.querySelector(s);
const $$ = (dom, s) => Array.from(dom.window.document.querySelectorAll(s));
const active = dom => { const s = $(dom, '.screen.active'); return s ? s.id : '(tidak ada)'; };
const txt = (dom, s) => { const e = $(dom, s); return e ? e.textContent.trim() : null; };

/* urutan judul tidak boleh melompat (h1 -> h3 tanpa h2) */
function headingSkips(dom, screenId) {
  const sec = dom.window.document.getElementById(screenId);
  if (!sec) return ['layar ' + screenId + ' tidak ada'];
  const hs = Array.from(sec.querySelectorAll('h1,h2,h3,h4,h5,h6'));
  let prev = 0; const bad = [];
  hs.forEach(h => {
    const lv = Number(h.tagName[1]);
    if (prev && lv > prev + 1) bad.push(`h${prev} -> ${h.tagName} ("${h.textContent.trim().slice(0, 34)}")`);
    prev = lv;
  });
  if (hs.length && Number(hs[0].tagName[1]) !== 1) bad.push(`judul pertama bukan h1 (${hs[0].tagName})`);
  return bad;
}
function checkHeadings(dom, screenId, label) {
  const bad = headingSkips(dom, screenId);
  ok(bad.length === 0, `urutan judul rapi di ${label}` + (bad.length ? ': ' + bad.join('; ') : ''));
}

/* =====================================================================
   FASE A — perjalanan pengguna baru
   ===================================================================== */
(async function main() {
const tick = () => new Promise(r => setTimeout(r, 30));
console.log('--- FASE A: pengguna baru ---');
{
  const { dom, errs, consoleErrors } = await makeDom(null);
  const store = dom.window.localStorage;

  ok(active(dom) === 'screen-home', 'boot menampilkan beranda');
  ok($$(dom, '#moduleRail li').length === 5, 'rel beranda memuat 5 modul');
  ok((txt(dom, '#whoName') || '').length > 0, 'nama pengguna tampil di header');
  ok(/Modul 1/.test(txt(dom, '#resumeBtnLabel') || ''), 'tombol lanjut menunjuk Modul 1');

  /* buka modul 1 */
  click(dom, $(dom, '.mod'));
  ok(active(dom) === 'screen-module', 'klik modul berpindah ke layar modul');
  ok($$(dom, '.lesson').length === 6, 'modul 1 menampilkan 6 pelajaran');
  ok($$(dom, '.copy').length >= 3, 'ada tombol salin pada contoh');
  ok($$(dom, '.sources a').length >= 5, 'daftar sumber tampil');
  ok($$(dom, '.flash').length === 0, 'flashcard hanya di layar flashcard');

  /* tombol salin */
  checkHeadings(dom, 'screen-module', 'materi modul');
  checkHeadings(dom, 'screen-home', 'beranda');

  const copyBtn = $(dom, '.copy');
  click(dom, copyBtn);
  await tick();
  ok(copyBtn.classList.contains('is-done') && copyBtn === $(dom, '.copy'),
     'tombol salin berubah status setelah diklik');

  const saved = JSON.parse(store.getItem('aiMastery.v1'));
  ok(saved.modules && saved.modules.m1 && saved.modules.m1.read === true, 'status baca modul tersimpan');
  ok(saved.lastDay === new Date().toISOString().slice(0, 10), 'streak mencatat tanggal hari ini');
  ok(saved.streak.current === 1, 'streak mulai dari 1');

  /* masuk kuis modul */
  const quizBtn = $$(dom, '[data-go="quiz:m1"]')[0];
  click(dom, quizBtn);
  ok(active(dom) === 'screen-quiz', 'kuis modul terbuka');
  ok($$(dom, '#opts .opt').length === 4, 'kuis menampilkan 4 opsi');
  ok(/1 \/ 5/.test(txt(dom, '.quiz-head .pill') || ''), 'kuis modul berisi 5 soal');

  let guard = 0;
  while ($(dom, '#opts .opt') && guard < 12) {
    const opts = $$(dom, '#opts .opt');
    click(dom, opts[guard % 4]);
    ok($(dom, '.feedback') !== null, `soal ${guard + 1}: pembahasan muncul setelah menjawab`);
    const allDisabled = opts.every(o => o.disabled);
    ok(allDisabled, `soal ${guard + 1}: semua opsi terkunci setelah menjawab`);
    const next = $(dom, '#nextSlot .btn');
    click(dom, next);
    guard++;
  }
  ok($(dom, '.score-hero') !== null, 'layar hasil skor muncul setelah kuis selesai');
  checkHeadings(dom, 'screen-quiz', 'hasil kuis');
  ok($$(dom, '.review .rv').length === 5, 'pembahasan lengkap 5 soal tampil di hasil');

  const after = JSON.parse(store.getItem('aiMastery.v1'));
  ok(after.modules.m1.quiz.attempts.length === 1, 'percobaan kuis tercatat');
  ok(typeof after.modules.m1.quiz.best === 'number', 'skor terbaik tersimpan');

  /* flashcard */
  click(dom, $$(dom, '[data-go="flash:m1"]')[0]);
  ok(active(dom) === 'screen-flash', 'layar flashcard terbuka');
  const card = $(dom, '.flash');
  click(dom, card);
  ok(card.classList.contains('is-flipped'), 'kartu bisa dibalik');
  const total = Number(($(dom, '.quiz-head .pill').textContent.match(/(\d+)\s*\/\s*(\d+)/) || [])[2]);
  ok(total === 12, 'deck flashcard modul berisi 12 kartu');
  let fc = 0;
  while ($(dom, '#knowBtn') && fc < 40) { click(dom, $(dom, '#knowBtn')); fc++; }
  ok($(dom, '#againDeck') !== null || $(dom, '.score-hero') !== null, 'flashcard punya layar selesai');
  const fcState = JSON.parse(store.getItem('aiMastery.v1'));
  ok(Object.keys(fcState.modules.m1.fc.mastered).length > 0, 'kartu yang ditandai paham tersimpan');

  /* ujian akhir */
  click(dom, $$(dom, '[data-go="exam"]')[0]);
  ok(active(dom) === 'screen-exam', 'layar ujian terbuka');
  click(dom, $(dom, '#startExam'));
  ok(active(dom) === 'screen-quiz', 'ujian memakai layar kuis');
  ok(/1 \/ 20/.test(txt(dom, '.quiz-head .pill') || ''), 'ujian berisi 20 soal');
  let eg = 0;
  while ($(dom, '#opts .opt') && eg < 25) {
    click(dom, $$(dom, '#opts .opt')[0]);
    click(dom, $(dom, '#nextSlot .btn'));
    eg++;
  }
  ok($(dom, '.score-hero') !== null, 'hasil ujian tampil');
  ok(eg === 20, `ujian selesai dalam 20 soal (dapat ${eg})`);

  /* statistik */
  click(dom, $$(dom, '.tab[data-go="stats"]')[0]);
  ok(active(dom) === 'screen-stats', 'layar statistik terbuka');
  ok($$(dom, '.tile').length >= 4, 'kartu statistik tampil');
  ok($$(dom, '.heat i').length === 28, 'heatmap menampilkan 28 hari');
  ok($$(dom, '.rows .row').length >= 5, 'rincian per modul tampil');
  checkHeadings(dom, 'screen-stats', 'statistik');

  /* roadmap */
  click(dom, $$(dom, '.tab[data-go="roadmap"]')[0]);
  ok(active(dom) === 'screen-roadmap', 'layar roadmap terbuka');
  ok($$(dom, '#screen-roadmap .card').length === 5, 'roadmap memuat 3 tahap + kepala + penutup');
  checkHeadings(dom, 'screen-roadmap', 'roadmap');

  /* sertifikat sebelum lulus */
  click(dom, $$(dom, '.tab[data-go="exam"]')[0]);
  click(dom, $$(dom, '[data-go="cert"]')[0] || $(dom, '.tab[data-go="exam"]'));
  const certScreen = $(dom, '#screen-cert').innerHTML;
  ok(/Belum bisa diterbitkan/.test(certScreen) || $(dom, '#certCanvas') !== null, 'layar sertifikat tampil dengan status benar');

  /* dialog nama */
  click(dom, $(dom, '#whoBtn'));
  ok($(dom, '#nameDialog').hasAttribute('open'), 'dialog nama terbuka');
  $(dom, '#nameInput').value = 'Zico';
  click(dom, $(dom, '#nameSave'));
  const named = JSON.parse(store.getItem('aiMastery.v1'));
  ok(named.name === 'Zico', 'nama tersimpan ke localStorage');
  ok(txt(dom, '#whoName') === 'Zico', 'nama diperbarui di header');

  ok(errs.length === 0, 'tidak ada error runtime javascript' + (errs.length ? ': ' + errs.join(' | ') : ''));
  ok(consoleErrors.length === 0, 'tidak ada error konsol' + (consoleErrors.length ? ': ' + consoleErrors.join(' | ') : ''));
}

/* =====================================================================
   FASE B — pengguna yang sudah lulus
   ===================================================================== */
console.log('--- FASE B: pengguna sudah lulus ---');
{
  const seed = {
    v: 1, name: 'Zico', nameSet: true, createdAt: Date.now(),
    modules: {}, exam: { attempts: [{ date: Date.now(), score: 85, correct: 17, total: 20 }] },
    cert: null, days: { [new Date().toISOString().slice(0, 10)]: 3 },
    lastDay: new Date().toISOString().slice(0, 10), streak: { current: 4, best: 4 }
  };
  ['m1', 'm2', 'm3', 'm4', 'm5'].forEach(id => {
    seed.modules[id] = { read: true, lastLesson: 3, scroll: 0, quiz: { best: 75, attempts: [{ date: Date.now(), score: 75, correct: 6, total: 8 }] }, fc: { seen: {}, mastered: {} } };
  });

  const { dom, errs, consoleErrors } = await makeDom(seed);

  ok(active(dom) === 'screen-home', 'beranda tampil untuk pengguna lama');
  ok(/Sertifikat/.test(txt(dom, '#resumeBtnLabel') || ''), 'tombol lanjut menunjuk sertifikat setelah lulus');
  ok((txt(dom, '#resumePct') || '') === '100%', 'progres 100% saat semua modul lulus dan ujian lulus');

  click(dom, $$(dom, '.tab[data-go="exam"]')[0]);
  click(dom, $(dom, '[data-go="cert"]') || $(dom, '.tab[data-go="exam"]'));
  ok($(dom, '#certCanvas') !== null, 'kanvas sertifikat dirender');
  ok($(dom, '#dlBtn') !== null && $(dom, '#shareBtn') !== null, 'tombol unduh dan bagikan tersedia');
  ok(/Zico/.test($(dom, '#screen-cert').textContent), 'nama pengguna muncul di layar sertifikat');
  checkHeadings(dom, 'screen-cert', 'sertifikat');

  /* unduh tidak melempar error */
  let threw = null;
  try { click(dom, $(dom, '#dlBtn')); } catch (e) { threw = e.message; }
  ok(threw === null, 'unduh sertifikat berjalan tanpa error' + (threw ? ': ' + threw : ''));

  /* beranda melanjutkan ke modul */
  click(dom, $$(dom, '.tab[data-go="modul"]')[0] || $$(dom, '.tab')[0]);
  click(dom, $$(dom, '.tab[data-go="modules"]')[0]);
  ok(active(dom) === 'screen-module', 'tab Modul membuka daftar modul');
  ok($$(dom, '#screen-module .card').length >= 6, 'daftar modul memuat kartu tiap modul');

  click(dom, $$(dom, '[data-go="module:m1"]')[0]);
  ok($(dom, '.mod-head__badge') !== null, 'ikon modul tampil di kepala modul');
  ok($(dom, '#jumpBtn') !== null, 'tombol lanjut dari posisi baca terakhir muncul');

  ok(errs.length === 0, 'tidak ada error runtime di fase B' + (errs.length ? ': ' + errs.join(' | ') : ''));
  ok(consoleErrors.length === 0, 'tidak ada error konsol di fase B' + (consoleErrors.length ? ': ' + consoleErrors.join(' | ') : ''));
}

/* =====================================================================
   HASIL
   ===================================================================== */
console.log('\nLULUS ' + pass.length + ' pemeriksaan');
if (fail.length) {
  console.log('\nGAGAL ' + fail.length + ' pemeriksaan:');
  fail.forEach(f => console.log('  x ' + f));
  process.exitCode = 1;
  return;
}
console.log('\nHASIL: LULUS — 0 error');
})();
