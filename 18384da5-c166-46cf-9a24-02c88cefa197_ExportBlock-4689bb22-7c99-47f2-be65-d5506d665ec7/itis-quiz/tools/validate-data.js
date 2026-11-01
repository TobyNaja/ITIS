// ตรวจความถูกต้องของข้อมูลข้อสอบ: node tools/validate-data.js
// ตรวจ: id ซ้ำ, จำนวนตัวเลือก, index คำตอบ, คำอธิบายตัวเลือกผิด, ตัวเลือกซ้ำ,
// สัดส่วนประเภทข้อสอบ และ bias ของความยาวคำตอบที่ถูก
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const dataFiles = [...html.matchAll(/<script src="(js\/data\/[^"]+)"/g)].map(m => m[1]);

const ctx = { window: {} };
vm.createContext(ctx);
for (const f of dataFiles) {
  vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f });
  if (!ctx.QUIZ) ctx.QUIZ = ctx.window.QUIZ;
}
const QUIZ = ctx.window.QUIZ;

const errors = [];
const ids = new Set();
const weekIds = new Set(QUIZ.weeks.map(w => w.id));
let longestCorrect = 0;

for (const q of QUIZ.questions) {
  const tag = q.id || "(no id)";
  if (!q.id) errors.push("missing id");
  if (ids.has(q.id)) errors.push(tag + ": duplicate id");
  ids.add(q.id);
  if (!weekIds.has(q.week)) errors.push(tag + ": unknown week " + q.week);
  if (!["R", "U", "A"].includes(q.type)) errors.push(tag + ": bad type " + q.type);
  if (!q.q || !q.topic || !q.why) errors.push(tag + ": missing q/topic/why");
  if (!Array.isArray(q.c) || q.c.length !== 4) errors.push(tag + ": must have 4 choices");
  else if (new Set(q.c).size !== 4) errors.push(tag + ": duplicate choices");
  if (!Number.isInteger(q.a) || q.a < 0 || q.a > 3) errors.push(tag + ": bad answer index");
  if (!Array.isArray(q.w) || q.w.length !== 4) errors.push(tag + ": w must have 4 entries");
  else q.w.forEach((x, i) => {
    if (i === q.a && x !== null) errors.push(tag + ": w[a] must be null");
    if (i !== q.a && (!x || typeof x !== "string")) errors.push(tag + ": missing wrong-choice note " + i);
  });
  if (Array.isArray(q.c) && q.c.length === 4) {
    const lens = q.c.map(s => s.length);
    const max = Math.max(...lens);
    if (lens[q.a] === max && lens.filter(l => l === max).length === 1) longestCorrect++;
  }
}

console.log("Questions:", QUIZ.questions.length);
for (const w of QUIZ.weeks) {
  const qs = QUIZ.questions.filter(q => q.week === w.id);
  const t = { R: 0, U: 0, A: 0 };
  const pos = [0, 0, 0, 0];
  qs.forEach(q => { t[q.type]++; pos[q.a]++; });
  const pct = k => Math.round(t[k] / qs.length * 100) + "%";
  console.log(`${w.label.padEnd(11)} ${String(qs.length).padStart(3)} ข้อ | R ${pct("R")} U ${pct("U")} A ${pct("A")} | answer pos ${pos.join("/")}`);
}
const total = QUIZ.questions.length;
const t = { R: 0, U: 0, A: 0 };
QUIZ.questions.forEach(q => t[q.type]++);
console.log(`รวม R ${Math.round(t.R / total * 100)}% U ${Math.round(t.U / total * 100)}% A ${Math.round(t.A / total * 100)}%`);
console.log(`คำตอบที่ถูกเป็นตัวเลือกที่ยาวที่สุด: ${longestCorrect}/${total} (${Math.round(longestCorrect / total * 100)}%, สุ่มคาดหวัง ~25%)`);

if (errors.length) {
  console.error("\nERRORS:\n" + errors.join("\n"));
  process.exit(1);
}
console.log("\nOK — ไม่พบข้อผิดพลาดของโครงสร้างข้อมูล");
