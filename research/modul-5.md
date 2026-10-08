# Modul 5 — Monetisasi Produk AI

> Catatan riset untuk "AI Mastery ID". Level: pemula non-teknis. Bahasa santai.
> Semua tautan di bagian **Sumber** sudah dicek bisa dibuka saat riset ini dibuat.

## Konsep inti

1. **Orang membeli hasilnya, bukan teknologi AI-nya.** Pelanggan tidak peduli kamu pakai model apa; mereka peduli masalah mereka selesai. Analoginya seperti beli kamera: orang beli karena ingin foto bagus, bukan karena suka bentuk lensanya. Jadi selalu tanya "masalah siapa yang kubantu selesai?", bukan "AI-ku canggih apa?".

2. **Ada lima jalur monetisasi yang paling umum.** (a) *SaaS / micro-SaaS* — jual akses software berlangganan; (b) *jasa & agency* — kerjakan pekerjaan AI untuk klien; (c) *jual template/prompt* — jual paket siap pakai; (d) *konten* — jual edukasi, kelas, atau komunitas; (e) *API wrapper* — bungkus API AI mentah jadi alat siap pakai. Pemula biasanya paling cepat dapat uang dari jasa, lalu berkembang ke produk.

3. **Micro-SaaS = warung spesialis, bukan supermarket.** Micro-SaaS adalah software kecil yang menyelesaikan SATU masalah spesifik, bisa diurus satu-dua orang, biaya operasional rendah. Contoh: alat pembuat caption khusus toko kue. Fokus sempit justru membuatmu mudah ditemukan dan mudah dipercaya.

4. **Model harga itu ada tiga gaya, pilih sesuai kebiasaan pelanggan.** *Langganan* = bayar tetap tiap bulan (seperti Netflix). *Kredit* = beli paket lalu dipakai (seperti beli pulsa/koin game). *Pay-per-use* = bayar sesuai pemakaian (seperti token listrik atau parkir per jam). Kalau fiturmu berat biaya AI, kredit/pay-per-use lebih aman daripada langganan flat.

5. **Biaya API AI dihitung per token, dan input beda harga dengan output.** Token itu pecahan kata; tiap interaksi menambah biaya. Harga input, output, dan "cache" (teks yang disimpan agar lebih murah) biasanya berbeda-beda per model. Harga jual HARUS jauh di atas biaya token + biaya payment gateway + biaya operasional. Margin sehat untuk produk AI minimal beberapa kali lipat biaya langsungnya, bukan cuma beda tipis.

6. **Kanal akuisisi: pilih satu dulu, jangan semua sekaligus.** *Product Hunt* untuk peluncuran ke komunitas produk global, *TikTok/X* untuk konten demo yang bikin penasaran, dan *komunitas* (grup Facebook/WA, Discord, forum, subreddit niche) untuk jualan lewat kepercayaan. Fokus di satu kanal yang paling pas dengan orang yang mau kamu bantu.

7. **Payment gateway Indonesia itu ada dua kelompok.** Kelompok lokal: **Midtrans** dan **Xendit** menerima banyak metode (transfer bank, e-wallet, QRIS, kartu); **Mayar** unggul untuk yang anti-koding (landing page, checkout 1 klik, manajemen order). Kelompok internasional: **Lemon Squeezy** dan **Stripe** cocok kalau pembeli dari luar negeri. Analoginya seperti kasir toko — pilih yang pembelinya nyaman.

8. **Legal & pajak dasar untuk perorangan: mulai boleh, tapi catat dan tahu aturannya.** Usaha perorangan tidak wajib langsung jadi PT. Tapi pendapatan usaha tetap objek pajak. Pelaku UMKM umumnya dikenai **PPh Final 0,5%** dari omzet (dengan batas omzet tertentu yang bebas pajak), dan **PPN** berlaku kalau status/tresholdmu sudah memenuhi syarat. Kalau jual ke luar negeri lewat platform seperti Lemon Squeezy, pajak pembeli biasanya diurus platform sebagai *Merchant of Record*.

## Contoh praktis

**1. Micro-SaaS array (caption + jadwal posting) untuk UMKM kuliner.**
Bikin alat sederhana: pemilik warung upload foto makanan → AI bikin caption + hashtag + jadwal posting seminggu. Harga: langganan Rp49.000/bulan atau paket kredit.
*Langkah pertama:* wawancarai 5 pemilik warung sebelum bikin apa-apa — tanya "berapa lama kamu mikir caption?" dan "pernah bayar orang buat ini?".

