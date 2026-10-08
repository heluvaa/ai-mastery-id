# Riset Materi — Modul 4: Vibe Coding

> Catatan riset untuk aplikasi **AI Mastery ID**. Bahasa santai, level awam/non-teknis.
> Semua URL di bagian Sumber sudah dicek bisa dibuka (status 200) saat riset ini dibuat.

---

## Konsep inti

1. **Vibe coding itu apa?** Istilah ini dipopulerkan Andrej Karpathy (ilmuwan komputer, mantan pendiri OpenAI) pada Februari 2025. Idenya: kita menjelaskan apa yang kita mau pakai bahasa sehari-hari, AI yang menulis kodenya, dan kita cukup melihat hasilnya jalan atau tidak — tanpa benar-benar membaca kodenya. Bayangkan seperti menyetir pakai GPS: kita cuma bilang tujuan, GPS yang cari jalannya.

2. **Bedanya dengan "ngoding dibantu AI" biasa.** Ada pakai AI + kita baca dan paham kodenya (itu masih rekayasa perangkat lunak normal), ada pakai AI + kodenya di-*Accept All* tanpa dibaca sama sekali (ini baru vibe coding). Penulis teknologi Simon Willison mengingatkan: jangan campur dua hal ini, karena risikonya beda jauh. Anggap saja: yang satu masak sambil mencicipi, yang satu masak sambil merem.

3. **Tool-nya ada beberapa "rasa".** Ada yang seperti *autocomplete* di dalam editor — GitHub Copilot menebak baris kode berikutnya saat kita mengetik. Ada yang seperti *asisten* di aplikasi editor — Cursor dan Claude Code bisa membaca seluruh proyek, mengedit banyak file, dan menjalankan perintah. Ada juga yang seperti *mesin ajaib* untuk bikin aplikasi langsung dari obrolan — Vercel v0, Lovable, dan Bolt: kita ketik "bikin aplikasi begini", langsung jadi aplikasi yang bisa dilihat.

4. **Alur kerjanya cuma empat langkah: prompt → kode → jalankan → perbaiki.** Kita tulis permintaan (prompt), AI menghasilkan kode, kita jalankan/lihat hasilnya, lalu kalau ada yang salah kita balas lagi dengan prompt perbaikan. Ulangi terus seperti menambal ban bocor: temukan bocornya, tambal, cek lagi.

5. **Konteks itu raja.** AI tidak tahu apa yang tidak kita beri tahu. Makin jelas kita menjelaskan (mau apa, untuk siapa, pakai teknologi apa), makin bagus hasilnya. Sebaliknya, prompt satu baris seperti "bikin website" hasilnya sering ngawur — seperti menyuruh tukang bangunan "bikin rumah bagus" tanpa bilang jumlah kamar atau luas tanahnya.

6. **Hasil AI WAJIB diuji, jangan cuma dipelototin.** Kode yang *kelihatan* benar belum tentu benar. Karena itu beri AI cara mengecek sendiri: jalankan programnya, cek errornya, bandingkan dengan yang diharapkan. Prinsip dari tim Anthropic: beri AI "cek lulus/gagal" supaya dia bisa memperbaiki dirinya sendiri, bukan menunggu kita sadar ada masalah.

7. **Git/version control = mesin waktu untuk kode kita.** Git mencatat setiap perubahan sehingga kita bisa melihat versi lama, membandingkan, dan kembali ke kondisi aman kalau AI mengacak-acak proyek. Ibaratnya *save point* di game: sebelum bertarung besar, simpan dulu; kalah, tinggal *load* lagi. Lovable, Cursor, Claude Code, dan Copilot semuanya bisa terhubung ke Git/GitHub.

