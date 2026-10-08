/* tools/contrast.js — verifikasi kontras WCAG 2.1 atas pasangan warna yang
   benar-benar dipakai di styles.css dan app.js.
   Bagian WAJIB: teks (4.5:1, atau 3:1 untuk teks besar) dan batas kontrol
   yang jadi satu-satunya penanda komponen (3:1). Kegagalan di sini = kegagalan build.
   Bagian CATATAN: elemen dekoratif / tangga warna data — dilaporkan apa adanya
   sebagai angka, tidak menggagalkan build, dengan alasan yang ditulis eksplisit.
   Jalankan: node tools/contrast.js */
'use strict';

const hex = h => {
  h = h.replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
};
const lin = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const lum = h => { const [r, g, b] = hex(h); return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); };
const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1]; return (hi + 0.05) / (lo + 0.05); };

/* [nama, teks/elemen, latar, ambang] — WAJIB */
const required = [
  ['Teks isi / latar halaman',        '#1E1B4B', '#EEF2FF', 4.5],
  ['Teks isi / kartu putih',          '#1E1B4B', '#FFFFFF', 4.5],
  ['Teks isi / kartu wash',           '#1E1B4B', '#E0E7FF', 4.5],
  ['Teks sekunder / kartu putih',     '#4B5470', '#FFFFFF', 4.5],
  ['Teks sekunder / latar halaman',   '#4B5470', '#EEF2FF', 4.5],
  ['Teks sekunder / kartu wash',      '#4B5470', '#E0E7FF', 4.5],
  ['Teks sekunder / baris data',      '#4B5470', '#DDE4FB', 4.5],
  ['Eyebrow / latar halaman',         '#B8420A', '#EEF2FF', 4.5],
  ['Tombol primer',                   '#FFFFFF', '#4F46E5', 4.5],
  ['Tombol primer saat hover',        '#FFFFFF', '#3730A3', 4.5],
  ['Tombol aksen (CTA)',              '#FFFFFF', '#C2410C', 4.5],
  ['Tombol aksen saat hover',         '#FFFFFF', '#B8420A', 4.5],
  ['Tombol ghost',                    '#3730A3', '#FFFFFF', 4.5],
  ['Tab aktif',                       '#3730A3', '#E0E7FF', 4.5],
  ['Tab tidak aktif',                 '#4B5470', '#FFFFFF', 4.5],
  ['Label pil biasa',                 '#4B5470', '#FFFFFF', 4.5],
  ['Label pil selesai',               '#047857', '#D1FAE5', 4.5],
  ['Label pil modul berjalan',        '#B8420A', '#FFEDD5', 4.5],
  ['Angka nomor modul berjalan',      '#FFFFFF', '#C2410C', 4.5],
  ['Angka nomor modul selesai',       '#047857', '#D1FAE5', 4.5],
  ['Angka nomor modul biasa',         '#3730A3', '#E0E7FF', 4.5],
  ['Label kunci jawaban (A/B/C/D)',   '#3730A3', '#E0E7FF', 4.5],
  ['Jawaban benar terpilih',          '#FFFFFF', '#047857', 4.5],
  ['Jawaban salah terpilih',          '#FFFFFF', '#B91C1C', 4.5],
  ['Judul umpan balik benar',         '#047857', '#D1FAE5', 4.5],
  ['Judul umpan balik salah',         '#B91C1C', '#FEE2E2', 4.5],
  ['Teks dalam blok prompt',          '#EEF2FF', '#1E1B4B', 4.5],
  ['Label blok prompt',               '#A5B4FC', '#1E1B4B', 4.5],
  ['Catatan blok prompt',             '#C7D2FE', '#1E1B4B', 4.5],
  ['Badge ikon modul',                '#B8420A', '#FFEDD5', 4.5],
  ['Angka statistik',                 '#B8420A', '#FFFFFF', 4.5],
  ['Angka statistik hijau',           '#047857', '#FFFFFF', 4.5],
  ['Judul contoh lemah',              '#B91C1C', '#FEE2E2', 4.5],
  ['Judul contoh kuat',               '#047857', '#D1FAE5', 4.5],
  ['Tautan sumber',                   '#3730A3', '#EEF2FF', 4.5],
  ['Tag RESMI',                       '#FFFFFF', '#4F46E5', 4.5],
  ['Tag RUJUKAN',                     '#FFFFFF', '#4B5470', 4.5],
  ['Judul kartu ide',                 '#B8420A', '#FFEDD5', 4.5],
  ['Toast',                           '#FFFFFF', '#1E1B4B', 4.5],
  ['Banner terkunci',                 '#4B5470', '#DDE4FB', 4.5],
  ['Skor besar netral',               '#3730A3', '#FFFFFF', 3.0],
  ['Skor besar lulus',                '#047857', '#FFFFFF', 3.0],
  ['Skor besar belum lulus',          '#B91C1C', '#FFFFFF', 3.0],
  ['Batas kartu (penanda komponen)',  '#6D79EE', '#FFFFFF', 3.0],
  ['Batas kartu di atas latar',       '#6D79EE', '#EEF2FF', 3.0],
  ['Batas pil di atas latar',         '#6D79EE', '#EEF2FF', 3.0],
  ['Cincin fokus keyboard',           '#3730A3', '#EEF2FF', 3.0],
  ['Garis rel modul',                 '#6D79EE', '#EEF2FF', 3.0],
  ['Ikon judul bagian',               '#B8420A', '#EEF2FF', 3.0]
];

