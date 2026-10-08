/* ==========================================================================
   AI Mastery ID — app.js
   Satu halaman, banyak layar. Semua status di localStorage. Tanpa dependensi.
   ========================================================================== */
(function () {
  'use strict';

  var KEY = 'aiMastery.v1';
  var PASS = 70;

  /* ------------------------------------------------------------------ util */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function barCss(pct) {
    var p = Math.max(0, Math.min(100, pct));
    return 'style="clip-path:inset(0 ' + (100 - p) + '% 0 0)"';
  }
  function icon(name, cls, size) {
    var s = size || 18;
    return '<svg class="' + (cls || '') + '" width="' + s + '" height="' + s + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  }
  function shuffle(a) {
    var arr = a.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }
  function todayKey(d) {
    d = d || new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function fmtDateID(ts) {
    var bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    var d = new Date(ts);
    return d.getDate() + ' ' + bulan[d.getMonth()] + ' ' + d.getFullYear();
  }
  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    t.innerHTML = icon('check') + '<span>' + esc(msg) + '</span>';
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2400);
  }

  /* --------------------------------------------------------------- storage */
  function blank() {
    return {
      v: 1, name: 'Siswa AI', nameSet: false, createdAt: Date.now(),
      modules: {}, exam: { attempts: [] }, cert: null,
      days: {}, lastDay: null, streak: { current: 0, best: 0 }
    };
  }
  var S = load();

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return blank();
      var d = JSON.parse(raw);
      var b = blank();
      for (var k in b) if (!(k in d)) d[k] = b[k];
      return d;
    } catch (e) { return blank(); }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); }
    catch (e) { toast('Penyimpanan penuh — progres mungkin tidak tersimpan'); }
  }
  function modState(id) {
    if (!S.modules[id]) S.modules[id] = { read: false, lastLesson: 0, scroll: 0, quiz: { best: 0, attempts: [] }, fc: { seen: {}, mastered: {} } };
    var m = S.modules[id];
    if (!m.quiz) m.quiz = { best: 0, attempts: [] };
    if (!m.fc) m.fc = { seen: {}, mastered: {} };
    return m;
  }
  function touch() {
    var t = todayKey();
    var y = todayKey(new Date(Date.now() - 864e5));
    if (S.lastDay !== t) {
      S.streak.current = (S.lastDay === y) ? (S.streak.current + 1) : 1;
      S.lastDay = t;
      if (S.streak.current > S.streak.best) S.streak.best = S.streak.current;
    }
    S.days[t] = (S.days[t] || 0) + 1;
    save();
  }

  /* ------------------------------------------------------------- turunan   */
  function moduleProgress(id) {
    var st = modState(id);
    var doneRead = st.read ? 0.5 : 0;
    var doneQuiz = (st.quiz.best >= PASS) ? 0.5 : 0;
    return doneRead + doneQuiz;
  }
  function overallProgress() {
    var sum = 0;
    COURSE.modules.forEach(function (m) { sum += moduleProgress(m.id); });
    var pct = (sum / COURSE.modules.length) * 90;
    if (examPassed()) pct += 10;
    return Math.round(pct);
  }
  function examPassed() {
    return S.exam.attempts.some(function (a) { return a.score >= PASS; });
  }
  function examBest() {
    return S.exam.attempts.reduce(function (mx, a) { return Math.max(mx, a.score); }, 0);
  }
  function allScores() {
    var out = [];
    COURSE.modules.forEach(function (m) {
      modState(m.id).quiz.attempts.forEach(function (a) { out.push(a.score); });
    });
    S.exam.attempts.forEach(function (a) { out.push(a.score); });
    return out;
  }
  function avgScore() {
    var s = allScores();
    if (!s.length) return null;
    return Math.round(s.reduce(function (a, b) { return a + b; }, 0) / s.length);
  }
  function modulesDone() {
    return COURSE.modules.filter(function (m) { return modState(m.id).quiz.best >= PASS; }).length;
  }
  function modById(id) {
    for (var i = 0; i < COURSE.modules.length; i++) if (COURSE.modules[i].id === id) return COURSE.modules[i];
    return null;
  }
  function modIndex(id) {
    for (var i = 0; i < COURSE.modules.length; i++) if (COURSE.modules[i].id === id) return i;
    return -1;
  }
  function nextThing() {
    for (var i = 0; i < COURSE.modules.length; i++) {
      var m = COURSE.modules[i], st = modState(m.id);
      if (!st.read) return { kind: 'read', mod: m };
      if (st.quiz.best < PASS) return { kind: 'quiz', mod: m };
    }
    if (!examPassed()) return { kind: 'exam', mod: null };
    return { kind: 'cert', mod: null };
  }

  /* --------------------------------------------------------------- routing */
  var current = { route: 'home' };
  function setTab(name) {
    $$('.tab').forEach(function (b) {
      if (b.dataset.go === name) b.setAttribute('aria-current', 'page');
      else b.removeAttribute('aria-current');
    });
  }
  function show(screenId) {
    $$('.screen').forEach(function (s) { s.classList.remove('active'); });
    var s = document.getElementById(screenId);
    if (s) s.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  function go(route, opts) {
    current = { route: route, opts: opts || {} };
    if (route === 'home') { renderHome(); show('screen-home'); setTab('home'); }
    else if (route === 'modules') { renderModuleList(); show('screen-module'); setTab('modules'); }
    else if (route.indexOf('module:') === 0) { renderModule(route.slice(7)); show('screen-module'); setTab('modules'); }
    else if (route === 'flashpick') { renderFlashPick(); show('screen-flashpick'); setTab('modules'); }
    else if (route.indexOf('quiz:') === 0) { startQuiz(route.slice(5)); show('screen-quiz'); setTab('modules'); }
    else if (route.indexOf('flash:') === 0) { startFlash(route.slice(6)); show('screen-flash'); setTab('modules'); }
    else if (route === 'exam') { renderExamIntro(); show('screen-exam'); setTab('exam'); }
    else if (route === 'cert') { renderCert(); show('screen-cert'); setTab('exam'); }
    else if (route === 'stats') { renderStats(); show('screen-stats'); setTab('stats'); }
    else if (route === 'roadmap') { renderRoadmap(); show('screen-roadmap'); setTab('roadmap'); }
    updateRail();
    try { if (location.hash !== '#' + route) history.replaceState(null, '', '#' + route); }
    catch (e) { /* file:// bisa menolak replaceState */ }
  }

  var ROUTES = /^(home|modules|flashpick|exam|cert|stats|roadmap)$/;
  var ROUTES_ID = /^(module|quiz|flash):[\w-]+$/;
  function routeFromHash(h) {
    if (!h) return null;
    if (h === 'lanjut') return '__resume';
    if (h === 'statistik') return 'stats';
    if (ROUTES.test(h) || ROUTES_ID.test(h)) return h;
    return null;
  }

  function updateRail() {
    var p = overallProgress();
    var rail = $('#topRail');
    $('i', rail).style.clipPath = 'inset(0 ' + (100 - p) + '% 0 0)';
    rail.setAttribute('aria-valuenow', String(p));
    var w = $('#whoName');
    if (w) w.textContent = S.name;
  }

  /* ---------------------------------------------------------------- beranda */
  function renderHome() {
    var n = nextThing();
    var p = overallProgress();
    $('#resumeBar').style.clipPath = 'inset(0 ' + (100 - p) + '% 0 0)';
    $('#resumePct').textContent = p + '%';
    $('#homeGreet').textContent = 'Halo, ' + S.name;

    var label, btn;
    if (n.kind === 'read') { label = 'Modul ' + n.mod.n + ' · ' + n.mod.title; btn = 'Lanjutkan Modul ' + n.mod.n; }
    else if (n.kind === 'quiz') { label = 'Kuis Modul ' + n.mod.n + ' belum lulus (min ' + PASS + ')'; btn = 'Kerjakan Kuis Modul ' + n.mod.n; }
    else if (n.kind === 'exam') { label = 'Semua modul beres — waktunya ujian akhir'; btn = 'Mulai Ujian Akhir'; }
    else { label = 'Lulus! Sertifikatmu sudah siap'; btn = 'Lihat Sertifikat'; }
    $('#resumeLabel').textContent = label;
    $('#resumeBtnLabel').textContent = btn;

    if (n.kind === 'read') {
      var st = modState(n.mod.id);
      $('#resumeBtnLabel').textContent = (st.read ? 'Lanjutkan' : 'Mulai') + ' Modul ' + n.mod.n;
    }

    /* rel modul */
    var rail = $('#moduleRail');
    rail.innerHTML = '';
    COURSE.modules.forEach(function (m, i) {
      var ms = modState(m.id);
      var done = ms.quiz.best >= PASS;
      var cls = 'mod' + (done ? ' is-done' : (ms.read ? ' is-now' : ''));
      var sub = done
        ? 'Lulus kuis · skor ' + ms.quiz.best
        : (ms.read ? 'Sudah dibaca · kuis belum lulus' : m.minutes + ' menit baca');
      var li = el('li', '', '');
      li.innerHTML =
        '<button class="' + cls + '" data-go="module:' + m.id + '">' +
        '<span class="mod__num">' + (done ? '<svg width="20" height="20" aria-hidden="true"><use href="#i-check"/></svg>' : m.n) + '</span>' +
        '<span class="mod__body"><span class="mod__title">' + esc(m.title) + '</span>' +
        '<span class="mod__sub">' + esc(sub) + '</span></span>' +
        '<svg class="mod__chev" aria-hidden="true"><use href="#i-chev"/></svg>' +
        '</button>';
      li.querySelector('button').style.setProperty('--i', String(i + 2));
      rail.appendChild(li);
    });
  }

  /* ----------------------------------------------------------- daftar modul */
  function renderModuleList() {
    var sec = $('#screen-module');
    sec.innerHTML = '';
    var h = el('div', 'card', '');
    h.style.setProperty('--i', '0');
    h.innerHTML =
      '<p class="eyebrow">Kurikulum</p>' +
      '<h1 id="modTitle">Lima modul, urut dari nol.</h1>' +
      '<p class="lede">Baca materinya, coba contohnya, lalu buktikan pemahamanmu lewat kuis. Modul dianggap beres kalau skor kuisnya minimal ' + PASS + '.</p>' +
      '<div class="tiles" style="margin:18px 0 0">' +
      tile('Modul beres', modulesDone() + '/' + COURSE.modules.length, '') +
      tile('Rata-rata skor', avgScore() == null ? '—' : avgScore() + '%', 'tile--ok') +
      '</div>';
    sec.appendChild(h);

    COURSE.modules.forEach(function (m, i) {
      var ms = modState(m.id);
      var done = ms.quiz.best >= PASS;
      var card = el('div', 'card');
      card.style.setProperty('--i', String(i + 1));
      var pills = [];
      pills.push(done
        ? '<span class="pill pill--done">' + icon('check') + 'Modul beres</span>'
        : (ms.read ? '<span class="pill pill--now">' + icon('book') + 'Sudah dibaca</span>' : '<span class="pill">' + icon('book') + 'Belum dibaca</span>'));
      pills.push('<span class="pill">' + icon('cards') + Object.keys(ms.fc.mastered).length + '/' + m.cards.length + ' kartu</span>');
      pills.push('<span class="pill">' + icon('award') + 'Skor kuis: ' + (ms.quiz.attempts.length ? ms.quiz.best : '—') + '</span>');

      card.innerHTML =
        '<div style="display:flex;gap:16px;align-items:flex-start">' +
        '<span class="mod__num' + (done ? ' is-done' : '') + '" style="width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-family:\'Baloo 2\',sans-serif;font-weight:700;background:var(--c-primary-wash);color:var(--c-primary-deep);flex:none">' + m.n + '</span>' +
        '<div style="flex:1;min-width:0">' +
        '<h2 style="font-size:1.22rem">' + esc(m.title) + '</h2>' +
        '<p class="tiny" style="margin:4px 0 12px">' + esc(m.tagline) + '</p>' +
        '<div class="chips" style="margin-bottom:16px">' + pills.join('') + '</div>' +
        '</div></div>' +
        '<div class="btn-row">' +
        '<button class="btn" data-go="module:' + m.id + '">' + icon('book') + (ms.read ? 'Buka materi' : 'Mulai baca') + '</button>' +
        '<button class="btn btn--ghost" data-go="quiz:' + m.id + '">' + icon('award') + 'Kuis modul</button>' +
        '<button class="btn btn--ghost" data-go="flash:' + m.id + '">' + icon('cards') + 'Flashcard</button>' +
        '</div>';
      sec.appendChild(card);
    });
  }
  function tile(label, val, cls) {
    return '<div class="tile ' + (cls || '') + '"><div class="tile__n">' + esc(val) + '</div><div class="tile__l">' + esc(label) + '</div></div>';
  }

  /* ------------------------------------------------------------ detail modul */
  function renderModule(id) {
    var m = modById(id);
    if (!m) { go('modules'); return; }
    var ms = modState(id);
    var wasRead = ms.read;
    ms.read = true;
    if (!wasRead) touch();
    save();

    var sec = $('#screen-module');
    sec.innerHTML = '';

    var head = el('div', 'card');
    head.style.setProperty('--i', '0');
    head.innerHTML =
      '<div class="btn-row" style="margin-bottom:16px">' +
      '<button class="btn btn--quiet btn--sm" data-go="modules">' + icon('back') + 'Semua modul</button>' +
      '<span class="pill">' + icon('list') + 'Modul ' + m.n + ' dari ' + COURSE.modules.length + '</span>' +
      '<span class="pill">' + icon('book') + '± ' + m.minutes + ' menit</span>' +
      '</div>' +
      '<div class="mod-head">' +
      '<span class="mod-head__badge" aria-hidden="true">' + icon(m.icon, '', 26) + '</span>' +
      '<div class="mod-head__text">' +
      '<p class="eyebrow">Modul ' + m.n + '</p>' +
      '<h1 id="modTitle">' + esc(m.title) + '</h1>' +
      '</div></div>' +
      '<p class="lede">' + esc(m.tagline) + '</p>' +
      '<p style="margin-top:14px">' + esc(m.intro) + '</p>';
    sec.appendChild(head);

    if (ms.lastLesson > 0) {
      var jump = el('div', 'card card--wash');
      jump.style.setProperty('--i', '1');
      jump.innerHTML =
        '<div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap">' +
        '<div style="flex:1;min-width:180px"><b>Terakhir kamu berhenti di bagian ' + (ms.lastLesson + 1) + '.</b>' +
        '<p class="tiny" style="margin:4px 0 0">Posisi bacaanmu tersimpan otomatis.</p></div>' +
        '<button class="btn btn--ghost btn--sm" id="jumpBtn">' + icon('play') + 'Lanjut dari situ</button>' +
        '</div>';
      sec.appendChild(jump);
      jump.querySelector('#jumpBtn').addEventListener('click', function () {
        var t = document.getElementById('lesson-' + ms.lastLesson);
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    /* penjelasan */
    var wrap = el('div', 'card');
    wrap.style.setProperty('--i', '2');
    var lhtml = '<div class="section-title" style="margin-top:0">' + icon('bulb') + '<h2>Penjelasan simpel</h2></div>';
    m.lessons.forEach(function (l, i) {
      lhtml += '<div class="lesson" id="lesson-' + i + '">' +
        '<h3><i>' + (i + 1) + '</i>' + esc(l.t) + '</h3>' +
        l.p.map(function (p) { return '<p>' + p + '</p>'; }).join('') +
        (l.analogy ? '<div class="analogy"><b>Analogi:</b> ' + l.analogy + '</div>' : '') +
        '</div>';
    });
    wrap.innerHTML = lhtml;
    sec.appendChild(wrap);

    /* contoh praktis */
    var ex = el('div', 'card');
    ex.style.setProperty('--i', '3');
    var ehtml = '<div class="section-title" style="margin-top:0">' + icon('wand') + '<h2>Contoh praktis</h2></div>';
    m.examples.forEach(function (x) {
      if (x.bad && x.good) {
        ehtml += '<p style="font-weight:800;margin-bottom:10px">' + esc(x.label) + '</p>';
        ehtml += '<div class="duo">' +
          '<div class="bad"><h3>' + icon('x') + 'Prompt lemah</h3><pre style="white-space:pre-wrap;font-size:.84rem;margin:0">' + esc(x.bad) + '</pre></div>' +
          '<div class="good"><h3>' + icon('check') + 'Prompt lebih baik</h3><pre style="white-space:pre-wrap;font-size:.84rem;margin:0">' + esc(x.good) + '</pre></div>' +
          '</div>';
        if (x.why) ehtml += '<p class="tiny" style="margin:-4px 0 20px">' + esc(x.why) + '</p>';
      } else {
        ehtml += promptBox(x.label, x.prompt, x.note);
      }
    });
    ex.innerHTML = ehtml;
    sec.appendChild(ex);
    bindCopy(ex);

    /* kesalahan umum */
    if (m.mistakes && m.mistakes.length) {
      var mk = el('div', 'card');
      mk.style.setProperty('--i', '4');
      mk.innerHTML = '<div class="section-title" style="margin-top:0">' + icon('alert') + '<h2>Sering salah dipahami</h2></div>' +
        '<ul>' + m.mistakes.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>';
      sec.appendChild(mk);
    }

    /* flashcard pintas */
    var fcb = el('div', 'card');
    fcb.style.setProperty('--i', '5');
    var mastered = Object.keys(ms.fc.mastered).length;
    fcb.innerHTML =
      '<div class="section-title" style="margin-top:0">' + icon('cards') + '<h2>Flashcard istilah</h2></div>' +
      '<p>' + m.cards.length + ' istilah penting di modul ini. ' + (mastered ? 'Kamu sudah menandai ' + mastered + ' sebagai paham.' : 'Belum ada yang kamu tandai paham.') + '</p>' +
      '<div class="btn-row" style="margin-top:14px"><button class="btn btn--ghost btn--block" data-go="flash:' + m.id + '">' + icon('cards') + 'Latih flashcard modul ini</button></div>';
    sec.appendChild(fcb);

    /* sumber */
    var sc = el('div', 'card');
    sc.style.setProperty('--i', '6');
    sc.innerHTML = '<div class="section-title" style="margin-top:0">' + icon('link') + '<h2>Sumber materi</h2></div>' +
      '<p class="tiny">Materi di atas ditulis ulang dengan kata sendiri. Ini rujukan aslinya kalau kamu mau gali lebih dalam.</p>' +
      '<ul class="sources">' + m.sources.map(function (s) {
        return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' +
          (s.official ? '<span class="tag">Resmi</span>' : '<span class="tag tag--ref">Rujukan</span>') +
          '<span>' + esc(s.title) + '</span></a></li>';
      }).join('') + '</ul>';
    sec.appendChild(sc);

    /* aksi */
    var act = el('div', 'card card--wash');
    act.style.setProperty('--i', '7');
    var qs = ms.quiz;
    act.innerHTML =
      '<h2 style="margin-bottom:8px">Sudah paham? Uji sekarang.</h2>' +
      '<p class="tiny" style="margin-bottom:16px">' + (qs.attempts.length ? 'Skor terbaikmu di modul ini: <b>' + qs.best + '</b> (minimal lulus ' + PASS + ').' : 'Kuis singkat 5 soal. Skor minimal lulus ' + PASS + '.') + '</p>' +
      '<div class="btn-row">' +
      '<button class="btn btn--accent" data-go="quiz:' + m.id + '">' + icon('award') + (qs.attempts.length ? 'Ulangi kuis' : 'Mulai kuis') + '</button>' +
      (modIndex(m.id) < COURSE.modules.length - 1
        ? '<button class="btn btn--ghost" data-go="module:' + COURSE.modules[modIndex(m.id) + 1].id + '">Modul berikutnya' + icon('chev') + '</button>'
        : '<button class="btn btn--ghost" data-go="exam">Ke ujian akhir' + icon('chev') + '</button>') +
      '</div>';
    sec.appendChild(act);

    /* simpan posisi baca */
    trackReading(id);
  }

  function promptBox(label, prompt, note) {
    return '<div class="prompt">' +
      '<div class="prompt__head"><span class="prompt__label">' + esc(label) + '</span>' +
      '<button class="copy" data-copy="' + esc(prompt) + '">' + icon('copy') + 'Salin</button></div>' +
      '<pre>' + esc(prompt) + '</pre>' +
      (note ? '<p class="prompt__note">' + esc(note) + '</p>' : '') +
      '</div>';
  }
  function bindCopy(root) {
    $$('.copy', root).forEach(function (b) {
      b.addEventListener('click', function () {
        var text = b.getAttribute('data-copy');
        var done = function () {
          b.classList.add('is-done');
          b.innerHTML = icon('check') + 'Tersalin';
          toast('Prompt disalin ke clipboard');
          setTimeout(function () {
            b.classList.remove('is-done');
            b.innerHTML = icon('copy') + 'Salin';
          }, 1800);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
        } else { fallbackCopy(text, done); }
      });
    });
  }
  function fallbackCopy(text, cb) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;left:-9999px;top:0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); cb(); }
    catch (e) { toast('Gagal menyalin — salin manual ya'); }
    document.body.removeChild(ta);
  }

  var readingObserver = null;
  function trackReading(id) {
    var ms = modState(id);
    if (readingObserver) readingObserver.disconnect();
    var lessons = $$('.lesson');
    if (!lessons.length) return;
    readingObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var idx = parseInt(e.target.id.replace('lesson-', ''), 10);
          if (!isNaN(idx) && idx > (ms.lastLesson || 0) - 1) {
            ms.lastLesson = idx;
            save();
          }
        }
      });
    }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });
    lessons.forEach(function (l) { readingObserver.observe(l); });
  }

  /* ------------------------------------------------------------------ kuis  */
  var quiz = null;
  function startQuiz(modId) {
    var m = modById(modId);
    if (!m) { go('modules'); return; }
    var pool = shuffle(m.quiz);
    var n = Math.min(5, pool.length);
    quiz = {
      mode: 'module', modId: modId, title: 'Kuis Modul ' + m.n,
      qs: pool.slice(0, n).map(function (q) { return prepQ(q); }),
      i: 0, answers: [], answered: false
    };
    renderQuizQuestion();
  }
  function prepQ(q) {
    var idx = q.o.map(function (_, i) { return i; });
    var order = shuffle(idx);
    var opts = order.map(function (oi) { return q.o[oi]; });
    var ans = order.indexOf(q.a);
    return { q: q.q, o: opts, a: ans, why: q.why, mod: q.mod || null, picked: -1 };
  }
  function renderQuizQuestion() {
    var sec = $('#screen-quiz');
    var q = quiz.qs[quiz.i];
    var total = quiz.qs.length;
    sec.innerHTML = '';

    var card = el('div', 'card');
    card.style.setProperty('--i', '0');
    card.innerHTML =
      '<div class="quiz-head">' +
      '<span class="qtag">' + esc(quiz.title) + '</span>' +
      '<span class="pill">Soal ' + (quiz.i + 1) + ' / ' + total + '</span>' +
      '</div>' +
      '<div class="bar" style="margin-bottom:20px"><i ' + barCss(Math.round((quiz.i / total) * 100)) + '></i></div>' +
      '<h2 class="qtext" id="quizTitle">' + esc(q.q) + '</h2>' +
      '<div class="opts" id="opts"></div>' +
      '<div id="fbSlot" style="margin-top:20px"></div>' +
      '<div id="nextSlot" style="margin-top:20px"></div>';
    sec.appendChild(card);

    var opts = $('#opts', card);
    var keys = ['A', 'B', 'C', 'D'];
    q.o.forEach(function (text, i) {
      var b = el('button', 'opt');
      b.type = 'button';
      b.innerHTML = '<span class="opt__k">' + keys[i] + '</span><span>' + esc(text) + '</span>';
      b.addEventListener('click', function () { answer(i, card); });
      opts.appendChild(b);
    });
    quiz.answered = false;
  }
  function answer(picked, card) {
    if (quiz.answered) return;
    quiz.answered = true;
    var q = quiz.qs[quiz.i];
    q.picked = picked;
    var ok = picked === q.a;
    var btns = $$('.opt', card);
    btns.forEach(function (b, i) {
      b.disabled = true;
      if (i === q.a) b.classList.add('is-right');
      if (i === picked && !ok) b.classList.add('is-wrong');
    });
    quiz.answers.push(ok);
    touch();

    $('#fbSlot', card).innerHTML =
      '<div class="feedback ' + (ok ? 'ok' : 'no') + '">' +
      '<h3>' + (ok ? 'Tepat!' : 'Belum tepat') + '</h3>' +
      '<p>' + esc(q.why) + '</p></div>';

    var last = quiz.i === quiz.qs.length - 1;
    var slot = $('#nextSlot', card);
    var nb = el('button', 'btn btn--block' + (last ? ' btn--accent' : ''));
    nb.innerHTML = last ? 'Lihat hasil' : 'Soal berikutnya';
    nb.addEventListener('click', function () {
      if (last) finishQuiz();
      else { quiz.i++; renderQuizQuestion(); }
    });
    slot.appendChild(nb);
    nb.focus();
  }
  function finishQuiz() {
    var total = quiz.qs.length;
    var correct = quiz.answers.filter(Boolean).length;
    var score = Math.round((correct / total) * 100);

    if (quiz.mode === 'module') {
      var ms = modState(quiz.modId);
      ms.quiz.attempts.push({ date: Date.now(), score: score, correct: correct, total: total });
      if (score > ms.quiz.best) ms.quiz.best = score;
      touch();
    } else {
      S.exam.attempts.push({ date: Date.now(), score: score, correct: correct, total: total });
      if (score >= PASS) {
        if (!S.cert) {
          S.cert = { name: S.name, score: score, date: Date.now(), id: certId() };
        } else if (score > S.cert.score) {
          S.cert.score = score; S.cert.date = Date.now(); S.cert.name = S.name;
        }
      }
      touch();
    }
    save();
    renderQuizResult(correct, total, score);
    updateRail();
  }
  function certId() {
    var s = 'AIM';
    for (var i = 0; i < 8; i++) s += Math.floor(Math.random() * 10);
    return s;
  }
  function renderQuizResult(correct, total, score) {
    var sec = $('#screen-quiz');
    sec.innerHTML = '';
    var pass = score >= PASS;
    var card = el('div', 'card');
    card.style.setProperty('--i', '0');
    card.innerHTML =
      '<h1 class="sr-only" id="quizTitle">Hasil ' + esc(quiz.title) + '</h1>' +
      '<div class="score-hero ' + (pass ? 'score-hero--pass' : 'score-hero--fail') + '">' +
      '<div class="score-hero__num">' + score + '<small>%</small></div>' +
      '<p style="font-weight:800;margin-top:10px">' + (pass ? 'Lulus!' : 'Belum lulus') + ' — ' + correct + ' benar dari ' + total + ' soal</p>' +
      '<p class="tiny">' + (pass ? 'Ambang lulus ' + PASS + '. Progres modul ini tersimpan.' : 'Ambang lulus ' + PASS + '. Baca ulang bagian yang masih ragu, lalu ulangi kuisnya.') + '</p>' +
      '</div>' +
      '<div class="btn-row">' +
      '<button class="btn btn--ghost" id="retryBtn">' + icon('refresh') + 'Ulangi kuis</button>' +
      (quiz.mode === 'module'
        ? (modIndex(quiz.modId) < COURSE.modules.length - 1
          ? '<button class="btn" id="nextBtn">Modul berikutnya' + icon('chev') + '</button>'
          : '<button class="btn btn--accent" id="nextBtn">Ujian akhir' + icon('chev') + '</button>')
        : '<button class="btn btn--accent" id="nextBtn">' + (pass ? 'Ambil sertifikat' : 'Ulangi ujian') + '</button>') +
      '<button class="btn btn--quiet" data-go="home">Ke beranda</button>' +
      '</div>' +
      '<div class="section-title">' + icon('list') + '<h2>Pembahasan</h2></div>' +
      '<div class="review" id="rev"></div>';
    sec.appendChild(card);

    var rev = $('#rev', card);
    quiz.qs.forEach(function (q, i) {
      var ok = quiz.answers[i];
      var row = el('div', 'rv ' + (ok ? 'ok' : 'no'));
      row.innerHTML = icon(ok ? 'check' : 'x') +
        '<div><b>' + (i + 1) + '. ' + esc(q.q) + '</b>' +
        '<span>Jawabanmu: ' + esc(q.o[q.picked] || '—') + (ok ? '' : ' · Benar: ' + esc(q.o[q.a])) + '<br>' + esc(q.why) + '</span></div>';
      rev.appendChild(row);
    });

    $('#retryBtn', card).addEventListener('click', function () {
      if (quiz.mode === 'module') go('quiz:' + quiz.modId);
      else startExamRun();
    });
    $('#nextBtn', card).addEventListener('click', function () {
      if (quiz.mode === 'module') {
        var ni = modIndex(quiz.modId) + 1;
        if (ni < COURSE.modules.length) go('module:' + COURSE.modules[ni].id);
        else go('exam');
      } else {
        if (pass) go('cert'); else startExamRun();
      }
    });
  }

  /* ----------------------------------------------------------------- ujian  */
  function renderExamIntro() {
    var sec = $('#screen-exam');
    sec.innerHTML = '';
    var done = modulesDone();
    var best = examBest();
    var card = el('div', 'card');
    card.style.setProperty('--i', '0');
    card.innerHTML =
      '<p class="eyebrow">Ujian akhir</p>' +
      '<h1 id="examTitle">20 soal, gabungan semua modul.</h1>' +
      '<p class="lede">Kalau skormu minimal ' + PASS + ', sertifikat kelulusan langsung terbit atas namamu.</p>' +
      '<div class="tiles" style="margin:20px 0">' +
      tile('Soal', String(COURSE.exam.count), '') +
      tile('Ambang lulus', PASS + '%', 'tile--accent') +
      tile('Modul beres', done + '/' + COURSE.modules.length, done === COURSE.modules.length ? 'tile--ok' : '') +
      tile('Skor terbaik', best ? best + '%' : '—', best >= PASS ? 'tile--ok' : '') +
      '</div>' +
      (done < COURSE.modules.length
        ? '<div class="banner-locked" style="margin-bottom:20px">' + icon('alert') +
          '<div>Kamu baru menyelesaikan <b>' + done + ' dari ' + COURSE.modules.length + '</b> modul. Boleh langsung ujian, tapi akan jauh lebih mudah kalau semua modulnya sudah lewat.</div></div>'
        : '<div class="banner-locked" style="margin-bottom:20px;background:var(--c-success-wash);border-color:#6EE7B7;color:var(--c-success)">' + icon('check') +
          '<div>Semua modul sudah beres. Kamu siap.</div></div>') +
      '<ul style="margin-bottom:20px">' +
      '<li>20 soal pilihan ganda, diacak tiap kali kamu mulai.</li>' +
      '<li>Tidak ada batas waktu — santai saja.</li>' +
      '<li>Pembahasan lengkap muncul setelah selesai.</li>' +
      '<li>Boleh diulang sebanyak yang kamu mau.</li>' +
      '</ul>' +
      '<div class="btn-row">' +
      '<button class="btn btn--accent btn--block" id="startExam">' + icon('play') + 'Mulai ujian akhir</button>' +
      (examPassed() ? '<button class="btn btn--ghost" data-go="cert">' + icon('trophy') + 'Lihat sertifikat</button>' : '') +
      '</div>';
    sec.appendChild(card);
    $('#startExam', card).addEventListener('click', startExamRun);
  }
  function startExamRun() {
    var pool = shuffle(COURSE.exam.questions);
    // jaga keseimbangan antar modul: ambil merata lalu acak
    var byMod = {};
    COURSE.exam.questions.forEach(function (q) { (byMod[q.mod] = byMod[q.mod] || []).push(q); });
    var picked = [], keys = Object.keys(byMod);
    var guard = 0;
    while (picked.length < Math.min(COURSE.exam.count, COURSE.exam.questions.length) && guard < 400) {
      keys.forEach(function (k) {
        var bucket = byMod[k];
        if (bucket.length && picked.length < COURSE.exam.count) picked.push(bucket.shift());
      });
      guard++;
    }
    picked = shuffle(picked);
    quiz = {
      mode: 'exam', modId: null, title: 'Ujian Akhir',
      qs: picked.map(function (q) { return prepQ(q); }),
      i: 0, answers: [], answered: false
    };
    show('screen-quiz');
    setTab('exam');
    current = { route: 'exam' };
    renderQuizQuestion();
  }

  /* ------------------------------------------------------------- flashcard  */
  var flash = null;
  function renderFlashPick() {
    var sec = $('#screen-flashpick');
    sec.innerHTML = '';
    var card = el('div', 'card');
    card.style.setProperty('--i', '0');
    card.innerHTML = '<p class="eyebrow">Flashcard</p><h1 id="fpTitle">Latih istilah pentingnya.</h1>' +
      '<p class="lede">Kartu bisa dibolak-balik. Tandai yang sudah kamu paham supaya yang belum muncul lebih sering.</p>';
    sec.appendChild(card);

    var all = { id: 'all', n: 0, title: 'Semua modul', cards: [] };
    COURSE.modules.forEach(function (m) { all.cards = all.cards.concat(m.cards); });
    all.n = all.cards.length;

    var decks = [all].concat(COURSE.modules.map(function (m) {
      return { id: m.id, n: m.cards.length, title: 'Modul ' + m.n + ' · ' + m.title, cards: m.cards };
    }));

    decks.forEach(function (d, i) {
      var c = el('div', 'card');
      c.style.setProperty('--i', String(i + 1));
      var mastered = d.id === 'all'
        ? COURSE.modules.reduce(function (s, m) { return s + Object.keys(modState(m.id).fc.mastered).length; }, 0)
        : Object.keys(modState(d.id).fc.mastered).length;
      c.innerHTML =
        '<div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap">' +
        '<div style="flex:1;min-width:180px"><h2>' + esc(d.title) + '</h2>' +
        '<p class="tiny" style="margin:4px 0 0">' + d.n + ' kartu · ' + mastered + ' ditandai paham</p></div>' +
        '<button class="btn btn--sm" data-go="flash:' + d.id + '">' + icon('play') + 'Latih</button>' +
        '</div>';
      sec.appendChild(c);
    });
  }
  function buildDeck(scope) {
    var cards = [];
    if (scope === 'all') COURSE.modules.forEach(function (m) { m.cards.forEach(function (c) { cards.push({ c: c, mod: m.id }); }); });
    else { var m = modById(scope); if (m) m.cards.forEach(function (c) { cards.push({ c: c, mod: m.id }); }); }
    var masteredKeys = {};
    (scope === 'all' ? COURSE.modules.map(function (m) { return m.id; }) : [scope]).forEach(function (id) {
      var fm = modState(id).fc.mastered;
      Object.keys(fm).forEach(function (k) { masteredKeys[k] = true; });
    });
    var fresh = shuffle(cards.filter(function (x) { return !masteredKeys[x.c.term]; }));
    var old = shuffle(cards.filter(function (x) { return masteredKeys[x.c.term]; }));
    var deck = [];
    while (fresh.length || old.length) {
      for (var i = 0; i < 3 && fresh.length; i++) deck.push(fresh.shift());
      if (old.length) deck.push(old.shift());
    }
    return deck;
  }
  function startFlash(scope) {
    var deck = buildDeck(scope);
    if (!deck.length) { go('flashpick'); return; }
    flash = { scope: scope, deck: deck, i: 0, flipped: false, known: 0 };
    if (scope !== 'all') modState(scope);
    renderFlashCard();
  }
  function renderFlashCard() {
    var sec = $('#screen-flash');
    sec.innerHTML = '';
    var cur = flash.deck[flash.i];
    var total = flash.deck.length;
    var c = el('div', 'card');
    c.style.setProperty('--i', '0');
    c.innerHTML =
      '<div class="quiz-head">' +
      '<span class="qtag" id="flashTitle">Flashcard</span>' +
      '<span class="pill">' + (flash.i + 1) + ' / ' + total + '</span>' +
      '</div>' +
      '<div class="bar" style="margin-bottom:20px"><i ' + barCss(Math.round((flash.i / total) * 100)) + '></i></div>' +
      '<div class="fc-stage">' +
      '<button class="flash" id="flashCard" aria-label="Balik kartu">' +
      '<span class="flash__face flash__front">' +
      '<span class="flash__kicker">Istilah</span>' +
      '<span class="flash__term">' + esc(cur.c.term) + '</span>' +
      '<span class="flash__hint">Ketuk untuk lihat artinya</span>' +
      '</span>' +
      '<span class="flash__face flash__back">' +
      '<span class="flash__kicker">Artinya</span>' +
      '<span class="flash__def">' + esc(cur.c.def) + '</span>' +
      '<span class="flash__hint">Ketuk untuk kembali</span>' +
      '</span>' +
      '</button>' +
      '</div>' +
      '<div class="btn-row">' +
      '<button class="btn btn--ghost" id="againBtn">' + icon('refresh') + 'Belum paham</button>' +
      '<button class="btn" id="knowBtn">' + icon('check') + 'Sudah paham</button>' +
      '</div>' +
      '<div style="margin-top:16px"><button class="btn btn--quiet btn--sm" data-go="flashpick">Ganti deck</button></div>';
    sec.appendChild(c);

    var fc = $('#flashCard', c);
    fc.addEventListener('click', function () { fc.classList.toggle('is-flipped'); flash.flipped = !flash.flipped; });
    $('#againBtn', c).addEventListener('click', function () { markCard(false); });
    $('#knowBtn', c).addEventListener('click', function () { markCard(true); });
  }
  function markCard(known) {
    var cur = flash.deck[flash.i];
    var ms = modState(cur.mod);
    ms.fc.seen[cur.c.term] = true;
    if (known) { ms.fc.mastered[cur.c.term] = true; flash.known++; }
    else { delete ms.fc.mastered[cur.c.term]; }
    touch();
    flash.i++;
    if (flash.i >= flash.deck.length) renderFlashDone();
    else renderFlashCard();
  }
  function renderFlashDone() {
    var sec = $('#screen-flash');
    sec.innerHTML = '';
    var total = flash.deck.length;
    var masteredAll = total ? Math.round((flash.known / total) * 100) : 0;
    var c = el('div', 'card');
    c.style.setProperty('--i', '0');
    c.innerHTML =
      '<h1 class="sr-only" id="flashTitle">Flashcard selesai</h1>' +
      '<div class="score-hero score-hero--pass"><div class="score-hero__num">' + total + '<small> kartu</small></div>' +
      '<p style="font-weight:800;margin-top:10px">Selesai! ' + flash.known + ' ditandai sudah paham.</p></div>' +
      '<div class="btn-row">' +
      '<button class="btn" id="againDeck">' + icon('refresh') + 'Ulangi deck ini</button>' +
      '<button class="btn btn--ghost" data-go="stats">' + icon('chart') + 'Lihat statistik</button>' +
      '<button class="btn btn--quiet" data-go="home">Ke beranda</button>' +
      '</div>';
    sec.appendChild(c);
    $('#againDeck', c).addEventListener('click', function () { startFlash(flash.scope); });
  }

  /* ------------------------------------------------------------ sertifikat  */
  function renderCert() {
    var sec = $('#screen-cert');
    sec.innerHTML = '';

    if (!examPassed()) {
      var gate = el('div', 'card');
      gate.style.setProperty('--i', '0');
      gate.innerHTML =
        '<p class="eyebrow">Sertifikat</p><h1 id="certTitle">Belum bisa diterbitkan.</h1>' +
        '<div class="banner-locked" style="margin:18px 0">' + icon('lock') +
        '<div>Sertifikat kelulusan baru terbit setelah skor ujian akhirmu minimal <b>' + PASS + '</b>. Skor terbaikmu sekarang: <b>' + (examBest() || '—') + '</b>.</div></div>' +
        '<div class="btn-row"><button class="btn btn--accent" data-go="exam">' + icon('award') + 'Kerjakan ujian akhir</button>' +
        '<button class="btn btn--ghost" data-go="modules">' + icon('book') + 'Kembali ke modul</button></div>';
      sec.appendChild(gate);
      return;
    }

    var cert = S.cert || { name: S.name, score: examBest(), date: Date.now(), id: certId() };
    S.cert = cert;
    if (cert.name !== S.name) { cert.name = S.name; }
    save();

    var card = el('div', 'card');
    card.style.setProperty('--i', '0');
    card.innerHTML =
      '<p class="eyebrow">Selamat</p>' +
      '<h1 id="certTitle">Sertifikatmu sudah terbit.</h1>' +
      '<p class="lede">Simpan atau bagikan. Namanya bisa kamu ubah lewat tombol di kanan atas.</p>';
    sec.appendChild(card);

    var frame = el('div', 'cert-frame');
    frame.style.setProperty('--i', '1');
    frame.innerHTML =
      '<canvas id="certCanvas" width="1600" height="1132" role="img" aria-label="Sertifikat kelulusan atas nama ' + esc(cert.name) + ', skor ' + cert.score + ' persen"></canvas>' +
      '<p class="tiny no-print" style="margin-top:10px">Pratinjau diperkecil agar bentuk sertifikat terlihat utuh. Ketuk <b>Perbesar</b> untuk membacanya dalam ukuran penuh.</p>';
    sec.appendChild(frame);

    var act = el('div', 'card');
    act.style.setProperty('--i', '2');
    act.innerHTML =
      '<div class="btn-row">' +
      '<button class="btn btn--accent" id="dlBtn">' + icon('download') + 'Unduh gambar</button>' +
      '<button class="btn btn--ghost" id="shareBtn">' + icon('share') + 'Bagikan</button>' +
      '<button class="btn btn--ghost" id="zoomBtn">' + icon('zoom') + 'Perbesar</button>' +
      '<button class="btn btn--ghost" id="printBtn">' + icon('print') + 'Cetak / PDF</button>' +
      '</div>' +
      '<p style="margin-top:16px;font-weight:700">Atas nama: <span style="color:var(--c-primary-deep)">' + esc(cert.name) + '</span></p>' +
      '<p class="tiny" style="margin-top:6px">ID sertifikat: <b>' + esc(cert.id) + '</b> · skor ujian akhir: <b>' + cert.score + '%</b> · terbit ' + fmtDateID(cert.date) + '</p>' +
      '<p class="tiny" style="margin-top:10px">Catatan jujur: sertifikat ini bukti kamu menyelesaikan kursus ini di perangkat ini — bukan kredensial resmi yang diakui lembaga mana pun.</p>';
    sec.appendChild(act);

    drawCert(cert);
    $('#dlBtn', act).addEventListener('click', function () { downloadCert(cert); });
    $('#shareBtn', act).addEventListener('click', function () { shareCert(cert); });
    $('#printBtn', act).addEventListener('click', function () { window.print(); });
    $('#zoomBtn', act).addEventListener('click', function () {
      var cv = document.getElementById('certCanvas');
      if (!cv || typeof cv.toBlob !== 'function') return;
      cv.toBlob(function (blob) {
        if (!blob) return;
        var url = URL.createObjectURL(blob);
        var w = window.open(url, '_blank');
        if (!w) { downloadCert(cert); toast('Jendela baru diblokir — sertifikat diunduh'); }
        setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
      }, 'image/png');
    });
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function drawCert(cert) {
    var cv = document.getElementById('certCanvas');
    if (!cv) return;
    var ctx = cv.getContext('2d');
    var W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // latar
    var g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, '#EEF2FF');
    g.addColorStop(1, '#E0E7FF');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // kartu utama
    ctx.save();
    ctx.shadowColor = 'rgba(79,70,229,.30)';
    ctx.shadowBlur = 46;
    ctx.shadowOffsetY = 18;
    ctx.fillStyle = '#FFFFFF';
    roundRect(ctx, 56, 56, W - 112, H - 112, 42);
    ctx.fill();
    ctx.restore();

    ctx.lineWidth = 8;
    ctx.strokeStyle = '#C7D2FE';
    roundRect(ctx, 56, 56, W - 112, H - 112, 42);
    ctx.stroke();

    ctx.lineWidth = 3;
    ctx.strokeStyle = '#4F46E5';
    ctx.globalAlpha = .5;
    roundRect(ctx, 82, 82, W - 164, H - 164, 30);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // pita atas
    ctx.fillStyle = '#4F46E5';
    roundRect(ctx, 56, 56, W - 112, 22, 42);
    ctx.fill();

    var cx = W / 2;

    // logo
    ctx.save();
    ctx.translate(cx - 52, 118);
    ctx.fillStyle = '#4F46E5';
    roundRect(ctx, 0, 0, 104, 104, 30);
    ctx.fill();
    ctx.fillStyle = '#EEF2FF';
    ctx.beginPath(); ctx.arc(52, 52, 30, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#4F46E5';
    ctx.beginPath(); ctx.arc(42, 48, 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(62, 48, 5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#EA580C';
    ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(52, 56, 13, 0.35 * Math.PI, 0.65 * Math.PI); ctx.stroke();
    ctx.restore();

    ctx.textAlign = 'center';

    ctx.fillStyle = '#3730A3';
    ctx.font = '600 30px "Baloo 2", sans-serif';
    ctx.fillText('AI MASTERY ID', cx, 268);

    ctx.fillStyle = '#1E1B4B';
    ctx.font = '700 78px "Baloo 2", sans-serif';
    ctx.fillText('SERTIFIKAT KELULUSAN', cx, 358);

    ctx.fillStyle = '#4B5470';
    ctx.font = '500 30px Nunito, sans-serif';
    ctx.fillText('Diberikan kepada', cx, 424);

    var nameSize = 92;
    ctx.font = '700 ' + nameSize + 'px "Baloo 2", sans-serif';
    while (ctx.measureText(cert.name).width > W - 320 && nameSize > 40) {
      nameSize -= 4;
      ctx.font = '700 ' + nameSize + 'px "Baloo 2", sans-serif';
    }
    ctx.fillStyle = '#4F46E5';
    ctx.fillText(cert.name, cx, 528);

    // garis nama
    ctx.strokeStyle = '#FDBA74';
    ctx.lineWidth = 6; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - 300, 556); ctx.lineTo(cx + 300, 556);
    ctx.stroke();

    ctx.fillStyle = '#1E1B4B';
    ctx.font = '600 31px Nunito, sans-serif';
    ctx.fillText('telah menyelesaikan seluruh 5 modul kursus', cx, 618);
    ctx.fillText('AI & LLM Dasar · Prompt Engineering · AI Agents', cx, 664);
    ctx.fillText('Vibe Coding · Monetisasi Produk AI', cx, 706);

    // kotak skor
    ctx.fillStyle = '#E0E7FF';
    roundRect(ctx, cx - 372, 752, 232, 116, 26);
    ctx.fill();
    ctx.fillStyle = '#3730A3';
    ctx.font = '700 46px "Baloo 2", sans-serif';
    ctx.fillText(cert.score + '%', cx - 256, 824);
    ctx.fillStyle = '#4B5470';
    ctx.font = '600 22px Nunito, sans-serif';
    ctx.fillText('SKOR UJIAN AKHIR', cx - 256, 852);

    ctx.fillStyle = '#FFEDD5';
    roundRect(ctx, cx + 140, 752, 232, 116, 26);
    ctx.fill();
    ctx.fillStyle = '#B8420A';
    ctx.font = '700 30px "Baloo 2", sans-serif';
    ctx.fillText('LULUS', cx + 256, 806);
    ctx.fillStyle = '#B8420A';
    ctx.font = '600 22px Nunito, sans-serif';
    ctx.fillText('Ambang ' + PASS + '%', cx + 256, 846);

    ctx.fillStyle = '#4B5470';
    ctx.font = '600 26px Nunito, sans-serif';
    ctx.fillText(fmtDateID(cert.date), cx, 946);

    ctx.strokeStyle = '#C7D2FE';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(140, 986); ctx.lineTo(W - 140, 986);
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#4B5470';
    ctx.font = '600 22px Nunito, sans-serif';
    ctx.fillText('ID sertifikat', 140, 1030);
    ctx.fillStyle = '#1E1B4B';
    ctx.font = '700 26px Nunito, sans-serif';
    ctx.fillText(cert.id, 140, 1062);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#4B5470';
    ctx.font = '600 22px Nunito, sans-serif';
    ctx.fillText('Diterbitkan', W - 140, 1030);
    ctx.fillStyle = '#1E1B4B';
    ctx.font = '700 26px Nunito, sans-serif';
    ctx.fillText('aimastery.id', W - 140, 1062);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#4B5470';
    ctx.font = '500 20px Nunito, sans-serif';
    ctx.fillText('Kursus mandiri berbasis web. Bukan kredensial resmi dari lembaga pendidikan mana pun.', cx, 1080);
  }
  function certFileName(cert) {
    return 'sertifikat-ai-mastery-' + cert.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.png';
  }
  function saveBlob(blob, filename) {
    var trigger = function (href) {
      var a = document.createElement('a');
      a.href = href;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    if (window.URL && typeof URL.createObjectURL === 'function') {
      var url = URL.createObjectURL(blob);
      trigger(url);
      setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
    } else {
      // cadangan untuk lingkungan tanpa createObjectURL
      var fr = new FileReader();
      fr.onload = function () { trigger(fr.result); };
      fr.readAsDataURL(blob);
    }
  }
  function downloadCert(cert) {
    var cv = document.getElementById('certCanvas');
    if (!cv || typeof cv.toBlob !== 'function') { toast('Peramban ini belum mendukung unduh gambar'); return; }
    cv.toBlob(function (blob) {
      if (!blob) { toast('Gagal membuat gambar sertifikat'); return; }
      saveBlob(blob, certFileName(cert));
      toast('Sertifikat diunduh');
    }, 'image/png');
  }
  function shareCert(cert) {
    var cv = document.getElementById('certCanvas');
    var text = 'Aku lulus kursus AI Mastery ID dengan skor ' + cert.score + '% — 5 modul: LLM dasar, prompt engineering, AI agents, vibe coding, monetisasi.';
    if (cv && navigator.canShare && window.File) {
      cv.toBlob(function (blob) {
        if (blob) {
          var file = new File([blob], certFileName(cert), { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            navigator.share({ files: [file], title: 'Sertifikat AI Mastery ID', text: text })
              .catch(function () { copyText(text); });
            return;
          }
        }
        copyText(text);
      }, 'image/png');
    } else {
      copyText(text);
    }
  }
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast('Teks sertifikat disalin'); }, function () { fallbackCopy(text, function () { toast('Teks sertifikat disalin'); }); });
    } else { fallbackCopy(text, function () { toast('Teks sertifikat disalin'); }); }
  }

  /* -------------------------------------------------------------- statistik */
  function renderStats() {
    var sec = $('#screen-stats');
    sec.innerHTML = '';
    var p = overallProgress();
    var avg = avgScore();
    var head = el('div', 'card');
    head.style.setProperty('--i', '0');
    head.innerHTML =
      '<p class="eyebrow">Statistik</p><h1 id="statsTitle">Perkembanganmu</h1>' +
      '<div class="tiles" style="margin-top:18px">' +
      tile('Progres kursus', p + '%', '') +
      tile('Rata-rata skor', avg == null ? '—' : avg + '%', 'tile--ok') +
      tile('Streak sekarang', S.streak.current + ' hari', 'tile--accent') +
      tile('Streak terbaik', S.streak.best + ' hari', '') +
      '</div>' +
      '<div class="bar bar--accent"><i ' + barCss(p) + '></i></div>' +
      '<div class="bar__meta"><span>' + modulesDone() + ' dari ' + COURSE.modules.length + ' modul beres</span><span>' + (examPassed() ? 'Ujian akhir lulus' : 'Ujian akhir belum lulus') + '</span></div>';
    sec.appendChild(head);

    /* heatmap 28 hari */
    var heat = el('div', 'card');
    heat.style.setProperty('--i', '1');
    var cells = '';
    var start = new Date(); start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - 27);
    for (var i = 0; i < 28; i++) {
      var d = new Date(start.getTime() + i * 864e5);
      var k = todayKey(d);
      var v = S.days[k] || 0;
      var lvl = v === 0 ? '' : (v === 1 ? 'l1' : (v <= 4 ? 'l2' : 'l3'));
      var isToday = k === todayKey();
      cells += '<i class="' + lvl + (isToday ? ' today' : '') + '" title="' + k + ': ' + v + ' aktivitas"></i>';
    }
    heat.innerHTML =
      '<div class="section-title" style="margin-top:0">' + icon('flame') + '<h2>Konsistensi 4 minggu terakhir</h2></div>' +
      '<div class="heat-wrap">' +
      '<div class="heat">' + cells + '</div>' +
      '<div class="heat-legend"><span><b style="background:#E0E7FF"></b>kosong</span><span><b style="background:#8B97F7"></b>1</span><span><b style="background:#4F46E5"></b>2–4</span><span><b style="background:#312E81"></b>5+</span><span><b style="background:#fff;border:2px solid #C2410C"></b>hari ini</span></div>' +
      '</div>' +
      '<p class="tiny" style="margin-top:14px">Satu aktivitas dihitung setiap kali kamu membuka modul, menjawab soal, atau membalik flashcard.</p>';
    sec.appendChild(heat);

    /* per modul */
    var rows = el('div', 'card');
    rows.style.setProperty('--i', '2');
    var rh = '<div class="section-title" style="margin-top:0">' + icon('book') + '<h2>Per modul</h2></div><div class="rows">';
    COURSE.modules.forEach(function (m) {
      var ms = modState(m.id);
      var mp = Math.round(moduleProgress(m.id) * 100);
      var last = ms.quiz.attempts.length ? ms.quiz.attempts[ms.quiz.attempts.length - 1] : null;
      rh += '<div class="row">' +
        '<b>' + m.n + '. ' + esc(m.title) + '</b>' +
        '<span class="pill' + (ms.quiz.best >= PASS ? ' pill--done' : '') + '">' + mp + '%</span>' +
        '<small>' +
        (ms.read ? 'Sudah dibaca' : 'Belum dibaca') + ' · ' +
        'Skor terbaik ' + (ms.quiz.attempts.length ? ms.quiz.best : '—') +
        (last ? ' · percobaan terakhir ' + last.score + '% (' + last.correct + '/' + last.total + ')' : '') +
        ' · ' + Object.keys(ms.fc.mastered).length + '/' + m.cards.length + ' flashcard paham' +
        '</small>' +
        '<div class="bar row__bar"><i ' + barCss(mp) + '></i></div>' +
        '</div>';
    });
    rh += '</div>';
    rows.innerHTML = rh;
    sec.appendChild(rows);

    /* riwayat ujian */
    var hist = el('div', 'card');
    hist.style.setProperty('--i', '3');
    var hh = '<div class="section-title" style="margin-top:0">' + icon('award') + '<h2>Riwayat ujian akhir</h2></div>';
    if (!S.exam.attempts.length) {
      hh += '<div class="empty">' + icon('award') + '<p>Belum ada percobaan. Kalau semua modul sudah beres, coba ujiannya.</p>' +
        '<div class="btn-row" style="justify-content:center"><button class="btn btn--sm" data-go="exam">Ke ujian akhir</button></div></div>';
    } else {
      hh += '<div class="rows">' + S.exam.attempts.slice().reverse().map(function (a) {
        return '<div class="row"><b>' + fmtDateID(a.date) + '</b>' +
          '<span class="pill' + (a.score >= PASS ? ' pill--done' : '') + '">' + a.score + '%</span>' +
          '<small>' + a.correct + ' benar dari ' + a.total + ' soal</small></div>';
      }).join('') + '</div>';
    }
    hist.innerHTML = hh;
    sec.appendChild(hist);

    /* data & pemasangan */
    var data = el('div', 'card');
    data.style.setProperty('--i', '4');
    data.innerHTML =
      '<div class="section-title" style="margin-top:0">' + icon('cpu') + '<h2>Data & aplikasi</h2></div>' +
      '<p class="tiny">Semua progres tersimpan di perangkat ini. Tidak ada yang dikirim ke server.</p>' +
      '<div class="btn-row" style="margin-top:14px">' +
      '<button class="btn btn--ghost" id="installBtn" hidden>' + icon('download') + 'Pasang ke layar utama</button>' +
      '<button class="btn btn--ghost" id="resetBtn">' + icon('refresh') + 'Reset progres</button>' +
      '</div>';
    sec.appendChild(data);

    var ib = $('#installBtn', data);
    if (deferredPrompt) { ib.hidden = false; }
    ib.addEventListener('click', function () {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function () { deferredPrompt = null; ib.hidden = true; });
    });
    $('#resetBtn', data).addEventListener('click', function () {
      if (window.confirm('Hapus semua progres belajar, skor, dan sertifikat? Tindakan ini tidak bisa dibatalkan.')) {
        S = blank(); save(); toast('Progres direset'); go('home');
      }
    });
  }

  /* --------------------------------------------------------------- roadmap  */
  function renderRoadmap() {
    var sec = $('#screen-roadmap');
    sec.innerHTML = '';
    var head = el('div', 'card');
    head.style.setProperty('--i', '0');
    head.innerHTML =
      '<p class="eyebrow">Setelah 5 modul</p><h1 id="rmTitle">Langkah lanjutan yang masuk akal.</h1>' +
      '<p class="lede">Urutannya sengaja begini: pahami dulu cara memanggil model, baru beri dia ingatan, baru ubah perilakunya. Lewati urutan ini dan kamu akan membakar biaya untuk masalah yang belum ada.</p>';
    sec.appendChild(head);

    COURSE.roadmap.forEach(function (s, i) {
      var c = el('div', 'card');
      c.style.setProperty('--i', String(i + 1));
      c.innerHTML =
        '<div class="step" style="margin:0">' +
        '<span class="step__idx">' + (i + 1) + '</span>' +
        '<div class="step__body">' +
        '<h2>' + esc(s.title) + '</h2>' +
        '<p>' + esc(s.body) + '</p>' +
        '<div class="chips">' + s.tags.map(function (t) { return '<span class="pill">' + esc(t) + '</span>'; }).join('') + '</div>' +
        '<p class="tiny" style="margin-top:14px"><b>Mulai dari:</b> ' + esc(s.first) + '</p>' +
        '</div></div>' +
        '<ul class="sources" style="margin-top:16px">' + s.sources.map(function (x) {
          return '<li><a href="' + esc(x.url) + '" target="_blank" rel="noopener noreferrer">' +
            '<span class="tag">Belajar</span><span>' + esc(x.title) + '</span></a></li>';
        }).join('') + '</ul>';
      sec.appendChild(c);
    });

    var close = el('div', 'card card--wash');
    close.style.setProperty('--i', String(COURSE.roadmap.length + 1));
    close.innerHTML =
      '<h2 style="margin-bottom:8px">Aturan praktisnya</h2>' +
      '<ul style="margin-bottom:16px">' +
      '<li>Kalau masalahnya bisa diselesaikan dengan prompt yang lebih baik, jangan bangun sistem.</li>' +
      '<li>RAG dulu sebelum fine-tuning. RAG memperbaiki pengetahuan, fine-tuning memperbaiki gaya dan format.</li>' +
      '<li>Ukur sebelum mengoptimasi: catat biaya per permintaan dan tingkat jawaban benar.</li>' +
      '<li>Setiap fitur AI harus punya jalur gagal yang jelas untuk pengguna.</li>' +
      '</ul>' +
      '<div class="btn-row"><button class="btn btn--ghost" data-go="modules">' + icon('book') + 'Kembali ke modul</button>' +
      '<button class="btn btn--ghost" data-go="stats">' + icon('chart') + 'Lihat statistik</button></div>';
    sec.appendChild(close);
  }

  /* --------------------------------------------------------------- dialog  */
  function openNameDialog() {
    var d = $('#nameDialog');
    $('#nameInput').value = (S.nameSet && S.name !== 'Siswa AI') ? S.name : '';
    if (typeof d.showModal === 'function') d.showModal();
    else d.setAttribute('open', '');
    setTimeout(function () { $('#nameInput').focus(); }, 60);
  }
  function closeName() {
    var d = $('#nameDialog');
    if (typeof d.close === 'function') d.close();
    else d.removeAttribute('open');
  }

  /* ----------------------------------------------------------------- PWA   */
  var deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    var b = document.getElementById('installBtn');
    if (b) b.hidden = false;
  });

  /* ------------------------------------------------------------ bootstrap  */
  function bindGlobal() {
    document.addEventListener('click', function (e) {
      var goEl = e.target.closest('[data-go]');
      if (goEl) {
        e.preventDefault();
        var r = goEl.getAttribute('data-go');
        if (readingObserver && r.indexOf('module:') !== 0) readingObserver.disconnect();
        go(r);
        return;
      }
    });
    $('#whoBtn').addEventListener('click', openNameDialog);
    $('#nameCancel').addEventListener('click', closeName);
    $('#nameSave').addEventListener('click', function () {
      var v = $('#nameInput').value.trim().slice(0, 48) || 'Siswa AI';
      S.name = v; S.nameSet = true;
      if (S.cert) { S.cert.name = v; }
      save(); updateRail(); closeName();
      toast('Nama disimpan: ' + v);
      if (current.route === 'cert') renderCert();
    });
    $('#nameInput').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); $('#nameSave').click(); }
    });
    $('#resumeBtn').addEventListener('click', function () {
      var n = nextThing();
      if (n.kind === 'read' || n.kind === 'quiz') {
        go(n.kind === 'read' ? 'module:' + n.mod.id : 'quiz:' + n.mod.id);
      } else if (n.kind === 'exam') go('exam');
      else go('cert');
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && $('#nameDialog').hasAttribute('open')) closeName();
    });
  }

  function boot() {
    bindGlobal();
    if (!S.nameSet) setTimeout(openNameDialog, 700);
    var target = routeFromHash(decodeURIComponent((location.hash || '').replace('#', '')));
    if (target === '__resume') {
      var n = nextThing();
      go(n.kind === 'read' ? 'module:' + n.mod.id : (n.kind === 'quiz' ? 'quiz:' + n.mod.id : (n.kind === 'exam' ? 'exam' : 'cert')));
    } else if (target) {
      go(target);
    } else {
      go('home');
    }
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('./sw.js').catch(function () { /* offline opsional */ });
      });
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { if (current.route === 'cert') drawCert(S.cert); });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
