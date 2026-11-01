"""STEP 11 metrics M1–M10 + T11 sensitivity (scratch tooling — อ่านอย่างเดียว)
source of truth = data/step11_experiment.db · ผูกแถวกับ run ด้วยช่วงเวลา engine ใน registry
(experiment_timestamps ผูกด้วย notes run=<run_id>) · results CSV ใช้ cross-check เท่านั้น
usage: metrics_step11.py [--md docs/evidence/step11_metrics.md]
"""
import csv
import sqlite3
import statistics as st
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path("D:/IT/Year 3/ITIS/Project-ITIS")
DB = ROOT / "data" / "step11_experiment.db"
REGISTRY = ROOT / "docs" / "evidence" / "step11_runs.csv"
RESULTS = ROOT / "experiments" / "results_step11.csv"
KEYS = {"security_events": "timestamp", "correlated_patterns": "created_at",
        "risk_assessments": "created_at", "decisions": "created_at", "actions": "timestamp",
        "recovery_events": "timestamp"}
# จำนวน alert ที่ inject ต่อ run (generate_test_events.py) — M5 expected
INJECTED = {"T1": 0, "T2": 1, "T3": 5, "T4": 5, "T5": 5, "T6": 5, "T7": 5, "T8": 0, "T9": 0, "T11": 5}


def ts(v):
    return datetime.fromisoformat(v.replace("Z", "+00:00"))


def ms(a, b):
    return (ts(b) - ts(a)).total_seconds() * 1000


def load_runs():
    c = sqlite3.connect(f"file:{DB}?mode=ro", uri=True)
    c.row_factory = sqlite3.Row
    db = {t: [dict(r) for r in c.execute(f"SELECT * FROM {t} ORDER BY id")] for t in KEYS}
    et = [dict(r) for r in c.execute("SELECT * FROM experiment_timestamps ORDER BY id")]
    ab = {r["action_id"]: dict(r) for r in c.execute("SELECT * FROM active_blocks")}
    runs = []
    for r in csv.DictReader(open(REGISTRY, encoding="utf-8", newline="")):
        s, e = ts(r["engine_start_utc"]), ts(r["engine_stop_utc"])
        got = {t: [x for x in db[t] if s <= ts(x[k]) <= e] for t, k in KEYS.items()}
        got["et"] = [x for x in et if x["notes"].startswith(f"run={r['run_id']};")]
        got["src_events"] = [x for x in got["security_events"] if x["src_ip"] == (r["src_ip"] or None)]
        runs.append((r, got))
    return runs, ab


def expected_alerts(run_id):
    t = run_id.split("-")[0]
    return (1 if int(run_id[-2:]) <= 5 else 4) if t == "T10" else INJECTED[t]


def desc(vals):
    if not vals:
        return "—"
    sd = f"{st.stdev(vals):.1f}" if len(vals) > 1 else "—"
    return (f"{len(vals)} | {st.mean(vals):.1f} | {st.median(vals):.1f} | {min(vals):.1f} | "
            f"{max(vals):.1f} | {sd}")


def rate(num, den):
    return f"{num}/{den} = {num / den * 100:.1f}%" if den else f"{num}/0 = n/a"


