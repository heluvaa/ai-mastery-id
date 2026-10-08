# MODUL 2 — Prompt Engineering

> Catatan riset untuk aplikasi "AI Mastery ID". Bahasa santai, level pemula non-teknis.
> Semua sumber di bagian akhir sudah dicek dan bisa dibuka.

## Konsep inti

1. **Prompt itu pesananmu ke AI.** Prompt adalah semua teks yang kamu tulis ke AI: pertanyaan, perintah, atau cerita panjang. Anggap AI seperti pelayan restoran baru yang jago tapi belum tahu seleramu — makin jelas pesananmu, makin pas yang datang. "Bikin makanan" itu pesanan buruk; "nasi goreng, tidak pedas, tanpa telur" itu pesanan bagus. Prompt engineering = seni menulis pesanan yang jelas itu.

2. **Prompt yang bagus punya 4 bagian: Peran, Tugas, Konteks, Format.** *Peran* = kamu menyuruh AI jadi siapa ("Kamu guru bahasa Inggris"). *Tugas* = apa yang harus dikerjakan ("perbaiki tata bahasa teks ini"). *Konteks* = info latar yang AI tidak mungkin tahu sendiri ("untuk lamaran kerja, nada formal"). *Format* = bentuk jawaban yang kamu mau ("dalam 3 poin singkat"). Ibarat menulis surat perintah singkat: siapa, melakukan apa, dengan info apa, hasilnya seperti apa.

3. **Zero-shot vs few-shot = tanpa contoh vs pakai contoh.** *Zero-shot* artinya kamu langsung memberi perintah tanpa contoh — "Terjemahkan ke bahasa Jepang: selamat pagi". *Few-shot* artinya kamu memberi 2–3 contoh dulu supaya AI meniru polanya — "Contoh 1: bagus → positif. Contoh 2: jelek → negatif. Sekarang: 'lumayan enak' → ?". Analoginya ngajarin anak: kadang cukup dibilang sekali, kadang perlu dicontohkan dulu. Untuk tugas yang polanya khusus, few-shot jauh lebih akurat.

4. **Chain-of-thought: minta AI "berpikir langkah demi langkah".** Untuk soal yang butuh nalar (hitung, logika, analisis), tambahkan kalimat seperti "jelaskan langkah berpikirmu dulu, baru jawaban akhir". Hasilnya biasanya lebih akurat karena AI tidak melompat langsung ke kesimpulan. Sama seperti guru matematika yang minta kamu tulis caranya, bukan cuma jawaban akhirnya — kamu jadi bisa mengecek di mana salahnya.

5. **System prompt = aturan main yang berlaku terus.** System prompt adalah instruksi "dasar" yang dipasang lebih dulu dan berlaku sepanjang percakapan, misal "Kamu asisten ramah yang selalu menjawab maksimal 2 kalimat". Ini beda dengan pesan biasa yang kamu ketik tiap kali. Ibarat peraturan rumah yang sudah ditempel di pintu — tidak perlu diulang setiap mau bicara.

6. **Delimiter = pagar pemisah biar AI tahu mana instruksi, mana data.** Delimiter adalah tanda pemisah seperti tanda kutip, `###`, atau tag seperti `<teks>...</teks>`. Fungsinya menandai "ini bagian datanya ya, bukan perintah". Contoh: susun instruksimu dulu, lalu taruh teks panjang yang mau diolah di antara penanda `###`. Ini seperti memakai tanda kutip saat menyitir orang lain supaya tidak ketuker dengan ucapanmu sendiri.

7. **Minta output terstruktur (JSON/tabel) bila perlu diolah lagi.** Kalau hasilnya mau dimasukkan ke spreadsheet atau aplikasi, jangan biarkan AI menjawab bebas — tentukan bentuknya, misal "balas dalam tabel dengan kolom Nama, Harga, Rating" atau "balas sebagai JSON". Hasilnya jadi rapi, konsisten, dan mudah dipakai mesin, bukan paragraf yang harus dibaca manual.

8. **Temperature dan iterasi: atur "kekacauan", lalu perbaiki pelan-pelan.** Temperature adalah tombol seberapa acak jawaban AI: rendah (mendekati 0) = jawaban konsisten dan faktual, tinggi = lebih variatif dan kreatif. Terakhir, prompt pertama hampir selalu belum sempurna — anggap ini menulis draft. Perbaiki sedikit-sedikit berdasarkan hasilnya (ganti kata, tambah contoh, minta lebih pendek), beberapa putaran biasanya cukup.

