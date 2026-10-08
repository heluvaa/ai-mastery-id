# PRODUCT.md — AI Mastery ID

## Apa ini
Kursus web statis (PWA, offline-capable) berbahasa Indonesia santai untuk **pemula non-teknis**
yang ingin memahami AI, memakai prompt dengan benar, sampai bisa menjual produk AI.

Lima modul berurutan, masing-masing: penjelasan simpel → contoh praktis → kuis → flashcard.
Ditutup ujian komprehensif 20 soal (passing grade 70) dan sertifikat digital.

## Siapa penggunanya
- Pemula tanpa latar belakang teknis (UMKM, karyawan, mahasiswa, content creator).
- Skenario pakai: belajar di HP, sambil duduk/antre/istirahat, koneksi internet tidak stabil.
- Konsekuensi desain: **mobile-first**, target ketuk ≥44px, satu kolom, bisa dipakai offline.

## Mode permukaan
- **Read** (materi modul) + **Operate** (kuis, flashcard, ujian, sertifikat, statistik).
- Bukan Persuade: tidak ada klaim pemasaran, tidak ada harga. Semua yang ditampilkan adalah
  materi, pertanyaan, atau data progres milik pengguna sendiri.

## Kontrak produk (jangan dilanggar)
1. Tidak ada backend. Semua data di `localStorage`. Tidak ada akun, tidak ada tracking.
2. Tidak ada dependensi CDN. Semua aset lokal → jalan offline penuh.
3. Setiap modul wajib mencantumkan sumber (link asli, sudah diverifikasi) dan materi
   ditulis ulang dengan kata sendiri, bukan salinan mentah.
4. Sertifikat hanya terbit bila skor ujian akhir ≥ 70.
5. Nama pengguna diambil dari input pengguna (default "Siswa AI"), bisa diubah kapan saja.

## Arah visual (code-led, disahkan dari design-system match)
- Dunia: **Claymorphism edukatif** — bentuk chunky, sudut membulat (20–28px), border tebal 3px,
  bayangan ganda (inner highlight + outer soft), tombol terasa "ditekan" saat diklik.
- Palet: indigo `#4F46E5` (primer), `#818CF8` (sekunder), oranye `#EA580C` (aksen/CTA),
  latar `#EEF2FF`, teks `#1E1B4B`, kartu putih, border `#C7D2FE`.
- Tipografi: **Baloo 2** (display/judul, membulat & ramah) + **Nunito** (teks/UI).
  Keduanya di-self-host sebagai woff2 → tidak butuh internet.
- Terang (light) saja. Pengguna membuka ini di HP sambil menunggu, di ruang terang.

## Batasan yang tidak boleh dilanggar
- Tidak ada emoji sebagai ikon. Ikon = SVG stroke konsisten.
- Kontras teks ≥ 4.5:1. Fokus keyboard terlihat. `prefers-reduced-motion` dihormati.
- Tanpa scroll horizontal di 360–1440px.