**2. Jasa "AI Content Package" untuk brand lokal.**
Paket: 12 artikel + 30 caption + 10 ide thumbnail per bulan, dikerjakan pakai AI lalu kamu rapikan. Cocok buat yang belum mau belajar tools sendiri.
*Langkah pertama:* buat 1 paket contoh GRATIS untuk 1 klien, minta testimoni, pakai testimoni itu untuk jual ke klien berikutnya.

**3. Jual template & prompt siap pakai.**
Paket prompt + template (Notion/Canva/Spreadsheet) untuk niche tertentu: guru bikin soal, HR bikin job desc, seller bikin deskripsi produk.
*Langkah pertama:* buat 1 paket kecil (10 prompt), jual Rp25.000 lewat Mayar atau Lemon Squeezy, lihat apakah ada yang beli.

**4. API wrapper: bungkus AI jadi alat yang gampang dipakai.**
Contoh: "AI peringkas dokumen" khusus untuk notaris/lawyer, atau "AI balas chat pelanggan" untuk toko online. Kamu tidak bikin AI-nya, kamu bikin tampilan + alur yang mudah.
*Langkah pertama:* hitung dulu biaya token per pemakaian (misal 1 dokumen __ token), pastikan harga jual 5–10x biaya itu.

**5. Konten & komunitas berbayar.**
Buat konten tutorial gratis (TikTok/X/blog), lalu tawarkan kelas mini atau grup komunitas berbayar bulanan.
*Langkah pertama:* posting 10 konten pendek dulu, lihat mana yang paling banyak respons, baru bikin produk lanjutannya.

**6. Bot WhatsApp/Telegram untuk UMKM.**
Bot yang auto-balas pertanyaan umum + rekap pesanan. Nilainya: hemat waktu pemilik toko.
*Langkah pertama:* bikin versi gratisan untuk 1 toko kenalan, catat berapa jam yang dihemat per minggu, jadikan angka itu bahan jualan.

### Prompt riset pasar (contoh, tinggal ganti bagian dalam kurung)

```text
Kamu membantu saya memvalidasi ide produk AI untuk pasar Indonesia.
Ide saya: (tulis ide + target pengguna, misal: alat bikin caption otomatis untuk pemilik warung makan di kota kecil).
Tolong bantu saya:
1. Tuliskan 10 pertanyaan wawancara yang TIDAK menggiring jawaban (fokus ke masalah masa lalu, bukan ke ide saya).
2. Sebutkan 5 asumsi yang paling berisiko salah dari ide ini.
3. Sarankan 3 cara menguji ide ini dalam seminggu dengan biaya di bawah Rp200.000.
Tulis dalam bahasa Indonesia santai, ringkas, dan praktis.
```

```text
Saya mau menentukan harga produk AI saya.
Rincian: (jenis produk), target pengguna: (siapa), perkiraan biaya token per pemakaian: (Rp), biaya payment gateway: (%), tujuan saya: (untung cepat / tumbuh banyak pengguna).
Tolong:
1. Bandingkan 3 opsi model harga (langganan, kredit, pay-per-use) untuk kasus saya.
2. Sebutkan harga wajar dalam Rupiah beserta alasan singkatnya.
3. Tunjukkan skenario di mana saya malah RUGI (biaya lebih besar dari pemasukan) dan cara mencegahnya.
Jawab dalam bahasa Indonesia, pakai angka konkret.
```

## Miskonsepsi umum pemula

1. **"Bikin produk AI = langsung dapat uang otomatis."** Salah. AI-nya bukan masalah sulit; masalah sulitnya adalah menemukan orang yang mau bayar dan mempercayaimu. Tanpa distribusi (calon pembeli tahu produkmu ada), produk sebagus apa pun sepi.

2. **"Semakin murah, semakin banyak yang beli."** Untuk produk AI ini berbahaya. Biaya token jalan terus, jadi harga terlalu murah bisa bikin kamu rugi tiap kali ada yang pakai. Lebih baik harga wajar + nilai jelas daripada murah tapi boncos.

3. **"Token itu gratis / biaya AI nggak penting."** Tiap pemakaian menambah biaya, apalagi fitur yang dipakai berat (baca dokumen panjang, bikin gambar). Harus ada batas pemakaian (limit/kuota) supaya tidak kebobolan.

