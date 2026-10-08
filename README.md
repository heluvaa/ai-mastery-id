# AI Mastery ID — Belajar AI dari Nol

Web app statis (PWA, jalan offline) berisi kursus AI 5 modul untuk pemula non-teknis
di Indonesia. Tanpa backend, tanpa build step, tanpa dependensi CDN.

## Isi kursus

1. **AI & LLM Dasar** — apa itu AI/LLM, token, context window, halusinasi, batasan model
2. **Prompt Engineering** — anatomi prompt, few-shot, chain-of-thought, output terstruktur
3. **AI Agents** — chatbot vs agent, tool use, loop ReAct, memory, MCP, risiko agent
4. **Vibe Coding** — ngoding dibantu AI, alur kerjanya, dan bahayanya
5. **Monetisasi Produk AI** — model bisnis, harga, biaya token, kanal jualan, validasi ide

Tiap modul: penjelasan simpel → contoh praktis (bisa disalin) → flashcard istilah → kuis.
Ditutup ujian akhir 20 soal (ambang lulus 70) dan sertifikat digital yang bisa diunduh.

## Fitur

- Progres persisten di `localStorage`: modul selesai, skor kuis, posisi baca terakhir
- Tombol "lanjutkan belajar" yang selalu menunjuk langkah berikutnya
- Flashcard bolak-balik dengan penanda "sudah paham"
- Dashboard statistik: % progres, rata-rata skor, streak harian, konsistensi 4 minggu
- Tombol salin di setiap contoh prompt
- Sertifikat digital (canvas → PNG) + share sheet + cetak/PDF
- PWA: bisa dipasang ke layar utama dan dibuka tanpa internet
- Sumber tiap modul dicantumkan dan bisa diklik

## Struktur

```
index.html      kerangka satu halaman, semua layar
styles.css      design system (Claymorphism) + responsif
data.js         seluruh materi kursus (teks, kuis, flashcard, sumber)
app.js          mesin: navigasi, kuis, flashcard, progres, sertifikat
sw.js           service worker (cache app shell)
manifest.json   metadata PWA
assets/         ikon raster + font self-host (Baloo 2, Nunito)
research/       catatan riset per modul (bahan mentah, bukan bagian aplikasi)
```

## Menjalankan lokal

```bash
python3 -m http.server 8080
# buka http://localhost:8080
```

Service worker butuh `http(s)://` atau `localhost` — membuka `index.html` lewat `file://`
tetap membuat aplikasi berjalan, hanya mode offline PWA yang tidak aktif.

## Catatan jujur

Materi ditulis ulang dengan kata sendiri dari dokumentasi resmi dan artikel tepercaya;
daftar sumber ada di akhir setiap modul. Sertifikat adalah bukti penyelesaian kursus mandiri,
bukan kredensial resmi dari lembaga pendidikan mana pun.