8. **Ada empat bahaya utama dan satu aturan kapan berhenti.** Bahayanya: (a) kode *halusinasi* — AI mengarang fungsi/library yang tidak ada; (b) *dependency palsu* — AI menyebut nama paket yang sebenarnya tidak ada, berbahaya karena bisa dimanfaatkan penyerang; (c) celah keamanan ikut tergenerate; (d) utang teknis — kode menumpuk tanpa dipahami, makin lama makin susah dirawat. Aturannya: selama proyeknya **kecil, iseng, dan tidak penting**, mainkan; begitu menyangkut uang, data pribadi orang lain, atau dipakai publik — berhenti dan minta bantuan orang berpengalaman.

---

## Contoh praktis

Prompt-prompt ini bisa langsung dipakai di Cursor, Claude Code, v0, Lovable, atau Bolt. Kuncinya: sebutkan **tujuan, isi, dan gaya** — bukan cuma "bikin sesuatu".

```text
Bikin landing page untuk warung kopi "Kopi Pagi" berbahasa Indonesia.
Isinya: judul besar, menu unggulan (5 item + harga), jam buka,
alamat, tombol WhatsApp untuk pesan. Warna hangat (coklat & krem),
tombol besar biar gampang ditekan di HP. Jangan pakai gambar dulu,
cukup teks dan ikon.
```

```text
Saya punya file todo.html. Aplikasi daftar tugas ini bisa menambah
dan menghapus tugas, tapi kalau halaman di-refresh semua tugas hilang.
Tolong ubah supaya tugas disimpan di browser (localStorage) sehingga
tetap ada walau di-refresh. Jangan ubah tampilan, cukup tambah
penyimpanannya saja.
```

```text
Program saya error saat dijalankan. Tolong jelaskan penyebabnya
dengan bahasa sederhana, lalu perbaiki. Ini pesan errornya:

TypeError: Cannot read properties of undefined (reading 'map')

Tolong kerjakan satu langkah perbaikan dulu, jangan langsung ubah
banyak hal sekaligus, supaya saya bisa ikut paham.
```

```text
Tolong periksa kode di proyek ini dari sisi KEAMANAN. Cari hal-hal
seperti: kata sandi/API key yang ditulis langsung di kode, input
pengguna yang tidak diperiksa, dan link yang bisa disusupi. Laporkan
temuan pakai bahasa awam + seberapa bahaya, jangan langsung ubah kode.
```

```text
Proyek saya makin berantakan setelah banyak perubahan. Tolong
bantu rapikan: (1) jelaskan struktur folder & file yang ada sekarang
pakai bahasa sederhana, (2) tandai file mana yang sepertinya tidak
terpakai lagi, (3) siapkan langkah menyimpan perubahan ini ke Git
dengan pesan commit yang jelas.
```

---

## Miskonsepsi umum pemula

1. **"Vibe coding = semua pemakaian AI untuk ngoding."** Bukan. Vibe coding khusus berarti kita menerima kode AI *tanpa membaca atau memahaminya*. Kalau kita baca, uji, dan paham kodenya, itu sekadar ngoding yang dibantu AI — jauh lebih aman.
2. **"AI selalu benar, tinggal percaya saja."** LLM itu mesin penebak kata, bukan mesin kebenaran. Dia sangat percaya diri walau salah — seperti teman yang sok tahu dan tidak pernah mengaku tidak tahu. Selalu uji hasilnya.
3. **"Kalau tampilannya sudah bagus, berarti sudah beres."** Tampilan cantik di luar tidak berarti logika di dalam aman. Bug bisa sembunyi (misalnya data orang lain bisa terlihat, atau tombol mengirim pesan dua kali) tanpa kelihatan di layar.
4. **"Tidak perlu belajar Git, kan ada AI."** Justru sebaliknya. Semakin sering AI mengubah banyak file, semakin penting punya *save point* untuk kembali kalau kacau. Git adalah jaring pengaman, bukan pelajaran tambahan yang bisa dilewat.
5. **"Vibe coding bisa dipakai untuk aplikasi serius apa saja."** Belum. Untuk prototipe, mainan, atau alat pribadi — aman. Untuk aplikasi yang menyimpan data orang lain, menangani pembayaran, atau dipakai banyak orang — butuh jaring keamanan dan pengawasan manusia.
6. **"Kalau errornya sudah hilang, berarti kodenya sehat."** Kadang AI "menambal" error dengan cara yang malah menutupi masalah asli (misalnya mematikan pemeriksaan error). Error hilang != masalah selesai.

