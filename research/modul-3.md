# Modul 3 — AI Agents (Riset Materi, Bahasa Awam)

> Catatan untuk penulis materi: ini bahan mentah riset. Semua sumber di bagian akhir sudah dicek bisa diakses (status HTTP 200) sebelum ditulis di sini. Istilah teknis sengaja dijelaskan pakai analogi sehari-hari supaya pembaca non-teknis nyambung.

## Konsep inti

**1. Chatbot vs Agent — beda di "bisa ngapain".**
Chatbot itu tukang jawab: kamu tanya, dia balas teks, selesai. Agent itu asisten yang boleh *melakukan* sesuatu — buka file, cari di internet, kirim email, jalankan kode. Analoginya: chatbot seperti resepsionis yang cuma kasih info; agent seperti asisten pribadi yang bisa angkat telepon, pesan tiket, dan atur jadwal buat kamu. Anthropic membedakannya begini: kalau langkah-langkahnya sudah ditentukan kode (workflow), itu bukan agent; kalau model yang memutuskan sendiri langkah berikutnya, itu agent.

**2. Tool use / function calling — cara agent "menyentuh" dunia luar.**
Kamu memberi model sebuah daftar alat: nama alat, deskripsi fungsinya, dan bentuk data yang dia butuh (misalnya "cari_cuaca" butuh "nama_kota"). Model tidak menjalankan alatnya sendiri; dia cuma bilang "tolong panggil alat ini dengan data ini", lalu aplikasi kamu yang mengeksekusi dan mengirim hasilnya balik. Analoginya: kamu kasih asisten daftar nomor yang boleh dia telepon — dia nunjuk nomor mana yang mau dipakai, kamu yang menyambungkan. Sebagian alat dikerjakan di aplikasi kita (client tools), sebagian disediakan langsung oleh penyedia model (server tools, misal pencarian web).

**3. Loop ReAct (reason → act → observe) — jantungnya agent.**
Agent bekerja dalam putaran: **pikir** (apa yang harus kulakukan?), **aksi** (pakai satu alat), **lihat hasil** (berhasil atau gagal?), lalu ulangi. Istilah ReAct berasal dari paper tahun 2022 yang menggabungkan "reasoning" dan "acting" secara bergantian. Analoginya seperti masak sambil mencicipi: tiap suapan (observe) menentukan langkah berikutnya — tambah garam, kecilkan api, atau angkat. Justru karena tiap putaran melihat hasil nyata, agent bisa memperbaiki diri saat salah, bukan ngotot menebak.

**4. Memory — ingatan jangka pendek vs jangka panjang.**
Ingatan jangka pendek = riwayat percakapan di sesi ini (percakapan ini saja). Ingatan jangka panjang = catatan yang disimpan ke database lalu diambil lagi di sesi lain (nama kamu, preferensi kamu, hasil kerja sebelumnya). Analoginya: papan tulis di ruangan (jangka pendek, dihapus tiap rapat) vs buku harian (jangka panjang, dibuka lagi kapan pun). Karena "ruang konteks" model itu terbatas, ingatan jangka panjang sering diringkas dulu sebelum dimasukkan.

**5. Planning — mecah tujuan besar jadi langkah kecil.**
Sebelum bergerak, agent biasanya bikin rencana: "untuk bikin laporan ini aku perlu (a) cari data, (b) rangkum, (c) tulis, (d) cek ulang". Satu pola populernya disebut orchestrator-workers: ada satu "otak pusat" yang mecah tugas lalu membagikannya ke beberapa pekerja, dan menyatukan hasilnya di akhir. Analoginya: kepala proyek bikin to-do list lalu membagi pekerjaan ke anggota tim, bukan semua orang bingung kerja sendiri-sendiri.

**6. Multi-agent orchestration — beberapa agent kerja bareng.**
Alih-alih satu agent serba bisa, kamu bisa punya tim: si peneliti cari bahan, si penulis menyusun, si pemeriksa mengoreksi. CrewAI memandang ini seperti "crew" (kru) dengan peran dan tugas; AutoGen lebih fokus ke agent-agent yang saling ngobrol untuk menyelesaikan masalah. Analoginya: tim proyek sungguhan dengan jobdesk masing-masing — lebih rapi, tapi juga lebih boros tenaga (biaya) kalau berlebihan.

**7. MCP (Model Context Protocol) — colokan universal untuk AI.**
MCP itu standar terbuka supaya aplikasi AI bisa nyambung ke data dan alat di mana saja, tanpa bikin koneksi khusus satu per satu. Analoginya persis USB-C: dulu tiap perangkat punya colokan sendiri, sekarang satu jenis colokan bisa dipakai ke banyak alat. Secara teknis MCP memakai pola client–server (pesan JSON-RPC); server MCP menawarkan tiga hal: *Resources* (data), *Prompts* (template perintah), dan *Tools* (fungsi yang bisa dijalankan). Sekali dibuat, satu server MCP bisa dipakai di banyak aplikasi AI yang mendukung standar ini.