## Contoh praktis

**1. Merangkum artikel — versi BURUK vs versi BAGUS**

```
// BURUK
Rangkum ini.
[tempel artikel]
```
```
// BAGUS
Kamu editor berita yang menulis untuk pembaca sibuk.
Tugas: rangkum artikel di bawah untuk orang yang tidak punya waktu baca penuh.
Aturan:
- Maksimal 5 poin, tiap poin 1 kalimat.
- Bahasa Indonesia, tanpa istilah rumit.
- Sertakan angka penting bila ada.
Artikel:
###
[tempel artikel di sini]
###
```

**2. Menulis email — versi BURUK vs versi BAGUS**

```
// BURUK
Bikin email ke bos minta cuti.
```
```
// BAGUS
Peran: asisten yang menulis email kantor berbahasa Indonesia yang sopan tapi tidak kaku.
Tugas: buat draft email meminta cuti 3 hari (12–14 November) kepada atasan.
Konteks: alasan keluarga, sudah menyerahkan tugas ke rekan Budi, minta dikonfirmasi.
Format: sediakan subjek email + isi email singkat (maksimal 120 kata). Tanda tangan: [Namamu].
```

**3. Few-shot: menilai sentimen ulasan produk**

```
Klasifikasikan sentimen ulasan sebagai POSITIF, NEGATIF, atau NETRAL. Ikuti contoh:

Ulasan: "Pengiriman cepat, barang sesuai gambar!" -> POSITIF
Ulasan: "Barang rusak dan tidak bisa dipakai." -> NEGATIF
Ulasan: "Sudah sampai, tapi belum saya coba." -> NETRAL

Sekarang klasifikasikan:
Ulasan: "Lumayan, cuma agak mahal untuk ukuran segini."
Jawab hanya satu kata.
```

**4. Chain-of-thought: hitungan dan logika**

```
Sebuah toko memberi diskon 20%, lalu PPN 11% dari harga setelah diskon.
Harga awal Rp250.000. Berapa total yang harus dibayar?

Jawab dengan langkah-langkah berikut:
1. Hitung harga setelah diskon.
2. Hitung PPN dari harga itu.
3. Jumlahkan jadi total akhir.
Tulis tiap langkahnya, baru beri angka akhirnya.
```

**5. Output terstruktur dalam tabel**

```
Bandingkan 3 ponsel: iPhone 15, Samsung S24, Pixel 8.
Balas HANYA dalam bentuk tabel dengan kolom persis:
Merek | Harga Perkiraan | Kamera | Baterai | Cocok Untuk
Jangan tambah kalimat pembuka atau penutup.
```

**6. Memakai delimiter untuk data panjang**

```
Ringkas keluhan pelanggan di bawah menjadi 1 kalimat masalah + 1 kalimat saran tindakan.

Aturan:
- Jangan mengubah arti keluhan.
- Jawab dalam bahasa Indonesia.
- Keluhan asli ada di antara penanda <keluhan> dan </keluhan>.

<keluhan>
Saya memesan kursi pada 2 Oktober, jadwal pengiriman 5 Oktober, tapi sudah lewat
seminggu belum ada kabar. Sudah menghubungi CS tiga kali tidak dijawab.
</keluhan>
```

## Miskonsepsi umum pemula

1. **"Prompt makin panjang makin bagus."** Panjang tidak sama dengan jelas. Prompt 500 kata yang bertele-tele justru membingungkan AI. Yang penting setiap bagian punya tujuan: peran, tugas, konteks, format. Buang kalimat yang tidak menambah info.

2. **"AI bisa membaca pikiran saya, jadi tidak perlu dijelaskan."** AI hanya tahu apa yang kamu tulis. Kalau kamu tidak sebutkan bahwa pembacanya anak SD, bahwa nada harus formal, atau bahwa datanya tahun 2024, AI akan menebak — dan tebakannya sering bukan yang kamu mau.

3. **"Prompt sekali coba langsung sempurna."** Hampir selalu butuh iterasi. Prompt pertama adalah draft; lihat hasilnya, lalu perbaiki (tambah contoh, persempit format, minta nada tertentu). Ini normal, bukan tanda kamu gagal.

