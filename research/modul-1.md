# Modul 1 — AI & LLM Dasar

> Untuk pemula non-teknis. Nggak perlu bisa ngoding untuk paham modul ini.
> Semua istilah teknis ditulis ulang pakai bahasa sehari-hari + analogi.

---

## Konsep inti

**1. AI dan Machine Learning — bedanya apa?**
AI (Artificial Intelligence / kecerdasan buatan) itu payung besarnya: semua usaha bikin mesin yang bisa melakukan hal-hal yang biasanya butuh kecerdasan manusia — memahami bahasa, mengenali gambar, mengambil keputusan. Machine Learning (ML) adalah *cara* paling modern untuk mencapai itu: mesin nggak diberi aturan satu-satu, tapi belajar sendiri dari banyak contoh. Analoginya kayak anak kecil yang belajar kenal "kucing" bukan dari daftar ciri-ciri ("berbulu, berekor, mengeong"), tapi dari melihat ratusan foto kucing sampai dia bisa membedakannya sendiri.

**2. LLM — "otak bahasa" yang menebak kata berikutnya.**
LLM (Large Language Model) adalah jenis AI yang khusus jago soal bahasa. Cara kerjanya sebenarnya sederhana untuk dijelaskan: dia membaca teks, lalu menebak kata (atau potongan kata) berikutnya yang paling mungkin, lagi dan lagi. Dari kebiasaan menebak itu, muncul kemampuan menjawab pertanyaan, meringkas, menerjemahkan, dan mengarang. Bayangkan autocomplete keyboard di HP-mu — cuma ini versinya sudah "makan" teks internet dalam jumlah raksasa, jadi tebakannya jauh lebih pintar.

**3. Token — potongan kecil penyusun teks.**
Model nggak membaca huruf atau kata utuh seperti kita. Teks dipecah dulu jadi "token": bisa berupa satu kata, sebagian kata, atau tanda baca. Misalnya kata "tokenization" bisa dipecah jadi `token` + `ization`. Anggap saja token itu seperti balok LEGO — kalimat tersusun dari balok-balok kecil, dan model bekerja menghitung balok. Satu kata di bahasa Indonesia/Inggris rata-rata sekitar 1–2 token, jadi 100 kata kira-kira 130–150 token.

**4. Context window — "meja kerja" si model.**
Context window itu jumlah token yang bisa "diingat" model dalam satu percakapan sekaligus — termasuk pesanmu dan jawabannya. Analoginya: meja kerja. Mejanya ada ukurannya; kalau dokumen yang kamu taruh melebihi meja, yang paling lama harus disingkirkan. Makanya model kadang "lupa" hal yang kamu bilang di awal percakapan yang panjang. Menariknya, makin penuh meja bukan selalu makin bagus — akurasi bisa turun kalau isinya terlalu banyak dan berantakan.

**5. Parameter — "tombol-tombol" yang dipelajari model.**
Parameter adalah angka-angka (bisa miliaran jumlahnya) yang membentuk "pengetahuan" model, dan disetel sendiri selama proses belajar. Analogi kasarnya, ini kayak triliunan tombol kecil yang posisinya diatur supaya model menebak kata dengan tepat. Penting: jumlah parameter yang lebih banyak *nggak otomatis* berarti lebih pintar — kualitas data dan cara melatihnya sama pentingnya.

**6. Training vs Inference — sekolah vs dunia kerja.**
"Training" (pelatihan) adalah masa model belajar dari data raksasa: prosesnya lama, mahal, butuh banyak komputer, dan dilakukan sekali sebelum dirilis. "Inference" adalah saat model sudah jadi dan dipakai menjawab pertanyaanmu tiap hari. Analoginya: training itu seperti bertahun-tahun sekolah, inference itu seperti saat kamu benar-benar kerja dan menjawab pertanyaan bos — cepat dan (relatif) murah per pertanyaan.

**7. Multimodal — sekarang model bisa "lihat", bukan cuma "baca".**
Dulu model cuma bisa menerima teks. Model multimodal bisa menerima jenis input lain: gambar, dan sebagian juga suara atau video. Jadi kamu bisa upload foto dan tanya "ini apa ya?", atau kirim screenshot error dan minta dijelaskan. Istilahnya "multimodal" karena model memproses lebih dari satu "mode" (teks + gambar, misalnya).