---

## Draft kuis

**1. Istilah "vibe coding" pertama kali dipopulerkan oleh siapa?**
- a) Simon Willison
- b) Andrej Karpathy
- c) Sam Altman
- d) Tim Vercel
- **Jawaban: b**
- Pembahasan: Karpathy mempopulerkannya pada Februari 2025 lewat tulisan berisi "forget that the code even exists" (lupakan bahwa kodenya ada).

**2. Apa ciri khas vibe coding yang membedakannya dari ngoding biasa yang dibantu AI?**
- a) Pakainya hanya boleh di HP
- b) Kodenya diterima tanpa dibaca atau dipahami sama sekali
- c) Harus selalu ditulis pakai bahasa Inggris
- d) Tidak boleh pakai Git
- **Jawaban: b**
- Pembahasan: Kunci vibe coding adalah "Accept All" tanpa membaca diff — kita hanya melihat hasil jalan atau tidak.

**3. Tool mana yang termasuk "bikin aplikasi langsung dari obrolan" (bukan autocomplete)?**
- a) GitHub Copilot
- b) Lovable
- c) Git
- d) npm
- **Jawaban: b**
- Pembahasan: Lovable (juga v0 dan Bolt) mengubah deskripsi bahasa natural menjadi aplikasi utuh, sedangkan Copilot lebih ke saran kode di editor.

**4. Alur kerja dasar vibe coding yang benar adalah...**
- a) tulis → hapus → tulis ulang
- b) prompt → kode → jalankan → perbaiki
- c) beli → pasang → lupakan
- d) coding → deploy → berdoa
- **Jawaban: b**
- Pembahasan: Kita ajukan permintaan, AI menulis kode, kita jalankan, lalu perbaiki lewat prompt lanjutan — berulang sampai berhasil.

**5. "Dependency palsu" (package hallucination) bahaya karena...**
- a) Membuat kode jadi lambat
- b) AI menyebut paket yang tidak ada, dan bisa disalahgunakan pihak jahat
- c) Menghapus file kita otomatis
- d) Membuat warna tampilan berubah
- **Jawaban: b**
- Pembahasan: Studi pada 16 model AI menemukan rata-rata 5,2%–21,7% paket yang disebut AI sebenarnya tidak ada; penyerang bisa mendaftarkan nama palsu itu.

**6. Kenapa Git penting saat kita sering pakai vibe coding?**
- a) Supaya kode berjalan lebih cepat
- b) Sebagai "save point" untuk bisa kembali kalau AI mengacak proyek
- c) Supaya AI jadi lebih pintar
- d) Karena diwajibkan oleh semua tool AI
- **Jawaban: b**
- Pembahasan: Git mencatat setiap versi, jadi kita bisa membandingkan dan memulihkan keadaan kalau perubahan AI merusak sesuatu.

**7. Yang paling BUKAN tanda bahaya "utang teknis" dari vibe coding adalah...**
- a) Kode menumpuk yang tidak dimengerti siapa pun
- b) Susah menambah fitur baru karena saling terkait berantakan
- c) Ada catatan riwayat perubahan di Git
- d) Perbaikan satu bug memunculkan dua bug baru
- **Jawaban: c**
- Pembahasan: Justru punya riwayat perubahan Git itu hal BAIK. Utang teknis adalah beban kode berantakan yang makin sulit dirawat.

**8. Kapan sebaiknya TIDAK memakai vibe coding tanpa pendampingan?**
- a) Saat membuat alat receh untuk diri sendiri
- b) Saat bikin prototipe untuk uji ide
- c) Saat membangun aplikasi yang menyimpan data pribadi orang lain atau menangani uang
- d) Saat iseng belajar bikin game kecil
- **Jawaban: c**
- Pembahasan: Kalau ada risiko orang lain dirugikan (data, uang, reputasi), proyek itu bukan lagi "stakes rendah" dan butuh pengawasan orang berpengalaman.