**8. Risiko agent — powerful, tapi bisa kebablasan.**
Karena agent boleh mengambil aksi nyata, risikonya juga nyata: (a) **loop liar** — dia berputar tanpa henti, jadi biasanya dipasang batas maksimal putaran; (b) **biaya membengkak** — tiap putaran memanggil model, makin banyak putaran makin mahal; (c) **salah aksi** — salah hapus, salah kirim, salah transfer; (d) **prompt injection** — teks jahat yang "menyusup" lewat data/website yang dibaca agent bisa membelokkan perintahnya. Obatnya: batas putaran, izin manusia di titik kritis (human-in-the-loop), sandbox, dan catatan (log) tiap aksi.

## Contoh praktis

**1. Asisten riset otomatis.**
Kamu minta: "carikan harga tiket Jakarta–Bali minggu depan dan rangkum". Agent memakai alat pencarian web, membuka beberapa halaman, mencatat angka, lalu menulis ringkasan ke sebuah file. Ini contoh kelasik "agent + alat + loop": cari → baca → simpulkan → tulis, ulang sampai cukup.

**2. Agent layanan pelanggan (customer support).**
Agent bisa masuk ke sistem order: cek status pesanan, cek kebijakan refund, dan — kalau diizinkan — memproses pengembalian dana. Karena menyangkut uang, bagian refund biasanya wajib lewat persetujuan manusia. Contoh system instruction dengan "pagar pengaman":

```text
Kamu adalah asisten layanan pelanggan "TokoKu".
Tugasmu: bantu pelanggan cek status pesanan dan proses refund.

Alat yang tersedia:
- cek_pesanan(id_pesanan)  -> mengembalikan status & tanggal kirim
- cek_kebijakan_refund()    -> mengembalikan aturan refund
- ajukan_refund(id_pesanan) -> HANYA boleh dipanggil setelah 2 hal terpenuhi:
      1) pesanan sudah lewat 7 hari dan belum diterima, dan
      2) pelanggan sudah menyetujui nominal yang akan dikembalikan.

Aturan wajib:
- Jangan pernah mengarang status pesanan. Selalu panggil cek_pesanan dulu.
- Sebelum ajukan_refund, ringkas ke pelanggan apa yang akan dilakukan dan
  minta konfirmasi "YA".
- Kalau ragu atau data tidak lengkap, berhenti dan tanyakan ke pelanggan.
```

**3. Coding agent.**
Alat seperti Claude Code atau Cursor bisa membaca banyak file di proyek, mengedit kode, menjalankan tes, membaca pesan error, lalu memperbaiki sendiri — berulang sampai tes hijau. Ini contoh loop ReAct yang sangat kentara: pikir → edit → jalankan → baca hasil → perbaiki. Risiko salah aksi (misal menghapus file penting) ditanggung karena itu aksinya dibatasi dan sering ada opsi "minta izin dulu".

**4. Tim multi-agent bikin laporan.**
Dengan CrewAI kamu bisa merangkai tiga peran: *Peneliti* mengumpulkan data, *Penulis* menyusun draf, *Editor* memeriksa dan menyempurnakan. Atau dengan AutoGen, dua agent "saling ngobrol" — satu sebagai penyusun, satu sebagai pengkritik — sampai hasilnya dinilai bagus. Pola ini cocok untuk tugas yang butuh banyak sudut pandang.

**5. Agent operasional harian (contoh prompt singkat).**
Bayangkan agent yang disambungkan ke kalender dan email lewat server MCP. Contoh instruksi ringkas:

```text
Kamu adalah asisten jadwal pribadi.
Setiap pagi, lakukan hal berikut lalu berhenti:
1. Baca kalender hari ini.
2. Kalau ada rapat < 2 jam lagi dan belum ada pengingat, buat pengingat.
3. Kirim satu ringkasan singkat ke email saya dengan format:
   "Hari ini: <daftar acara + jam>".
Jangan mengubah atau menghapus acara apa pun tanpa persetujuan saya.
```

## Miskonsepsi umum pemula

