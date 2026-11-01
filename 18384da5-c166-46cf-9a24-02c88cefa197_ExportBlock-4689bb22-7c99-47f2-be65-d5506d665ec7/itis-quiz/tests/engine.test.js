// ทดสอบตรรกะการเลือกข้อสอบ ตรวจคำตอบ คิดคะแนน และการบันทึกผล: node --test tests/
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");

function loadApp(withStorage) {
  const store = {};
  const window = {};
  if (withStorage) {
    window.localStorage = {
      getItem: k => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: k => { delete store[k]; }
    };
  }
  const ctx = { window, globalThis: window };
  vm.createContext(ctx);
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]).filter(f => !f.endsWith("app.js"));
  for (const f of scripts) {
    vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f });
    if (!ctx.QUIZ && window.QUIZ) ctx.QUIZ = window.QUIZ;
  }
  return { QUIZ: window.QUIZ, Engine: window.Engine, Store: window.Store, store };
}

// RNG แบบกำหนดค่าได้ เพื่อให้ผลทดสอบคงที่
function seeded(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

const { QUIZ, Engine } = loadApp(false);
const engine = new Engine(QUIZ);

test("ข้อมูลข้อสอบโหลดครบทุก Week", () => {
  assert.equal(QUIZ.weeks.length, 6);
  for (const w of QUIZ.weeks) assert.ok(engine.questionsOfWeek(w.id).length >= 20, w.id);
});

test("Practice by Week เลือกเฉพาะข้อของ Week นั้น", () => {
  const ids = engine.selectQuestionIds("week", { weekIds: ["w11"] });
  assert.equal(ids.length, engine.questionsOfWeek("w11").length);
  assert.ok(ids.every(id => engine.byId[id].week === "w11"));
});

test("Random Quiz คืนจำนวนตามที่ขอ ไม่ซ้ำ และอยู่ใน Week ที่เลือก", () => {
  const ids = engine.selectQuestionIds("random", { weekIds: ["w6", "w14"], count: 20 }, seeded(1));
  assert.equal(ids.length, 20);
  assert.equal(new Set(ids).size, 20);
  assert.ok(ids.every(id => ["w6", "w14"].includes(engine.byId[id].week)));
});

test("Mock Exam สุ่มตามสัดส่วนทุก Week และไม่เกินจำนวนที่มี", () => {
  const ids = engine.selectQuestionIds("mock", { count: 40 }, seeded(7));
  assert.equal(ids.length, 40);
  assert.equal(new Set(ids).size, 40);
  const weeks = new Set(ids.map(id => engine.byId[id].week));
  assert.equal(weeks.size, QUIZ.weeks.length, "ทุก Week ต้องมีอย่างน้อย 1 ข้อ");
  const all = engine.selectQuestionIds("mock", { count: 9999 }, seeded(7));
  assert.equal(all.length, QUIZ.questions.length);
});

test("Review เลือกเฉพาะ id ที่มีอยู่จริงในคลังข้อสอบ", () => {
  const ids = engine.selectQuestionIds("review", { wrongIds: ["w6-01", "not-exist", "w15-03"] });
  assert.deepEqual(ids, ["w6-01", "w15-03"]);
});

test("สลับตัวเลือกแล้วยังตรวจคำตอบถูกต้อง (เก็บ index ต้นฉบับ)", () => {
  const qids = ["w6-01", "w7-02", "w11-03", "w12-04"];
  const s = engine.createSession({ mode: "retry", qids, shuffleChoices: true }, seeded(3));
  s.items.forEach(it => assert.deepEqual([...it.order].sort(), [0, 1, 2, 3]));
  // ตอบถูก 2 ข้อ ผิด 1 ข้อ ไม่ตอบ 1 ข้อ
  s.answers[0] = engine.byId[qids[0]].a;
  s.answers[1] = (engine.byId[qids[1]].a + 1) % 4;
  s.answers[2] = engine.byId[qids[2]].a;
  const r = engine.grade(s, s.startedAt + 65000);
  assert.equal(r.total, 4);
  assert.equal(r.correct, 2);
  assert.equal(r.wrong, 1);
  assert.equal(r.unanswered, 1);
  assert.equal(r.percent, 50);
  assert.equal(r.durationSec, 65);
  assert.equal(r.items[3].chosen, null);
  assert.equal(r.perWeek.w6.correct, 1);
  assert.equal(r.perWeek.w7.correct, 0);
});

test("คะแนนเต็มและศูนย์คำนวณถูกต้อง", () => {
  const qids = engine.selectQuestionIds("week", { weekIds: ["w15"] });
  const s = engine.createSession({ mode: "week", qids });
  s.answers = s.items.map(it => engine.byId[it.qid].a);
  assert.equal(engine.grade(s).percent, 100);
  s.answers = s.items.map(it => (engine.byId[it.qid].a + 2) % 4);
  const r = engine.grade(s);
  assert.equal(r.percent, 0);
  assert.equal(r.wrong, qids.length);
});

test("Mock Exam ไม่เปิดเฉลยทันทีแม้ส่ง instant=true", () => {
  const s = engine.createSession({ mode: "mock", qids: ["w6-01"], instant: true, timeLimitMin: 30 });
  assert.equal(s.instant, false);
  assert.ok(s.deadline - s.startedAt === 30 * 60000);
});

test("หัวข้อที่ควรทบทวนรวมจากข้อผิดและข้อที่ไม่ได้ตอบ", () => {
  const s = engine.createSession({ mode: "retry", qids: ["w6-02", "w6-03", "w11-01"] });
  s.answers[0] = engine.byId["w6-02"].a;
  const topics = engine.topicsToReview(engine.grade(s));
  assert.equal(topics.reduce((n, t) => n + t.count, 0), 2);
  assert.ok(topics.some(t => t.topic === engine.byId["w6-03"].topic));
});

test("Store บันทึกผล สถิติรายข้อ และรายการข้อผิด (ตอบถูกภายหลังจะถูกนำออก)", () => {
  const { QUIZ: Q, Engine: E, Store, store } = loadApp(true);
  const en = new E(Q);
  const s1 = en.createSession({ mode: "retry", qids: ["w6-01", "w6-02"] });
  s1.answers[0] = (en.byId["w6-01"].a + 1) % 4; // ผิด
  s1.answers[1] = en.byId["w6-02"].a;           // ถูก
  Store.recordAttempt(en.grade(s1));
  let p = Store.getProgress();
  assert.ok(p.wrong["w6-01"]);
  assert.ok(!p.wrong["w6-02"]);
  assert.equal(p.qstats["w6-01"].seen, 1);
  assert.equal(p.attempts.length, 1);

  const s2 = en.createSession({ mode: "review", qids: ["w6-01"] });
  s2.answers[0] = en.byId["w6-01"].a;
  Store.recordAttempt(en.grade(s2));
  p = Store.getProgress();
  assert.ok(!p.wrong["w6-01"], "ตอบถูกแล้วต้องออกจากรายการทบทวน");
  assert.equal(p.qstats["w6-01"].seen, 2);
  assert.equal(p.qstats["w6-01"].correct, 1);
  assert.equal(p.attempts.length, 2);

  // ข้อมูลอยู่ใน storage จริง (Refresh แล้วไม่หาย)
  assert.ok(JSON.parse(store["itisQuiz.progress.v1"]).attempts.length === 2);

  // Mock: ข้อที่ไม่ได้ตอบถูกเพิ่มในรายการทบทวน
  const s3 = en.createSession({ mode: "mock", qids: ["w14-01"] });
  Store.recordAttempt(en.grade(s3));
  assert.ok(Store.getProgress().wrong["w14-01"]);

  Store.saveSession(s3);
  assert.equal(Store.getSession().id, s3.id);
  Store.resetProgress();
  assert.equal(Store.getProgress().attempts.length, 0);
  assert.equal(Store.getSession(), null);
});

test("Store ทำงานได้แม้ไม่มี localStorage (fallback หน่วยความจำ)", () => {
  const { Store } = loadApp(false);
  assert.equal(Store.isPersistent(), false);
  Store.saveSettings({ theme: "dark" });
  assert.equal(Store.getSettings().theme, "dark");
});