---

## Flashcard

- **Vibe coding** → Cara bikin software dengan menulis permintaan pakai bahasa sehari-hari ke AI, lalu memakai hasilnya tanpa benar-benar membaca kodenya.
- **Prompt** → Instruksi/perintah yang kita tulis ke AI, seperti pesan ke asisten; semakin jelas, semakin bagus hasilnya.
- **LLM (Large Language Model)** → Program AI yang belajar dari banyak teks dan bisa menebak kata berikutnya; otak di balik tool coding AI.
- **GitHub Copilot** → Asisten AI di dalam editor yang menebak kode berikutnya saat kita mengetik (seperti autocomplete pintar).
- **Cursor** → Aplikasi editor dengan agen AI yang bisa membaca seluruh proyek, mengedit banyak file, dan menjalankan perintah.
- **Claude Code** → Agen AI yang dijalankan lewat terminal untuk membangun fitur, memperbaiki bug, dan mengelola Git dari baris perintah.
- **Vercel v0** → Tool dari Vercel yang mengubah deskripsi/desain jadi antarmuka aplikasi utuh siap deploy.
- **Lovable** → Platform untuk membangun aplikasi web full-stack lewat bahasa natural, hasilnya kode yang bisa diedit dan disinkron ke GitHub.
- **Bolt** → Tool "chat to app": kita ngobrol dan dia membangun aplikasi/website lengkap dengan hosting dan database.
- **Halusinasi (hallucination)** → Saat AI mengarang jawaban yang kelihatan meyakinkan tapi sebenarnya tidak ada/benar, misalnya fungsi yang tak pernah ada.
- **Dependency palsu (package hallucination)** → Ketika AI menyebut nama paket/library yang sebenarnya tidak ada; bisa dimanfaatkan penyerang untuk menyusupkan kode jahat.
- **Utang teknis (tech debt)** → Beban kode yang menumpuk tanpa dipahami/beres, bikin perubahan berikutnya makin lama dan makin rawan rusak.

---

## Sumber

1. Wikipedia — Vibe coding (ensiklopedia, ringkasan definisi Karpathy + kritik) — https://en.wikipedia.org/wiki/Vibe_coding
2. Simon Willison — "Not all AI-assisted programming is vibe coding" (blog ahli, sumber definisi & kapan boleh vibe coding) — https://simonwillison.net/2025/Mar/19/vibe-coding/
3. Simon Willison — "Here's how I use LLMs to help me write code" (blog ahli, alur kerja praktis) — https://simonwillison.net/2025/Mar/11/using-llms-for-code/
4. **[Dokumentasi resmi]** Cursor Docs — https://cursor.com/docs
5. **[Dokumentasi resmi]** GitHub Copilot — "About GitHub Copilot" — https://docs.github.com/en/copilot/get-started/about-github-copilot
6. **[Dokumentasi resmi]** Claude Code — Overview — https://code.claude.com/docs/en/overview
7. **[Dokumentasi resmi]** Anthropic Engineering — "Best practices for Claude Code" — https://www.anthropic.com/engineering/claude-code-best-practices
8. **[Dokumentasi resmi]** Vercel v0 — "What is v0?" — https://v0.app/docs
9. **[Dokumentasi resmi]** Lovable Docs — "Welcome to Lovable" — https://docs.lovable.dev/
10. **[Situs resmi]** Bolt — https://bolt.new/
11. **[Dokumentasi resmi]** Pro Git Book (git-scm) — "About Version Control" — https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control
12. **[Dokumentasi resmi]** Pro Git Book (git-scm) — "Recording Changes to the Repository" — https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository
13. arXiv — "We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by Code Generating LLMs" (studi ilmiah tentang dependency palsu) — https://arxiv.org/abs/2406.10279
