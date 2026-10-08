/* ==========================================================================
   AI Mastery ID — data.js
   Seluruh materi kursus. Semua teks ditulis ulang dengan kata sendiri dari
   sumber yang dicantumkan di akhir tiap modul. Bukan salinan mentah.
   Bentuk data: lihat README.md.
   ========================================================================== */

var COURSE = {
  meta: {
    title: 'AI Mastery ID',
    subtitle: 'Belajar AI dari nol sampai bisa dijual',
    version: '1.0.0'
  },

  modules: [

  /* =====================================================================
     MODUL 1
     ===================================================================== */
  {
    id: 'm1',
    n: 1,
    title: 'AI & LLM Dasar',
    tagline: 'Paham dulu mesinnya bekerja seperti apa, sebelum kamu menyuruhnya bekerja.',
    minutes: 14,
    icon: 'brain',
    intro: 'Sebelum bisa memakai AI dengan pintar, kamu perlu tahu satu hal yang mengubah segalanya: model bahasa tidak mencari jawaban, dia menebak. Begitu kamu paham cara kerjanya, semua keanehan yang kamu lihat — jawaban ngawur yang percaya diri, ingatan yang tiba-tiba hilang — jadi masuk akal dan bisa kamu antisipasi.',

    lessons: [
      {
        t: 'AI, machine learning, dan bedanya',
        p: [
          'AI atau kecerdasan buatan adalah payung besarnya: semua usaha membuat mesin bisa melakukan hal-hal yang biasanya butuh kecerdasan manusia — memahami bahasa, mengenali gambar, mengambil keputusan.',
          'Machine learning adalah <b>cara</b> paling modern untuk mencapai itu. Mesin tidak diberi aturan satu per satu, tapi belajar sendiri dari banyak contoh.',
          'Cara lama: programmer menulis "kalau berbulu dan mengeong maka kucing". Cara ML: kasih mesin puluhan ribu foto kucing, biar dia menyimpulkan sendiri polanya.'
        ],
        analogy: 'anak kecil belajar mengenal kucing bukan dari daftar ciri, tapi dari melihat ratusan kucing sampai dia bisa membedakannya sendiri.'
      },
      {
        t: 'LLM: mesin penebak kata berikutnya',
        p: [
          'LLM (Large Language Model) adalah jenis AI yang khusus jago soal bahasa. Tugas intinya sederhana untuk dijelaskan: dia menebak potongan kata berikutnya yang paling mungkin, lalu mengulanginya.',
          'Dari kebiasaan menebak itu, muncul semua kemampuan yang kita lihat: menjawab pertanyaan, meringkas, menerjemahkan, dan mengarang.',
          'Ini bukan detail teknis yang bisa kamu lewatkan. Karena dia menebak, dia bisa salah dengan sangat meyakinkan — dan tidak ada mekanisme di dalamnya yang otomatis mengecek kebenaran.'
        ],
        analogy: 'autocomplete keyboard di HP-mu, tapi versinya sudah membaca teks internet dalam jumlah raksasa sehingga tebakannya jauh lebih pintar.'
      },
      {
        t: 'Token: balok penyusun teks',
        p: [
          'Model tidak membaca huruf atau kata utuh seperti kita. Teks dipecah dulu jadi token: bisa satu kata penuh, sebagian kata, atau tanda baca.',
          'Kata "tokenization" misalnya dipecah jadi <code>token</code> + <code>ization</code>. Teks Indonesia dan Inggris rata-rata sekitar 1–2 token per kata.',
          'Token penting karena dua hal: dia menentukan seberapa banyak teks yang bisa masuk ke model, dan dia yang dihitung saat kamu membayar API.'
        ],
        analogy: 'kalimat itu seperti bangunan dari balok LEGO; model bekerja menghitung baloknya, bukan membaca bangunannya sebagai satu kesatuan.'
      },
      {
        t: 'Context window: meja kerja yang terbatas',
        p: [
          'Context window adalah jumlah token yang bisa "diingat" model dalam satu percakapan sekaligus — termasuk pesanmu dan jawabannya.',
          'Kalau isinya melebihi ukuran meja, informasi yang paling lama harus disingkirkan. Itu sebabnya model kadang "lupa" hal yang kamu sebut di awal percakapan panjang.',
          'Kontra-intuitif tapi penting: meja yang penuh bukan selalu lebih baik. Terlalu banyak teks tidak relevan justru menurunkan akurasi jawaban.'
        ],
        analogy: 'meja kerja fisik. Mau sebesar apa pun mejanya, kalau kamu taruh semua dokumen sekaligus, yang di belakang jadi sulit ditemukan.'
      },
      {
        t: 'Parameter, training, dan inference',
        p: [
          'Parameter adalah angka-angka internal model — bisa miliaran jumlahnya — yang disetel sendiri selama proses belajar. Ini yang membentuk "pengetahuan" model.',
          'Training adalah masa model belajar dari data raksasa. Prosesnya lama, mahal, butuh banyak komputer, dan dilakukan sekali sebelum model dirilis.',
          'Inference adalah saat model yang sudah jadi dipakai menjawab pertanyaanmu. Ini yang kamu rasakan tiap hari — jauh lebih cepat dan jauh lebih murah per pertanyaan.',
          'Satu hal yang sering salah dipahami: jumlah parameter lebih banyak <b>tidak otomatis</b> berarti lebih pintar. Kualitas data dan cara melatihnya sama menentukan.'
        ]
      },
      {
        t: 'Multimodal, halusinasi, dan batas pengetahuan',
        p: [
          'Model multimodal bisa menerima lebih dari satu jenis input: teks, gambar, sebagian juga suara atau video. Jadi kamu bisa mengirim foto dan bertanya "ini apa?".',
          'Karena tugas intinya menebak teks yang terdengar masuk akal, model kadang mengarang fakta yang salah tapi ditulis dengan sangat percaya diri. Ini disebut <b>hallucination</b>.',
          'Model juga punya knowledge cutoff: batas tanggal sampai kapan dia tahu sesuatu. Kejadian sesudahnya tidak dia ketahui, kecuali aplikasi yang kamu pakai memberinya fitur pencarian web.',
          'Kesimpulan praktisnya: perlakukan AI sebagai asisten pintar yang kadang berhalusinasi, bukan mesin kebenaran. Fakta penting tetap kamu cek.'
        ]
      }
    ],

    examples: [
      {
        label: 'Ringkas teks panjang jadi poin',
        prompt: 'Ringkas artikel di bawah menjadi 5 poin utama.\nAturan:\n- Tiap poin satu kalimat, bahasa Indonesia santai.\n- Tulis angka penting kalau ada.\n- Jangan menambah informasi yang tidak ada di artikel.\n\nArtikel:\n###\n[tempel artikel di sini]\n###',
        note: 'Aturan "jangan menambah informasi" itu penting. Tanpa itu, AI cenderung menambahkan konteks yang tidak ada di sumbernya.'
      },
      {
        label: 'Minta penjelasan versi gampang',
        prompt: 'Jelaskan konsep ini seperti aku anak SMP yang belum pernah belajar soal ini:\n\n###\n[tempel konsep yang kamu tidak paham]\n###\n\nSertakan satu analogi sehari-hari. Kalau ada istilah teknis, jelaskan artinya dalam tanda kurung.',
        note: 'Kalau masih bingung, lanjutkan dengan "jelaskan bagian X lebih pelan lagi, pakai contoh lain".'
      },
      {
        label: 'Analisis gambar atau screenshot (multimodal)',
        prompt: 'Saya lampirkan sebuah gambar.\nTolong:\n1. Jelaskan apa yang kamu lihat.\n2. Kalau ini pesan error, jelaskan penyebabnya dengan bahasa awam.\n3. Sebutkan hal yang perlu saya lakukan berikutnya.\nKalau ada bagian gambar yang tidak jelas, bilang tidak jelas, jangan menebak.',
        note: 'Hanya model yang mendukung gambar yang bisa melakukan ini. Perhatikan kalimat terakhir — itu mencegah AI mengarang detail.'
      },
      {
        label: 'Bandingkan dua model di tugas yang sama',
        prompt: 'Beri pertanyaan yang persis sama ke dua model berbeda, lalu bandingkan jawabannya.',
        note: 'Cara paling cepat merasakan beda gaya dan kualitas tiap model — dan melatih kebiasaan tidak percaya buta pada satu sumber.'
      },
      {
        label: 'Menanyakan sesuatu yang mungkin terbaru',
        bad: 'Siapa pemenang pemilu 2026 di Indonesia?',
        good: 'Siapa pemenang pemilu 2026 di Indonesia?\n\nSetelah menjawab:\n- Sebutkan seberapa yakin kamu.\n- Kalau ini di luar pengetahuanmu atau kamu tidak punya akses informasi terbaru, bilang terus terang "saya tidak tahu" daripada menebak.\n- Sebutkan dari mana informasi ini kalau kamu bisa.',
        why: 'Pertanyaan pertama mengundang tebakan yang ditulis dengan yakin. Versi kedua memberi AI izin untuk mengaku tidak tahu — dan model jauh lebih jarang berhalusinasi kalau diberi izin itu.'
      }
    ],

    mistakes: [
      'Menganggap AI itu mesin pencari. AI tidak mencari dan mengecek; dia menebak dari pola. Untuk fakta, tetap verifikasi di sumber tepercaya.',
      'Menganggap nada percaya diri berarti benar. Kutipan, angka, dan tautan yang terlihat rapi bisa saja karangan. Nada meyakinkan bukan bukti kebenaran.',
      'Menganggap AI benar-benar "memahami" arti kata seperti manusia. Secara teknis dia mengolah pola statistik, bukan memahami makna.',
      'Menganggap model dengan parameter lebih banyak pasti lebih pintar. Model kecil dengan data dan pelatihan bagus bisa mengalahkan model besar yang dilatih sembarangan.',
      'Menganggap AI punya perasaan. Kalimat seperti "maaf" atau "saya senang" adalah hasil pola bahasa, bukan perasaan.',
      'Menganggap pengetahuan AI selalu terbaru. Ada knowledge cutoff. Kejadian sesudahnya tidak diketahui kecuali diberi akses pencarian.'
    ],

    cards: [
      { term: 'AI (Artificial Intelligence)', def: 'Usaha membuat mesin bisa melakukan hal yang biasanya butuh kecerdasan manusia, seperti memahami bahasa atau mengenali gambar.' },
      { term: 'Machine Learning', def: 'Cara AI belajar dari banyak contoh data, bukan diberi aturan satu per satu. Seperti anak belajar mengenal kucing dari banyak foto.' },
      { term: 'LLM (Large Language Model)', def: 'Model AI raksasa yang dilatih dari teks dalam jumlah besar; tugas intinya menebak kata berikutnya. Otak di balik ChatGPT, Claude, dan Gemini.' },
      { term: 'Token', def: 'Potongan kecil teks (kata, sebagian kata, atau tanda baca) yang jadi satuan olahan model. Seperti balok LEGO penyusun kalimat.' },
      { term: 'Context window', def: 'Batas jumlah token yang bisa diingat model dalam satu percakapan. Seperti ukuran meja kerja — kalau penuh, informasi lama tergusur.' },
      { term: 'Parameter', def: 'Angka internal model, bisa miliaran jumlahnya, yang disetel saat pelatihan dan membentuk pengetahuannya.' },
      { term: 'Training', def: 'Masa model belajar dari data raksasa. Lama, mahal, dan dilakukan sekali sebelum dirilis. Seperti bertahun-tahun sekolah.' },
      { term: 'Inference', def: 'Saat model yang sudah jadi dipakai menjawab pertanyaanmu. Ini yang kamu rasakan tiap hari. Seperti masa kerja setelah sekolah.' },
      { term: 'Hallucination', def: 'Saat AI mengarang informasi yang salah tapi ditulis dengan sangat percaya diri. Alasan utama jawaban AI harus dicek.' },
      { term: 'Multimodal', def: 'Kemampuan model menerima lebih dari satu jenis input sekaligus, misalnya teks dan gambar.' },
      { term: 'Knowledge cutoff', def: 'Batas tanggal sampai kapan model tahu sesuatu, ditentukan dari data pelatihannya.' },
      { term: 'Prompt', def: 'Perintah atau pertanyaan yang kamu tulis ke AI. Cara menulisnya sangat menentukan kualitas jawaban.' }
    ],

    quiz: [
      { q: 'Secara inti, apa yang sebenarnya dilakukan sebuah LLM saat menjawab pertanyaanmu?', o: ['Mencari jawaban di internet lalu menyalinnya', 'Menebak potongan teks berikutnya berdasarkan pola yang dipelajarinya', 'Menghubungi manusia sungguhan untuk bertanya', 'Membaca buku fisik dengan kamera'], a: 1, why: 'LLM memprediksi potongan teks berikutnya yang paling mungkin. Kemampuan meringkas, menerjemahkan, dan menjawab muncul dari kebiasaan menebak itu.' },
      { q: 'Apa itu token dalam konteks LLM?', o: ['Kode rahasia untuk membuka model', 'Potongan kecil teks yang jadi satuan olahan model', 'Nama lain untuk kata sandi akunmu', 'Uang virtual untuk membayar langganan'], a: 1, why: 'Model memecah teks jadi token: bisa satu kata, sebagian kata, atau tanda baca. Kata "tokenization" misalnya jadi token + ization.' },
      { q: 'Context window paling mirip dengan apa?', o: ['Ukuran layar HP saat membuka aplikasi', 'Batas jumlah token yang bisa diingat model dalam satu percakapan', 'Kecepatan internet saat memakai AI', 'Nama jendela di browser'], a: 1, why: 'Context window itu meja kerja model. Kalau penuh, informasi paling lama tergusur — itu sebabnya model bisa lupa obrolan awal.' },
      { q: 'Apa itu parameter pada sebuah model?', o: ['Angka-angka yang dipelajari model saat pelatihan dan membentuk pengetahuannya', 'Jumlah pengguna aplikasi', 'Harga langganan per bulan', 'Nama pengembang model'], a: 0, why: 'Parameter adalah angka internal model yang disetel saat training. Tapi jumlah parameter banyak tidak otomatis berarti lebih pintar.' },
      { q: 'Apa beda training dan inference?', o: ['Training dipakai menjawab, inference masa belajar', 'Training masa belajar model, inference saat model dipakai menjawab', 'Keduanya sama saja', 'Training artinya membeli model, inference artinya menghapus model'], a: 1, why: 'Training seperti bertahun-tahun sekolah: lama, mahal, sekali saja. Inference seperti masa kerja: cepat dan relatif murah per pertanyaan.' },
      { q: 'Model menjawab fakta yang salah dengan sangat percaya diri. Ini disebut apa?', o: ['Bug listrik', 'Hallucination', 'Multimodal', 'Inference'], a: 1, why: 'Hallucination adalah saat AI mengarang informasi yang terdengar meyakinkan tapi salah. Karena itu fakta dari AI tetap harus dicek.' },
      { q: 'Multimodal artinya model bisa apa?', o: ['Bekerja tanpa listrik', 'Menerima lebih dari satu jenis input, misalnya teks dan gambar', 'Menjawab dalam banyak bahasa asing', 'Online dan offline bersamaan'], a: 1, why: 'Multimodal berarti model memproses beberapa mode sekaligus. Jadi kamu bisa mengirim foto dan meminta AI menjelaskannya.' },
      { q: 'Kenapa AI kadang tidak tahu kejadian yang baru saja terjadi?', o: ['Karena internetnya mati', 'Karena model punya batas pengetahuan dari tanggal pelatihannya', 'Karena AI sengaja berbohong', 'Karena parameternya terlalu banyak'], a: 1, why: 'Model hanya tahu sampai data terakhir yang dipakai saat training. Kejadian sesudahnya tidak diketahui kecuali model diberi akses pencarian web.' }
    ],

    sources: [
      { title: 'Intro to Claude — dokumentasi resmi Anthropic', url: 'https://docs.anthropic.com/en/docs/overview', official: true },
      { title: 'Context windows — dokumentasi resmi Anthropic', url: 'https://docs.anthropic.com/en/docs/build-with-claude/context-windows', official: true },
      { title: 'Token counting — dokumentasi resmi Anthropic', url: 'https://docs.anthropic.com/en/docs/build-with-claude/token-counting', official: true },
      { title: 'Vision / analisis gambar — dokumentasi resmi Anthropic', url: 'https://docs.anthropic.com/en/docs/build-with-claude/vision', official: true },
      { title: 'Gemini API — dokumentasi resmi Google', url: 'https://ai.google.dev/gemini-api/docs', official: true },
      { title: 'Machine Learning Crash Course — materi resmi Google', url: 'https://developers.google.com/machine-learning/crash-course', official: true },
      { title: 'LLM Course — kursus resmi Hugging Face', url: 'https://huggingface.co/learn/llm-course/chapter1/1', official: true },
      { title: 'What Are Large Language Models? — IBM Think', url: 'https://www.ibm.com/think/topics/large-language-models', official: false },
      { title: 'Hallucination (artificial intelligence) — Wikipedia', url: 'https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)', official: false }
    ]
  },

  /* =====================================================================
     MODUL 2
     ===================================================================== */
  {
    id: 'm2',
    n: 2,
    title: 'Prompt Engineering',
    tagline: 'Model yang sama bisa memberi jawaban jelek atau luar biasa. Bedanya di cara kamu bertanya.',
    minutes: 16,
    icon: 'wand',
    intro: 'Kebanyakan orang menilai AI dari jawaban pertama yang keluar dari prompt satu baris. Padahal prompt itu keterampilan — dan ini keterampilan yang bisa kamu kuasai dalam satu sore. Modul ini membongkar anatomi prompt, tiga teknik inti, lalu cara memperbaiki hasil yang belum pas.',

    lessons: [
      {
        t: 'Prompt itu pesananmu, dan AI itu pelayan yang belum tahu seleramu',
        p: [
          'Prompt adalah semua teks yang kamu tulis ke AI: pertanyaan, perintah, atau cerita panjang. Prompt engineering adalah seni menulis pesanan yang jelas.',
          '"Bikin makanan" itu pesanan buruk. "Nasi goreng, tidak pedas, tanpa telur" itu pesanan bagus. AI-nya sama pintar di kedua kasus; yang berbeda cuma kejelasan pesanannya.',
          'Jadi kalau jawaban AI terasa ngawur, urutan yang benar adalah: periksa promptmu dulu, baru salahkan modelnya.'
        ]
      },
      {
        t: 'Empat bagian prompt yang baik: peran, tugas, konteks, format',
        p: [
          '<b>Peran</b> — kamu menentukan AI harus bersikap sebagai siapa. Contoh: "Kamu editor berita yang menulis untuk pembaca sibuk."',
          '<b>Tugas</b> — apa yang harus dikerjakan. Contoh: "Rangkum artikel di bawah jadi 5 poin."',
          '<b>Konteks</b> — info latar yang AI tidak mungkin tahu sendiri: untuk siapa, untuk keperluan apa, situasinya bagaimana.',
          '<b>Format</b> — bentuk jawaban yang kamu mau: poin, tabel, JSON, maksimal berapa kata, bahasa apa.',
          'Tidak semua prompt butuh keempatnya. Tapi begitu hasilnya belum pas, biasanya salah satu dari empat ini yang hilang.'
        ],
        analogy: 'surat perintah singkat: siapa yang mengerjakan, mengerjakan apa, dengan info apa, hasilnya harus seperti apa.'
      },
      {
        t: 'Zero-shot vs few-shot: tanpa contoh atau pakai contoh',
        p: [
          '<b>Zero-shot</b> berarti kamu langsung memberi perintah tanpa contoh. Cukup untuk tugas yang jelas seperti menerjemahkan.',
          '<b>Few-shot</b> berarti kamu memberi 2–3 contoh dulu supaya AI meniru polanya. Untuk tugas yang polanya khusus — misalnya klasifikasi sentimen dengan gaya penilaianmu sendiri — ini jauh lebih akurat.',
          'Hati-hati: contoh yang tidak konsisten justru menyesatkan. Kalau contoh pertamamu nada formal dan kedua santai, AI akan bingung mau meniru yang mana.',
          'Untuk tugas sederhana, zero-shot sudah cukup dan lebih cepat. Few-shot bukan selalu lebih baik.'
        ],
        analogy: 'mengajari anak. Kadang cukup dibilang sekali, kadang perlu dicontohkan dulu dua-tiga kali.'
      },
      {
        t: 'Chain-of-thought: minta AI berpikir langkah demi langkah',
        p: [
          'Untuk tugas yang butuh nalar — hitungan, logika, analisis bertingkat — tambahkan instruksi seperti "tuliskan langkah berpikirmu dulu, baru jawaban akhirnya".',
          'Hasilnya biasanya lebih akurat karena model tidak melompat langsung ke kesimpulan. Efek sampingnya: kamu bisa mengecek di mana penalarannya mulai salah.',
          'Jangan pakai untuk semua hal. Kalau kamu cuma butuh jawaban satu kata, meminta langkah panjang malah membuang token dan waktu.'
        ],
        analogy: 'guru matematika yang minta kamu menulis caranya, bukan cuma jawaban akhirnya.'
      },
      {
        t: 'System prompt dan delimiter',
        p: [
          '<b>System prompt</b> adalah instruksi dasar yang dipasang lebih dulu dan berlaku sepanjang percakapan. Contoh: "Kamu asisten ramah yang selalu menjawab maksimal 2 kalimat." Ini tidak perlu kamu ulang di setiap pesan.',
          '<b>Delimiter</b> adalah penanda pemisah seperti <code>###</code>, tanda kutip, atau tag <code>&lt;teks&gt;...&lt;/teks&gt;</code>. Fungsinya menandai mana instruksi dan mana data.',
          'Delimiter penting begitu kamu menempel teks panjang. Tanpa pemisah, model bisa salah menangkap bagian mana yang harus dikerjakan dan bagian mana yang cuma isi.'
        ],
        analogy: 'peraturan rumah yang sudah ditempel di pintu (system prompt), dan tanda kutip saat menyitir orang lain supaya tidak tertukar dengan ucapanmu sendiri (delimiter).'
      },
      {
        t: 'Output terstruktur, temperature, dan iterasi',
        p: [
          'Kalau hasil AI mau dimasukkan ke spreadsheet atau aplikasi, jangan biarkan jawabannya bebas. Tentukan bentuknya: "balas hanya dalam tabel dengan kolom Nama, Harga, Rating" atau "balas sebagai JSON".',
          '<b>Temperature</b> mengatur seberapa acak jawaban: rendah berarti konsisten dan faktual, tinggi berarti lebih variatif dan kreatif. Untuk angka dan fakta pakai rendah; untuk ide dan cerita baru naikkan.',
          'Terakhir dan paling penting: prompt pertama hampir selalu belum sempurna. Anggap itu draft. Perbaiki sedikit-sedikit — persempit format, tambah contoh, ganti kata — beberapa putaran biasanya cukup.'
        ]
      }
    ],

    examples: [
      {
        label: 'Merangkum artikel: versi lemah vs versi kuat',
        bad: 'Rangkum ini.\n[tempel artikel]',
        good: 'Kamu editor berita yang menulis untuk pembaca sibuk.\n\nTugas: rangkum artikel di bawah untuk orang yang tidak punya waktu membacanya utuh.\n\nAturan:\n- Maksimal 5 poin, tiap poin 1 kalimat.\n- Bahasa Indonesia, tanpa istilah rumit.\n- Sertakan angka penting bila ada.\n- Jangan menambah informasi di luar artikel.\n\nArtikel:\n###\n[tempel artikel di sini]\n###',
        why: 'Versi pertama tidak memberi tahu panjang, gaya, maupun batasannya. Versi kedua mengunci peran, tugas, aturan, dan memisahkan data dengan delimiter.'
      },
      {
        label: 'Menulis email: versi lemah vs versi kuat',
        bad: 'Bikin email ke bos minta cuti.',
        good: 'Peran: asisten yang menulis email kantor berbahasa Indonesia, sopan tapi tidak kaku.\nTugas: buat draft email meminta cuti 3 hari (12–14 November) kepada atasan.\nKonteks: alasan keluarga, pekerjaan sudah dialihkan ke rekan Budi, minta konfirmasi balasan.\nFormat: sediakan baris subjek + isi email, maksimal 120 kata. Tanda tangan: [Namamu].',
        why: 'Perhatikan bagian Konteks. Info bahwa pekerjaan sudah dialihkan itulah yang membuat emailnya terdengar meyakinkan — AI tidak mungkin tahu itu kalau tidak diberi tahu.'
      },
      {
        label: 'Few-shot: menilai sentimen ulasan',
        prompt: 'Klasifikasikan sentimen ulasan sebagai POSITIF, NEGATIF, atau NETRAL. Ikuti contoh:\n\nUlasan: "Pengiriman cepat, barang sesuai gambar!" -> POSITIF\nUlasan: "Barang rusak dan tidak bisa dipakai." -> NEGATIF\nUlasan: "Sudah sampai, tapi belum saya coba." -> NETRAL\n\nSekarang klasifikasikan:\nUlasan: "Lumayan, cuma agak mahal untuk ukuran segini."\nJawab hanya satu kata.',
        note: 'Tiga contoh sudah cukup untuk mengunci pola. Instruksi "jawab hanya satu kata" mencegah AI menambahkan penjelasan yang tidak kamu minta.'
      },
      {
        label: 'Chain-of-thought: hitungan bertingkat',
        prompt: 'Sebuah toko memberi diskon 20%, lalu PPN 11% dihitung dari harga setelah diskon. Harga awal Rp250.000. Berapa total yang harus dibayar?\n\nJawab dengan langkah berikut:\n1. Hitung harga setelah diskon.\n2. Hitung PPN dari harga itu.\n3. Jumlahkan jadi total akhir.\nTulis tiap langkahnya, baru beri angka akhirnya.',
        note: 'Menyebut langkahnya secara eksplisit lebih andal daripada sekadar bilang "berpikir langkah demi langkah".'
      },
      {
        label: 'Output terstruktur dalam tabel',
        prompt: 'Bandingkan 3 ponsel: iPhone 15, Samsung S24, Pixel 8.\n\nBalas HANYA dalam bentuk tabel dengan kolom persis:\nMerek | Harga Perkiraan | Kamera | Baterai | Cocok Untuk\n\nJangan tambah kalimat pembuka atau penutup.',
        note: 'Kalimat "jangan tambah pembuka atau penutup" itu yang membuat hasilnya benar-benar bisa langsung disalin ke spreadsheet.'
      },
      {
        label: 'Delimiter untuk data panjang',
        prompt: 'Ringkas keluhan pelanggan di bawah menjadi 1 kalimat masalah + 1 kalimat saran tindakan.\n\nAturan:\n- Jangan mengubah arti keluhan.\n- Jawab dalam bahasa Indonesia.\n- Keluhan asli ada di antara penanda <keluhan> dan </keluhan>.\n\n<keluhan>\nSaya memesan kursi pada 2 Oktober, jadwal pengiriman 5 Oktober, tapi sudah lewat seminggu belum ada kabar. Sudah menghubungi CS tiga kali tidak dijawab.\n</keluhan>',
        note: 'Delimiter membuat batas antara instruksi dan data menjadi tidak ambigu — terutama saat teksnya panjang dan berisi kata-kata perintah.'
      }
    ],

    mistakes: [
      'Mengira prompt makin panjang makin bagus. Panjang tidak sama dengan jelas. Prompt 500 kata yang bertele-tele justru membingungkan.',
      'Mengira AI bisa membaca pikiran. AI hanya tahu apa yang kamu tulis — kalau pembacanya anak SD atau nada harus formal, sebutkan.',
      'Mengira sekali coba langsung sempurna. Prompt pertama itu draft; iterasi adalah bagian normal dari prosesnya.',
      'Mengira basa-basi sopan membuat AI lebih pintar. Yang menentukan hasil adalah kejelasan instruksi, bukan kata sapaan.',
      'Mengira temperature tinggi membuat AI lebih pintar. Temperature tidak menambah kepintaran, hanya menambah keacakan.',
      'Mengira few-shot selalu lebih baik. Contoh yang tidak konsisten justru menyesatkan AI ke pola yang salah.'
    ],

    cards: [
      { term: 'Prompt', def: 'Semua teks atau perintah yang kamu tulis ke AI, dari pertanyaan pendek sampai cerita panjang.' },
      { term: 'Prompt engineering', def: 'Cara menulis prompt yang jelas dan terarah supaya AI memberi hasil sesuai keinginanmu secara konsisten.' },
      { term: 'Peran (role)', def: 'Bagian prompt yang menentukan AI harus bersikap sebagai siapa, misalnya "kamu guru" atau "kamu editor".' },
      { term: 'Konteks', def: 'Info latar yang kamu beri ke AI — siapa pembacanya, untuk apa, situasinya bagaimana — karena AI tidak tahu kalau tidak diberi tahu.' },
      { term: 'Format output', def: 'Bentuk jawaban yang kamu minta: poin-poin, tabel, JSON, atau paragraf dengan batas jumlah kata.' },
      { term: 'Zero-shot', def: 'Memberi perintah ke AI tanpa satu pun contoh. Cukup untuk tugas yang jelas dan sederhana.' },
      { term: 'Few-shot', def: 'Memberi beberapa contoh di dalam prompt supaya AI meniru polanya. Lebih akurat untuk tugas dengan pola khusus.' },
      { term: 'Chain-of-thought', def: 'Teknik meminta AI berpikir langkah demi langkah agar jawaban penalaran dan hitungan lebih akurat.' },
      { term: 'System prompt', def: 'Instruksi dasar yang dipasang lebih dulu dan berlaku sepanjang percakapan, seperti peraturan rumah yang ditempel di pintu.' },
      { term: 'Delimiter', def: 'Tanda pemisah seperti ### atau tag <teks> untuk menandai mana instruksi dan mana data.' },
      { term: 'Temperature', def: 'Tombol pengatur keacakan jawaban: rendah berarti konsisten dan faktual, tinggi berarti variatif dan kreatif.' },
      { term: 'Iterasi prompt', def: 'Perbaikan prompt secara bertahap berdasarkan hasil sebelumnya, karena prompt pertama biasanya belum sempurna.' }
    ],

    quiz: [
      { q: 'Apa itu prompt?', o: ['Nama lain dari aplikasi AI', 'Teks atau perintah yang kamu tulis untuk AI', 'Tombol pengatur kecepatan AI', 'Jenis bahasa pemrograman'], a: 1, why: 'Prompt adalah semua teks yang kamu sampaikan ke AI: bisa pertanyaan, perintah, atau data.' },
      { q: 'Mana yang BUKAN bagian dari anatomi prompt yang baik?', o: ['Peran', 'Tugas', 'Warna tulisan', 'Format output'], a: 2, why: 'Anatomi prompt yang baik mencakup peran, tugas, konteks, dan format. Warna tulisan tidak ada hubungannya dengan isi prompt.' },
      { q: 'Apa beda zero-shot dan few-shot?', o: ['Zero-shot pakai contoh, few-shot tidak', 'Zero-shot tanpa contoh, few-shot memakai beberapa contoh', 'Keduanya sama saja', 'Zero-shot hanya untuk angka'], a: 1, why: 'Zero-shot berarti langsung memberi perintah tanpa contoh, few-shot menyertakan beberapa contoh agar AI meniru polanya.' },
      { q: 'Kapan sebaiknya kamu meminta AI berpikir langkah demi langkah?', o: ['Saat ingin jawaban satu kata saja', 'Saat tugasnya butuh penalaran seperti hitungan atau logika', 'Saat aplikasi AI error', 'Saat ingin jawaban lebih pendek'], a: 1, why: 'Chain-of-thought membantu tugas yang butuh penalaran bertahap sehingga jawaban lebih akurat dan bisa kamu periksa.' },
      { q: 'Apa fungsi delimiter seperti ### atau tag <teks>?', o: ['Menghias tampilan jawaban', 'Memisahkan instruksi dari data agar tidak tertukar', 'Mempercepat koneksi internet', 'Mengganti bahasa AI'], a: 1, why: 'Delimiter menandai batas antara instruksi dan data, sehingga AI tidak salah membaca mana perintah dan mana isi.' },
      { q: 'Kalau kamu ingin jawaban yang konsisten dan faktual, temperature sebaiknya bagaimana?', o: ['Rendah, mendekati 0', 'Tinggi', 'Tidak ada pengaruhnya', 'Selalu 100'], a: 0, why: 'Temperature rendah membuat model memilih jawaban paling mungkin secara konsisten — cocok untuk fakta dan angka.' },
      { q: 'Mana contoh perintah yang paling baik?', o: ['"Bikin caption."', '"Tolong bikin sesuatu yang bagus."', '"Kamu copywriter. Buat 3 caption Instagram promosi kopi susu, maksimal 15 kata, nada ceria, sertakan 3 hashtag."', '"Caption dong yang viral."'], a: 2, why: 'Opsi ketiga jelas soal peran, tugas, jumlah, batasan, nada, dan format. Opsi lain terlalu kabur sehingga AI menebak-nebak.' },
      { q: 'Sikap yang tepat saat hasil prompt pertama kurang memuaskan?', o: ['Menyerah dan menganggap AI tidak bisa', 'Menghapus aplikasinya', 'Memperbaiki prompt sedikit demi sedikit lalu mencoba lagi', 'Mengirim prompt yang sama berulang-ulang tanpa diubah'], a: 2, why: 'Prompt pertama adalah draft. Cara terbaik adalah mengiterasi: perjelas tugas, tambah contoh, atau persempit format, lalu uji lagi.' }
    ],

    sources: [
      { title: 'Prompt engineering — dokumentasi resmi OpenAI', url: 'https://platform.openai.com/docs/guides/prompt-engineering', official: true },
      { title: 'Prompt engineering overview — dokumentasi resmi Anthropic', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', official: true },
      { title: 'Prompting best practices — dokumentasi resmi Anthropic', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompting-best-practices', official: true },
      { title: 'Prompt engineering techniques — Microsoft Learn / Azure OpenAI', url: 'https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/prompt-engineering', official: true },
      { title: 'Structured Outputs — dokumentasi resmi OpenAI', url: 'https://platform.openai.com/docs/guides/structured-outputs', official: true },
      { title: 'Elements of a Prompt — Prompt Engineering Guide (DAIR.AI)', url: 'https://www.promptingguide.ai/introduction/elements', official: false },
      { title: 'LLM Settings / temperature — Prompt Engineering Guide', url: 'https://www.promptingguide.ai/introduction/settings', official: false },
      { title: 'Chain-of-Thought Prompting — Prompt Engineering Guide', url: 'https://www.promptingguide.ai/techniques/cot', official: false },
      { title: 'Few-shot Prompting — Prompt Engineering Guide', url: 'https://www.promptingguide.ai/techniques/fewshot', official: false }
    ]
  },

  /* =====================================================================
     MODUL 3
     ===================================================================== */
  {
    id: 'm3',
    n: 3,
    title: 'AI Agents',
    tagline: 'Dari AI yang cuma menjawab, jadi AI yang boleh mengerjakan.',
    minutes: 17,
    icon: 'cpu',
    intro: 'Chatbot menjawab pertanyaanmu. Agent mengerjakan tugasmu. Perbedaan itu kelihatan sepele, tapi konsekuensinya besar: begitu AI boleh mengambil tindakan nyata, dia juga bisa salah bertindak. Modul ini menjelaskan cara kerjanya dan pagar pengaman yang wajib kamu pasang.',

    lessons: [
      {
        t: 'Beda chatbot dan agent bukan soal kepintaran, tapi soal kemampuan bertindak',
        p: [
          'Chatbot itu tukang jawab: kamu tanya, dia balas teks, selesai. Dia tidak mengubah apa pun di luar percakapan.',
          'Agent itu asisten yang boleh melakukan sesuatu: membuka file, mencari di internet, mengirim email, menjalankan kode. Dia bisa mengubah keadaan di dunia nyata.',
          'Batasan pentingnya: kalau langkah-langkahnya sudah ditentukan oleh kode, itu namanya workflow, bukan agent. Baru disebut agent kalau modelnya sendiri yang memutuskan langkah berikutnya.'
        ],
        analogy: 'chatbot seperti resepsionis yang cuma memberi informasi; agent seperti asisten pribadi yang bisa menelepon, memesan tiket, dan mengatur jadwalmu.'
      },
      {
        t: 'Tool use: cara agent menyentuh dunia luar',
        p: [
          'Kamu memberi model daftar alat: nama alat, deskripsi fungsinya, dan bentuk data yang dibutuhkan. Misalnya alat "cari_cuaca" yang butuh data "nama_kota".',
          'Penting dipahami: model <b>tidak</b> menjalankan alatnya sendiri. Dia hanya mengembalikan permintaan terstruktur — "tolong panggil alat ini dengan data ini". Aplikasi yang kamu bangun yang mengeksekusi, lalu mengirim hasilnya balik ke model.',
          'Sebagian alat berjalan di aplikasi kita, sebagian disediakan langsung oleh penyedia model seperti fitur pencarian web.',
          'Jumlah alat bukan tolak ukur kecanggihan. Alat yang terlalu banyak dan tumpang tindih justru membuat model bingung memilih. Lebih baik sedikit tapi deskripsinya jelas.'
        ],
        analogy: 'kamu memberi asisten sebuah daftar nomor yang boleh dia telepon. Dia menunjuk nomor mana yang mau dipakai; kamu yang benar-benar menyambungkan panggilannya.'
      },
      {
        t: 'Loop ReAct: jantungnya agent',
        p: [
          'Agent bekerja dalam putaran: <b>pikir</b> (apa yang harus kulakukan sekarang?), <b>aksi</b> (pakai satu alat), <b>lihat hasil</b> (berhasil atau gagal?), lalu ulangi.',
          'Istilah ReAct sendiri berasal dari makalah tahun 2022 yang menggabungkan penalaran dan tindakan secara bergantian.',
          'Justru karena setiap putaran melihat hasil nyata, agent bisa memperbaiki diri saat salah — bukan ngotot melanjutkan rencana yang ternyata tidak jalan.',
          'Karena itu juga agent butuh batas maksimal putaran. Tanpa batas, dia bisa berputar selamanya tanpa pernah selesai.'
        ],
        analogy: 'memasak sambil mencicipi. Setiap suapan menentukan langkah berikutnya: tambah garam, kecilkan api, atau angkat.'
      },
      {
        t: 'Memory: ingatan jangka pendek dan jangka panjang',
        p: [
          'Ingatan jangka pendek adalah riwayat percakapan di sesi yang sedang berjalan. Selesai sesi, hilang.',
          'Ingatan jangka panjang adalah catatan yang disimpan ke penyimpanan lalu dimuat kembali di sesi lain: namamu, preferensimu, hasil pekerjaan sebelumnya.',
          'Karena ruang konteks model terbatas, ingatan jangka panjang biasanya diringkas dulu sebelum dimasukkan. Memilih apa yang diringkas dan apa yang dibuang itu sendiri jadi keahlian tersendiri.'
        ],
        analogy: 'papan tulis di ruang rapat (jangka pendek, dihapus tiap selesai) versus buku harian (jangka panjang, dibuka lagi kapan pun).'
      },
      {
        t: 'Planning dan multi-agent: memecah tugas besar',
        p: [
          'Sebelum bergerak, agent biasanya membuat rencana: "untuk menyusun laporan ini aku perlu mencari data, meringkas, menulis, lalu memeriksa ulang".',
          'Satu pola populer disebut orchestrator-workers: ada satu otak pusat yang memecah tugas dan membagikannya ke beberapa pekerja, lalu menyatukan hasilnya di akhir.',
          'Kamu juga bisa membangun beberapa agent dengan peran berbeda — peneliti mencari bahan, penulis menyusun, pemeriksa mengoreksi. Lebih rapi untuk tugas bersudut banyak, tapi juga lebih boros biaya.'
        ],
        analogy: 'kepala proyek yang membuat daftar tugas lalu membaginya ke anggota tim, bukan semua orang bekerja sendiri-sendiri tanpa koordinasi.'
      },
      {
        t: 'MCP, prompt injection, dan risiko yang harus dipagari',
        p: [
          'MCP (Model Context Protocol) adalah standar terbuka supaya aplikasi AI bisa tersambung ke data dan alat di mana saja tanpa membuat koneksi khusus satu per satu. Analoginya seperti USB-C: dulu tiap perangkat punya colokan sendiri, sekarang satu jenis colokan cukup.',
          'Risiko agent itu nyata karena dia benar-benar bertindak: <b>loop liar</b> (berputar tanpa henti), <b>biaya membengkak</b> (tiap putaran memanggil model), <b>salah aksi</b> (salah hapus, salah kirim, salah transfer), dan <b>prompt injection</b>.',
          'Prompt injection adalah teks jahat yang menyusup lewat data atau halaman web yang dibaca agent, lalu membelokkan perintahnya. Karena agent membaca konten dari luar, ini jalur serangan yang harus kamu asumsikan ada.',
          'Pagar pengamannya: batas putaran, izin manusia di titik berisiko, lingkungan terbatas (sandbox), dan catatan setiap aksi yang dilakukan.'
        ]
      }
    ],

    examples: [
      {
        label: 'Asisten riset otomatis',
        prompt: 'Carikan harga tiket Jakarta–Bali untuk minggu depan, bandingkan tiga penyedia, lalu tulis ringkasannya ke file tiket.md.\n\nAturan:\n- Sebutkan tanggal dan jam kamu mengambil data.\n- Kalau ada harga yang tidak berhasil kamu ambil, tulis "gagal ambil" jangan dikira-kira.\n- Maksimal 5 putaran pencarian, lalu berhenti dan laporkan hasilnya.',
        note: 'Perhatikan dua pagar pengaman di dalamnya: batas putaran, dan larangan mengira-kira harga yang gagal diambil.'
      },
      {
        label: 'Agent layanan pelanggan dengan pagar pengaman',
        prompt: 'Kamu adalah asisten layanan pelanggan "TokoKu".\nTugasmu: membantu pelanggan cek status pesanan dan memproses pengembalian dana.\n\nAlat yang tersedia:\n- cek_pesanan(id_pesanan) -> mengembalikan status dan tanggal kirim\n- cek_kebijakan_refund() -> mengembalikan aturan pengembalian dana\n- ajukan_refund(id_pesanan) -> HANYA boleh dipanggil setelah dua hal terpenuhi:\n    1) pesanan sudah lewat 7 hari dan belum diterima, dan\n    2) pelanggan sudah menyetujui nominal yang akan dikembalikan.\n\nAturan wajib:\n- Jangan pernah mengarang status pesanan. Selalu panggil cek_pesanan dulu.\n- Sebelum ajukan_refund, ringkas ke pelanggan apa yang akan dilakukan dan minta konfirmasi "YA".\n- Kalau ragu atau data tidak lengkap, berhenti dan tanyakan ke pelanggan.',
        note: 'Ini contoh human-in-the-loop: aksi yang menyangkut uang tidak boleh jalan tanpa persetujuan eksplisit dari manusia.'
      },
      {
        label: 'Agent jadwal harian lewat kalender dan email',
        prompt: 'Kamu adalah asisten jadwal pribadi.\nSetiap pagi, lakukan hal berikut lalu berhenti:\n1. Baca kalender hari ini.\n2. Kalau ada rapat kurang dari 2 jam lagi dan belum ada pengingat, buat pengingat.\n3. Kirim satu ringkasan singkat ke email saya dengan format: "Hari ini: <daftar acara + jam>".\n\nJangan mengubah atau menghapus acara apa pun tanpa persetujuan saya.',
        note: 'Tugasnya sengaja dibatasi "lalu berhenti". Agent yang tidak diberi titik berhenti akan terus mencari hal untuk dikerjakan.'
      },
      {
        label: 'Coding agent yang memperbaiki dirinya sendiri',
        prompt: 'Jalankan tes proyek ini. Kalau ada yang gagal, baca pesan errornya, perbaiki penyebabnya, lalu jalankan tes lagi.\nUlangi sampai semua tes lulus, maksimal 6 putaran.\nJangan mengubah file tes untuk membuatnya lulus — perbaiki kodenya, bukan tesnya.',
        note: 'Kalimat terakhir itu penting. Tanpa itu, agent cenderung "menambal" dengan cara mematikan pemeriksaan — error hilang tapi masalahnya tetap ada.'
      }
    ],

    mistakes: [
      'Menganggap agent sekadar chatbot yang lebih pintar. Bedanya bukan kepintaran, tapi kemampuan bertindak. Chatbot tercerdas pun tetap chatbot kalau tidak punya alat.',
      'Menganggap agent bisa ditinggal tidur. Agent tetap butuh pengawasan. Semakin bebas dia, semakin wajib ada pagar pengaman.',
      'Menganggap makin banyak alat makin sakti. Alat yang berlebihan dan tumpang tindih membuat model bingung memilih.',
      'Menganggap harus pakai framework dulu baru bisa membuat agent. Banyak pola agent bisa dibuat hanya dengan beberapa baris kode yang memanggil API model langsung.',
      'Menganggap MCP itu produk AI atau tool baru. MCP adalah protokol koneksi seperti USB-C, bukan otaknya.',
      'Menganggap semua tugas lebih baik pakai agent. Untuk banyak tugas, satu panggilan model plus pencarian dokumen sudah cukup dan jauh lebih murah.'
    ],

    cards: [
      { term: 'AI agent', def: 'Sistem AI yang tidak hanya menjawab, tapi bisa memakai alat untuk mengambil tindakan dan menyelesaikan tugas.' },
      { term: 'Chatbot', def: 'Program yang hanya membalas teks berdasarkan pertanyaan; tidak punya kemampuan bertindak di luar percakapan.' },
      { term: 'Tool use / function calling', def: 'Kemampuan model meminta aplikasi menjalankan fungsi tertentu dengan data yang dia tentukan.' },
      { term: 'ReAct loop', def: 'Pola kerja agent: pikir (reason), bertindak (act), lihat hasil (observe), lalu ulangi.' },
      { term: 'Memory jangka pendek', def: 'Ingatan yang hanya mencakup sesi percakapan yang sedang berlangsung.' },
      { term: 'Memory jangka panjang', def: 'Catatan yang disimpan ke penyimpanan lalu dimuat kembali di sesi lain.' },
      { term: 'Planning', def: 'Kemampuan agent memecah tujuan besar menjadi langkah-langkah kecil sebelum bertindak.' },
      { term: 'Multi-agent orchestration', def: 'Mengatur beberapa agent dengan peran berbeda agar bekerja sama menyelesaikan tugas.' },
      { term: 'MCP (Model Context Protocol)', def: 'Standar terbuka, semacam USB-C-nya AI, untuk menyambung model ke data dan alat di mana saja.' },
      { term: 'Prompt injection', def: 'Serangan berupa teks jahat yang menyusup lewat data yang dibaca agent untuk membelokkan perintahnya.' },
      { term: 'Human-in-the-loop', def: 'Menyisipkan persetujuan manusia di titik berisiko sebelum agent melanjutkan aksinya.' },
      { term: 'Workflow vs agent', def: 'Workflow langkahnya sudah ditentukan kode; agent memutuskan sendiri langkah berikutnya.' }
    ],

    quiz: [
      { q: 'Apa pembeda utama antara chatbot biasa dan AI agent?', o: ['Agent selalu lebih panjang jawabannya', 'Agent bisa memakai alat untuk mengambil tindakan, bukan cuma membalas teks', 'Agent tidak perlu koneksi internet', 'Agent selalu gratis'], a: 1, why: 'Agent bisa memanggil alat dan mengubah keadaan di luar, sedangkan chatbot terbatas pada teks balasan.' },
      { q: 'Dalam tool use, siapa yang benar-benar menjalankan fungsinya?', o: ['Model AI-nya sendiri', 'Pengguna yang mengetik jawabannya', 'Aplikasi atau kode yang kita bangun, setelah model meminta pemanggilan', 'Sistem operasi komputer'], a: 2, why: 'Model hanya mengembalikan permintaan terstruktur berisi nama alat dan datanya. Eksekusi nyata ada di aplikasi kita.' },
      { q: 'Loop ReAct adalah singkatan dari pola apa?', o: ['read, answer, close', 'reason, act, observe', 'run, apply, check', 'recall, analyze, test'], a: 1, why: 'ReAct menjalin penalaran dan tindakan secara bergantian, lalu hasilnya diamati untuk menentukan langkah berikutnya.' },
      { q: 'Apa beda ingatan jangka pendek dan jangka panjang pada agent?', o: ['Tidak ada bedanya', 'Jangka pendek untuk sesi ini; jangka panjang disimpan dan dimuat lagi di sesi lain', 'Jangka pendek lebih akurat karena diawasi manusia', 'Jangka panjang dipakai hanya saat internet mati'], a: 1, why: 'Jangka pendek adalah riwayat percakapan sesi ini; jangka panjang adalah catatan tersimpan yang bisa dipakai lagi nanti.' },
      { q: 'Analogi "USB-C untuk AI" paling tepat menggambarkan apa?', o: ['Model bahasa yang paling besar', 'MCP sebagai standar menyambungkan AI ke data dan alat', 'Kecepatan internet', 'Ukuran memori agent'], a: 1, why: 'MCP adalah protokol terbuka yang menstandarkan koneksi AI ke banyak sumber data dan alat, mirip satu jenis colokan universal.' },
      { q: 'Kesalahan yang paling umum soal jumlah tool pada agent adalah apa?', o: ['Terlalu sedikit tool selalu membuat agent gagal', 'Tool harus ditulis dalam bahasa Inggris', 'Terlalu banyak tool yang tumpang tindih membuat model bingung memilih', 'Tool tidak boleh punya deskripsi'], a: 2, why: 'Alat yang berlebihan dan mirip-mirip mengaburkan pilihan. Tool yang dikurasi dan jelas lebih baik.' },
      { q: 'Mana risiko nyata dari agent yang berjalan bebas tanpa pengawasan?', o: ['Loop liar, biaya membengkak, dan salah aksi', 'Warna antarmuka berubah', 'Keyboard jadi lebih cepat', 'Baterai ponsel terisi penuh'], a: 0, why: 'Karena agent benar-benar bertindak, tanpa batas putaran dan pengawasan dia bisa berputar terus, memakan biaya, atau melakukan aksi yang salah.' },
      { q: 'Kapan sebaiknya memakai agent, bukan sekadar satu panggilan model biasa?', o: ['Untuk semua tugas, karena agent selalu lebih baik', 'Hanya kalau tugasnya sangat singkat', 'Saat jumlah langkah yang dibutuhkan tidak bisa diprediksi sebelumnya', 'Saat tidak ada anggaran biaya'], a: 2, why: 'Agent unggul untuk masalah terbuka yang jalurnya tidak bisa dipatok di depan. Untuk tugas sederhana, satu panggilan plus pencarian dokumen biasanya lebih hemat.' }
    ],

    sources: [
      { title: 'What is the Model Context Protocol? — dokumentasi resmi MCP', url: 'https://modelcontextprotocol.io/docs/getting-started/intro', official: true },
      { title: 'MCP Specification — dokumentasi resmi MCP', url: 'https://modelcontextprotocol.io/specification/2025-06-18', official: true },
      { title: 'Security Best Practices — MCP', url: 'https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices', official: true },
      { title: 'Tool use with Claude — dokumentasi resmi Anthropic', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview', official: true },
      { title: 'Function calling — dokumentasi resmi OpenAI', url: 'https://developers.openai.com/api/docs/guides/function-calling', official: true },
      { title: 'Building Effective AI Agents — Anthropic Engineering', url: 'https://www.anthropic.com/engineering/building-effective-agents', official: true },
      { title: 'Writing effective tools for AI agents — Anthropic Engineering', url: 'https://www.anthropic.com/engineering/writing-tools-for-agents', official: true },
      { title: 'LangChain overview — dokumentasi resmi', url: 'https://docs.langchain.com/oss/python/langchain/overview', official: true },
      { title: 'CrewAI Introduction — dokumentasi resmi', url: 'https://docs.crewai.com/introduction', official: true },
      { title: 'ReAct: Synergizing Reasoning and Acting in Language Models — arXiv', url: 'https://arxiv.org/abs/2210.03629', official: false }
    ]
  },

  /* =====================================================================
     MODUL 4
     ===================================================================== */
  {
    id: 'm4',
    n: 4,
    title: 'Vibe Coding',
    tagline: 'Bikin aplikasi dengan ngobrol. Cepat sekali — asal kamu tahu batas amannya.',
    minutes: 15,
    icon: 'code',
    intro: 'Istilah ini dipopulerkan Andrej Karpathy pada Februari 2025: kamu menjelaskan apa yang kamu mau dengan bahasa sehari-hari, AI menulis kodenya, dan kamu cukup melihat hasilnya jalan atau tidak. Kekuatannya nyata. Bahayanya juga nyata, dan bagian bahaya itulah yang paling sering dilewatkan pemula.',

    lessons: [
      {
        t: 'Vibe coding itu apa, dan apa yang membedakannya dari ngoding biasa',
        p: [
          'Vibe coding adalah cara membuat software dengan menulis permintaan pakai bahasa sehari-hari, lalu memakai hasilnya tanpa benar-benar membaca kodenya.',
          'Bedanya dengan "ngoding dibantu AI" biasa bukan soal alatnya, tapi soal apakah kamu membaca dan memahami kodenya. Kalau kamu membaca, menguji, dan paham — itu rekayasa perangkat lunak normal yang dibantu AI, dan jauh lebih aman.',
          'Kalau kamu tekan "terima semua" tanpa membaca, itu vibe coding. Risikonya beda kelas.'
        ],
        analogy: 'yang satu memasak sambil mencicipi, yang satu memasak sambil merem.'
      },
      {
        t: 'Three rasa tool: autocomplete, asisten editor, dan mesin ajaib',
        p: [
          'Jenis pertama seperti autocomplete pintar di dalam editor: dia menebak baris kode berikutnya saat kamu mengetik.',
          'Jenis kedua seperti asisten yang membaca seluruh proyek: dia bisa mengedit banyak file sekaligus, menjalankan perintah, dan beriterasi sendiri sampai tugasnya selesai.',
          'Jenis ketiga adalah mesin ajaib untuk membuat aplikasi langsung dari obrolan: kamu mendeskripsikan aplikasinya, keluar aplikasi utuh yang bisa langsung dipakai.',
          'Ketiganya berguna di situasi berbeda. Untuk proyek serius, jenis kedua biasanya paling seimbang antara cepat dan bisa dikendalikan.'
        ],
        analogy: 'jenis pertama penebak yang pintar, jenis kedua asisten yang bisa disuruh kerja, jenis ketiga kontraktor yang langsung bangun rumah dari deskripsimu.'
      },
      {
        t: 'Alurnya cuma empat langkah: prompt, kode, jalankan, perbaiki',
        p: [
          'Kamu menulis permintaan. AI menghasilkan kode. Kamu menjalankan dan melihat hasilnya. Kalau ada yang salah, kamu balas lagi dengan prompt perbaikan. Ulangi.',
          'Kunci yang membuat putaran ini cepat adalah umpan balik nyata: jalankan programnya, lihat pesan errornya, bandingkan dengan yang kamu harapkan.',
          'Cara mempercepatnya banyak: minta AI membuat tes otomatis, minta dia menjelaskan errornya dengan bahasa sederhana, dan minta dia mengerjakan satu langkah perbaikan dulu supaya kamu bisa ikut paham.'
        ],
        analogy: 'menambal ban bocor: temukan bocornya, tambal, cek lagi, ulangi sampai tidak bocor.'
      },
      {
        t: 'Konteks itu raja',
        p: [
          'AI tidak tahu apa yang tidak kamu beri tahu. Kalau kamu cuma bilang "bikin website", hasilnya hampir pasti ngawur.',
          'Sebutkan tujuannya untuk siapa, isinya apa, gayanya seperti apa, dan teknologi apa yang dipakai.',
          'Makin spesifik konteksmu, makin sedikit putaran perbaikan yang kamu butuhkan. Ini investasi waktu yang hampir selalu balik berkali-kali.'
        ],
        analogy: 'menyuruh tukang bangunan "bikin rumah bagus" tanpa bilang jumlah kamar atau luas tanahnya.'
      },
      {
        t: 'Git adalah mesin waktumu',
        p: [
          'Git mencatat setiap perubahan sehingga kamu bisa melihat versi lama, membandingkan, dan kembali ke kondisi aman.',
          'Ini bukan pelajaran tambahan yang bisa dilewat. Semakin sering AI mengubah banyak file sekaligus, semakin penting punya titik aman untuk kembali.',
          'Kebiasaan simpelnya: simpan perubahan setiap kali ada satu hal yang berhasil berjalan, sebelum meminta perubahan besar berikutnya.'
        ],
        analogy: 'save point di game. Sebelum bertarung besar, simpan dulu; kalau kalah, tinggal muat lagi.'
      },
      {
        t: 'Empat bahaya, dan satu aturan kapan harus berhenti',
        p: [
          '<b>Kode halusinasi</b> — AI mengarang fungsi atau library yang sebenarnya tidak ada, tapi ditulis dengan yakin.',
          '<b>Dependency palsu</b> — AI menyebut nama paket yang tidak ada. Ini berbahaya, karena penyerang bisa mendaftarkan nama paket palsu itu dan menunggu korbannya memasangnya.',
          '<b>Celah keamanan ikut tergenerate</b> — kata sandi yang ditulis langsung di kode, input pengguna yang tidak diperiksa, tautan yang bisa disusupi.',
          '<b>Utang teknis</b> — kode menumpuk tanpa dipahami siapa pun, makin lama makin sulit dirawat.',
          'Aturan berhentinya sederhana: selama proyeknya kecil, iseng, dan tidak penting, mainkan. Begitu menyangkut uang orang lain, data pribadi, atau dipakai publik — berhenti dan minta pendampingan orang berpengalaman.',
          'Satu jebakan halus: kalau errornya hilang, belum tentu masalahnya selesai. AI kadang "menambal" dengan cara mematikan pemeriksaan error. Error hilang tidak sama dengan masalah beres.'
        ]
      }
    ],

    examples: [
      {
        label: 'Bikin halaman sederhana untuk usaha kecil',
        prompt: 'Bikin landing page untuk warung kopi "Kopi Pagi" berbahasa Indonesia.\n\nIsinya: judul besar, menu unggulan (5 item beserta harga), jam buka, alamat, dan tombol WhatsApp untuk memesan.\nGaya: warna hangat (coklat dan krem), tombol besar supaya gampang ditekan di HP.\nJangan pakai gambar dulu — cukup teks dan ikon.',
        note: 'Perhatikan tiga hal yang disebut eksplisit: tujuan, isi, dan gaya. Prompt satu baris "bikin website" tidak akan menghasilkan ini.'
      },
      {
        label: 'Menambah fitur ke kode yang sudah ada',
        prompt: 'Saya punya file todo.html. Aplikasi daftar tugas ini bisa menambah dan menghapus tugas, tapi kalau halaman di-refresh semua tugas hilang.\n\nTolong ubah supaya tugas disimpan di browser (localStorage) sehingga tetap ada walau di-refresh.\nJangan ubah tampilan — cukup tambahkan penyimpanannya saja.',
        note: 'Kalimat "jangan ubah tampilan, cukup tambahkan penyimpanannya" mencegah AI merombak hal-hal yang sudah kamu suka.'
      },
      {
        label: 'Minta perbaikan error, satu langkah dulu',
        prompt: 'Program saya error saat dijalankan. Tolong jelaskan penyebabnya dengan bahasa sederhana, lalu perbaiki.\n\nIni pesan errornya:\nTypeError: Cannot read properties of undefined (reading map)\n\nKerjakan satu langkah perbaikan dulu, jangan langsung ubah banyak hal sekaligus, supaya saya bisa ikut paham.',
        note: 'Meminta satu langkah sekaligus terasa lebih lambat, tapi kamu jadi paham apa yang berubah — dan tahu cara kembali kalau salah.'
      },
      {
        label: 'Minta pemeriksaan keamanan',
        prompt: 'Tolong periksa kode di proyek ini dari sisi KEAMANAN.\n\nCari hal seperti: kata sandi atau API key yang ditulis langsung di kode, input pengguna yang tidak diperiksa, dan tautan yang bisa disusupi.\nLaporkan temuan pakai bahasa awam beserta tingkat bahayanya.\nJangan langsung ubah kodenya — saya mau lihat daftar temuannya dulu.',
        note: 'Minta laporan sebelum perubahan. Ini kebiasaan bagus untuk semua permintaan yang menyentuh keamanan.'
      },
      {
        label: 'Merapikan proyek yang mulai berantakan',
        prompt: 'Proyek saya makin berantakan setelah banyak perubahan.\n\nTolong bantu rapikan:\n1. Jelaskan struktur folder dan file yang ada sekarang pakai bahasa sederhana.\n2. Tandai file mana yang sepertinya sudah tidak terpakai lagi.\n3. Siapkan langkah menyimpan perubahan ini ke Git dengan pesan commit yang jelas.\nJangan hapus apa pun sebelum saya setuju.',
        note: 'Langkah 1 dan 2 memberi kamu peta proyek sendiri — sesuatu yang paling cepat hilang kalau kamu terus menekan "terima semua".'
      }
    ],

    mistakes: [
      'Menganggap vibe coding sama dengan semua pemakaian AI untuk ngoding. Vibe coding khusus berarti kodenya diterima tanpa dibaca atau dipahami.',
      'Menganggap AI selalu benar. LLM itu mesin penebak kata, bukan mesin kebenaran. Dia sangat percaya diri walau salah.',
      'Menganggap tampilan yang sudah bagus berarti aplikasinya sudah beres. Bug bisa sembunyi di dalam, tidak kelihatan di layar.',
      'Menganggap Git tidak perlu karena sudah ada AI. Justru sebaliknya: semakin banyak AI mengubah file, semakin penting punya save point.',
      'Menganggap vibe coding bisa dipakai untuk aplikasi serius apa saja. Untuk prototipe dan alat pribadi aman; untuk data orang lain atau pembayaran, butuh pengawasan.',
      'Menganggap error yang hilang berarti kodenya sehat. Kadang AI menambalnya dengan cara mematikan pemeriksaan error.'
    ],

    cards: [
      { term: 'Vibe coding', def: 'Membuat software dengan menulis permintaan pakai bahasa sehari-hari ke AI, lalu memakai hasilnya tanpa benar-benar membaca kodenya.' },
      { term: 'Prompt', def: 'Instruksi yang kamu tulis ke AI, seperti pesan ke asisten. Semakin jelas, semakin bagus hasilnya.' },
      { term: 'Autocomplete AI', def: 'Asisten di dalam editor yang menebak baris kode berikutnya saat kamu mengetik.' },
      { term: 'Agent coding', def: 'Asisten AI yang bisa membaca seluruh proyek, mengedit banyak file, dan menjalankan perintah sampai tugasnya selesai.' },
      { term: 'Vercel v0', def: 'Tool yang mengubah deskripsi atau desain menjadi antarmuka aplikasi utuh yang siap dipakai.' },
      { term: 'Lovable', def: 'Platform membangun aplikasi web lewat bahasa natural; hasilnya kode yang bisa diedit dan disinkronkan ke GitHub.' },
      { term: 'Bolt', def: 'Tool "chat to app": kamu mengobrol, dia membangun aplikasi atau website lengkap.' },
      { term: 'Git', def: 'Sistem pencatat perubahan kode. Fungsinya seperti save point: bisa kembali ke versi aman kalau ada yang rusak.' },
      { term: 'Halusinasi kode', def: 'Saat AI mengarang fungsi atau library yang sebenarnya tidak ada, tapi ditulis dengan meyakinkan.' },
      { term: 'Dependency palsu', def: 'Ketika AI menyebut nama paket yang tidak ada; bisa dimanfaatkan penyerang untuk menyusupkan kode jahat.' },
      { term: 'Utang teknis', def: 'Beban kode yang menumpuk tanpa dipahami, membuat perubahan berikutnya makin lama dan makin rawan rusak.' },
      { term: 'Diff', def: 'Daftar perubahan baris demi baris. Membaca diff adalah kebiasaan yang membedakan ngoding dibantu AI dari vibe coding.' }
    ],

    quiz: [
      { q: 'Siapa yang mempopulerkan istilah "vibe coding"?', o: ['Simon Willison', 'Andrej Karpathy', 'Sam Altman', 'Tim Vercel'], a: 1, why: 'Karpathy mempopulerkannya pada Februari 2025, termasuk kalimat "lupakan bahwa kodenya ada".' },
      { q: 'Apa ciri khas vibe coding yang membedakannya dari ngoding biasa yang dibantu AI?', o: ['Hanya boleh dipakai di HP', 'Kodenya diterima tanpa dibaca atau dipahami sama sekali', 'Harus selalu ditulis pakai bahasa Inggris', 'Tidak boleh memakai Git'], a: 1, why: 'Kuncinya adalah menerima semua perubahan tanpa membaca diff. Yang membaca, menguji, dan paham kodenya tidak sedang vibe coding.' },
      { q: 'Tool mana yang termasuk "membuat aplikasi langsung dari obrolan"?', o: ['GitHub Copilot', 'Lovable', 'Git', 'Git Bash'], a: 1, why: 'Lovable, v0, dan Bolt mengubah deskripsi bahasa natural menjadi aplikasi utuh, sedangkan Copilot lebih ke saran kode di editor.' },
      { q: 'Alur kerja dasar vibe coding yang benar adalah?', o: ['tulis, hapus, tulis ulang', 'prompt, kode, jalankan, perbaiki', 'beli, pasang, lupakan', 'coding, deploy, berdoa'], a: 1, why: 'Kamu mengajukan permintaan, AI menulis kode, kamu menjalankan, lalu memperbaiki lewat prompt lanjutan, berulang sampai berhasil.' },
      { q: 'Dependency palsu berbahaya karena apa?', o: ['Membuat kode jadi lambat', 'AI menyebut paket yang tidak ada, dan bisa disalahgunakan pihak jahat', 'Menghapus file kita otomatis', 'Membuat warna tampilan berubah'], a: 1, why: 'Penyerang bisa mendaftarkan nama paket palsu yang disebut AI, lalu menunggu korban memasangnya.' },
      { q: 'Kenapa Git penting saat kamu sering memakai vibe coding?', o: ['Supaya kode berjalan lebih cepat', 'Sebagai save point untuk kembali kalau AI mengacak proyek', 'Supaya AI jadi lebih pintar', 'Karena diwajibkan semua tool AI'], a: 1, why: 'Git mencatat setiap versi, jadi kamu bisa membandingkan dan memulihkan keadaan kalau perubahan AI merusak sesuatu.' },
      { q: 'Mana yang BUKAN tanda bahaya utang teknis dari vibe coding?', o: ['Kode menumpuk yang tidak dimengerti siapa pun', 'Susah menambah fitur karena saling terkait berantakan', 'Ada catatan riwayat perubahan di Git', 'Perbaikan satu bug memunculkan dua bug baru'], a: 2, why: 'Punya riwayat perubahan Git itu justru hal baik. Utang teknis adalah beban kode berantakan yang makin sulit dirawat.' },
      { q: 'Kapan sebaiknya TIDAK memakai vibe coding tanpa pendampingan?', o: ['Saat membuat alat receh untuk diri sendiri', 'Saat membuat prototipe untuk menguji ide', 'Saat membangun aplikasi yang menyimpan data pribadi orang lain atau menangani pembayaran', 'Saat iseng belajar membuat game kecil'], a: 2, why: 'Kalau ada risiko orang lain dirugikan — data, uang, atau reputasi — proyek itu bukan lagi berisiko rendah dan butuh pengawasan orang berpengalaman.' }
    ],

    sources: [
      { title: 'Vibe coding — Wikipedia (ringkasan definisi Karpathy + kritiknya)', url: 'https://en.wikipedia.org/wiki/Vibe_coding', official: false },
      { title: "Not all AI-assisted programming is vibe coding — Simon Willison", url: 'https://simonwillison.net/2025/Mar/19/vibe-coding/', official: false },
      { title: 'Here is how I use LLMs to help me write code — Simon Willison', url: 'https://simonwillison.net/2025/Mar/11/using-llms-for-code/', official: false },
      { title: 'Cursor Docs — dokumentasi resmi', url: 'https://cursor.com/docs', official: true },
      { title: 'About GitHub Copilot — dokumentasi resmi GitHub', url: 'https://docs.github.com/en/copilot/get-started/about-github-copilot', official: true },
      { title: 'Claude Code Overview — dokumentasi resmi', url: 'https://code.claude.com/docs/en/overview', official: true },
      { title: 'Best practices for Claude Code — Anthropic Engineering', url: 'https://www.anthropic.com/engineering/claude-code-best-practices', official: true },
      { title: 'What is v0? — dokumentasi resmi Vercel', url: 'https://v0.app/docs', official: true },
      { title: 'Welcome to Lovable — dokumentasi resmi', url: 'https://docs.lovable.dev/', official: true },
      { title: 'Pro Git Book — About Version Control (git-scm)', url: 'https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control', official: true },
      { title: 'Package Hallucinations by Code Generating LLMs — arXiv', url: 'https://arxiv.org/abs/2406.10279', official: false }
    ]
  },

  /* =====================================================================
     MODUL 5
     ===================================================================== */
  {
    id: 'm5',
    n: 5,
    title: 'Monetisasi Produk AI',
    tagline: 'Produk AI tidak gagal karena teknologinya. Dia gagal karena tidak ada yang tahu dan tidak ada yang mau bayar.',
    minutes: 18,
    icon: 'coins',
    intro: 'Sampai sini kamu sudah bisa memakai AI, menulis prompt yang benar, dan memahami agent serta vibe coding. Pertanyaannya sekarang: bagaimana ini menghasilkan uang? Jawabannya bukan "bikin produk AI keren", tapi "menyelesaikan masalah seseorang yang mau membayar". Modul ini membahas jalur, harga, biaya, dan cara memvalidasi sebelum kamu menghabiskan tiga bulan membangun sesuatu yang tidak ada pembelinya.',

    lessons: [
      {
        t: 'Orang membeli hasilnya, bukan teknologi AI-nya',
        p: [
          'Pelanggan tidak peduli kamu memakai model apa. Mereka peduli masalah mereka selesai.',
          'Pertanyaan yang menentukan bukan "AI-ku canggih apa?", tapi "masalah siapa yang kubantu selesai, dan seberapa sakit masalah itu?".',
          'Konsekuensi praktisnya: mulai dari masalah, bukan dari teknologi. Teknologinya baru dipilih setelah masalahnya jelas.'
        ],
        analogy: 'orang membeli kamera karena ingin fotonya bagus, bukan karena suka bentuk lensanya.'
      },
      {
        t: 'Lima jalur monetisasi yang paling umum',
        p: [
          '<b>SaaS / micro-SaaS</b> — menjual akses software berlangganan. Pendapatannya berulang, tapi butuh waktu dan pengguna.',
          '<b>Jasa dan agency</b> — mengerjakan pekerjaan AI untuk klien. Jalan tercepat untuk pemula karena kamu dibayar sebelum membangun produk apa pun.',
          '<b>Jual template dan prompt</b> — paket siap pakai untuk niche tertentu. Modal awalnya paling kecil.',
          '<b>Konten dan komunitas</b> — kelas, tutorial, grup berbayar. Bekerja kalau kamu sudah punya audiens atau rutin membuat konten.',
          '<b>API wrapper</b> — membungkus API AI mentah jadi alat yang enak dipakai. Kamu tidak membuat AI-nya, kamu membuat alurnya enak.',
          'Urutan realistis untuk pemula: mulai dari jasa untuk mendapat uang dan pemahaman masalah, lalu ubah pekerjaan yang paling sering diminta menjadi produk.'
        ]
      },
      {
        t: 'Micro-SaaS: warung spesialis, bukan supermarket',
        p: [
          'Micro-SaaS adalah software kecil yang menyelesaikan satu masalah spesifik, cukup diurus satu sampai dua orang, dengan biaya operasional rendah.',
          'Fokus sempit justru menguntungkan: kamu mudah ditemukan, mudah dipercaya, dan mudah menjelaskan produkmu dalam satu kalimat.',
          'Contoh bentuknya: alat pembuat caption khusus toko kue, alat peringkas dokumen khusus notaris, alat balas chat khusus toko online.'
        ]
      },
      {
        t: 'Tiga gaya harga, dan cara memilihnya',
        p: [
          '<b>Langganan</b> — bayar tetap tiap bulan, seperti layanan streaming. Enak untuk pemasukan yang bisa diprediksi.',
          '<b>Kredit</b> — pelanggan membeli paket kredit lalu memakainya sedikit demi sedikit, seperti koin game.',
          '<b>Pay-per-use</b> — bayar sesuai pemakaian, seperti token listrik.',
          'Aturan praktisnya: kalau fiturmu berat biaya AI dan ada kemungkinan dipakai berlebihan, langganan flat tanpa batas itu berbahaya. Kredit atau pay-per-use melindungi marginmu.'
        ]
      },
      {
        t: 'Biaya token, margin, dan kanal akuisisi',
        p: [
          'Biaya API AI dihitung per token, dan harga input biasanya berbeda dari harga output. Ada juga model cache yang lebih murah untuk teks yang diulang.',
          'Harga jual harus jauh di atas biaya token ditambah biaya payment gateway ditambah biaya operasional. Margin sehat untuk produk AI minimal beberapa kali lipat biaya langsungnya, bukan beda tipis.',
          'Untuk kanal akuisisi: pilih satu dulu, jangan semua sekaligus. Product Hunt untuk peluncuran ke komunitas produk global, TikTok atau X untuk konten demo yang membuat penasaran, dan komunitas (grup WhatsApp, Facebook, Discord, forum niche) untuk berjualan lewat kepercayaan.',
          'Kesalahan pemula yang paling mahal: menyalakan paket gratis tanpa batas. Orang memakai sebanyak-banyaknya dan biaya tokenmu membengkak. Gratis harus dibatasi kuota, atau dibatasi waktu.'
        ]
      },
      {
        t: 'Payment gateway, pajak dasar, dan validasi ide',
        p: [
          'Untuk pembeli Indonesia ada Midtrans dan Xendit yang menerima transfer bank, e-wallet, QRIS, dan kartu; Mayar unggul untuk yang tidak mau menyentuh kode dengan landing page dan checkout sederhana.',
          'Untuk pembeli luar negeri ada Lemon Squeezy dan Stripe. Kelebihannya: sebagian platform berperan sebagai Merchant of Record, artinya urusan pajak penjualan atau VAT global ditangani platform saat checkout.',
          'Soal legal: memulai sebagai perorangan itu boleh, kamu tidak wajib langsung membuat PT. Tapi pendapatan usaha tetap objek pajak. Pelaku UMKM umumnya dikenai PPh Final 0,5% dari omzet, dengan batas omzet tertentu yang bebas pajak, dan PPN berlaku kalau status atau ambang omzetmu sudah memenuhi syarat. Aturan ini bisa berubah, jadi cek sumber resmi sebelum mengambil keputusan.',
          'Terakhir, validasi dulu sebelum membangun. Ngobrol dengan calon pengguna dan tanyakan masalah masa lalu mereka, bukan pendapat mereka tentang idemu. Pertanyaan seperti "pernah tidak bayar orang untuk mengurus ini?" jauh lebih berguna daripada "menurutmu ideku bagus tidak?".'
        ],
        analogy: 'memilih payment gateway itu seperti memilih kasir toko: yang benar adalah yang paling nyaman untuk pembelimu, bukan yang paling canggih.'
      }
    ],

    examples: [
      {
        label: 'Ide 1 — alat caption dan jadwal posting untuk UMKM kuliner',
        prompt: 'Bentuk: pemilik warung mengunggah foto makanan, AI membuat caption, hashtag, dan jadwal posting seminggu. Harga contoh: langganan bulanan atau paket kredit.\n\nLangkah pertama: wawancarai 5 pemilik warung sebelum membuat apa pun. Tanya berapa lama mereka biasanya memikirkan caption, dan pernahkah mereka membayar orang untuk itu.',
        note: 'Wawancara dulu, bukan langsung membangun. Kalau jawabannya "tidak pernah terpikir" dan "tidak pernah bayar", itu sinyal masalah yang lemah.'
      },
      {
        label: 'Ide 2 — jasa paket konten untuk brand lokal',
        prompt: 'Bentuk: paket bulanan berisi sejumlah artikel, caption, dan ide thumbnail, dikerjakan memakai AI lalu kamu rapikan dengan tanganmu.\n\nLangkah pertama: buat satu paket contoh gratis untuk satu klien, minta testimoni, lalu pakai testimoni itu untuk mendapatkan klien berikutnya.',
        note: 'Jasa adalah jalur tercepat untuk pemula karena uang masuk sebelum produk apa pun dibangun.'
      },
      {
        label: 'Ide 3 — jual template dan prompt siap pakai',
        prompt: 'Bentuk: paket prompt plus template siap pakai untuk satu niche spesifik — guru membuat soal, HR membuat deskripsi pekerjaan, penjual membuat deskripsi produk.\n\nLangkah pertama: buat satu paket kecil (10 prompt), jual dengan harga rendah lewat payment gateway sederhana, lalu lihat apakah ada yang membeli.',
        note: 'Ini uji permintaan termurah yang bisa kamu lakukan. Kalau paket 10 prompt pun tidak ada yang beli, paket 500 prompt juga tidak akan laku.'
      },
      {
        label: 'Ide 4 — API wrapper yang membungkus AI jadi alat enak dipakai',
        prompt: 'Bentuk: alat peringkas dokumen khusus notaris, atau alat balas chat pelanggan khusus toko online. Kamu tidak membuat AI-nya, kamu membuat alur dan tampilannya nyaman.\n\nLangkah pertama: hitung biaya token per satu kali pemakaian, lalu pastikan harga jualnya 5 sampai 10 kali angka itu.',
        note: 'Kalau hitungan ini tidak menghasilkan margin, masalahnya bukan di pemasaran — masalahnya di model harga.'
      },
      {
        label: 'Prompt: validasi ide sebelum membangun',
        prompt: 'Kamu membantu saya memvalidasi ide produk AI untuk pasar Indonesia.\n\nIde saya: (tulis ide + target pengguna, misal: alat pembuat caption otomatis untuk pemilik warung makan di kota kecil).\n\nTolong bantu saya:\n1. Tuliskan 10 pertanyaan wawancara yang TIDAK menggiring jawaban — fokus ke masalah masa lalu, bukan ke ide saya.\n2. Sebutkan 5 asumsi yang paling berisiko salah dari ide ini.\n3. Sarankan 3 cara menguji ide ini dalam seminggu dengan biaya di bawah Rp200.000.\nTulis dalam bahasa Indonesia santai, ringkas, dan praktis.',
        note: 'Perhatikan instruksi "tidak menggiring jawaban". Pertanyaan seperti "apakah kamu akan pakai aplikasi ini?" selalu dijawab "iya" oleh orang yang sopan — dan jawaban itu tidak berarti apa-apa.'
      },
      {
        label: 'Prompt: menentukan harga dan mencari titik rugi',
        prompt: 'Saya mau menentukan harga produk AI saya.\n\nRincian:\n- Jenis produk: (misal alat peringkas dokumen)\n- Target pengguna: (misal staf administrasi kantor kecil)\n- Perkiraan biaya token per pemakaian: (Rp)\n- Biaya payment gateway: (%)\n- Tujuan saya: (untung cepat / menumbuhkan pengguna)\n\nTolong:\n1. Bandingkan 3 opsi model harga (langganan, kredit, pay-per-use) untuk kasus saya.\n2. Sebutkan harga wajar dalam Rupiah beserta alasan singkatnya.\n3. Tunjukkan skenario di mana saya malah RUGI dan cara mencegahnya.\nJawab dalam bahasa Indonesia, pakai angka konkret.',
        note: 'Poin 3 yang paling penting. Sebagian besar produk AI gagal bukan karena tidak ada yang beli, tapi karena pengguna terberatnya justru merugikan.'
      }
    ],

    mistakes: [
      'Mengira membuat produk AI otomatis mendatangkan uang. Masalah sulitnya bukan teknologinya, tapi menemukan orang yang mau membayar dan mempercayaimu.',
      'Mengira semakin murah semakin banyak yang beli. Karena biaya token terus berjalan, harga terlalu murah bisa membuatmu rugi setiap kali ada yang memakai.',
      'Mengira token itu gratis. Setiap pemakaian menambah biaya, apalagi fitur berat seperti membaca dokumen panjang.',
      'Mengira perorangan tidak boleh berjualan tanpa PT. Boleh mulai sebagai perorangan; yang wajib adalah mencatat pemasukan dan memahami kewajiban pajaknya.',
      'Mengira langganan selalu paling menguntungkan. Kalau penggunanya jarang memakai, mereka lebih suka bayar sesuai pemakaian; kalau kamu yang menanggung biaya token, pengguna berat justru menggerusmu.',
      'Mengira paket gratis tanpa batas bisa bikin viral. Gratis tanpa batas adalah penguras biaya, bukan strategi pemasaran.'
    ],

    cards: [
      { term: 'Micro-SaaS', def: 'Versi kecil SaaS: satu masalah spesifik, cukup diurus satu-dua orang, biaya operasional rendah.' },
      { term: 'API', def: 'Jembatan yang membuat dua sistem bisa saling bicara: kamu mengirim permintaan, sistem membalas hasil.' },
      { term: 'API wrapper', def: 'Produk jadi yang lebih mudah dipakai, karena membungkus API mentah di belakangnya.' },
      { term: 'Pay-per-use', def: 'Model harga: pelanggan membayar sesuai pemakaian, seperti token listrik.' },
      { term: 'Kredit', def: 'Model harga: pelanggan membeli paket kredit lalu memakainya sedikit demi sedikit, seperti koin game.' },
      { term: 'Margin', def: 'Selisih antara harga jual dan biaya. Margin sehat berarti untungmu cukup jauh di atas biaya token dan payment gateway.' },
      { term: 'Merchant of Record', def: 'Pihak yang menanggung urusan pajak penjualan. Kalau berjualan lewat Lemon Squeezy, peran ini diambil platform.' },
      { term: 'Product Hunt', def: 'Komunitas peluncuran produk global tempat produk bisa di-upvote dan menjadi Product of the Day.' },
      { term: 'Payment gateway', def: 'Kasir digital yang memproses pembayaran dari pelanggan ke rekeningmu. Contoh: Midtrans, Xendit, Mayar.' },
      { term: 'PPh Final UMKM', def: 'Pajak penghasilan final untuk usaha kecil di Indonesia, umumnya 0,5% dari omzet, dengan batas omzet tertentu yang bebas pajak.' },
      { term: 'Validasi ide', def: 'Proses menguji apakah orang mau memakai dan mau membayar, dilakukan sebelum membangun produk.' },
      { term: 'Akuisisi', def: 'Cara orang menemukan produkmu: konten, komunitas, peluncuran, atau rekomendasi. Pilih satu kanal dulu.' }
    ],

    quiz: [
      { q: 'Dalam berjualan produk AI, pertanyaan paling penting yang harus kamu jawab dulu apa?', o: ['Model AI apa yang paling baru', 'Masalah siapa yang selesai dengan produkku', 'Berapa banyak kode yang aku tulis', 'Brand-nya terlihat keren atau tidak'], a: 1, why: 'Nilai produk datang dari masalah pengguna yang terpecahkan, bukan dari kecanggihan teknologinya.' },
      { q: 'Yang paling tepat menggambarkan micro-SaaS adalah?', o: ['Software raksasa dengan ratusan fitur', 'Software kecil yang fokus menyelesaikan satu masalah spesifik', 'Aplikasi gratis tanpa model bisnis', 'Jasa desain logo perorangan'], a: 1, why: 'Micro-SaaS itu sempit dan fokus, cukup diurus satu-dua orang, dan biaya operasionalnya rendah.' },
      { q: 'Kamu menjual fitur yang memakai banyak token dan dipakai berat oleh pelanggan. Model harga mana yang paling aman?', o: ['Langganan flat murah tanpa batas', 'Gratis selamanya', 'Kredit atau pay-per-use dengan batas kuota', 'Bayar sekali untuk seumur hidup'], a: 2, why: 'Kalau biaya token naik seiring pemakaian, model kredit atau pay-per-use melindungi marginmu dari pelanggan yang memakai berlebihan.' },
      { q: 'Biaya API AI umumnya dihitung berdasarkan apa?', o: ['Jumlah karyawan tokomu', 'Token, dan harga input serta output bisa berbeda', 'Jumlah pengikut media sosialmu', 'Ukuran layar pengguna'], a: 1, why: 'Pemakaian dihitung per token. Harga input, output, dan cache bisa berbeda-beda per model.' },
      { q: 'Mana yang BUKAN payment gateway lokal Indonesia?', o: ['Midtrans', 'Xendit', 'Mayar', 'Lemon Squeezy'], a: 3, why: 'Lemon Squeezy adalah platform internasional yang umumnya dipakai untuk pembeli luar negeri. Midtrans, Xendit, dan Mayar adalah pemain lokal.' },
      { q: 'Untuk pelaku UMKM perorangan di Indonesia, tarif PPh Final yang umum berlaku atas omzet adalah berapa?', o: ['0,5%', '5%', '10%', '25%'], a: 0, why: 'PPh Final untuk UMKM umumnya 0,5% dari omzet, dengan batas omzet tertentu yang bebas pajak. Cek aturan terbaru di sumber resmi.' },
      { q: 'Cara paling tepat memvalidasi ide sebelum membangun produk?', o: ['Langsung koding 3 bulan tanpa bertanya ke siapa pun', 'Mengobrol dengan calon pengguna dan mencoba menjual versi awal lebih dulu', 'Meniru fitur kompetitor sebanyak mungkin', 'Menyewa kantor dan mencetak kartu nama'], a: 1, why: 'Validasi lewat wawancara masalah — hindari pertanyaan yang menggiring — dan uji jual murah serta cepat sebelum investasi besar.' },
      { q: 'Kalau menjual produk digital ke pembeli luar negeri lewat Lemon Squeezy, pajak seperti VAT umumnya bagaimana?', o: ['Kamu harus mengurusnya sendiri di tiap negara', 'Ditangani platform karena Lemon Squeezy berperan sebagai Merchant of Record', 'Tidak pernah ada pajak untuk transaksi digital', 'Dibayar oleh bank penerima'], a: 1, why: 'Sebagai Merchant of Record, Lemon Squeezy mengambil alih urusan pajak penjualan atau VAT global saat checkout.' }
    ],

    sources: [
      { title: 'Midtrans Documentation — dokumentasi resmi', url: 'https://docs.midtrans.com/', official: true },
      { title: 'Biaya transaksi Midtrans — halaman resmi', url: 'https://midtrans.com/id/biaya', official: true },
      { title: 'Xendit Documentation — dokumentasi resmi', url: 'https://developers.xendit.co/', official: true },
      { title: 'Mayar Docs — dokumentasi resmi', url: 'https://docs.mayar.id/', official: true },
      { title: 'Lemon Squeezy — Fees (dokumentasi resmi)', url: 'https://docs.lemonsqueezy.com/help/getting-started/fees', official: true },
      { title: 'Stripe Payments Documentation — dokumentasi resmi', url: 'https://docs.stripe.com/payments', official: true },
      { title: 'OpenAI API Pricing — dokumentasi resmi', url: 'https://developers.openai.com/api/docs/pricing', official: true },
      { title: 'Anthropic Pricing — halaman resmi', url: 'https://www.anthropic.com/pricing', official: true },
      { title: 'DJP — PPh Final UMKM (sumber resmi pemerintah)', url: 'https://www.pajak.go.id/id/pph-final-umkm', official: true },
      { title: 'Product Hunt — panduan peluncuran resmi', url: 'https://www.producthunt.com/launch', official: true },
      { title: 'Indie Hackers — komunitas pendiri bisnis online', url: 'https://www.indiehackers.com/', official: false }
    ]
  }
  ],

  /* =======================================================================
     UJIAN AKHIR — 20 soal, 4 dari tiap modul
     ======================================================================= */
  exam: {
    pass: 70,
    count: 20,
    questions: [
      /* --- modul 1 --- */
      { mod: 'm1', q: 'Apa yang membuat LLM bisa salah dengan sangat meyakinkan?', o: ['Karena dia sengaja berbohong', 'Karena tugasnya menebak teks yang terdengar masuk akal, bukan memverifikasi kebenaran', 'Karena koneksi internetnya lambat', 'Karena terlalu banyak pengguna'], a: 1, why: 'Model dilatih untuk menghasilkan teks yang paling mungkin dan terdengar wajar. Tidak ada mekanisme di dalamnya yang otomatis mengecek kebenaran fakta.' },
      { mod: 'm1', q: 'Kalau kamu menempel percakapan yang sangat panjang, apa yang biasanya terjadi?', o: ['Model jadi lebih pintar otomatis', 'Informasi paling lama bisa tergusur karena context window terbatas', 'Model berhenti menjawab sama sekali', 'Biaya token jadi nol'], a: 1, why: 'Context window itu terbatas seperti meja kerja. Kalau isinya melebihi kapasitas, informasi paling lama harus disingkirkan.' },
      { mod: 'm1', q: 'Perbedaan paling tepat antara training dan inference:', o: ['Training saat dipakai, inference saat belajar', 'Training masa model belajar dari data besar, inference saat model dipakai menjawab', 'Keduanya istilah untuk hal yang sama', 'Training dilakukan pengguna, inference dilakukan pembuat model'], a: 1, why: 'Training adalah proses belajar yang lama dan mahal serta dilakukan sekali. Inference adalah pemakaian sehari-hari yang cepat dan jauh lebih murah per pertanyaan.' },
      { mod: 'm1', q: 'Apa arti istilah multimodal?', o: ['Model bisa menerima lebih dari satu jenis input, misalnya teks dan gambar', 'Model bisa menjawab dalam banyak bahasa', 'Model bisa dipakai banyak orang sekaligus', 'Model bisa jalan tanpa internet'], a: 0, why: 'Multimodal berarti model memproses beberapa mode sekaligus. Itulah yang membuatnya bisa menganalisis foto atau screenshot yang kamu kirim.' },

      /* --- modul 2 --- */
      { mod: 'm2', q: 'Empat bagian prompt yang baik adalah?', o: ['Peran, tugas, konteks, format', 'Warna, ukuran, bentuk, gaya', 'Nama, alamat, nomor, tanggal', 'Input, output, proses, biaya'], a: 0, why: 'Peran menentukan AI bersikap sebagai siapa, tugas apa yang dikerjakan, konteks info latar yang tidak diketahui AI, format bentuk jawaban yang kamu mau.' },
      { mod: 'm2', q: 'Kapan few-shot lebih berguna daripada zero-shot?', o: ['Saat tugasnya sangat sederhana', 'Saat tugasnya punya pola khusus yang perlu dicontohkan', 'Saat kamu ingin jawaban lebih pendek', 'Saat koneksi internet lambat'], a: 1, why: 'Few-shot memberi beberapa contoh agar AI meniru pola yang kamu mau. Untuk tugas sederhana, zero-shot sudah cukup dan lebih cepat.' },
      { mod: 'm2', q: 'Kenapa delimiter seperti ### penting saat kamu menempel teks panjang?', o: ['Supaya jawaban lebih berwarna', 'Supaya model bisa membedakan mana instruksi dan mana data yang diolah', 'Supaya biaya token lebih murah', 'Supaya model menjawab lebih cepat'], a: 1, why: 'Tanpa pemisah yang jelas, model bisa salah menangkap bagian mana yang harus dikerjakan dan bagian mana yang cuma isi atau contoh.' },
      { mod: 'm2', q: 'Kamu minta AI mengubah data menjadi JSON agar bisa diolah aplikasi. Ini bagian apa dari anatomi prompt?', o: ['Peran', 'Tugas', 'Konteks', 'Format'], a: 3, why: 'Menentukan bentuk jawaban — JSON, tabel, jumlah kata — adalah bagian format. Ini yang membuat hasilnya bisa langsung dipakai mesin.' },

      /* --- modul 3 --- */
      { mod: 'm3', q: 'Menurut pembedaan yang umum dipakai, kapan sebuah sistem disebut agent dan bukan workflow?', o: ['Kalau langkah-langkahnya sudah ditentukan kode', 'Kalau modelnya sendiri yang memutuskan langkah berikutnya', 'Kalau sistemnya berjalan di server', 'Kalau sistemnya memakai model terbaru'], a: 1, why: 'Kalau alurnya sudah dipatok oleh kode, itu workflow. Baru disebut agent kalau model yang menentukan langkah berikutnya berdasarkan hasil yang dia lihat.' },
      { mod: 'm3', q: 'Apa fungsi batas maksimal putaran pada agent?', o: ['Membuat jawaban lebih panjang', 'Mencegah agent berputar tanpa henti dan mengendalikan biaya', 'Meningkatkan kepintaran model', 'Menghapus riwayat percakapan'], a: 1, why: 'Tanpa batas putaran, agent bisa berputar selamanya tanpa selesai — dan setiap putaran memanggil model, jadi biayanya juga membengkak.' },
      { mod: 'm3', q: 'Apa yang dimaksud prompt injection pada agent?', o: ['Prompt yang terlalu panjang', 'Teks jahat yang menyusup lewat data yang dibaca agent lalu membelokkan perintahnya', 'Kesalahan penulisan prompt oleh pengguna', 'Prompt yang ditulis dalam bahasa asing'], a: 1, why: 'Karena agent membaca konten dari luar — halaman web, dokumen, pesan — konten itu bisa berisi perintah tersembunyi yang membelokkan perilaku agent.' },
      { mod: 'm3', q: 'Apa keuntungan utama pola multi-agent?', o: ['Selalu lebih murah daripada satu agent', 'Beberapa peran khusus bisa bekerja sama sehingga tugas bersudut banyak lebih rapi', 'Tidak perlu lagi pengawasan manusia', 'Tidak butuh alat apa pun'], a: 1, why: 'Membagi peran seperti peneliti, penulis, dan pemeriksa membuat tugas kompleks lebih rapi. Tapi konsekuensinya lebih boros biaya dan tetap butuh pengawasan.' },

      /* --- modul 4 --- */
      { mod: 'm4', q: 'Apa yang membuat vibe coding berbeda dari ngoding biasa yang dibantu AI?', o: ['Alat yang dipakai', 'Kodenya diterima tanpa dibaca atau dipahami', 'Bahasanya harus Inggris', 'Harus dijalankan di cloud'], a: 1, why: 'Alatnya bisa sama. Yang membedakan adalah apakah kamu membaca dan memahami kodenya. Menerima semua perubahan tanpa membaca itu ciri vibe coding.' },
      { mod: 'm4', q: 'Kenapa dependency palsu harus dianggap bahaya keamanan, bukan sekadar bug?', o: ['Karena membuat program lambat', 'Karena penyerang bisa mendaftarkan nama paket yang disebut AI, lalu menunggu korban memasangnya', 'Karena mengubah tampilan aplikasi', 'Karena memakan kuota internet'], a: 1, why: 'Paket yang disebut AI tapi sebenarnya tidak ada bisa didaftarkan oleh pihak jahat. Korban yang memasangnya tanpa memeriksa justru memasang kode serangan.' },
      { mod: 'm4', q: 'Kapan aturan amannya berhenti memakai vibe coding tanpa pendampingan?', o: ['Saat membuat alat pribadi yang receh', 'Saat membuat prototipe untuk uji ide', 'Saat aplikasinya menyimpan data pribadi orang lain atau menangani pembayaran', 'Saat belajar membuat game kecil'], a: 2, why: 'Begitu ada risiko orang lain dirugikan — data, uang, reputasi — proyek itu tidak lagi berisiko rendah dan butuh pengawasan orang berpengalaman.' },
      { mod: 'm4', q: 'Error sudah hilang setelah AI mengubah kode. Apa yang tetap harus kamu curigai?', o: ['AI mungkin menutupi masalah dengan mematikan pemeriksaan error', 'AI pasti memperbaikinya dengan sempurna', 'Error akan selalu muncul lagi esok hari', 'Tidak ada yang perlu dicurigai'], a: 0, why: 'Kadang AI membuat error hilang dengan cara yang justru menyembunyikan masalah aslinya. Error hilang tidak sama dengan masalah selesai.' },

      /* --- modul 5 --- */
      { mod: 'm5', q: 'Kamu punya fitur yang berat biaya token dan dipakai beberapa pelanggan secara intens. Kenapa langganan flat tanpa batas berisiko?', o: ['Karena sulit dijelaskan ke pelanggan', 'Karena biaya tokenmu naik seiring pemakaian, sementara pemasukanmu tetap', 'Karena payment gateway menolak model langganan', 'Karena pelanggan tidak suka langganan'], a: 1, why: 'Model langganan flat memindahkan risiko pemakaian berlebihan ke kamu. Kalau biaya variabelnya besar, pengguna terberat bisa membuatmu rugi.' },
      { mod: 'm5', q: 'Apa langkah paling masuk akal sebelum membangun produk AI baru?', o: ['Memilih model AI termahal', 'Membicarakan masalahnya dengan calon pengguna dan menguji minat beli', 'Membangun versi terlengkap dulu', 'Membuat logo dan nama brand'], a: 1, why: 'Validasi lebih dulu. Kalau tidak ada orang dengan masalah yang cukup menyakitkan dan mau membayar, kualitas produknya tidak akan menolong.' },
      { mod: 'm5', q: 'Kenapa paket gratis tanpa batas berbahaya untuk produk AI?', o: ['Karena membuat aplikasi lambat', 'Karena biaya token jalan terus sementara pemasukan nol', 'Karena tidak disukai pengguna', 'Karena melanggar aturan payment gateway'], a: 1, why: 'Setiap pemakaian menambah biaya nyata. Gratis tanpa batas berarti kamu menanggung biaya orang lain tanpa batas juga. Batasi kuota atau batasi waktunya.' },
      { mod: 'm5', q: 'Apa praktik paling aman saat berjualan digital ke pembeli luar negeri?', o: ['Mengurus pajak tiap negara satu per satu', 'Memakai platform yang berperan sebagai Merchant of Record sehingga urusan pajak penjualan ditangani platform', 'Tidak perlu memikirkan pajak sama sekali', 'Meminta pembeli mengurus pajaknya sendiri'], a: 1, why: 'Merchant of Record mengambil alih kewajiban pajak penjualan atau VAT global saat checkout — jauh lebih praktis untuk penjual perorangan.' }
    ]
  },

  /* =======================================================================
     ROADMAP LANJUTAN (setelah 5 modul)
     ======================================================================= */
  roadmap: [
    {
      title: 'Memanggil model lewat API',
      body: 'Tahap paling menentukan: berhenti memakai AI lewat kotak obrolan, mulai memanggilnya dari kodemu sendiri. Di sini kamu belajar mengirim permintaan, mengatur parameter, menangani error, dan menghitung biaya per permintaan. Semua hal lain di roadmap ini bergantung pada kemampuan ini.',
      tags: ['HTTP request', 'API key', 'streaming', 'hitung biaya', 'error handling'],
      first: 'bikin satu skrip kecil yang mengirim satu prompt ke API dan mencetak jawabannya. Jangan tambah fitur apa pun sebelum ini jalan.',
      sources: [
        { title: 'OpenAI API — dokumentasi resmi', url: 'https://platform.openai.com/docs/guides/text-generation' },
        { title: 'Claude API — dokumentasi resmi Anthropic', url: 'https://docs.anthropic.com/en/docs/build-with-claude/text-generation' },
        { title: 'Gemini API — dokumentasi resmi Google', url: 'https://ai.google.dev/gemini-api/docs/text-generation' }
      ]
    },
    {
      title: 'RAG: memberi model pengetahuanmu sendiri',
      body: 'Model tidak tahu isi dokumenmu. RAG menyelesaikannya: dokumenmu dipecah, diubah jadi vektor, disimpan, lalu bagian yang paling relevan disisipkan ke prompt sebelum model menjawab. Ini cara paling murah dan paling cepat memberi model pengetahuan khusus — jauh sebelum kamu berpikir soal fine-tuning.',
      tags: ['embedding', 'vector database', 'chunking', 'reranking', 'sitasi sumber'],
      first: 'ambil 20 dokumen milikmu, bikin pencarian sederhana yang mengembalikan potongan paling relevan, baru sambungkan ke model.',
      sources: [
        { title: 'LangChain — dokumentasi resmi RAG', url: 'https://docs.langchain.com/oss/python/langchain/retrieval' },
        { title: 'LlamaIndex — dokumentasi resmi', url: 'https://docs.llamaindex.ai/en/stable/' },
        { title: 'OpenAI — Embeddings guide', url: 'https://platform.openai.com/docs/guides/embeddings' }
      ]
    },
    {
      title: 'Fine-tuning: mengubah perilaku, bukan pengetahuan',
      body: 'Fine-tuning bukan cara menambah fakta baru — itu tugas RAG. Fine-tuning dipakai kalau kamu butuh model mengikuti gaya, format, atau pola keputusan yang sangat spesifik dan konsisten, atau kalau kamu ingin model yang lebih kecil supaya lebih murah dan cepat. Butuh ratusan contoh berkualitas, biaya, dan evaluasi yang serius. Urutannya selalu: prompt dulu, RAG kalau perlu pengetahuan, fine-tuning terakhir.',
      tags: ['dataset', 'LoRA', 'evaluasi', 'biaya', 'model kecil'],
      first: 'kumpulkan minimal 200 contoh input dan output ideal dari kasusmu sendiri, lalu ukur dulu seberapa jauh prompt + RAG sudah menyelesaikannya. Kalau sudah cukup, jangan fine-tuning.',
      sources: [
        { title: 'OpenAI — Fine-tuning guide', url: 'https://platform.openai.com/docs/guides/fine-tuning' },
        { title: 'Anthropic — dokumentasi', url: 'https://docs.anthropic.com/en/docs/overview' },
        { title: 'Hugging Face — LLM Course (fine-tuning)', url: 'https://huggingface.co/learn/llm-course/chapter1/1' }
      ]
    }
  ]
};