4. **"Perorangan nggak boleh jualan, harus bikin PT dulu."** Boleh mulai sebagai perorangan. Yang wajib: catat pemasukan, pahami kewajiban pajak (mis. PPh Final UMKM 0,5%), dan jangan campur uang pribadi dengan uang usaha secara sembarangan.

5. **"Langganan selalu paling menguntungkan."** Tergantung pelanggan. Kalau pengguna jarang pakai, mereka lebih suka bayar sesuai pemakaian; kalau kamu yang bayar biaya token, langganan flat malah bisa rugi untuk pengguna berat. Cocokkan model harga dengan kebiasaan pemakaian.

6. **"Kasih gratis (free tier) selamanya biar viral."** Gratis bisa jadi penguras: orang pakai tanpa batas, biaya tokenmu membengkak. Gratis harus dibatasi (kuota kecil, fitur terbatas) atau dijadikan masa uji coba berjangka.

## Draft kuis

> Indeks jawaban memakai basis 0 (0 = opsi A, 1 = opsi B, 2 = opsi C, 3 = opsi D).

**Soal 1.** Dalam jualan produk AI, apa pertanyaan paling penting yang harus kamu jawab dulu?
- A. Model AI apa yang paling baru?
- B. Masalah siapa yang selesai dengan produkku?
- C. Berapa banyak kode yang aku tulis?
- D. Brand-nya terlihat keren atau tidak?
- **Indeks jawaban: 1**
- Pembahasan: Nilai produk datang dari masalah pengguna yang terpecahkan, bukan dari kecanggihan teknologinya.

**Soal 2.** Yang paling tepat menggambarkan *micro-SaaS* adalah…
- A. Software raksasa dengan ratusan fitur
- B. Software kecil yang fokus menyelesaikan satu masalah spesifik
- C. Aplikasi gratis tanpa model bisnis
- D. Jasa desain logo perorangan
- **Indeks jawaban: 1**
- Pembahasan: Micro-SaaS itu sempit dan fokus, cukup diurus satu-dua orang, biaya operasionalnya rendah.

**Soal 3.** Kamu menjual fitur yang memakai banyak token AI dan dipakai berat oleh pelanggan. Model harga mana yang paling aman untukmu?
- A. Langganan flat seharga Rp10.000/bulan tanpa batas
- B. Gratis selamanya
- C. Kredit atau pay-per-use dengan batas kuota
- D. Bayar sekali untuk seumur hidup
- **Indeks jawaban: 2**
- Pembahasan: Kalau biaya token ikut naik seiring pemakaian, model kredit/pay-per-use melindungi marginmu dari pelanggan yang memakai berlebihan.

**Soal 4.** Biaya API AI umumnya dihitung berdasarkan…
- A. Jumlah karyawan tokomu
- B. Token (input dan output, dan keduanya bisa beda harga)
- C. Jumlah follower media sosialmu
- D. Ukuran layar pengguna
- **Indeks jawaban: 1**
- Pembahasan: Pemakaian dihitung per token; harga input, output, dan cache bisa berbeda tiap model.

**Soal 5.** Mana yang BUKAN kelompok payment gateway lokal Indonesia yang lazim?
- A. Midtrans
- B. Xendit
- C. Mayar
- D. Lemon Squeezy
- **Indeks jawaban: 3**
- Pembahasan: Lemon Squeezy adalah platform internasional (umumnya untuk pembeli luar negeri), sementara Midtrans, Xendit, dan Mayar adalah pemain lokal Indonesia.

**Soal 6.** Untuk pelaku UMKM perorangan di Indonesia, tarif PPh Final yang umum berlaku atas omzet usaha adalah…
- A. 0,5%
- B. 5%
- C. 10%
- D. 25%
- **Indeks jawaban: 0**
- Pembahasan: PPh Final untuk UMKM umumnya 0,5% dari omzet, dengan batas omzet tertentu yang bebas pajak.

**Soal 7.** Cara paling tepat memvalidasi ide sebelum membangun produk adalah…
- A. Langsung koding 3 bulan tanpa tanya siapa pun
- B. Ngobrol dengan calon pengguna dan coba jual versi awal dulu
- C. Meniru fitur kompetitor sebanyak mungkin
- D. Menyewa kantor dan cetak kartu nama
- **Indeks jawaban: 1**
- Pembahasan: Validasi lewat wawancara masalah (hindari pertanyaan yang menggiring) dan uji jual murah/cepat sebelum investasi besar.

