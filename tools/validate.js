/* tools/validate.js — pemeriksa integritas data kursus.
   Jalankan: node tools/validate.js
   Keluar dengan kode 1 kalau ada error. */
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'data.js'), 'utf8');
(0, eval)(src); // data.js mendefinisikan COURSE global

const errs = [], warn = [];
const ok = (cond, msg) => { if (!cond) errs.push(msg); };

console.log('modules:', COURSE.modules.length);

COURSE.modules.forEach((m, i) => {
  if (m.n !== i + 1) errs.push(`${m.id}: nomor modul tidak urut`);
  ['id', 'n', 'title', 'tagline', 'intro', 'minutes', 'lessons', 'examples', 'mistakes', 'cards', 'quiz', 'sources']
    .forEach(k => { if (m[k] === undefined) errs.push(`${m.id}: field ${k} hilang`); });

  console.log(`  ${m.id} ${m.title}: lessons=${m.lessons.length} examples=${m.examples.length} ` +
    `mistakes=${m.mistakes.length} cards=${m.cards.length} quiz=${m.quiz.length} sources=${m.sources.length}`);

  if (m.cards.length < 12) warn.push(`${m.id}: kartu kurang dari 12`);
  if (m.quiz.length < 6) warn.push(`${m.id}: soal kuis kurang dari 6`);
  if (m.sources.length < 5) warn.push(`${m.id}: sumber kurang dari 5`);
  if (!(m.minutes > 0)) errs.push(`${m.id}: durasi menit tidak valid`);

  m.lessons.forEach((l, j) => {
    if (!l.t || !Array.isArray(l.p) || !l.p.length) errs.push(`${m.id} pelajaran ${j + 1}: judul/paragraf kosong`);
  });

  m.quiz.forEach((q, j) => {
    if (!q.q || q.q.length < 10) errs.push(`${m.id} kuis ${j + 1}: pertanyaan terlalu pendek`);
    if (!Array.isArray(q.o) || q.o.length !== 4) errs.push(`${m.id} kuis ${j + 1}: opsi bukan 4`);
    if (typeof q.a !== 'number' || q.a < 0 || q.a >= q.o.length) errs.push(`${m.id} kuis ${j + 1}: indeks jawaban di luar rentang`);
    if (!q.why || q.why.length < 20) errs.push(`${m.id} kuis ${j + 1}: pembahasan terlalu pendek`);
    if (new Set(q.o).size !== q.o.length) errs.push(`${m.id} kuis ${j + 1}: ada opsi duplikat`);
    q.o.forEach(o => { if (typeof o !== 'string' || !o.trim()) errs.push(`${m.id} kuis ${j + 1}: ada opsi kosong`); });
  });

  m.cards.forEach((c, k) => {
    if (!c.term || !c.def) errs.push(`${m.id} kartu ${k + 1}: term/def kosong`);
  });
  const terms = m.cards.map(c => c.term);
  if (new Set(terms).size !== terms.length) warn.push(`${m.id}: ada istilah flashcard duplikat`);

  m.examples.forEach((x, k) => {
    const pair = x.bad && x.good;
    if (!pair && !x.prompt) errs.push(`${m.id} contoh ${k + 1}: tidak punya prompt maupun pasangan bad/good`);
    if (x.bad && !x.good) errs.push(`${m.id} contoh ${k + 1}: bad tanpa good`);
    if (x.good && !x.bad) errs.push(`${m.id} contoh ${k + 1}: good tanpa bad`);
  });

  m.sources.forEach((s, k) => {
    if (!s.title || !s.url) errs.push(`${m.id} sumber ${k + 1}: judul/url kosong`);
    if (!/^https:\/\//.test(s.url)) errs.push(`${m.id} sumber ${k + 1}: url bukan https (${s.url})`);
  });
});

/* --- ujian akhir --- */
const ex = COURSE.exam;
console.log('exam: count=' + ex.count + ' questions=' + ex.questions.length + ' pass=' + ex.pass);
ok(ex.pass === 70, 'exam: passing grade bukan 70');
ok(ex.count === 20, 'exam: count bukan 20');
ok(ex.questions.length === 20, `exam: jumlah soal ${ex.questions.length} bukan 20`);

const perMod = {};
ex.questions.forEach((q, j) => {
  perMod[q.mod] = (perMod[q.mod] || 0) + 1;
  if (!COURSE.modules.find(m => m.id === q.mod)) errs.push(`exam ${j + 1}: modul ${q.mod} tidak ditemukan`);
  if (!Array.isArray(q.o) || q.o.length !== 4) errs.push(`exam ${j + 1}: opsi bukan 4`);
  if (typeof q.a !== 'number' || q.a < 0 || q.a >= q.o.length) errs.push(`exam ${j + 1}: indeks jawaban di luar rentang`);
  if (!q.why || q.why.length < 20) errs.push(`exam ${j + 1}: pembahasan terlalu pendek`);
  if (new Set(q.o).size !== q.o.length) errs.push(`exam ${j + 1}: ada opsi duplikat`);
});
console.log('exam per modul:', JSON.stringify(perMod));
COURSE.modules.forEach(m => {
  if ((perMod[m.id] || 0) !== 4) errs.push(`exam: modul ${m.id} tidak dapat 4 soal (dapat ${perMod[m.id] || 0})`);
});

/* --- roadmap --- */
console.log('roadmap:', COURSE.roadmap.map(s => s.title).join(' | '));
COURSE.roadmap.forEach((s, k) => {
  ['title', 'body', 'tags', 'first', 'sources'].forEach(f => {
    if (!s[f] || (Array.isArray(s[f]) && !s[f].length)) errs.push(`roadmap ${k + 1}: field ${f} kosong`);
  });
  s.sources.forEach((x, j) => {
    if (!/^https:\/\//.test(x.url)) errs.push(`roadmap ${k + 1} sumber ${j + 1}: url bukan https`);
  });
});
ok(COURSE.roadmap.length >= 3, 'roadmap: kurang dari 3 tahap');

/* --- sebaran posisi jawaban benar (deteksi bias) --- */
COURSE.modules.forEach(m => {
  const pos = m.quiz.map(q => q.a);
  if (new Set(pos).size < 2) warn.push(`${m.id}: semua jawaban benar di indeks yang sama`);
});

/* --- berkas yang harus ada --- */
['index.html', 'styles.css', 'app.js', 'sw.js', 'manifest.json'].forEach(f => {
  ok(fs.existsSync(path.join(root, f)), `berkas wajib hilang: ${f}`);
});

console.log('\nWARN:', warn.length ? warn : '-');
console.log('ERR :', errs.length ? errs : 'TIDAK ADA');
console.log(errs.length ? '\nHASIL: GAGAL' : '\nHASIL: LULUS');
process.exit(errs.length ? 1 : 0);