- **"Agent = chatbot yang lebih pintar."** Bukan soal kepintaran, tapi soal *kemampuan bertindak*. Chatbot mengeluarkan kata-kata; agent bisa memakai alat dan mengubah keadaan di luar (file, pesanan, email). Chatbot versi pintar pun tetap chatbot kalau tidak punya alat.
- **"Agent itu otonom total, tinggal ditinggal tidur."** Agent tetap butuh pengawasan. Praktik terbaik justru menaruh izin manusia di titik berisiko dan memasang batas putaran, supaya dia tidak keliling tanpa arah. Semakin bebas agent, semakin wajib ada pagar pengaman.
- **"Makin banyak alat, makin sakti."** Justru sebaliknya — Anthropic menekankan bahwa alat yang terlalu banyak dan tumpang tindih bikin model bingung memilih. Lebih baik sedikit alat tapi jelas nama, deskripsi, dan cara pakainya.
- **"Harus pakai framework (LangChain, CrewAI, dll.) baru bisa bikin agent."** Framework memang memudahkan, tapi banyak pola agent bisa dibuat cuma dengan beberapa baris kode memanggil API model langsung. Framework menambah lapisan abstraksi yang — kalau tidak dipahami — malah menyulitkan saat ada bug.
- **"MCP itu produk AI atau tool baru."** MCP bukan AI dan bukan alat; dia adalah *protokol/standar koneksi* (seperti USB-C), bukan otaknya. Yang pintar tetap modelnya; MCP cuma cara menyambungkannya ke data/tool.
- **"Kalau ada agent, semua tugas jadi lebih baik."** Untuk banyak tugas, satu panggilan model + pencarian dokumen (RAG) sudah sangat cukup dan jauh lebih murah/cepat. Agent sebaiknya dipakai saat jumlah langkahnya tidak bisa diprediksi di depan, bukan sekadar karena keren.

## Draft kuis

**1. Apa pembeda utama antara chatbot biasa dan AI agent?**
- A. Agent selalu lebih panjang jawabannya
- B. Agent bisa memakai alat untuk mengambil tindakan, bukan cuma membalas teks
- C. Agent tidak perlu koneksi internet
- D. Agent selalu gratis

*Jawaban: B (indeks 1).* Agent punya kemampuan memanggil alat dan mengubah keadaan di luar, sedangkan chatbot terbatas pada teks balasan.

**2. Dalam tool use / function calling, siapa yang benar-benar MENJALANKAN fungsi tersebut?**
- A. Model AI-nya sendiri
- B. Pengguna yang mengetik jawabannya
- C. Aplikasi/kode yang kita bangun, setelah model "meminta" pemanggilan
- D. Sistem operasi komputer

*Jawaban: C (indeks 2).* Model hanya mengembalikan permintaan terstruktur (nama alat + data); eksekusi nyata ada di aplikasi kita.

**3. Loop ReAct sering disingkat sebagai...**
- A. read–answer–close
- B. reason–act–observe (pikir–aksi–lihat hasil)
- C. run–apply–check
- D. recall–analyze–test

*Jawaban: B (indeks 1).* ReAct menjalin penalaran (reason) dan tindakan (act) bergantian, lalu hasilnya diamati (observe) untuk menentukan langkah berikutnya.

**4. Apa bedanya ingatan jangka pendek dan jangka panjang pada agent?**
- A. Tidak ada bedanya sama sekali
- B. Jangka pendek untuk sesi percakapan ini; jangka panjang disimpan dan diambil lagi di sesi lain
- C. Jangka pendek lebih akurat karena diawasi manusia
- D. Jangka panjang dipakai hanya saat internet mati

*Jawaban: B (indeks 1).* Jangka pendek = riwayat percakapan sesi ini, jangka panjang = catatan tersimpan yang bisa dipakai lagi nanti.

**5. Analogi "USB-C untuk AI" paling tepat menggambarkan apa?**
- A. Model bahasa yang paling besar
- B. MCP (Model Context Protocol) sebagai standar menyambungkan AI ke data/tool
- C. Kecepatan internet
- D. Ukuran memori agent

*Jawaban: B (indeks 1).* MCP adalah protokol terbuka yang menstandarkan koneksi AI ke banyak sumber data dan alat, mirip satu jenis colokan universal.

**6. Kesalahan paling umum soal jumlah tool pada agent adalah...**
- A. Terlalu sedikit tool selalu bikin agent gagal
- B. Tool harus ditulis dalam bahasa Inggris
- C. Terlalu banyak tool yang tumpang tindih membuat model bingung memilih
- D. Tool tidak boleh punya deskripsi

*Jawaban: C (indeks 2).* Alat yang berlebihan dan mirip-mirip malah mengaburkan pilihan; kurasi tool yang jelas lebih baik.

**7. Manakah risiko nyata dari agent yang berjalan bebas?**
- A. Loop liar, biaya membengkak, dan salah aksi
- B. Warna antarmuka berubah
- C. Keyboard jadi lebih cepat
- D. Baterai ponsel terisi penuh