/* [nama, nilai, alasan] — CATATAN (tidak menggagalkan build) */
const advisory = [
  ['Aksen merek di atas latar halaman', ratio('#EA580C', '#EEF2FF'),
    'aksen #EA580C tidak pernah dipakai sebagai warna teks; dipakai untuk bentuk, ikon, dan garis (ambang non-teks 3:1 terpenuhi)'],
  ['Sel heatmap level 1 vs kartu putih', ratio('#8B97F7', '#FFFFFF'),
    'sel data; kekuatan bacanya datang dari langkah warna ke tingkat berikutnya, bukan dari kontras ke latar'],
  ['Langkah heatmap 0 -> 1', ratio('#E0E7FF', '#8B97F7'), 'dua tingkat terendah harus bisa dibedakan — ini angka yang menentukan'],
  ['Langkah heatmap 1 -> 2', ratio('#8B97F7', '#4F46E5'), 'ditto'],
  ['Langkah heatmap 2 -> 3', ratio('#4F46E5', '#312E81'), 'ditto']
];

let fails = 0;
console.log('WAJIB  (' + required.length + ' pasangan)');
console.log('no  rasio  min   hasil   pasangan');
required.forEach(([name, fg, bg, min], i) => {
  const r = ratio(fg, bg);
  const good = r >= min;
  if (!good) fails++;
  console.log(
    String(i + 1).padStart(2) + '  ' + r.toFixed(2).padStart(5) + '  ' +
    String(min).padStart(4) + '  ' + (good ? 'LULUS' : 'GAGAL') + '   ' + name +
    (good ? '' : `   fg=${fg} bg=${bg}`)
  );
});

console.log('\nCATATAN  (dilaporkan, tidak menggagalkan build)');
advisory.forEach(([name, r, why]) => {
  console.log('  ' + r.toFixed(2).padStart(5) + '  ' + name + '\n         → ' + why);
});

console.log('\n' + (required.length - fails) + '/' + required.length + ' pasangan wajib lulus');
console.log('\nCATATAN: warna aksen merek = ' + '#EA580C' + ', latar berteks putih memakai ' + '#C2410C' + ' (' + ratio('#FFFFFF', '#C2410C').toFixed(2) + ':1)');
console.log(fails ? 'HASIL: GAGAL — ' + fails + ' pasangan wajib di bawah ambang' : 'HASIL: LULUS — semua pasangan wajib memenuhi WCAG AA');
process.exit(fails ? 1 : 0);
