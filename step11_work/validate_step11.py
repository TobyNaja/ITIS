"""STEP 11 dataset validation (scratch tooling — read-only ต่อ DB/registry/CSV/evidence)
ตรวจ 58 runs: identity ครบ, registry = CSV = evidence, ช่วงเวลา engine ไม่ซ้อน, แถวใน DB ทุกแถวผูกกับ run ได้,
และผลของแต่ละ run ตรงกับ expected ของ test_plan §4
usage: validate_step11.py [--md docs/evidence/step11_validation.md]
"""
import csv
import json
import sqlite3
import sys
from collections import Counter
from datetime import datetime
from pathlib import Path

ROOT = Path("D:/IT/Year 3/ITIS/Project-ITIS")
DB = ROOT / "data" / "step11_experiment.db"
REGISTRY = ROOT / "docs" / "evidence" / "step11_runs.csv"
RESULTS = ROOT / "experiments" / "results_step11.csv"

EXPECTED_IDS = ([f"T{t}-R{n:02d}" for t in range(1, 10) for n in range(1, 6)]
                + [f"T10-R{n:02d}" for n in range(1, 11)] + [f"T11-R{n:02d}" for n in range(1, 4)])
EVENTS = {"T1": 0, "T2": 1, "T3": 5, "T4": 5, "T5": 5, "T6": 5, "T7": 5, "T8": 0, "T9": 0, "T11": 5}
T11_SET = {"T11-R01": "A", "T11-R02": "B", "T11-R03": "C"}


def ts(v):
    return datetime.fromisoformat(v.replace("Z", "+00:00"))


def load():
    c = sqlite3.connect(f"file:{DB}?mode=ro", uri=True)
    c.row_factory = sqlite3.Row
    keys = {"security_events": "timestamp", "correlated_patterns": "created_at",
            "risk_assessments": "created_at", "decisions": "created_at", "actions": "timestamp",
            "recovery_events": "timestamp"}
    db = {t: [dict(r) for r in c.execute(f"SELECT * FROM {t} ORDER BY rowid")] for t in keys}
    db["experiment_timestamps"] = [dict(r) for r in c.execute("SELECT * FROM experiment_timestamps")]
    db["active_blocks"] = [dict(r) for r in c.execute("SELECT * FROM active_blocks")]
    db["_integrity"] = c.execute("PRAGMA integrity_check").fetchone()[0]
    return db, keys


def expected_events(run_id):
    t = run_id.split("-")[0]
    if t == "T10":
        return 1 if int(run_id[-2:]) <= 5 else 4
    return EVENTS[t]


def check_run(reg, res, got):
    """คืน list ของปัญหา (ว่าง = PASS)"""
    t, rid = reg["test_id"], reg["run_id"]
    p = []
    n_ev = len(got["security_events"])
    bg = [e for e in got["security_events"] if e["src_ip"] != (reg["src_ip"] or None)]
    if n_ev - len(bg) != expected_events(rid):
        p.append(f"security_events จาก src ของ run = {n_ev - len(bg)} (คาด {expected_events(rid)})")
    dec = [d["decision"] for d in got["decisions"]]
    acts = Counter(a["action"] for a in got["actions"])
    rec = [r["result"] for r in got["recovery_events"]]
    if t in ("T1", "T2", "T8", "T9", "T10"):
        if dec or acts:
            p.append(f"ไม่ควรมี decision/action: {dec} {dict(acts)}")
    if t in ("T3",):
        if dec != ["ALERT"] or res["rule_id"] != "RULE-002" or acts != Counter(ALERT=1):
            p.append(f"คาด RULE-002 ALERT + actions ALERT 1: {res['rule_id']} {dec} {dict(acts)}")
    if t in ("T4", "T6", "T7", "T11"):
        if dec != ["BLOCK"] or res["rule_id"] != "RULE-001":
            p.append(f"คาด RULE-001 BLOCK: {res['rule_id']} {dec}")
        if (res["action_result"], res["verify_result"]) != ("SUCCESS", "VERIFIED"):
            p.append(f"BLOCK ไม่ VERIFIED: {res['action_result']}/{res['verify_result']}")
        unb = [a for a in got["actions"] if a["action"] == "UNBLOCK"]
        if len(unb) != 1 or unb[0]["verify_result"] != "VERIFIED":
            p.append(f"UNBLOCK ไม่ครบ/ไม่ VERIFIED: {unb}")
    if t == "T5":
        if dec != ["NO_AUTO_BLOCK"] or res["rule_id"] != "RULE-003" or res["allowlisted"] != "1" \
                or res["context_score"] != "0.0" or "BLOCK" in acts:
            p.append(f"คาด RULE-003 NO_AUTO_BLOCK allowlisted C=0: {res['rule_id']} {dec} "
                     f"{res['allowlisted']} C={res['context_score']} {dict(acts)}")
    if t == "T8" and rec != ["SUCCESS"]:
        p.append(f"คาด recovery SUCCESS 1 แถว: {rec}")
    if t == "T9":
        att = [r["attempt"] for r in got["recovery_events"]]
        if rec != ["FAIL", "FAIL", "CRITICAL"] or att != [1, 2, 3]:
            p.append(f"คาด FAIL/FAIL/CRITICAL attempt 1-3 (ไม่มี 4): {list(zip(att, rec))}")
    elif t != "T8" and rec:
        p.append(f"ไม่ควรมี recovery_events: {rec}")
    if t == "T11" and res["weight_set"] != T11_SET[rid]:
        p.append(f"weight_set {res['weight_set']} (คาด {T11_SET[rid]})")
    if t != "T11" and res["weight_set"] not in ("", "A"):
        p.append(f"weight_set {res['weight_set']} (คาด A)")
    # FR-15: มีแถวเฉพาะ run ที่ correlation match และเวลาต้องเรียงตามลำดับ
    et = got["experiment_timestamps"]
    want_et = 1 if t in ("T3", "T4", "T5", "T6", "T7", "T11") else 0
    if len(et) != want_et:
        p.append(f"experiment_timestamps {len(et)} แถว (คาด {want_et})")
    for r in et:
        seq = [r[k] for k in ("t_event", "t_detection", "t_decision", "t_block_cmd", "t_block_verified")
               if r[k]]
        if [ts(x) for x in seq] != sorted(ts(x) for x in seq):
            p.append(f"FR-15 ไม่ monotonic: {seq}")
    for k in ("engine_log.txt", "summary.md"):
        if not (ROOT / res["evidence_path"] / k).is_file():
            p.append(f"ไม่มี {res['evidence_path']}{k}")
    return p, bg