4. **"Basa-basi sopan seperti 'tolong' dan 'terima kasih' bikin AI lebih pintar."** Kesopanan tidak salah, tapi yang menentukan hasil adalah kejelasan instruksi, bukan kata sapaan. Fokuskan energimu pada memperjelas tugas dan format, bukan pada menambahkan pujian.

5. **"Temperature tinggi bikin AI lebih pintar."** Temperature tidak menambah kepintaran, hanya menambah keacakan. Untuk jawaban faktual (angka, fakta, coding) pakai renda; untuk ide kreatif (cerita, slogan, variasi ide) baru naikkan.

6. **"Few-shot selalu lebih baik daripada zero-shot."** Tidak selalu. Untuk tugas sederhana, zero-shot sudah cukup dan lebih cepat. Bahkan contoh few-shot yang jelek atau tidak konsisten bisa menyesatkan AI ke pola yang salah — jadi pastikan contohmu benar dan seragam.

## Draft kuis

> Indeks jawaban benar dihitung dari 0 (A=0, B=1, C=2, D=3).

**1. Apa itu prompt?**
- A. Nama lain dari aplikasi AI
- B. Teks atau perintah yang kamu tulis untuk AI
- C. Tombol pengatur kecepatan AI
- D. Jenis bahasa pemrograman

Jawaban benar: indeks 1 (B)
Pembahasan: Prompt adalah semua teks yang kamu sampaikan ke AI; bisa pertanyaan, perintah, atau data. Bukan aplikasi, tombol, maupun bahasa pemrograman.

**2. Mana yang BUKAN bagian dari anatomi prompt yang baik?**
- A. Peran
- B. Tugas
- C. Warna tulisan
- D. Format output

Jawaban benar: indeks 2 (C)
Pembahasan: Anatomi prompt yang baik mencakup peran, tugas, konteks, dan format. Warna tulisan tidak ada hubungannya dengan isi prompt.

**3. Apa bedanya zero-shot dan few-shot?**
- A. Zero-shot pakai contoh, few-shot tidak
- B. Zero-shot tanpa contoh, few-shot dengan beberapa contoh
- C. Keduanya sama saja
- D. Zero-shot hanya untuk angka

Jawaban benar: indeks 1 (B)
Pembahasan: Zero-shot berarti kamu langsung memberi perintah tanpa contoh, sedangkan few-shot menyertakan beberapa contoh dulu agar AI meniru polanya.

**4. Kapan kamu sebaiknya menambahkan "berpikir langkah demi langkah" (chain-of-thought)?**
- A. Saat ingin jawaban satu kata saja
- B. Saat tugas butuh penalaran seperti hitungan atau logika
- C. Saat AI error
- D. Saat ingin jawaban lebih pendek

Jawaban benar: indeks 1 (B)
Pembahasan: Chain-of-thought membantu tugas yang butuh penalaran bertahap, misalnya hitungan dan analisis, sehingga jawaban lebih akurat dan bisa dicek.

