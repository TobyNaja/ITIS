/*
 * App — UI, Routing (#/...), และการเชื่อม Engine กับ Store
 * หน้า: หน้าหลัก, เลือก Week, โหมดฝึก, ตั้งค่าก่อนเริ่ม, ทำข้อสอบ, ผลคะแนน/เฉลย, ประวัติ
 */
(function () {
  "use strict";

  var QUIZ = window.QUIZ;
  var engine = new window.Engine(QUIZ);
  var Store = window.Store;
  var LETTERS = window.Engine.LETTERS;
  var app = document.getElementById("app");
  var modalRoot = document.getElementById("modal-root");

  var TYPE_LABEL = { R: "ความจำ", U: "ความเข้าใจ", A: "วิเคราะห์/แก้ปัญหา" };
  var PASS = 70;
  var timerHandle = null;
  var reviewFilter = "all";

  // ---------------------------------------------------------------- helpers
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function pct(n, d) { return d ? Math.round(n / d * 100) : 0; }
  function fmtPct(x) { return (Math.round(x * 10) / 10).toString().replace(/\.0$/, "") + "%"; }
  function fmtDate(ts) {
    try {
      return new Date(ts).toLocaleString("th-TH", { dateStyle: "medium", timeStyle: "short" });
    } catch (e) { return new Date(ts).toLocaleString(); }
  }
  function fmtDuration(sec) {
    var h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
    if (h) return h + " ชม. " + m + " นาที";
    if (m) return m + " นาที " + s + " วิ";
    return s + " วินาที";
  }
  function fmtClock(ms) {
    var t = Math.max(0, Math.ceil(ms / 1000));
    var m = Math.floor(t / 60), s = t % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }
  function weekLabel(id) { var w = engine.weekById[id]; return w ? w.label : id; }
  function barClass(p) { return p >= PASS ? "success" : p >= 50 ? "warning" : "danger"; }
  function go(hash) { if (location.hash === hash) render(); else location.hash = hash; }

  function progressBar(p, cls) {
    return '<div class="progress ' + (cls || "") + '" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' +
      Math.round(p) + '"><span style="width:' + Math.max(0, Math.min(100, p)) + '%"></span></div>';
  }

  // ---------------------------------------------------------------- stats
  function weekStats(weekId, progress) {
    var qs = engine.questionsOfWeek(weekId);
    var attempted = 0, lastCorrect = 0, wrong = 0;
    qs.forEach(function (q) {
      var s = progress.qstats[q.id];
      if (s && s.seen) { attempted++; if (s.last) lastCorrect++; }
      if (progress.wrong[q.id]) wrong++;
    });
    var last = null;
    for (var i = 0; i < progress.attempts.length; i++) {
      var a = progress.attempts[i];
      if (a.mode === "week" && a.weekIds.length === 1 && a.weekIds[0] === weekId) { last = a; break; }
    }
    var types = { R: 0, U: 0, A: 0 };
    qs.forEach(function (q) { types[q.type]++; });
    return {
      total: qs.length, attempted: attempted, lastCorrect: lastCorrect, wrong: wrong, types: types,
      accuracy: attempted ? lastCorrect / attempted * 100 : null,
      coverage: pct(attempted, qs.length),
      lastAttempt: last
    };
  }

  function overallStats(progress) {
    var total = QUIZ.questions.length;
    var attempted = Object.keys(progress.qstats).filter(function (id) { return engine.byId[id] && progress.qstats[id].seen; }).length;
    var atts = progress.attempts;
    var avg = atts.length ? atts.reduce(function (s, a) { return s + a.percent; }, 0) / atts.length : null;
    var best = atts.reduce(function (m, a) { return Math.max(m, a.percent); }, 0);
    var wrong = Object.keys(progress.wrong).filter(function (id) { return engine.byId[id]; }).length;
    return { total: total, attempted: attempted, avg: avg, best: best, attempts: atts.length, wrong: wrong };
  }

  function wrongIds(progress, weekIds) {
    var set = null;
    if (weekIds && weekIds.length) { set = {}; weekIds.forEach(function (w) { set[w] = true; }); }
    return Object.keys(progress.wrong)
      .filter(function (id) { var q = engine.byId[id]; return q && (!set || set[q.week]); })
      .sort(function (a, b) { return QUIZ.questions.indexOf(engine.byId[a]) - QUIZ.questions.indexOf(engine.byId[b]); });
  }

  // ---------------------------------------------------------------- modal
  function confirmModal(opts) {
    modalRoot.innerHTML =
      '<div class="modal-backdrop" data-modal-backdrop><div class="modal" role="dialog" aria-modal="true" aria-labelledby="mt">' +
      '<h3 id="mt">' + esc(opts.title) + "</h3><div>" + opts.body + '</div><div class="btn-row">' +
      (opts.extra ? '<button class="btn" data-m="extra">' + esc(opts.extra) + "</button>" : "") +
      '<button class="btn" data-m="cancel">' + esc(opts.cancel || "ยกเลิก") + "</button>" +
      '<button class="btn ' + (opts.danger ? "btn-danger" : "btn-primary") + '" data-m="ok">' + esc(opts.ok || "ยืนยัน") + "</button>" +
      "</div></div></div>";
    var close = function () { modalRoot.innerHTML = ""; document.removeEventListener("keydown", onKey, true); };
    var onKey = function (e) { if (e.key === "Escape") { e.stopPropagation(); close(); } };
    document.addEventListener("keydown", onKey, true);
    modalRoot.querySelector('[data-m="ok"]').focus();
    modalRoot.onclick = function (e) {
      var m = e.target.getAttribute("data-m");
      if (e.target.hasAttribute("data-modal-backdrop") || m === "cancel") close();
      else if (m === "ok") { close(); opts.onOk && opts.onOk(); }
      else if (m === "extra") { close(); opts.onExtra && opts.onExtra(); }
    };
  }

  // ---------------------------------------------------------------- pages
  function resumeNotice() {
    var s = Store.getSession();
    if (!s) return "";
    return '<div class="notice info">มีชุดข้อสอบที่ทำค้างอยู่: <b>' + esc(s.title) + "</b> (ตอบแล้ว " +
      engine.answeredCount(s) + "/" + s.items.length + ' ข้อ) <a href="#/quiz"><b>ทำต่อ →</b></a></div>';
  }

  function pageDashboard() {
    var p = Store.getProgress();
    var o = overallStats(p);
    var c = QUIZ.course;
    var html = resumeNotice();
    if (!Store.isPersistent()) html += '<div class="notice">เบราว์เซอร์นี้ปิดการใช้ LocalStorage — ผลการทำข้อสอบจะไม่ถูกบันทึกเมื่อปิดหน้าเว็บ</div>';

    html += '<section class="card hero"><div><div class="eyebrow">' + esc(c.code) + ' · แบบทดสอบทบทวนรายวิชา</div>' +
      "<h1>" + esc(c.name) + '</h1><div class="course-th">' + esc(c.nameTh) + '</div></div>' +
      '<div class="btn-row"><a class="btn btn-primary" href="#/weeks">เลือก Week เพื่อฝึก</a><a class="btn" href="#/start/mock">Mock Exam</a></div></section>';

    html += '<section class="section grid grid-stats">' +
      stat("จำนวน Week", QUIZ.weeks.length, "ตามเอกสารประกอบการเรียน") +
      stat("ข้อสอบทั้งหมด", o.total, "ความจำ / ความเข้าใจ / วิเคราะห์") +
      '<div class="card stat"><div class="label">ความคืบหน้า</div><div class="value">' + pct(o.attempted, o.total) + '%</div>' +
      '<div class="sub">เคยทำแล้ว ' + o.attempted + "/" + o.total + " ข้อ</div>" + '<div style="margin-top:8px">' + progressBar(pct(o.attempted, o.total)) + "</div></div>" +
      stat("คะแนนเฉลี่ย", o.avg === null ? "–" : fmtPct(o.avg), o.attempts ? "จาก " + o.attempts + " ครั้ง · สูงสุด " + fmtPct(o.best) : "ยังไม่มีผลการทำข้อสอบ") +
      '<div class="card stat"><div class="label">ข้อที่ต้องทบทวน</div><div class="value">' + o.wrong + '</div><div class="sub">' +
      (o.wrong ? '<a href="#/start/review">ทบทวนข้อที่ตอบผิด →</a>' : "ยังไม่มีข้อที่ตอบผิด") + "</div></div>" +
      "</section>";

    html += '<section class="section grid grid-2"><div class="card"><div class="section-title"><h2>คะแนนแยกตาม Week</h2>' +
      '<span class="small muted">ความแม่นยำจากคำตอบล่าสุดของแต่ละข้อ</span></div>';
    QUIZ.weeks.forEach(function (w) {
      var s = weekStats(w.id, p);
      var acc = s.accuracy === null ? null : Math.round(s.accuracy);
      html += '<div class="week-row"><div class="name">' + esc(w.label) + "<small>ทำแล้ว " + s.attempted + "/" + s.total + "</small></div>" +
        "<div>" + progressBar(acc || 0, acc === null ? "" : barClass(acc)) + '<div class="small muted" style="margin-top:3px">' + esc(w.title) +
        (s.lastAttempt ? " · ล่าสุด " + fmtPct(s.lastAttempt.percent) : "") + "</div></div>" +
        '<div class="pct">' + (acc === null ? '<span class="muted">–</span>' : acc + "%") + "</div></div>";
    });
    html += "</div>";

    html += '<div class="card"><div class="section-title"><h2>ผลการทำข้อสอบล่าสุด</h2><a class="small" href="#/history">ดูทั้งหมด</a></div>';
    if (!p.attempts.length) {
      html += '<div class="empty"><div class="big">📝</div>ยังไม่มีประวัติ — เริ่มจาก <a href="#/weeks">เลือก Week</a> หรือ <a href="#/start/random">Random Quiz</a></div>';
    } else {
      html += attemptsTable(p.attempts.slice(0, 6));
    }
    html += "</div></section>";

    html += '<section class="section"><div class="section-title"><h2>โหมดฝึก</h2><a class="small" href="#/modes">รายละเอียด</a></div>' +
      '<div class="grid grid-cards">' + modeCards(true) + "</div></section>";
    app.innerHTML = html;
  }

  function stat(label, value, sub) {
    return '<div class="card stat"><div class="label">' + esc(label) + '</div><div class="value">' + esc(value) +
      '</div><div class="sub">' + esc(sub) + "</div></div>";
  }

  function attemptsTable(list) {
    var html = '<div class="table-wrap"><table class="table"><thead><tr><th>วันที่</th><th>ชุดข้อสอบ</th><th class="num">คะแนน</th><th class="num">%</th><th></th></tr></thead><tbody>';
    list.forEach(function (a) {
      html += "<tr><td class=\"small\">" + esc(fmtDate(a.finishedAt)) + "</td><td>" + esc(a.title) + "</td>" +
        '<td class="num">' + a.correct + "/" + a.total + '</td><td class="num"><b style="color:var(--' +
        (a.percent >= PASS ? "success" : "danger") + ')">' + fmtPct(a.percent) + "</b></td>" +
        '<td class="num"><a class="btn btn-sm" href="#/result/' + esc(a.id) + '">เฉลย</a></td></tr>';
    });
    return html + "</tbody></table></div>";
  }

  var MODE_INFO = [
    { key: "week", icon: "W", title: "Practice by Week", desc: "เลือกทำข้อสอบเฉพาะ Week ที่ต้องการ ทบทวนทีละบท", href: "#/weeks", cta: "เลือก Week" },
    { key: "all", icon: "∑", title: "All Weeks", desc: "รวมข้อสอบทุก Week เพื่อทบทวนภาพรวมทั้งรายวิชา", href: "#/start/all", cta: "เริ่มทำ" },
    { key: "random", icon: "⤨", title: "Random Quiz", desc: "สุ่มข้อสอบจากทุก Week (หรือเลือกบาง Week) ตามจำนวนที่ต้องการ", href: "#/start/random", cta: "ตั้งค่าและเริ่ม" },
    { key: "review", icon: "↺", title: "Review Incorrect Answers", desc: "กลับมาทำเฉพาะข้อที่เคยตอบผิด ตอบถูกแล้วจะถูกนำออกจากรายการ", href: "#/start/review", cta: "ทบทวนข้อผิด" },
    { key: "mock", icon: "⏱", title: "Mock Exam", desc: "จำลองการสอบ สุ่มตามสัดส่วนทุก Week จับเวลา และไม่แสดงเฉลยจนกว่าจะส่ง", href: "#/start/mock", cta: "เริ่มสอบจำลอง" }
  ];

  function modeCards(compact) {
    var p = Store.getProgress();
    var nWrong = wrongIds(p).length;
    return MODE_INFO.map(function (m) {
      var extra = m.key === "review" ? '<span class="chip">' + nWrong + " ข้อรอทบทวน</span>" : "";
      return '<div class="card mode-card"><div class="icon" aria-hidden="true">' + m.icon + "</div><h3>" + esc(m.title) + "</h3>" +
        (compact ? "" : "<p>" + esc(m.desc) + "</p>") + extra +
        '<a class="btn ' + (m.key === "mock" ? "btn-primary" : "") + '" href="' + m.href + '">' + esc(m.cta) + "</a></div>";
    }).join("");
  }

  function pageModes() {
    app.innerHTML = resumeNotice() + '<div class="page-head"><div class="eyebrow">โหมดฝึก</div><h1>เลือกรูปแบบการทบทวน</h1>' +
      "<p>ทุกโหมดตอบแล้วเปลี่ยนคำตอบได้ก่อนส่ง และบันทึกความคืบหน้าอัตโนมัติ</p></div>" +
      '<div class="grid grid-cards">' + modeCards(false) + "</div>";
  }

  function pageWeeks() {
    var p = Store.getProgress();
    var html = resumeNotice() + '<div class="page-head"><div class="eyebrow">Practice by Week</div><h1>เลือก Week</h1>' +
      "<p>จำนวนข้อสอบของแต่ละ Week กำหนดตามปริมาณและความซับซ้อนของเนื้อหา</p></div><div class=\"grid grid-cards\">";
    QUIZ.weeks.forEach(function (w) {
      var s = weekStats(w.id, p);
      var badge = !s.lastAttempt ? '<span class="badge todo">ยังไม่ได้ทำ</span>' :
        s.lastAttempt.percent >= PASS ? '<span class="badge pass">ผ่าน · ' + fmtPct(s.lastAttempt.percent) + "</span>" :
          '<span class="badge fail">ควรทบทวน · ' + fmtPct(s.lastAttempt.percent) + "</span>";
      html += '<article class="card week-card"><div class="top"><div><div class="label">' + esc(w.label) + "</div><h3>" + esc(w.title) + "</h3></div>" + badge + "</div>" +
        '<div class="chips">' + w.topics.map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") + "</div>" +
        '<div class="meta-row"><span><b>' + s.total + "</b> ข้อ (ความจำ " + s.types.R + " · เข้าใจ " + s.types.U + " · วิเคราะห์ " + s.types.A + ")</span></div>" +
        '<div class="meta-row"><span>ทำแล้ว ' + s.attempted + "/" + s.total + "</span><span>" +
        (s.lastAttempt ? "ล่าสุด " + s.lastAttempt.correct + "/" + s.lastAttempt.total : "") + "</span></div>" +
        progressBar(s.coverage) +
        '<div class="actions"><a class="btn btn-primary" href="#/start/week/' + w.id + '">เริ่มทำข้อสอบ</a>' +
        (s.wrong ? '<a class="btn" href="#/start/review/' + w.id + '">ทบทวนข้อผิด (' + s.wrong + ")</a>" : "") + "</div></article>";
    });
    app.innerHTML = html + "</div>";
  }

  // ---------------------------------------------------------------- setup
  function pageStart(mode, weekId) {
    var p = Store.getProgress();
    var existing = Store.getSession();
    var info = MODE_INFO.filter(function (m) { return m.key === mode; })[0];
    if (!info) return go("#/modes");
    var html = '<div class="page-head"><div class="eyebrow">' + esc(info.title) + "</div>";
    var body = "";
    var canStart = true;

    if (mode === "week") {
      var w = engine.weekById[weekId] || QUIZ.weeks[0];
      html += "<h1>" + esc(w.label) + ": " + esc(w.title) + "</h1><p>แบบทดสอบประจำสัปดาห์ — " + engine.questionsOfWeek(w.id).length + " ข้อ</p></div>";
      body += '<div class="field"><label for="f-week">Week</label><select id="f-week">' + QUIZ.weeks.map(function (x) {
        return '<option value="' + x.id + '"' + (x.id === w.id ? " selected" : "") + ">" + esc(x.label + " — " + x.title) + " (" + engine.questionsOfWeek(x.id).length + " ข้อ)</option>";
      }).join("") + "</select></div>";
      body += checkbox("f-shuffle", "สลับลำดับข้อ", "ถ้าไม่เลือก จะเรียงตามลำดับหัวข้อในบทเรียน", false);
      body += checkbox("f-instant", "ดูเฉลยทันทีทีละข้อ", "กด \"ตรวจคำตอบ\" เพื่อดูเฉลยและคำอธิบายก่อนไปข้อถัดไป", false);
    } else if (mode === "all") {
      html += "<h1>All Weeks — ทบทวนภาพรวม</h1><p>รวมข้อสอบทุก Week ทั้งหมด " + QUIZ.questions.length + " ข้อ</p></div>";
      body += checkbox("f-shuffle", "สลับลำดับข้อ", "ถ้าไม่เลือก จะเรียงตาม Week", false);
      body += checkbox("f-instant", "ดูเฉลยทันทีทีละข้อ", "", false);
    } else if (mode === "random") {
      html += "<h1>Random Quiz</h1><p>สุ่มข้อสอบจาก Week ที่เลือก</p></div>";
      body += weekPicker();
      body += '<div class="field"><label for="f-count">จำนวนข้อ</label><select id="f-count">' +
        [10, 20, 30, 50].map(function (n) { return '<option value="' + n + '"' + (n === 20 ? " selected" : "") + ">" + n + " ข้อ</option>"; }).join("") + "</select></div>";
      body += checkbox("f-instant", "ดูเฉลยทันทีทีละข้อ", "", false);
    } else if (mode === "review") {
      var ids = wrongIds(p, weekId ? [weekId] : null);
      html += "<h1>Review Incorrect Answers" + (weekId ? " — " + esc(weekLabel(weekId)) : "") + "</h1><p>ข้อที่ตอบผิดล่าสุดจะอยู่ในรายการนี้ ตอบถูกแล้วจะถูกนำออก</p></div>";
      if (!ids.length) {
        canStart = false;
        body += '<div class="empty"><div class="big">🎉</div>ยังไม่มีข้อที่ต้องทบทวน' + (weekId ? "ใน " + esc(weekLabel(weekId)) : "") +
          '<br><a href="#/weeks">ไปทำข้อสอบตาม Week</a></div>';
      } else {
        var byWeek = {};
        ids.forEach(function (id) { var wk = engine.byId[id].week; byWeek[wk] = (byWeek[wk] || 0) + 1; });
        body += '<p>มีทั้งหมด <b>' + ids.length + "</b> ข้อ: " + Object.keys(byWeek).map(function (k) { return esc(weekLabel(k)) + " " + byWeek[k] + " ข้อ"; }).join(" · ") + "</p>";
        body += '<input type="hidden" id="f-review-week" value="' + esc(weekId || "") + '">';
        body += checkbox("f-shuffle", "สลับลำดับข้อ", "", true);
        body += checkbox("f-instant", "ดูเฉลยทันทีทีละข้อ", "แนะนำสำหรับการทบทวน", true);
      }
    } else if (mode === "mock") {
      html += "<h1>Mock Exam — จำลองการสอบ</h1><p>สุ่มข้อสอบจากทุก Week ตามสัดส่วนเนื้อหา ไม่แสดงเฉลยระหว่างทำ</p></div>";
      body += '<div class="field"><label for="f-count">จำนวนข้อ</label><select id="f-count">' +
        [30, 40, 60].map(function (n) { return '<option value="' + n + '"' + (n === 40 ? " selected" : "") + ">" + n + " ข้อ</option>"; }).join("") + "</select></div>";
      body += '<div class="field"><label for="f-time">เวลาสอบ</label><select id="f-time">' +
        [[30, "30 นาที"], [45, "45 นาที"], [60, "60 นาที"], [90, "90 นาที"], [0, "ไม่จับเวลา"]].map(function (t) {
          return '<option value="' + t[0] + '"' + (t[0] === 60 ? " selected" : "") + ">" + t[1] + "</option>";
        }).join("") + "</select></div>";
      body += '<div class="notice info">เมื่อหมดเวลา ระบบจะส่งคำตอบให้อัตโนมัติ · ข้อที่ไม่ได้ตอบนับเป็นข้อผิดและถูกเพิ่มในรายการทบทวน</div>';
    }

    if (existing && canStart) {
      body = '<div class="notice">มีชุดข้อสอบที่ทำค้างอยู่ (<b>' + esc(existing.title) + "</b>) — การเริ่มชุดใหม่จะยกเลิกชุดเดิม " +
        '<a href="#/quiz">ทำชุดเดิมต่อ</a></div>' + body;
    }
    if (canStart) body += '<div class="btn-row" style="margin-top:8px"><button class="btn btn-primary" data-action="start" data-mode="' + mode + '">เริ่มทำข้อสอบ</button><a class="btn" href="javascript:history.back()">ย้อนกลับ</a></div>';
    app.innerHTML = html + '<div class="card" style="max-width:680px">' + body + "</div>";
  }

  function checkbox(id, label, hint, checked) {
    return '<label class="check"><input type="checkbox" id="' + id + '"' + (checked ? " checked" : "") + "><span>" + esc(label) +
      (hint ? "<small>" + esc(hint) + "</small>" : "") + "</span></label>";
  }

  function weekPicker() {
    return '<div class="field"><span class="field-label">เลือก Week</span><div class="week-picks">' + QUIZ.weeks.map(function (w) {
      return '<label class="check"><input type="checkbox" name="f-weeks" value="' + w.id + '" checked><span>' + esc(w.label) +
        "<small>" + esc(w.title) + "</small></span></label>";
    }).join("") + "</div></div>";
  }

  function val(id) { var el = document.getElementById(id); return el ? el.value : null; }
  function checked(id) { var el = document.getElementById(id); return !!(el && el.checked); }

  function startFromForm(mode) {
    var p = Store.getProgress();
    var opts = { mode: mode, shuffleChoices: true, shuffleQuestions: checked("f-shuffle"), instant: checked("f-instant") };
    if (mode === "week") {
      var wid = val("f-week");
      opts.weekIds = [wid];
      opts.title = weekLabel(wid) + ": " + engine.weekById[wid].title;
      opts.qids = engine.selectQuestionIds("week", { weekIds: [wid] });
    } else if (mode === "all") {
      opts.weekIds = QUIZ.weeks.map(function (w) { return w.id; });
      opts.title = "All Weeks (" + QUIZ.questions.length + " ข้อ)";
      opts.qids = engine.selectQuestionIds("all", {});
    } else if (mode === "random") {
      var picks = Array.prototype.slice.call(document.querySelectorAll('input[name="f-weeks"]:checked')).map(function (el) { return el.value; });
      if (!picks.length) { alertModal("กรุณาเลือกอย่างน้อย 1 Week"); return; }
      var n = parseInt(val("f-count"), 10);
      opts.weekIds = picks;
      opts.qids = engine.selectQuestionIds("random", { weekIds: picks, count: n });
      opts.title = "Random Quiz (" + opts.qids.length + " ข้อ" + (picks.length < QUIZ.weeks.length ? " · " + picks.map(weekLabel).join(", ") : "") + ")";
    } else if (mode === "review") {
      var rw = val("f-review-week");
      opts.weekIds = rw ? [rw] : [];
      opts.qids = engine.selectQuestionIds("review", { wrongIds: wrongIds(p, rw ? [rw] : null) });
      opts.title = "ทบทวนข้อที่ตอบผิด" + (rw ? " — " + weekLabel(rw) : "") + " (" + opts.qids.length + " ข้อ)";
    } else if (mode === "mock") {
      var count = parseInt(val("f-count"), 10);
      var time = parseInt(val("f-time"), 10);
      opts.weekIds = QUIZ.weeks.map(function (w) { return w.id; });
      opts.qids = engine.selectQuestionIds("mock", { count: count });
      opts.timeLimitMin = time || null;
      opts.instant = false;
      opts.title = "Mock Exam (" + opts.qids.length + " ข้อ" + (time ? " · " + time + " นาที" : "") + ")";
    }
    if (!opts.qids.length) { alertModal("ไม่มีข้อสอบในชุดนี้"); return; }
    beginSession(engine.createSession(opts));
  }

  function beginSession(session) {
    Store.saveSession(session);
    go("#/quiz");
  }

  function alertModal(msg) {
    confirmModal({ title: "แจ้งเตือน", body: "<p>" + esc(msg) + "</p>", ok: "ตกลง", cancel: "ปิด" });
  }

  // ---------------------------------------------------------------- quiz
  function pageQuiz() {
    var s = Store.getSession();
    if (!s) {
      app.innerHTML = '<div class="card empty"><div class="big">📭</div>ไม่มีชุดข้อสอบที่กำลังทำ<br><a href="#/modes">เลือกโหมดฝึก</a></div>';
      return;
    }
    if (s.deadline && Date.now() >= s.deadline) { submitSession(true); return; }
    renderQuiz(s);
    if (s.deadline) startTimer();
  }

  function renderQuiz(s) {
    var i = s.current;
    var it = s.items[i];
    var q = engine.byId[it.qid];
    var answered = engine.answeredCount(s);
    var locked = s.instant && s.checked[i];
    var chosen = s.answers[i];

    var html = '<div class="quiz-top"><div><div class="title">' + esc(s.title) + '</div><div class="counter">ข้อ ' + (i + 1) + "/" + s.items.length +
      ' · ตอบแล้ว <span id="answered-count">' + answered + "</span>/" + s.items.length + "</div></div>" +
      (s.deadline ? '<div class="timer" id="timer" aria-live="off">⏱ ' + fmtClock(s.deadline - Date.now()) + "</div>" : "") + "</div>" +
      '<div style="margin-bottom:16px">' + progressBar(pct(answered, s.items.length)) + "</div>";

    html += '<div class="quiz-layout"><div><article class="card q-card" aria-live="polite">' +
      '<div class="q-meta"><span class="chip">' + esc(weekLabel(q.week)) + '</span><span class="chip">' + esc(TYPE_LABEL[q.type]) + "</span>" +
      (s.flags[i] ? '<span class="chip" style="color:var(--warning)">● ทำเครื่องหมายไว้</span>' : "") + "</div>" +
      '<div class="q-text"><b>' + (i + 1) + ".</b> " + esc(q.q) + "</div>" +
      '<div class="choices" role="radiogroup" aria-label="ตัวเลือก">';
    it.order.forEach(function (orig, pos) {
      var cls = "choice";
      var tag = "";
      if (locked) {
        if (orig === q.a) { cls += " correct"; tag = '<span class="tag">✓ คำตอบที่ถูก</span>'; }
        else if (orig === chosen) { cls += " incorrect"; tag = '<span class="tag">✗ คำตอบของคุณ</span>'; }
      } else if (orig === chosen) cls += " selected";
      html += '<button type="button" class="' + cls + '" role="radio" aria-checked="' + (orig === chosen) + '" data-action="choose" data-orig="' + orig + '"' +
        (locked ? " disabled" : "") + '><span class="letter">' + LETTERS[pos] + "</span><span>" + esc(q.c[orig]) + tag + "</span></button>";
    });
    html += "</div>";

    if (locked) html += explainBlock(q, it.order, chosen);

    html += '<div class="quiz-nav"><div class="left">' +
      '<button class="btn" data-action="prev"' + (i === 0 ? " disabled" : "") + ">← ข้อก่อนหน้า</button>" +
      '<button class="btn" data-action="next"' + (i === s.items.length - 1 ? " disabled" : "") + ">ข้อถัดไป →</button></div>" +
      '<div class="right"><button class="btn btn-ghost" data-action="flag">' + (s.flags[i] ? "★ ยกเลิกเครื่องหมาย" : "☆ ทำเครื่องหมาย") + "</button>" +
      (s.instant && !locked ? '<button class="btn btn-primary" data-action="check"' + (chosen === null ? " disabled" : "") + ">ตรวจคำตอบ</button>" : "") +
      "</div></div>" +
      '<div class="kbd-hint">คีย์ลัด: <kbd>A</kbd>–<kbd>D</kbd> หรือ <kbd>1</kbd>–<kbd>4</kbd> เลือกคำตอบ · <kbd>←</kbd> <kbd>→</kbd> เปลี่ยนข้อ</div>' +
      "</article></div>";

    // palette
    html += '<aside class="card palette-card"><h3>ภาพรวมข้อสอบ</h3><div class="palette">';
    s.items.forEach(function (x, k) {
      var c = "pal";
      var a = s.answers[k];
      if (s.instant && s.checked[k]) c += a === engine.byId[x.qid].a ? " right" : " wrong";
      else if (a !== null && a !== undefined) c += " answered";
      if (k === i) c += " current";
      if (s.flags[k]) c += " flagged";
      html += '<button class="' + c + '" data-action="goto" data-i="' + k + '" aria-label="ข้อ ' + (k + 1) + '">' + (k + 1) + "</button>";
    });
    html += '</div><div class="legend"><span><i class="l-ans"></i>ตอบแล้ว</span><span><i class="l-none"></i>ยังไม่ตอบ</span><span><i class="l-flag"></i>ทำเครื่องหมาย</span>' +
      (s.instant ? '<span><i class="l-right"></i>ถูก</span><span><i class="l-wrong"></i>ผิด</span>' : "") + "</div>" +
      '<div class="btn-row" style="margin-top:14px;flex-direction:column">' +
      '<button class="btn btn-primary btn-block" data-action="submit">ส่งคำตอบ</button>' +
      (answered < s.items.length ? '<button class="btn btn-block" data-action="next-unanswered">ไปข้อที่ยังไม่ได้ตอบ (' + (s.items.length - answered) + ")</button>" : "") +
      '<button class="btn btn-block btn-ghost" data-action="abandon">ยกเลิกชุดนี้</button></div></aside></div>';

    app.innerHTML = html;
  }

  function explainBlock(q, order, chosen) {
    var ok = chosen === q.a;
    var posOf = function (orig) { return LETTERS[order.indexOf(orig)]; };
    var html = '<div class="explain ' + (chosen === null ? "" : ok ? "ok" : "bad") + '">';
    if (chosen === null) html += '<div class="verdict bad">ไม่ได้ตอบ</div>';
    else html += '<div class="verdict ' + (ok ? "ok" : "bad") + '">' + (ok ? "✓ ตอบถูก" : "✗ ตอบผิด — คุณเลือก " + posOf(chosen)) + "</div>";
    html += "<h4>เฉลย: " + posOf(q.a) + "</h4><p>" + esc(q.why) + "</p>";
    html += "<h4>ทำไมตัวเลือกอื่นจึงไม่ถูกต้อง</h4><ul>";
    order.forEach(function (orig, pos) {
      if (orig === q.a) return;
      html += "<li><b>" + LETTERS[pos] + "</b><span>" + esc(q.w[orig]) + "</span></li>";
    });
    html += '</ul><div class="small muted" style="margin-top:8px">หัวข้อที่เกี่ยวข้อง: ' + esc(weekLabel(q.week)) + " — " + esc(q.topic) + "</div></div>";
    return html;
  }

  function updateSession(fn) {
    var s = Store.getSession();
    if (!s) return null;
    fn(s);
    Store.saveSession(s);
    renderQuiz(s);
    return s;
  }

  function startTimer() {
    stopTimer();
    timerHandle = setInterval(function () {
      var s = Store.getSession();
      if (!s || !s.deadline || !/^#\/quiz/.test(location.hash)) { stopTimer(); return; }
      var left = s.deadline - Date.now();
      var el = document.getElementById("timer");
      if (el) {
        el.textContent = "⏱ " + fmtClock(left);
        el.classList.toggle("low", left < 5 * 60000);
      }
      if (left <= 0) { stopTimer(); submitSession(true); }
    }, 1000);
  }
  function stopTimer() { if (timerHandle) { clearInterval(timerHandle); timerHandle = null; } }

  function submitSession(timedOut) {
    var s = Store.getSession();
    if (!s) return;
    stopTimer();
    var finished = timedOut && s.deadline ? Math.min(Date.now(), s.deadline) : Date.now();
    var attempt = engine.grade(s, finished);
    Store.recordAttempt(attempt);
    Store.clearSession();
    reviewFilter = attempt.wrong + attempt.unanswered ? "wrong" : "all";
    go("#/result/" + attempt.id);
    if (timedOut) alertModal("หมดเวลาสอบ — ระบบส่งคำตอบให้อัตโนมัติแล้ว");
  }

  function askSubmit() {
    var s = Store.getSession();
    if (!s) return;
    var un = engine.unansweredIndexes(s);
    var flagged = s.flags.filter(Boolean).length;
    var body = "<p>ตอบแล้ว <b>" + (s.items.length - un.length) + "/" + s.items.length + "</b> ข้อ</p>";
    if (un.length) body += '<p style="color:var(--danger)">ยังไม่ได้ตอบ ' + un.length + " ข้อ: " + un.slice(0, 15).map(function (k) { return k + 1; }).join(", ") + (un.length > 15 ? " …" : "") + "</p>";
    if (flagged) body += "<p>มีข้อที่ทำเครื่องหมายไว้ " + flagged + " ข้อ</p>";
    body += "<p class=\"small muted\">ส่งแล้วจะแก้คำตอบไม่ได้</p>";
    confirmModal({
      title: "ส่งคำตอบ?", body: body, ok: "ส่งคำตอบ", cancel: "กลับไปทำต่อ",
      extra: un.length ? "ไปข้อที่ยังไม่ได้ตอบ" : null,
      onOk: function () { submitSession(false); },
      onExtra: function () { updateSession(function (x) { x.current = un[0]; }); }
    });
  }

  // ---------------------------------------------------------------- result
  function pageResult(id) {
    var a = Store.getAttempt(id);
    if (!a) {
      app.innerHTML = '<div class="card empty"><div class="big">🔎</div>ไม่พบผลการทำข้อสอบนี้<br><a href="#/history">ดูประวัติ</a></div>';
      return;
    }
    var color = a.percent >= 80 ? "var(--success)" : a.percent >= PASS ? "var(--primary)" : a.percent >= 50 ? "var(--warning)" : "var(--danger)";
    var msg = a.percent >= 80 ? "ยอดเยี่ยม! เข้าใจเนื้อหาส่วนนี้ดีมาก" : a.percent >= PASS ? "ผ่านเกณฑ์ — ทบทวนหัวข้อที่ผิดอีกเล็กน้อย" :
      a.percent >= 50 ? "เกือบผ่าน — ควรกลับไปทบทวนหัวข้อด้านล่าง" : "ควรกลับไปทบทวนเนื้อหาก่อนทำใหม่";

    var html = '<div class="page-head"><div class="eyebrow">ผลคะแนน · ' + esc(window.Engine.MODES[a.mode] || "") + "</div><h1>" + esc(a.title) + "</h1>" +
      "<p>" + esc(fmtDate(a.finishedAt)) + " · ใช้เวลา " + esc(fmtDuration(a.durationSec)) + (a.timedOut ? " · หมดเวลา" : "") + "</p></div>";

    html += '<section class="card score-hero"><div class="ring" style="--p:' + a.percent + ";--c:" + color + '"><div><div><strong>' + fmtPct(a.percent) +
      "</strong><br><span>" + a.correct + "/" + a.total + " คะแนน</span></div></div></div><div><h2 style=\"color:" + color + '">' + esc(msg) + "</h2>" +
      '<div class="score-stats"><div class="mini"><div class="k">คะแนนรวม</div><div class="v">' + a.correct + "/" + a.total + "</div></div>" +
      '<div class="mini ok"><div class="k">ตอบถูก</div><div class="v">' + a.correct + "</div></div>" +
      '<div class="mini bad"><div class="k">ตอบผิด</div><div class="v">' + a.wrong + "</div></div>" +
      '<div class="mini"><div class="k">ไม่ได้ตอบ</div><div class="v">' + a.unanswered + "</div></div>" +
      '<div class="mini"><div class="k">เปอร์เซ็นต์</div><div class="v">' + fmtPct(a.percent) + "</div></div></div>" +
      '<div class="btn-row" style="margin-top:14px"><button class="btn btn-primary" data-action="retry" data-id="' + esc(a.id) + '">ทำชุดนี้ใหม่</button>' +
      (a.wrong + a.unanswered ? '<button class="btn" data-action="retry-wrong" data-id="' + esc(a.id) + '">ทำซ้ำข้อที่ผิด/ไม่ได้ตอบ (' + (a.wrong + a.unanswered) + ")</button>" : "") +
      '<a class="btn" href="#/">หน้าหลัก</a></div></div></section>';

    // per week + per type + topics
    var weeks = Object.keys(a.perWeek).sort(function (x, y) {
      return QUIZ.weeks.indexOf(engine.weekById[x]) - QUIZ.weeks.indexOf(engine.weekById[y]);
    });
    html += '<section class="section grid grid-2"><div class="card"><h2>คะแนนแยกตาม Week</h2><div class="table-wrap"><table class="table"><thead><tr><th>Week</th><th class="num">ถูก/ทั้งหมด</th><th class="num">%</th></tr></thead><tbody>';
    weeks.forEach(function (w) {
      var x = a.perWeek[w];
      var p = pct(x.correct, x.total);
      html += "<tr><td>" + esc(weekLabel(w)) + '<div class="small muted">' + esc(engine.weekById[w] ? engine.weekById[w].title : "") + '</div></td><td class="num">' + x.correct + "/" + x.total +
        '</td><td class="num" style="width:120px">' + p + "%" + progressBar(p, barClass(p)) + "</td></tr>";
    });
    html += '</tbody></table></div><h3 style="margin-top:16px">แยกตามประเภทข้อสอบ</h3><div class="table-wrap"><table class="table"><tbody>';
    ["R", "U", "A"].forEach(function (t) {
      var x = a.perType[t];
      if (!x.total) return;
      html += "<tr><td>" + TYPE_LABEL[t] + '</td><td class="num">' + x.correct + "/" + x.total + '</td><td class="num">' + pct(x.correct, x.total) + "%</td></tr>";
    });
    html += "</tbody></table></div></div>";

    var topics = engine.topicsToReview(a);
    html += '<div class="card"><h2>หัวข้อที่ควรกลับไปทบทวน</h2>';
    if (!topics.length) html += '<div class="empty"><div class="big">🏆</div>ตอบถูกทุกข้อ ไม่มีหัวข้อที่ต้องทบทวน</div>';
    else {
      html += '<ul class="topic-list">' + topics.map(function (t) {
        return '<li><div><div class="wk">' + esc(weekLabel(t.week)) + "</div>" + esc(t.topic) + '</div><span class="cnt">ผิด ' + t.count + " ข้อ</span></li>";
      }).join("") + "</ul>";
    }
    html += "</div></section>";

    // review list
    var counts = { all: a.items.length, wrong: a.wrong + a.unanswered, ok: a.correct };
    html += '<section class="section"><div class="section-title"><h2>เฉลยและคำอธิบาย</h2></div><div class="tabs" role="tablist">' +
      tab("all", "ทั้งหมด", counts.all) + tab("wrong", "ผิด/ไม่ได้ตอบ", counts.wrong) + tab("ok", "ตอบถูก", counts.ok) + '</div><div id="review-list">';
    a.items.forEach(function (it, k) {
      var show = reviewFilter === "all" || (reviewFilter === "ok" ? it.isCorrect : !it.isCorrect);
      if (!show) return;
      var q = engine.byId[it.qid];
      if (!q) return;
      var st = it.chosen === null ? '<span class="status none">ไม่ได้ตอบ</span>' : it.isCorrect ? '<span class="status ok">ถูก</span>' : '<span class="status bad">ผิด</span>';
      html += '<article class="card review-item"><div class="head"><span class="num">ข้อ ' + (k + 1) + '</span><div class="chips"><span class="chip">' + esc(weekLabel(q.week)) +
        '</span><span class="chip">' + esc(TYPE_LABEL[q.type]) + "</span>" + st + '</div></div><div class="q-text">' + esc(q.q) + '</div><div class="choices">';
      it.order.forEach(function (orig, pos) {
        var cls = "choice", tag = "";
        if (orig === q.a) { cls += " correct"; tag = '<span class="tag">✓ เฉลย</span>'; }
        else if (orig === it.chosen) { cls += " incorrect"; tag = '<span class="tag">✗ คำตอบของคุณ</span>'; }
        html += '<button class="' + cls + '" disabled><span class="letter">' + LETTERS[pos] + "</span><span>" + esc(q.c[orig]) + tag + "</span></button>";
      });
      html += "</div>" + explainBlock(q, it.order, it.chosen) + "</article>";
    });
    if (!counts[reviewFilter]) html += '<div class="card empty">ไม่มีข้อในหมวดนี้</div>';
    html += "</div></section>";
    app.innerHTML = html;
  }

  function tab(key, label, n) {
    return '<button class="tab' + (reviewFilter === key ? " active" : "") + '" role="tab" aria-selected="' + (reviewFilter === key) +
      '" data-action="filter" data-f="' + key + '">' + esc(label) + " (" + n + ")</button>";
  }

  // ---------------------------------------------------------------- history
  function pageHistory() {
    var p = Store.getProgress();
    var html = '<div class="page-head"><div class="eyebrow">ประวัติ</div><h1>ประวัติการทำข้อสอบ</h1><p>เก็บไว้ในเบราว์เซอร์นี้ (LocalStorage) สูงสุด 60 ครั้งล่าสุด</p></div>';
    html += '<div class="card">' + (p.attempts.length ? attemptsTable(p.attempts) : '<div class="empty"><div class="big">🗂</div>ยังไม่มีประวัติการทำข้อสอบ</div>') + "</div>";
    html += '<div class="section card card-flat"><h3>รีเซ็ตข้อมูล</h3><p class="muted small">ลบประวัติคะแนน สถิติรายข้อ รายการข้อที่ตอบผิด และชุดที่ทำค้างอยู่ทั้งหมด</p>' +
      '<button class="btn btn-danger" data-action="reset">ลบข้อมูลทั้งหมด</button></div>';
    app.innerHTML = html;
  }

  // ---------------------------------------------------------------- router
  function render() {
    stopTimer();
    modalRoot.innerHTML = "";
    var parts = (location.hash.replace(/^#\/?/, "") || "").split("/");
    var route = parts[0] || "";
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      var n = a.getAttribute("data-nav");
      var active = (n === "home" && route === "") || n === route ||
        (n === "modes" && (route === "start" || route === "quiz")) || (n === "history" && route === "result");
      a.classList.toggle("active", active);
    });
    switch (route) {
      case "": pageDashboard(); break;
      case "weeks": pageWeeks(); break;
      case "modes": pageModes(); break;
      case "start": pageStart(parts[1], parts[2]); break;
      case "quiz": pageQuiz(); break;
      case "result": pageResult(parts[1]); break;
      case "history": pageHistory(); break;
      default: pageDashboard();
    }
    if (route !== "quiz") window.scrollTo(0, 0);
  }

  // ---------------------------------------------------------------- events
  app.addEventListener("click", function (e) {
    var el = e.target.closest("[data-action]");
    if (!el || el.disabled) return;
    var act = el.getAttribute("data-action");
    switch (act) {
      case "start":
        var mode = el.getAttribute("data-mode");
        if (Store.getSession()) {
          confirmModal({ title: "เริ่มชุดใหม่?", body: "<p>ชุดข้อสอบที่ทำค้างอยู่จะถูกยกเลิก</p>", ok: "เริ่มชุดใหม่", danger: true, onOk: function () { startFromForm(mode); } });
        } else startFromForm(mode);
        break;
      case "choose":
        updateSession(function (s) {
          if (s.instant && s.checked[s.current]) return;
          s.answers[s.current] = parseInt(el.getAttribute("data-orig"), 10);
        });
        break;
      case "check":
        updateSession(function (s) { if (s.answers[s.current] !== null) s.checked[s.current] = true; });
        break;
      case "prev": updateSession(function (s) { if (s.current > 0) s.current--; }); window.scrollTo(0, 0); break;
      case "next": updateSession(function (s) { if (s.current < s.items.length - 1) s.current++; }); window.scrollTo(0, 0); break;
      case "goto": updateSession(function (s) { s.current = parseInt(el.getAttribute("data-i"), 10); }); window.scrollTo(0, 0); break;
      case "flag": updateSession(function (s) { s.flags[s.current] = !s.flags[s.current]; }); break;
      case "next-unanswered":
        updateSession(function (s) {
          var un = engine.unansweredIndexes(s);
          if (!un.length) return;
          var after = un.filter(function (k) { return k > s.current; });
          s.current = after.length ? after[0] : un[0];
        });
        window.scrollTo(0, 0);
        break;
      case "submit": askSubmit(); break;
      case "abandon":
        confirmModal({
          title: "ยกเลิกชุดข้อสอบนี้?", body: "<p>คำตอบในชุดนี้จะไม่ถูกบันทึกเป็นคะแนน</p>", ok: "ยกเลิกชุดนี้", danger: true,
          onOk: function () { Store.clearSession(); go("#/modes"); }
        });
        break;
      case "filter":
        reviewFilter = el.getAttribute("data-f");
        var y = window.scrollY;
        pageResult(location.hash.split("/")[2]);
        window.scrollTo(0, y);
        break;
      case "retry":
      case "retry-wrong":
        var att = Store.getAttempt(el.getAttribute("data-id"));
        if (!att) return;
        var ids = att.items.filter(function (it) { return act === "retry" || !it.isCorrect; }).map(function (it) { return it.qid; });
        var doStart = function () {
          // ทำซ้ำ Mock Exam ยังคงไม่แสดงเฉลยระหว่างทำ (แต่ไม่จับเวลา) ส่วนทำซ้ำข้อที่ผิดจะเปิดเฉลยทันที
          beginSession(engine.createSession({
            mode: act === "retry" && att.mode === "mock" ? "mock" : "retry",
            title: (act === "retry" ? "ทำซ้ำ: " : "ทำซ้ำข้อที่ผิด: ") + att.title.replace(/^ทำซ้ำ(ข้อที่ผิด)?: /, ""),
            weekIds: att.weekIds, qids: ids, shuffleQuestions: true, shuffleChoices: true,
            instant: act === "retry-wrong"
          }));
        };
        if (Store.getSession()) confirmModal({ title: "เริ่มชุดใหม่?", body: "<p>ชุดข้อสอบที่ทำค้างอยู่จะถูกยกเลิก</p>", ok: "เริ่มชุดใหม่", danger: true, onOk: doStart });
        else doStart();
        break;
      case "reset":
        confirmModal({
          title: "ลบข้อมูลทั้งหมด?", body: "<p>ประวัติคะแนนและรายการข้อที่ตอบผิดจะถูกลบถาวร</p>", ok: "ลบข้อมูล", danger: true,
          onOk: function () { Store.resetProgress(); render(); }
        });
        break;
    }
  });

  app.addEventListener("change", function (e) {
    if (e.target.id === "f-week") go("#/start/week/" + e.target.value);
  });

  document.addEventListener("keydown", function (e) {
    if (!/^#\/quiz/.test(location.hash) || modalRoot.innerHTML) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "select" || tag === "textarea") return;
    var k = e.key.toLowerCase();
    var idx = "abcd".indexOf(k);
    if (idx < 0 && "1234".indexOf(k) >= 0) idx = parseInt(k, 10) - 1;
    var s = Store.getSession();
    if (!s) return;
    if (idx >= 0) {
      e.preventDefault();
      updateSession(function (x) {
        if (x.instant && x.checked[x.current]) return;
        x.answers[x.current] = x.items[x.current].order[idx];
      });
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      updateSession(function (x) { if (x.current < x.items.length - 1) x.current++; });
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      updateSession(function (x) { if (x.current > 0) x.current--; });
    }
  });

  // theme
  function applyTheme() {
    var t = Store.getSettings().theme;
    if (t) document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
  }
  document.getElementById("theme-toggle").addEventListener("click", function () {
    var st = Store.getSettings();
    var dark = st.theme ? st.theme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    st.theme = dark ? "light" : "dark";
    Store.saveSettings(st);
    applyTheme();
  });

  applyTheme();
  window.addEventListener("hashchange", render);
  render();
})();