**8. Hallucination & batasan — kenapa AI bisa salah dengan yakin.**
Karena tugas intinya menebak kata yang terdengar masuk akal, model kadang mengarang fakta yang salah tapi ditulis dengan sangat percaya diri — ini disebut *hallucination*. Model juga punya batas pengetahuan (*knowledge cutoff*, nggak tahu kejadian setelah tanggal tertentu) dan nggak punya akses internet real-time kecuali diberi fitur itu. Jadi: anggap AI itu asisten pintar yang kadang berhalusinasi, bukan mesin kebenaran yang selalu benar.

---

## Contoh praktis

**1. Ringkas teks panjang.**
Copy-paste satu artikel atau laporan, lalu minta: "Ringkas ini jadi 5 poin utama, bahasa santai." Cocok banget buat kamu yang malas baca dokumen panjang tapi butuh intinya cepat.

**2. Minta penjelasan versi gampang.**
Tempel konsep yang bikin pusing, lalu bilang: "Jelaskan ini seperti aku anak SMP." AI jago mengubah bahasa rumit jadi analogi sederhana (persis yang modul ini lakukan!). Kamu juga bisa minta "jelaskan lebih pelan" kalau masih bingung.

**3. Upload gambar atau screenshot (multimodal).**
Kirim foto tanaman, struk belanja, atau screenshot error ke model yang mendukung gambar. Tanya: "Ini gambar apa dan apa yang perlu aku lakukan?" Ini fitur yang nggak bisa dilakukan model zaman dulu.

**4. Perbaiki dan translate tulisan.**
Tulis draft email atau caption, lalu minta: "Perbaiki tata bahasanya" atau "Terjemahkan ke bahasa Indonesia formal." Berguna banget untuk yang sering nulis pesan kerja atau belajar bahasa asing.

**5. Bandingkan dua model di tugas yang sama.**
Kasih pertanyaan yang sama persis ke dua model berbeda (misal ChatGPT vs Gemini), lalu bandingkan jawabannya. Ini cara paling cepat buat merasakan sendiri beda gaya dan kualitas tiap model — dan belajar nggak gampang percaya satu sumber saja.

---

## Miskonsepsi umum pemula

**1. "AI tahu segalanya / kayak Google."**
Bukan. AI bukan mesin pencari. Dia menebak jawaban dari pola yang dipelajarinya, tanpa mengecek apakah fakta itu benar. Untuk fakta terbaru, tetap verifikasi di sumber tepercaya.

**2. "Kalau AI jawabnya yakin, berarti benar."**
Salah besar. Model bisa menulis kutipan, angka, atau tautan yang kelihatannya rapi tapi karangan (hallucination). Nada percaya diri ≠ kebenaran.

**3. "AI benar-benar mengerti arti katanya."**
Secara teknis, model mengolah pola statistik, bukan "memahami" makna seperti manusia. Dia sangat jago menebak hal berikutnya, tapi nggak punya pemahaman seperti kita.

**4. "Model yang parameternya lebih banyak pasti lebih pintar."**
Belum tentu. Model kecil dengan data dan pelatihan bagus bisa mengalahkan model besar yang terlati sembarangan. Besar bukan jaminan.

**5. "AI hidup / punya perasaan / kesadaran."**
Tidak. Ini software yang menghitung angka. Kalimat seperti "maaf" atau "aku senang" itu hasil pola bahasa, bukan perasaan.

**6. "Pengetahuan AI selalu terbaru."**
Nggak juga. Model punya batas pengetahuan (knowledge cutoff) sampai tanggal tertentu saat dilatih. Kejadian sesudahnya nggak dia tahu, kecuali dibekali fitur pencarian/akses web.

---

## Draft kuis

**Soal 1.** Secara inti, apa yang sebenarnya dilakukan sebuah LLM saat menjawab?
- A. Mencari jawaban di Google lalu menyalinnya
- B. Menebak kata/teks berikutnya berdasarkan pola yang sudah dipelajari ✔
- C. Menelpon manusia sungguhan untuk bertanya
- D. Membaca buku fisik dengan kamera

