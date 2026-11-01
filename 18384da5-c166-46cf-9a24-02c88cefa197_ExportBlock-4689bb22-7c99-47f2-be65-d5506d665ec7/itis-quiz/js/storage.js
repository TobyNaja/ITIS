/*
 * Store — บันทึกข้อมูลลง LocalStorage
 *  - progress: ประวัติการทำข้อสอบ, สถิติรายข้อ, รายการข้อที่ตอบผิด
 *  - session : ชุดข้อสอบที่กำลังทำค้างอยู่ (Refresh แล้วทำต่อได้)
 *  - settings: ธีม ฯลฯ
 * ทุกการอ่าน/เขียนครอบด้วย try/catch เพื่อให้เว็บยังใช้งานได้แม้ Storage ถูกปิด
 */
(function () {
  var KEY_PROGRESS = "itisQuiz.progress.v1";
  var KEY_SESSION = "itisQuiz.session.v1";
  var KEY_SETTINGS = "itisQuiz.settings.v1";
  var MAX_ATTEMPTS = 60;

  var memory = {}; // fallback เมื่อ localStorage ใช้ไม่ได้

  function read(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return memory[key] !== undefined ? memory[key] : fallback;
    }
  }

  function write(key, value) {
    memory[key] = value;
    try {
      if (value === null) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function emptyProgress() {
    return { attempts: [], qstats: {}, wrong: {} };
  }

  var Store = {
    getProgress: function () {
      var p = read(KEY_PROGRESS, null);
      if (!p || !Array.isArray(p.attempts)) return emptyProgress();
      p.qstats = p.qstats || {};
      p.wrong = p.wrong || {};
      return p;
    },

    /** บันทึกผลการส่งข้อสอบ 1 ครั้ง และอัปเดตสถิติรายข้อ/ข้อที่ตอบผิด */
    recordAttempt: function (attempt) {
      var p = this.getProgress();
      var now = attempt.finishedAt;
      attempt.items.forEach(function (it) {
        if (it.chosen === null || it.chosen === undefined) return; // ข้อที่ไม่ได้ตอบ ไม่นับเป็นสถิติ
        var s = p.qstats[it.qid] || { seen: 0, correct: 0 };
        s.seen += 1;
        if (it.isCorrect) s.correct += 1;
        s.last = it.isCorrect;
        s.lastAt = now;
        p.qstats[it.qid] = s;
        if (it.isCorrect) delete p.wrong[it.qid];
        else p.wrong[it.qid] = now;
      });
      // ข้อที่ไม่ได้ตอบใน Mock Exam ถือว่าควรกลับมาทบทวน
      if (attempt.mode === "mock") {
        attempt.items.forEach(function (it) {
          if (it.chosen === null || it.chosen === undefined) p.wrong[it.qid] = now;
        });
      }
      p.attempts.unshift(attempt);
      if (p.attempts.length > MAX_ATTEMPTS) p.attempts.length = MAX_ATTEMPTS;
      write(KEY_PROGRESS, p);
      return p;
    },

    getAttempt: function (id) {
      var list = this.getProgress().attempts;
      for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
      return null;
    },

    resetProgress: function () {
      write(KEY_PROGRESS, null);
      write(KEY_SESSION, null);
    },

    getSession: function () { return read(KEY_SESSION, null); },
    saveSession: function (s) { write(KEY_SESSION, s); },
    clearSession: function () { write(KEY_SESSION, null); },

    getSettings: function () { return read(KEY_SETTINGS, {}) || {}; },
    saveSettings: function (s) { write(KEY_SETTINGS, s); },

    isPersistent: function () {
      try {
        var k = "itisQuiz.__test";
        window.localStorage.setItem(k, "1");
        window.localStorage.removeItem(k);
        return true;
      } catch (e) {
        return false;
      }
    }
  };

  window.Store = Store;
})();