*Jawaban: A (indeks 0).* Karena agent benar-benar bertindak, tanpa batas putaran dan pengawasan dia bisa berputar terus, memakan biaya, atau melakukan aksi yang salah.

**8. Menurut praktik yang direkomendasikan, kapan sebaiknya memakai agent dan bukan sekadar satu panggilan biasa?**
- A. Untuk semua tugas, karena agent selalu lebih baik
- B. Hanya kalau tugasnya sangat singkat
- C. Saat jumlah/langkah yang dibutuhkan tidak bisa diprediksi sebelumnya dan tugasnya terbuka
- D. Saat tidak ada anggaran biaya

*Jawaban: C (indeks 2).* Agent unggul untuk masalah terbuka yang jalurnya tak bisa dipatok di depan; untuk tugas sederhana, satu panggilan + retrieval biasanya lebih hemat dan cukup.

## Flashcard

- **AI Agent** → Sistem AI yang tidak cuma menjawab, tapi bisa memakai alat untuk mengambil tindakan dan menyelesaikan tugas.
- **Chatbot** → Program yang hanya membalas teks berdasarkan pertanyaan; tidak punya kemampuan bertindak di luar percakapan.
- **Tool use / Function calling** → Kemampuan model "meminta" aplikasi menjalankan fungsi tertentu dengan data yang dia tentukan.
- **ReAct loop** → Pola kerja agent: pikir (reason) → bertindak (act) → lihat hasil (observe) → ulangi.
- **Memory (jangka pendek)** → Ingatan sebatas sesi percakapan yang sedang berlangsung.
- **Memory (jangka panjang)** → Catatan yang disimpan di penyimpanan lalu dimuat kembali di sesi lain.
- **Planning** → Kemampuan agent memecah tujuan besar menjadi langkah-langkah kecil sebelum bertindak.
- **Multi-agent orchestration** → Mengatur beberapa agent dengan peran berbeda agar bekerja sama menyelesaikan tugas.
- **MCP (Model Context Protocol)** → Standar terbuka "USB-C"-nya AI untuk menyambung ke data dan alat di mana saja.
- **MCP Resources / Prompts / Tools** → Tiga hal yang bisa ditawarkan server MCP: data, template perintah, dan fungsi yang bisa dijalankan.
- **Prompt injection** → Serangan berupa teks jahat yang menyusup lewat data yang dibaca agent untuk membelokkan perintahnya.
- **Human-in-the-loop** → Menyisipkan persetujuan manusia di titik-titik berisiko sebelum agent melanjutkan aksinya.

## Sumber

Semua tautan di bawah sudah dicek bisa diakses (HTTP 200) saat riset ini disusun.

**Dokumentasi resmi:**
1. What is the Model Context Protocol (MCP)? — https://modelcontextprotocol.io/docs/getting-started/intro *(dokumentasi resmi MCP)*
2. Specification — Model Context Protocol — https://modelcontextprotocol.io/specification/2025-06-18 *(dokumentasi resmi MCP)*
3. Security Best Practices — Model Context Protocol — https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices *(dokumentasi resmi MCP)*
4. Tool use with Claude — https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview *(dokumentasi resmi Anthropic/Claude)*
5. LangChain overview — https://docs.langchain.com/oss/python/langchain/overview *(dokumentasi resmi LangChain)*
6. LangGraph overview — https://docs.langchain.com/oss/python/langgraph/overview *(dokumentasi resmi LangChain)*
7. LlamaIndex Framework (Home) — https://docs.llamaindex.ai/en/stable/ *(dokumentasi resmi LlamaIndex)*
8. Introduction — CrewAI — https://docs.crewai.com/introduction *(dokumentasi resmi CrewAI)*
9. AutoGen — https://microsoft.github.io/autogen/stable/ *(dokumentasi resmi Microsoft AutoGen)*
10. Function calling — OpenAI API — https://developers.openai.com/api/docs/guides/function-calling *(dokumentasi resmi OpenAI)*
11. Agents — OpenAI API — https://platform.openai.com/docs/guides/agents *(dokumentasi resmi OpenAI)*

**Artikel/panduan resmi (engineering blog):**
12. Building Effective AI Agents — Anthropic — https://www.anthropic.com/engineering/building-effective-agents *(resmi, Anthropic Engineering)*
13. Writing effective tools for AI agents — Anthropic — https://www.anthropic.com/engineering/writing-tools-for-agents *(resmi, Anthropic Engineering)*
14. Effective context engineering for AI agents — Anthropic — https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents *(resmi, Anthropic Engineering)*

**Paper akademik:**
15. ReAct: Synergizing Reasoning and Acting in Language Models — https://arxiv.org/abs/2210.03629