**Jawaban benar:** B
**Pembahasan:** LLM bekerja dengan memprediksi potongan teks berikutnya yang paling mungkin. Kemampuan meringkas, menerjemahkan, dan menjawab muncul dari kebiasaan menebak ini.

**Soal 2.** Apa itu "token" dalam konteks LLM?
- A. Kode rahasia untuk membuka model
- B. Potongan kecil teks (kata/sebagian kata/tanda baca) yang jadi satuan olahan model ✔
- C. Nama lain untuk kata sandi akunmu
- D. Uang virtual untuk bayar langganan

**Jawaban benar:** B
**Pembahasan:** Model tidak membaca huruf atau kata utuh, tapi memecah teks jadi token. "Tokenization" misalnya bisa jadi `token` + `ization`.

**Soal 3.** "Context window" paling mirip dengan...
- A. Ukuran layar HP-mu saat membuka aplikasi
- B. Batas jumlah token yang bisa diingat model dalam satu percakapan ✔
- C. Kecepatan internet saat pakai AI
- D. Nama jendela browser

**Jawaban benar:** B
**Pembahasan:** Context window itu "meja kerja" model — ada ukurannya. Kalau penuh, informasi paling lama tergusur, makanya model bisa "lupa" obrolan awal.

**Soal 4.** Apa itu "parameter" pada model?
- A. Angka-angka yang dipelajari model selama pelatihan dan membentuk "pengetahuannya" ✔
- B. Jumlah pengguna aplikasi
- C. Harga langganan per bulan
- D. Nama pengembang model

**Jawaban benar:** A
**Pembahasan:** Parameter adalah angka internal (bisa miliaran) yang disetel saat training. Tapi jumlah parameter banyak ≠ otomatis lebih pintar.

**Soal 5.** Apa beda "training" dan "inference"?
- A. Training = dipakai menjawab, inference = masa belajar
- B. Training = masa belajar model, inference = saat model dipakai menjawab ✔
- C. Keduanya sama saja
- D. Training = beli model, inference = hapus model

**Jawaban benar:** B
**Pembahasan:** Training itu seperti bertahun-tahun sekolah (mahal, lama, sekali saja). Inference itu seperti saat model kerja menjawab pertanyaanmu tiap hari (cepat).

**Soal 6.** Model menjawab fakta yang salah dengan sangat percaya diri. Ini disebut...
- A. Bug listrik
- B. Hallucination ✔
- C. Multimodal
- D. Inference

**Jawaban benar:** B
**Pembahasan:** Hallucination adalah saat AI "mengarang" informasi yang terdengar meyakinkan tapi salah. Karena itu, fakta dari AI tetap harus dicek.

**Soal 7.** "Multimodal" artinya model bisa...
- A. Bekerja tanpa listrik
- B. Menerima lebih dari satu jenis input, misal teks dan gambar ✔
- C. Menjawab dalam banyak bahasa asing
- D. Online dan offline bersamaan

**Jawaban benar:** B
**Pembahasan:** Multimodal = bisa memproses beberapa "mode", misalnya teks + gambar. Jadi kamu bisa upload foto dan minta AI menjelaskannya.

**Soal 8.** Kenapa AI kadang tidak tahu kejadian yang baru saja terjadi?
- A. Karena internetnya mati
- B. Karena model punya batas pengetahuan (knowledge cutoff) dari tanggal pelatihannya ✔
- C. Karena AI sengaja bohong
- D. Karena terlalu banyak parameter

**Jawaban benar:** B
**Pembahasan:** Model hanya "tahu" sampai data terakhir yang dipakai saat training. Kejadian sesudahnya tidak diketahui, kecuali model diberi akses pencarian web.

---

## Flashcard

**AI (Artificial Intelligence)** -> Usaha bikin mesin yang bisa melakukan hal-hal yang biasanya butuh kecerdasan manusia, seperti memahami bahasa atau mengenali gambar.

**Machine Learning** -> Cara AI belajar dari banyak contoh data, bukan diberi aturan satu-satu. Kayak anak belajar kenal kucing dari banyak foto.

