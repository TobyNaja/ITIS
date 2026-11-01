/*
 * Engine — ตรรกะของแบบทดสอบ (ไม่ยุ่งกับ UI)
 *  - เลือกข้อสอบตามโหมด
 *  - สร้าง Session (สลับลำดับข้อ/ตัวเลือก)
 *  - ตรวจคำตอบและคำนวณคะแนน
 * คำตอบใน Session เก็บเป็น index ของตัวเลือก "ต้นฉบับ" (q.c) จึงตรวจได้ถูกต้องเสมอ
 * ไม่ว่าตัวเลือกจะถูกสลับตำแหน่งบนหน้าจออย่างไร
 */
(function (root) {
  var LETTERS = ["A", "B", "C", "D"];
  var MODES = {
    week: "Practice by Week",
    all: "All Weeks",
    random: "Random Quiz",
    review: "Review Incorrect Answers",
    mock: "Mock Exam",
    retry: "ทำซ้ำชุดเดิม"
  };

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function shuffle(arr, rng) {
    var a = arr.slice();
    rng = rng || Math.random;
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function Engine(bank) {
    this.bank = bank;
    this.byId = {};
    this.weekById = {};
    var self = this;
    bank.questions.forEach(function (q) { self.byId[q.id] = q; });
    bank.weeks.forEach(function (w) { self.weekById[w.id] = w; });
  }

  Engine.LETTERS = LETTERS;
  Engine.MODES = MODES;
  Engine.shuffle = shuffle;

  Engine.prototype.questionsOfWeek = function (weekId) {
    return this.bank.questions.filter(function (q) { return q.week === weekId; });
  };

  Engine.prototype.idsOf = function (weekIds) {
    var set = {};
    weekIds.forEach(function (w) { set[w] = true; });
    return this.bank.questions.filter(function (q) { return set[q.week]; }).map(function (q) { return q.id; });
  };

  /** สุ่มแบบแบ่งสัดส่วนตามจำนวนข้อของแต่ละ Week (Largest Remainder) — ใช้กับ Mock Exam */
  Engine.prototype.stratifiedSample = function (weekIds, n, rng) {
    var self = this;
    var pools = weekIds.map(function (w) { return shuffle(self.questionsOfWeek(w).map(function (q) { return q.id; }), rng); });
    var total = pools.reduce(function (s, p) { return s + p.length; }, 0);
    n = Math.min(n, total);
    var quota = pools.map(function (p) { return n * p.length / total; });
    var take = quota.map(Math.floor);
    var left = n - take.reduce(function (s, x) { return s + x; }, 0);
    var order = quota.map(function (q, i) { return { i: i, r: q - Math.floor(q) }; })
      .sort(function (a, b) { return b.r - a.r; });
    for (var k = 0; k < left; k++) take[order[k % order.length].i]++;
    var out = [];
    pools.forEach(function (p, i) { out = out.concat(p.slice(0, Math.min(take[i], p.length))); });
    return shuffle(out, rng);
  };

  /**
   * เลือกรายการ id ข้อสอบตามโหมด
   * opts: { weekIds, count, wrongIds, qids }
   */
  Engine.prototype.selectQuestionIds = function (mode, opts, rng) {
    opts = opts || {};
    var self = this;
    var weekIds = opts.weekIds && opts.weekIds.length ? opts.weekIds : this.bank.weeks.map(function (w) { return w.id; });
    switch (mode) {
      case "week":
      case "all":
        return this.idsOf(weekIds);
      case "random":
        return shuffle(this.idsOf(weekIds), rng).slice(0, opts.count || 20);
      case "mock":
        return this.stratifiedSample(weekIds, opts.count || 40, rng);
      case "review":
        return (opts.wrongIds || []).filter(function (id) { return self.byId[id]; });
      case "retry":
        return (opts.qids || []).filter(function (id) { return self.byId[id]; });
      default:
        throw new Error("Unknown mode: " + mode);
    }
  };

  /**
   * สร้าง Session ใหม่
   * opts: { mode, title, weekIds, qids, shuffleQuestions, shuffleChoices, instant, timeLimitMin }
   */
  Engine.prototype.createSession = function (opts, rng) {
    var ids = opts.qids.slice();
    if (opts.shuffleQuestions) ids = shuffle(ids, rng);
    var items = ids.map(function (id) {
      return { qid: id, order: opts.shuffleChoices === false ? [0, 1, 2, 3] : shuffle([0, 1, 2, 3], rng) };
    });
    var now = Date.now();
    return {
      id: uid(),
      mode: opts.mode,
      title: opts.title || MODES[opts.mode],
      weekIds: opts.weekIds || [],
      items: items,
      answers: items.map(function () { return null; }),
      checked: items.map(function () { return false; }),
      flags: items.map(function () { return false; }),
      current: 0,
      instant: !!opts.instant && opts.mode !== "mock",
      startedAt: now,
      deadline: opts.timeLimitMin ? now + opts.timeLimitMin * 60000 : null
    };
  };

  Engine.prototype.answeredCount = function (session) {
    return session.answers.filter(function (a) { return a !== null && a !== undefined; }).length;
  };

  Engine.prototype.unansweredIndexes = function (session) {
    var out = [];
    session.answers.forEach(function (a, i) { if (a === null || a === undefined) out.push(i); });
    return out;
  };

  /** ตรวจคำตอบทั้งชุด → Attempt (ผลคะแนน) */
  Engine.prototype.grade = function (session, finishedAt) {
    var self = this;
    finishedAt = finishedAt || Date.now();
    var perWeek = {};
    var perType = { R: { total: 0, correct: 0 }, U: { total: 0, correct: 0 }, A: { total: 0, correct: 0 } };
    var correct = 0, wrong = 0, unanswered = 0;

    var items = session.items.map(function (it, i) {
      var q = self.byId[it.qid];
      var chosen = session.answers[i];
      var answered = chosen !== null && chosen !== undefined;
      var isCorrect = answered && chosen === q.a;
      if (!answered) unanswered++;
      else if (isCorrect) correct++;
      else wrong++;

      var pw = perWeek[q.week] || (perWeek[q.week] = { total: 0, correct: 0 });
      pw.total++;
      if (isCorrect) pw.correct++;
      perType[q.type].total++;
      if (isCorrect) perType[q.type].correct++;

      return { qid: it.qid, order: it.order, chosen: answered ? chosen : null, isCorrect: isCorrect };
    });

    var total = items.length;
    return {
      id: session.id,
      mode: session.mode,
      title: session.title,
      weekIds: session.weekIds,
      startedAt: session.startedAt,
      finishedAt: finishedAt,
      durationSec: Math.max(0, Math.round((finishedAt - session.startedAt) / 1000)),
      timedOut: !!(session.deadline && finishedAt >= session.deadline),
      items: items,
      total: total,
      correct: correct,
      wrong: wrong,
      unanswered: unanswered,
      percent: total ? Math.round(correct / total * 1000) / 10 : 0,
      perWeek: perWeek,
      perType: perType
    };
  };

  /** หัวข้อที่ควรทบทวน: รวมจากข้อที่ตอบผิด/ไม่ได้ตอบ เรียงตามจำนวน */
  Engine.prototype.topicsToReview = function (attempt) {
    var self = this;
    var map = {};
    attempt.items.forEach(function (it) {
      if (it.isCorrect) return;
      var q = self.byId[it.qid];
      if (!q) return;
      var key = q.week + "|" + q.topic;
      var t = map[key] || (map[key] = { week: q.week, topic: q.topic, count: 0 });
      t.count++;
    });
    return Object.keys(map).map(function (k) { return map[k]; })
      .sort(function (a, b) { return b.count - a.count || a.week.localeCompare(b.week); });
  };

  root.Engine = Engine;
  if (typeof module !== "undefined" && module.exports) module.exports = Engine;
})(typeof window !== "undefined" ? window : globalThis);
