// BOT-DSM-511 progress: ONE localStorage prefix for everything: "bot511-".
// Keys: bot511-<checklist unit> (existing checklist state),
// bot511-progress-meta (per-unit done/total, written from unit checklists),
// bot511-last-visited (last unit/topic visited), bot511-quiz-best,
// bot511-quiz-last (last quiz attempt). No login, no server, works offline.
(function () {
  function get(k, fallback) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } }
  function set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function meta() { return get('bot511-progress-meta', {}); }
  function updateHeaderProgress() {
    var m = meta(), done = 0, total = 0;
    Object.keys(m).forEach(function (u) { done += m[u].done || 0; total += m[u].total || 0; });
    var el = document.getElementById('headerProgress');
    if (el) el.textContent = total ? ('Progress: ' + Math.round(100 * done / total) + '%') : 'Progress: 0%';
    return { done: done, total: total };
  }
  function renderHome() {
    var overall = updateHeaderProgress();
    var m = meta();
    var op = document.getElementById('overallPct');
    if (op) op.textContent = overall.total ? Math.round(100 * overall.done / overall.total) + '%' : '0% (tick a unit checklist to start)';
    var ob = document.getElementById('overallBar');
    if (ob) ob.style.width = (overall.total ? Math.round(100 * overall.done / overall.total) : 0) + '%';
    document.querySelectorAll('[data-unit-progress]').forEach(function (el) {
      var u = el.getAttribute('data-unit-progress'), d = m[u];
      var pct = (d && d.total) ? Math.round(100 * d.done / d.total) : 0;
      el.querySelector('.unit-pct').textContent = pct + '%';
      var bar = el.querySelector('.progress-bar > span'); if (bar) bar.style.width = pct + '%';
      var cnt = el.querySelector('.unit-count'); if (cnt) cnt.textContent = d ? (d.done + ' of ' + d.total + ' checklist items ticked') : 'Not started yet';
    });
    var lv = get('bot511-last-visited', null), box = document.getElementById('continueBox');
    if (box) {
      if (lv && lv.href) box.innerHTML = '<p><strong>Continue where you left off:</strong> <a href="' + lv.href + '">' + lv.label + '</a>' + (lv.topic ? ' — topic: ' + lv.topic : '') + '</p>';
      else box.innerHTML = '<p><strong>Continue where you left off:</strong> not started yet — begin with <a href="units/unit1.html">Unit 1</a>.</p>';
    }
    var qb = get('bot511-quiz-best', {}), qh = document.getElementById('quizProgressHome');
    if (qh) {
      var keys = Object.keys(qb);
      qh.innerHTML = keys.length ? keys.map(function (k) { return '<li>' + k + ': best ' + qb[k].score + '/' + qb[k].total + ' (' + qb[k].percent + '%)' + (qb[k].date ? ' — ' + qb[k].date : '') + '</li>'; }).join('') : '<li>No quiz attempt saved yet — try the <a href="quiz.html">Quiz Corner</a>.</li>';
    }
    var qz = document.getElementById('quizProgress');
    if (qz) {
      var last = get('bot511-quiz-last', null);
      qz.innerHTML = Object.keys(qb).length ? Object.keys(qb).map(function (k) { return '<li>' + k + ': best ' + qb[k].score + '/' + qb[k].total + ' (' + qb[k].percent + '%)' + (qb[k].date ? ' — ' + qb[k].date : '') + '</li>'; }).join('') + (last ? '<li>Last attempt: ' + last.mode + ' — ' + last.score + '/' + last.total + ' on ' + last.date + '</li>' : '') : '<li>No quiz attempt saved yet.</li>';
    }
  }
  document.addEventListener('DOMContentLoaded', function () {
    // Existing behaviour: reveal answers, MCQ reveal.
    document.querySelectorAll('[data-reveal]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var t = document.getElementById(btn.getAttribute('data-reveal'));
        if (t) { t.classList.toggle('open'); btn.textContent = t.classList.contains('open') ? 'Hide answer' : 'Show answer'; }
      });
    });
    document.querySelectorAll('[data-quiz]').forEach(function (box) {
      box.querySelectorAll('.opt').forEach(function (b) {
        b.addEventListener('click', function () {
          var ans = box.querySelector('.answer'); if (ans) ans.classList.add('open');
          box.querySelectorAll('.opt').forEach(function (o) { o.style.borderColor = ''; });
          b.style.borderColor = '#2f5d3a'; b.style.borderWidth = '2px';
        });
      });
    });
    var s = document.getElementById('pageSearch');
    if (s) s.addEventListener('input', function () {
      var q = s.value.toLowerCase();
      document.querySelectorAll('section.topic').forEach(function (sec) {
        sec.style.display = (!q || sec.textContent.toLowerCase().indexOf(q) > -1) ? '' : 'none';
      });
    });
    var top = document.getElementById('topBtn');
    if (top) { window.addEventListener('scroll', function () { top.style.display = window.scrollY > 500 ? 'inline-block' : 'none'; }); top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); }); }
    // Checklists: persist under bot511-<unit>, update progress meta on every tick.
    document.querySelectorAll('[data-checklist]').forEach(function (list) {
      var unit = list.getAttribute('data-checklist'), key = 'bot511-' + unit;
      var saved = get(key, {});
      var boxes = list.querySelectorAll('input[type=checkbox]');
      function sync() {
        var done = 0; boxes.forEach(function (cb) { if (cb.checked) done++; });
        var m = meta(); m[unit] = { done: done, total: boxes.length }; set('bot511-progress-meta', m);
        updateHeaderProgress();
        var pctEl = document.querySelector('[data-unit-progress="' + unit + '"] .unit-pct');
        if (pctEl) pctEl.textContent = Math.round(100 * done / boxes.length) + '%';
      }
      boxes.forEach(function (cb) {
        if (saved[cb.value]) cb.checked = true;
        cb.addEventListener('change', function () { saved[cb.value] = cb.checked; set(key, saved); sync(); });
      });
      sync();
    });
    // Last visited: unit page load + any in-page topic link click.
    var unit = document.body.getAttribute('data-unit');
    function saveVisit(topic) {
      if (!unit) return;
      // Home page lives at the site root, so always store the root-relative unit path.
      var href = 'units/' + unit + '.html' + (topic ? '#' + topic : '');
      var label = 'Unit ' + unit.replace('unit', '') + ' — ' + (document.title || unit);
      set('bot511-last-visited', { unit: unit, label: label, href: href, topic: topic || '', date: new Date().toISOString().slice(0, 10) });
    }
    if (unit) {
      var h = (location.hash || '').replace('#', '');
      saveVisit(h);
      document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function () { saveVisit(a.getAttribute('href').replace('#', '')); });
      });
    }
    // Reset progress (confirm step), on home and quiz pages.
    document.querySelectorAll('[data-reset-progress]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (confirm('Reset all saved progress (checklists, last-visited unit and quiz scores) in this browser? This cannot be undone.')) {
          var remove = []; for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (k && k.indexOf('bot511-') === 0) remove.push(k); }
          remove.forEach(function (k) { localStorage.removeItem(k); });
          location.reload();
        }
      });
    });
    renderHome();
  });
})();