**LLM (Large Language Model)** -> Model AI raksasa yang dilatih dari teks dalam jumlah besar, tugas intinya menebak kata berikutnya. Contoh: otak di balik ChatGPT, Claude, Gemini.

**Token** -> Potongan kecil teks (kata, sebagian kata, atau tanda baca) yang jadi satuan olahan model. Kayak balok LEGO penyusun kalimat.

**Context Window** -> Batas jumlah token yang bisa "diingat" model dalam satu percakapan. Seperti ukuran meja kerja — kalau penuh, informasi lama tergusur.

**Parameter** -> Angka-angka internal model (bisa miliaran) yang disetel saat pelatihan dan membentuk "pengetahuannya".

**Training** -> Masa model belajar dari data raksasa. Lama, mahal, dan dilakukan sekali sebelum dirilis. Seperti bertahun-tahun sekolah.

**Inference** -> Saat model yang sudah jadi dipakai menjawab pertanyaanmu. Ini yang kamu rasakan tiap hari. Seperti masa kerja setelah sekolah.

**Hallucination** -> Saat AI mengarang informasi yang salah tapi ditulis dengan sangat percaya diri. Alasan utama kenapa jawaban AI harus dicek.

**Multimodal** -> Kemampuan model menerima lebih dari satu jenis input, misal teks dan gambar sekaligus. Jadi bisa upload foto dan ditanya.

**Knowledge Cutoff** -> Batas tanggal sampai kapan model "tahu" sesuatu, ditentukan dari data pelatihannya. Kejadian setelah itu tidak diketahui.

**Prompt** -> Perintah atau pertanyaan yang kamu tulis ke AI. Cara menulis prompt sangat memengaruhi kualitas jawaban yang keluar.

---

## Sumber

*(semua URL sudah dicek bisa diakses saat riset ini dibuat)*

**Dokumentasi resmi vendor:**

1. **Intro to Claude — Anthropic (dokumentasi resmi)** — https://docs.anthropic.com/en/docs/overview
2. **Context windows — Anthropic (dokumentasi resmi)** — https://docs.anthropic.com/en/docs/build-with-claude/context-windows
3. **Token counting — Anthropic (dokumentasi resmi)** — https://docs.anthropic.com/en/docs/build-with-claude/token-counting
4. **Vision (analisis gambar / multimodal) — Anthropic (dokumentasi resmi)** — https://docs.anthropic.com/en/docs/build-with-claude/vision
5. **Models overview — Anthropic (dokumentasi resmi)** — https://docs.anthropic.com/en/docs/about-claude/models/overview
6. **Gemini API Docs — Google (dokumentasi resmi)** — https://ai.google.dev/gemini-api/docs
7. **Gemini API Models — Google (dokumentasi resmi)** — https://ai.google.dev/gemini-api/docs/models
8. **Llama Docs / Overview — Meta (dokumentasi resmi)** — https://www.llama.com/docs/overview/
9. **Machine Learning Crash Course — Google (materi edukasi resmi)** — https://developers.google.com/machine-learning/crash-course
10. **LLM Course — Hugging Face (kursus resmi, gratis)** — https://huggingface.co/learn/llm-course/chapter1/1

**Artikel & referensi kredibel:**

11. **What Is Artificial Intelligence (AI)? — IBM Think** — https://www.ibm.com/think/topics/artificial-intelligence
12. **What Is Machine Learning? — IBM Think** — https://www.ibm.com/think/topics/machine-learning
13. **What Are Large Language Models (LLMs)? — IBM Think** — https://www.ibm.com/think/topics/large-language-models
14. **Large language model — Wikipedia** — https://en.wikipedia.org/wiki/Large_language_model
15. **Machine learning — Wikipedia** — https://en.wikipedia.org/wiki/Machine_learning
16. **Hallucination (artificial intelligence) — Wikipedia** — https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)
17. **Transformer (deep learning architecture) — Wikipedia** — https://en.wikipedia.org/wiki/Transformer_(deep_learning_architecture)
18. **Generative pre-trained transformer (GPT) — Wikipedia** — https://en.wikipedia.org/wiki/Generative_pre-trained_transformer