**Soal 8.** Kalau kamu menjual produk digital ke pembeli luar negeri lewat Lemon Squeezy, pajak (mis. VAT) pembeli umumnya…
- A. Kamu harus urus sendiri satu per satu di tiap negara
- B. Ditangani platform karena Lemon Squeezy berperan sebagai Merchant of Record
- C. Tidak pernah ada pajak untuk transaksi digital
- D. Dibayar oleh bank penerima
- **Indeks jawaban: 1**
- Pembahasan: Sebagai Merchant of Record, Lemon Squeezy mengambil alih urusan pajak penjualan/VAT global saat checkout.

## Flashcard

- **Micro-SaaS** → Versi kecil SaaS (software berlangganan): satu masalah spesifik, satu-dua orang bisa mengelola, biaya rendah.
- **API** → "Jembatan" yang bikin dua sistem ngobrol satu sama lain; kamu kirim permintaan, sistem balas hasil.
- **Token** → Pecahan kata yang dihitung oleh AI; makin banyak dipakai, makin besar biayanya.
- **API wrapper** → Produk jadi lebih mudah dipakai yang membungkus API mentah di belakangnya.
- **Pay-per-use** → Model harga: pelanggan bayar sesuai pemakaian, seperti token listrik.
- **Kredit** → Model harga: pelanggan beli paket kredit lalu dipakai sedikit-sedikit, seperti koin game.
- **Margin** → Selisih antara harga jual dan biaya; margin sehat artinya untungmu cukup jauh di atas biaya token + gateway.
- **Merchant of Record** → Pihak yang menanggung urusan pajak penjualan; kalau jualan lewat Lemon Squeezy, peran ini diambil platform.
- **Product Hunt** → Komunitas peluncuran produk global; produk di-upvote dan bisa jadi "Product of the Day".
- **Payment Gateway** → "Kasir digital" yang memproses pembayaran dari pelanggan ke rekeningmu (Midtrans, Xendit, Mayar, dll).
- **PPh Final UMKM** → Pajak penghasilan final untuk usaha kecil di Indonesia, umumnya 0,5% dari omzet.
- **Validasi ide** → Proses menguji apakah orang mau pakai dan mau bayar, sebelum membangun produk.

## Sumber

- **Midtrans Documentation** (dokumentasi resmi) — https://docs.midtrans.com/
- **Midtrans Payment Link** (dokumentasi resmi) — https://docs.midtrans.com/docs/payment-link-overview
- **Midtrans — Biaya Transaksi** (halaman resmi) — https://midtrans.com/id/biaya
- **Xendit Documentation** (dokumentasi resmi) — https://developers.xendit.co/
- **Xendit — Biaya/Pricing** (halaman resmi) — https://www.xendit.co/id/biaya/
- **Mayar — Situs Resmi** → https://mayar.id/
- **Mayar Docs** (dokumentasi resmi) — https://docs.mayar.id/
- **Lemon Squeezy Documentation** (dokumentasi resmi) — https://docs.lemonsqueezy.com/
- **Lemon Squeezy — Fees** (dokumentasi resmi) — https://docs.lemonsqueezy.com/help/getting-started/fees
- **Lemon Squeezy — Usage-based Billing** (dokumentasi resmi) — https://docs.lemonsqueezy.com/help/products/usage-based-billing
- **Lemon Squeezy — Pricing Models** (dokumentasi resmi) — https://docs.lemonsqueezy.com/help/products/pricing-models
- **Stripe Payments Documentation** (dokumentasi resmi) — https://docs.stripe.com/payments
- **Stripe Billing Documentation** (dokumentasi resmi) — https://docs.stripe.com/billing
- **OpenAI API Pricing** (halaman resmi) — https://openai.com/api/pricing/
- **OpenAI Platform Pricing** (halaman resmi) — https://platform.openai.com/docs/pricing
- **Anthropic Pricing** (halaman resmi) — https://www.anthropic.com/pricing
- **Product Hunt — How to Launch** (panduan resmi) — https://www.producthunt.com/launch
- **Indie Hackers** (komunitas pendiri bisnis online) — https://www.indiehackers.com/
- **DJP — PPh Final UMKM** (sumber resmi pemerintah) — https://www.pajak.go.id/id/pph-final-umkm
- **OnlinePajak — Apa Itu PPh Final?** (media pajak) — https://www.online-pajak.com/tentang-pph-final/apa-itu-pph-final/
- **The Mom Test** (buku validasi ide/pelanggan) — https://www.momtestbook.com/
- **Y Combinator Blog** (artikel startup) — https://blog.ycombinator.com/