def main():
    md_out = sys.argv[2] if len(sys.argv) > 2 and sys.argv[1] == "--md" else None
    runs, ab = load_runs()
    by = lambda *tids: [(r, g) for r, g in runs if r["test_id"] in tids]
    o = []

    # ---------- M1–M4 ----------
    o += ["## M1–M4 Latency (ms) — จาก `experiment_timestamps`", "",
          "นาฬิกาเดียว (SEC01) ทั้ง t_event และ t_detection…t_block_verified · M1 = EVE ingestion latency "
          "ไม่ใช่ packet detection · M3 แยกตาม §1.4: `t_block_cmd − t_decision` = ก่อนเรียก "
          "lifecycle.block() (รวมบันทึก decision) · `t_block_verified − t_block_cmd` = command round-trip "
          "+ verification รวมกัน (แยกไม่ได้)", "",
          "| Metric | กลุ่ม | n | mean | median | min | max | SD |", "|---|---|---|---|---|---|---|---|"]
    lat = {}
    for tid in ("T3", "T4", "T5", "T6", "T7", "T11"):
        rows = [g["et"][0] for _, g in by(tid) if g["et"]]
        lat[tid] = rows
    defs = [("M1", "t_event", "t_detection"), ("M2", "t_detection", "t_decision"),
            ("M3 (pre-block)", "t_decision", "t_block_cmd"),
            ("M3 (cmd+verify)", "t_block_cmd", "t_block_verified"),
            ("M3 total", "t_decision", "t_block_verified"), ("M4", "t_event", "t_block_verified")]
    groups = {"M1": ("T3", "T4"), "M2": ("T3", "T4")}
    for name, a, b in defs:
        prim = groups.get(name, ("T4", "T7") if name.startswith("M3") else ("T4",))
        for label, tids in [(f"primary {'+'.join(prim)}", prim),
                            ("ทุก run ที่มีค่า (T3–T7, T11)", ("T3", "T4", "T5", "T6", "T7", "T11"))]:
            vals = [ms(x[a], x[b]) for t in tids for x in lat[t] if x[a] and x[b]]
            o.append(f"| {name} | {label} | {desc(vals)} |")
    o += ["", "ต่อ test group:", "", "| test | n | M1 mean | M2 mean | M3 total mean | M4 mean |",
          "|---|---|---|---|---|---|"]
    for tid, rows in lat.items():
        def m(a, b):
            v = [ms(x[a], x[b]) for x in rows if x[a] and x[b]]
            return f"{st.mean(v):.1f}" if v else "—"
        o.append(f"| {tid} | {len(rows)} | {m('t_event', 't_detection')} | "
                 f"{m('t_detection', 't_decision')} | {m('t_decision', 't_block_verified')} | "
                 f"{m('t_event', 't_block_verified')} |")

    # ---------- M5–M10 ----------
    o += ["", "## M5–M10 Rates — จาก DB", "", "| Metric | ขอบเขต | ผล | นิยามที่ใช้ |", "|---|---|---|---|"]
    m5 = by("T1", "T2", "T3", "T4")
    det = sum(min(len(g["src_events"]), expected_alerts(r["run_id"])) for r, g in m5)
    exp = sum(expected_alerts(r["run_id"]) for r, _ in m5)
    extra = sum(max(0, len(g["src_events"]) - expected_alerts(r["run_id"])) for r, g in m5)
    o.append(f"| M5 Detection Success | T1–T4 (20 runs) | {rate(det, exp)} | security_events จาก src ของ "
             f"input / alert ที่ inject (T1 inject 0) · เกินคาด {extra} |")
    det_all = sum(min(len(g["src_events"]), expected_alerts(r["run_id"])) for r, g in runs)
    exp_all = sum(expected_alerts(r["run_id"]) for r, _ in runs)
    o.append(f"| M5 (อ้างอิง) | ทุก run ที่ inject | {rate(det_all, exp_all)} | เหมือนบน |")

    def block_actions(tids):
        req = ver = 0
        for r, g in by(*tids):
            if any(d["decision"] == "BLOCK" for d in g["decisions"]):
                req += 1
                ver += any(a["action"] == "BLOCK" and a["command_result"] == "SUCCESS"
                           and a["verify_result"] == "VERIFIED" for a in g["actions"])
        return ver, req
    o.append(f"| M6 Automated Action Success | T4, T7 | {rate(*block_actions(('T4', 'T7')))} | BLOCK "
             "SUCCESS+VERIFIED / decision BLOCK |")
    o.append(f"| M6 (อ้างอิง) | T4, T6, T7, T11 | {rate(*block_actions(('T4', 'T6', 'T7', 'T11')))} | "
             "เหมือนบน |")
    nb = by("T1", "T2", "T3", "T10")
    unn = sum(any(a["action"] == "BLOCK" for a in g["actions"]) for _, g in nb)
    o.append(f"| M7 False Positive (scenario) | T1, T2, T3, T10 ({len(nb)} runs) | {rate(unn, len(nb))} | "
             "run ที่มี BLOCK action / non-block cases — ไม่ใช่ FP rate ทั่วไป |")
    al = by("T5")
    safe = sum(all(d["allowlisted"] == 1 and d["decision"] != "BLOCK" for d in g["decisions"])
               and g["decisions"] and not any(a["action"] == "BLOCK" for a in g["actions"])
               for _, g in al)
    o.append(f"| M8 Allowlist Safety | T5 | {rate(safe, len(al))} | allowlisted ไม่ถูก block / allowlisted "
             "tests |")

    def unblock(tids):
        exp_ = ok = 0
        for _, g in by(*tids):
            for a in g["actions"]:
                if a["action"] == "BLOCK" and a["command_result"] == "SUCCESS":
                    exp_ += 1
                    ok += any(u["action"] == "UNBLOCK" and u["verify_result"] == "VERIFIED"
                              and u["decision_id"] == a["decision_id"] for u in g["actions"])
        return ok, exp_
    o.append(f"| M9 Auto-Unblock Success | T6 | {rate(*unblock(('T6',)))} | UNBLOCK VERIFIED / block "
             "ที่หมดอายุ |")
    o.append(f"| M9 (อ้างอิง) | ทุก BLOCK (T4, T6, T7, T11) | {rate(*unblock(('T4', 'T6', 'T7', 'T11')))} | "
             f"active_blocks ที่ไม่ EXPIRED ตอนจบ: {sum(b['status'] != 'EXPIRED' for b in ab.values())} |")
    def recovered(tids):
        rr = by(*tids)
        return sum(any(x["result"] == "SUCCESS" for x in g["recovery_events"]) for _, g in rr), len(rr)
    # M10 หลัก = เฉพาะ failure ที่คาดให้กู้ได้ (T8) · T9 = intentional retry exhaustion รายงานแยก
    o.append(f"| **M10 Recovery Success** | T8 (recoverable failure) | {rate(*recovered(('T8',)))} | "
             "recovered / injected failures |")
    t9 = by("T9")
    t9_ok = sum([x["result"] for x in g["recovery_events"]] == ["FAIL", "FAIL", "CRITICAL"]
                and [x["attempt"] for x in g["recovery_events"]] == [1, 2, 3]
                and all((x["error"] or "").startswith("rc=1") for x in g["recovery_events"])
                for _, g in t9)
    o.append(f"| **T9 Recovery Failure Handling** | T9 (intentional, restart_command=/usr/bin/false) | "
             f"{rate(t9_ok, len(t9))} | attempt 1 FAIL → 2 FAIL → 3 CRITICAL, rc=1 ทุก attempt, "
             "ไม่มี attempt 4 |")
    o.append(f"| M10 aggregate (supplementary) | T8+T9 | {rate(*recovered(('T8', 'T9')))} | รวม intentional "
             "failure ของ T9 (ออกแบบให้กู้ไม่ได้) — **ไม่ใช่** ตัวแทนความสามารถ recover จาก failure "
             "ที่ recoverable |")
    rt = [ms(r["notes"].split("t_fault=")[1].split()[0], g["recovery_events"][0]["timestamp"])
          for r, g in by("T8")]
    o += ["", "| recovery time T8 (ms) | n | mean | median | min | max | SD |", "|---|---|---|---|---|---|---|",
          f"| t_recovery − t_fault | {desc(rt)} |",
          "", "t_fault = เวลาที่ run_fault.sh สั่ง `suricata.sh stop` (นาฬิกา SEC01, อยู่ใน registry notes) · "
          "t_recovery = `recovery_events.timestamp` (SUCCESS)"]

    # ---------- T11 ----------
    o += ["", "## T11 Sensitivity — pattern เดียวกัน เปลี่ยนแค่ weight set", "",
          "| run | set | S | F | T | C | risk_score | risk_level | rule | decision | block verified |",
          "|---|---|---|---|---|---|---|---|---|---|---|"]
    for r, g in by("T11"):
        ra, d = g["risk_assessments"][-1], g["decisions"][-1]
        bv = any(a["action"] == "BLOCK" and a["verify_result"] == "VERIFIED" for a in g["actions"])
        o.append(f"| {r['run_id']} | {ra['weight_set']} | {ra['severity_score']} | {ra['frequency_score']} | "
                 f"{ra['temporal_score']} | {ra['context_score']} | {ra['risk_score']} | {ra['risk_level']} | "
                 f"{d['rule_id']} | {d['decision']} | {'VERIFIED' if bv else '—'} |")

    # ---------- cross-check CSV ----------
    res = {r["run_id"]: r for r in csv.DictReader(open(RESULTS, encoding="utf-8", newline=""))}
    mism = []
    for r, g in runs:
        if g["et"]:
            x = g["et"][0]
            v = f"{ms(x['t_event'], x['t_detection']):.1f}"
            if res[r["run_id"]]["detection_latency_ms"] != v:
                mism.append(r["run_id"])
    o += ["", f"cross-check `results_step11.csv` (M1 ต่อ run เทียบกับ DB): "
          f"{'ตรงทั้งหมด' if not mism else f'ไม่ตรง {mism}'} · runs = {len(runs)}"]
    text = "\n".join(o)
    print(text)
    if md_out:
        head = ("# STEP 11 — Metrics M1–M10 และ T11 sensitivity\n\n"
                f"สร้างโดย `metrics_step11.py` เมื่อ {datetime.now().astimezone():%Y-%m-%d %H:%M:%S %z} · "
                "source of truth = `data/step11_experiment.db` · run binding = `docs/evidence/step11_runs.csv`\n\n")
        (ROOT / md_out).write_text(head + text + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