**5. Apa fungsi delimiter (seperti tanda ### atau tag `<teks>`)?**
- A. Menghias tampilan jawaban
- B. Memisahkan instruksi dari data agar tidak tertukar
- C. Mempercepat koneksi internet
- D. Mengganti bahasa AI

Jawaban benar: indeks 1 (B)
Pembahasan: Delimiter menandai batas antara instruksi dan data/teks yang diolah, sehingga AI tidak salah membaca mana perintah mana isi.

**6. Kalau kamu ingin jawaban yang konsisten dan faktual, temperature sebaiknya...**
- A. Rendah (mendekati 0)
- B. Tinggi
- C. Tidak ada pengaruh
- D. Selalu 100

Jawaban benar: indeks 0 (A)
Pembahasan: Temperature rendah membuat AI memilih jawaban paling mungkin secara konsisten — cocok untuk fakta dan angka. Temperature tinggi menambah keacakan/kreativitas.

**7. Mana contoh perintah yang paling baik?**
- A. "Bikin caption."
- B. "Tolong bikin sesuatu yang bagus."
- C. "Kamu copywriter. Buat 3 caption Instagram promosi kopi susu, maksimal 15 kata, nada ceria, sertakan 3 hashtag."
- D. "Caption dong yang viral."

Jawaban benar: indeks 2 (C)
Pembahasan: Opsi C jelas soal peran, tugas, jumlah, batasan, nada, dan format. Opsi lain terlalu kabur sehingga AI menebak-nebak.

**8. Sikap yang benar saat hasil prompt pertama kurang memuaskan adalah...**
- A. Menyerah dan menganggap AI tidak bisa
- B. Menghapus aplikasi
- C. Memperbaiki prompt sedikit-demi-sedikit lalu coba lagi
- D. Mengirim prompt yang sama berulang-ulang tanpa perubahan

Jawaban benar: indeks 2 (C)
Pembahasan: Prompt pertama adalah draft. Cara terbaik adalah mengiterasi: perbaiki kejelasan tugas, tambah contoh, atau persempit format, lalu uji lagi.

## Flashcard

- **Prompt** -> Semua teks atau perintah yang kamu tulis ke AI, mulai dari pertanyaan pendek sampai cerita panjang.

- **Prompt Engineering** -> Cara menulis prompt yang jelas dan terarah supaya AI memberi hasil yang sesuai keinginanmu secara konsisten.

- **Peran (Role)** -> Bagian prompt yang menentukan AI harus bersikap sebagai siapa, misalnya "kamu guru" atau "kamu editor".

- **Konteks** -> Info latar belakang yang kamu beri ke AI (siapa pembacanya, untuk apa, situasinya) karena AI tidak tahu kalau tidak diberi tahu.

- **Format Output** -> Bentuk jawaban yang kamu minta, misalnya poin-poin, tabel, atau paragraf pendek.

- **Zero-shot** -> Memberi perintah ke AI tanpa satu pun contoh.

- **Few-shot** -> Memberi beberapa contoh dulu di dalam prompt supaya AI meniru pola yang kamu mau.

- **Chain-of-Thought** -> Teknik meminta AI "berpikir langkah demi langkah" agar jawaban penalaran/hitungan lebih akurat.

- **System Prompt** -> Instruksi dasar yang dipasang lebih dulu dan berlaku terus sepanjang percakapan, seperti peraturan rumah.

- **Delimiter** -> Tanda pemisah (misalnya tanda kutip, `###`, atau tag `<teks>`) untuk menandai mana instruksi mana data.

- **Temperature** -> Tombol pengatur keacakan jawaban: rendah = konsisten/faktual, tinggi = variatif/kreatif.

- **Output Terstruktur** -> Jawaban AI yang dipaksa ikut pola tertentu (misalnya JSON atau tabel) agar mudah diolah komputer.

- **Iterasi Prompt** -> Perbaikan prompt secara bertahap berdasarkan hasil sebelumnya, karena prompt pertama biasanya belum sempurna.

- **Token** -> Pecahan teks (bisa kata, suku kata, atau tanda) yang dihitung AI; menentukan seberapa panjang input yang bisa AI tangani. *(flashcard bonus)*

## Sumber

- Prompt engineering — OpenAI (dokumentasi resmi) — https://platform.openai.com/docs/guides/prompt-engineering
- Prompt engineering overview — Anthropic / Claude (dokumentasi resmi) — https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- Prompting best practices — Anthropic / Claude (dokumentasi resmi) — https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompting-best-practices
- Prompt engineering techniques — Microsoft Learn / Azure OpenAI (dokumentasi resmi) — https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/prompt-engineering
- Advanced prompt engineering — Microsoft Learn / Azure OpenAI (dokumentasi resmi) — https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/advanced-prompt-engineering
- Structured Outputs — OpenAI (dokumentasi resmi) — https://platform.openai.com/docs/guides/structured-outputs
- Elements of a Prompt — Prompt Engineering Guide (DAIR.AI) — https://www.promptingguide.ai/introduction/elements
- LLM Settings (Temperature) — Prompt Engineering Guide (DAIR.AI) — https://www.promptingguide.ai/introduction/settings
- Zero-shot Prompting — Prompt Engineering Guide (DAIR.AI) — https://www.promptingguide.ai/techniques/zeroshot
- Few-shot Prompting — Prompt Engineering Guide (DAIR.AI) — https://www.promptingguide.ai/techniques/fewshot
- Chain-of-Thought Prompting — Prompt Engineering Guide (DAIR.AI) — https://www.promptingguide.ai/techniques/cot
- Instructions (Dasar Prompting) — Learn Prompting — https://learnprompting.org/docs/basics/instructions
- Chain-of-Thought (Intermediat) — Learn Prompting — https://learnprompting.org/docs/intermediate/chain_of_thought