def main():
    md_out = sys.argv[2] if len(sys.argv) > 2 and sys.argv[1] == "--md" else None
    reg = list(csv.DictReader(open(REGISTRY, encoding="utf-8", newline="")))
    res = {r["run_id"]: r for r in csv.DictReader(open(RESULTS, encoding="utf-8", newline=""))}
    db, keys = load()
    out, fails = [], 0
    ids = [r["run_id"] for r in reg]
    out.append(f"- DB integrity_check: {db['_integrity']}")
    out.append(f"- registry {len(ids)} runs · results CSV {len(res)} rows · คาด {len(EXPECTED_IDS)}")
    miss, extra = set(EXPECTED_IDS) - set(ids), set(ids) - set(EXPECTED_IDS)
    dup = [k for k, v in Counter(ids).items() if v > 1]
    if miss or extra or dup or set(ids) != set(res):
        fails += 1
        out.append(f"- **FAIL identity** missing={sorted(miss)} extra={sorted(extra)} dup={dup} "
                   f"registry≠CSV={sorted(set(ids) ^ set(res))}")
    else:
        out.append("- identity: run_id ครบตาม mapping §2 ไม่ซ้ำ · registry = CSV")

    wins = sorted((ts(r["engine_start_utc"]), ts(r["engine_stop_utc"]), r["run_id"]) for r in reg)
    overlap = [(a[2], b[2]) for a, b in zip(wins, wins[1:]) if b[0] < a[1]]
    out.append(f"- ช่วงเวลา engine ซ้อนกัน: {overlap or 'ไม่มี'}")
    fails += bool(overlap)

    # ทุกแถวใน DB ต้องตกอยู่ในช่วงของ run ใด run หนึ่ง
    orphans = {}
    for t, key in keys.items():
        o = [r["id"] for r in db[t] if not any(s <= ts(r[key]) <= e for s, e, _ in wins)]
        if o:
            orphans[t] = o
    et_runs = Counter(r["notes"].split(";")[0].removeprefix("run=") for r in db["experiment_timestamps"])
    et_bad = [k for k, v in et_runs.items() if k not in ids or v > 1]
    out.append(f"- แถว DB นอกช่วง run: {orphans or 'ไม่มี'} · experiment_timestamps ผูก run ไม่ได้/ซ้ำ: "
               f"{et_bad or 'ไม่มี'}")
    fails += bool(orphans) + bool(et_bad)
    active = [b for b in db["active_blocks"] if b["status"] != "EXPIRED"]
    out.append(f"- active_blocks ที่ไม่ EXPIRED: {active or 'ไม่มี'}")
    fails += bool(active)

    out += ["", "| run_id | ผล | หมายเหตุ |", "|---|---|---|"]
    for r in reg:
        s, e = ts(r["engine_start_utc"]), ts(r["engine_stop_utc"])
        got = {t: [x for x in db[t] if s <= ts(x[key]) <= e] for t, key in keys.items()}
        got["experiment_timestamps"] = [x for x in db["experiment_timestamps"]
                                        if x["notes"].startswith(f"run={r['run_id']};")]
        probs, bg = check_run(r, res[r["run_id"]], got)
        fails += bool(probs)
        note = "; ".join(probs)
        if bg:
            note += (" · " if note else "") + "background alert (ไม่ใช่ input): " + ", ".join(
                f"id {x['id']} sid {x['signature_id']} {x['src_ip']}->{x['dst_ip']}" for x in bg)
        out.append(f"| {r['run_id']} | {'FAIL' if probs else 'PASS'} | {note or '—'} |")
    out += ["", f"**สรุป: {'PASS' if not fails else f'FAIL {fails} จุด'}**"]
    text = "\n".join(out)
    print(text)
    if md_out:
        head = ("# STEP 11 — Dataset validation\n\n"
                f"สร้างโดย `validate_step11.py` เมื่อ {datetime.now().astimezone():%Y-%m-%d %H:%M:%S %z} · "
                "อ่านอย่างเดียวจาก `data/step11_experiment.db`, `docs/evidence/step11_runs.csv`, "
                "`experiments/results_step11.csv`\n\n")
        (ROOT / md_out).write_text(head + text + "\n", encoding="utf-8")
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
