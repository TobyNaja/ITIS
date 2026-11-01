"""STEP 11 exporter (scratch tooling — ไม่แตะ engine):
registry (docs/evidence/step11_runs.csv) + data/step11_experiment.db + logs/engine.log
    -> docs/evidence/<T>/<Rnn>/engine_log.txt + summary.md
    -> experiments/results_step11.csv (37 คอลัมน์ §14.5 — ค่าจาก DB เท่านั้น, ไม่มีค่า = ว่าง)

แถวใน DB ผูกกับ run ด้วยช่วงเวลา engine ของ run นั้น (1 process = 1 run, ไม่มี run ซ้อนกัน)
ยกเว้น experiment_timestamps ที่ผูกด้วย notes `run=<run_id>` โดยตรง

usage: export_group.py <TEST_ID> [<TEST_ID> ...]
"""
import csv
import json
import re
import sqlite3
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(r"D:\IT\Year 3\ITIS\Project-ITIS")
DB = ROOT / "data" / "step11_experiment.db"
LOG = ROOT / "logs" / "engine.log"
REGISTRY = ROOT / "docs" / "evidence" / "step11_runs.csv"
RESULTS = ROOT / "experiments" / "results_step11.csv"
TEMPLATE = ROOT / "experiments" / "results_template.csv"

sys.path.insert(0, str(ROOT / "scripts"))
import generate_test_events as gen  # noqa: E402


def ts(value):
    return datetime.fromisoformat(value.replace("Z", "+00:00")) if value else None


def ms(a, b):
    return "" if not (a and b) else f"{(ts(b) - ts(a)).total_seconds() * 1000:.1f}"


def in_window(rows, key, start, stop):
    return [r for r in rows if start <= ts(r[key]) <= stop]


def load_db():
    c = sqlite3.connect(f"file:{DB}?mode=ro", uri=True)
    c.row_factory = sqlite3.Row
    return {t: [dict(r) for r in c.execute(f"SELECT * FROM {t} ORDER BY rowid")]
            for t in ["security_events", "correlated_patterns", "risk_assessments", "decisions",
                      "actions", "active_blocks", "recovery_events", "experiment_timestamps"]}


def collect(run, db):
    start, stop = ts(run["engine_start_utc"]), ts(run["engine_stop_utc"])
    got = {
        "security_events": in_window(db["security_events"], "timestamp", start, stop),
        "correlated_patterns": in_window(db["correlated_patterns"], "created_at", start, stop),
        "risk_assessments": in_window(db["risk_assessments"], "created_at", start, stop),
        "decisions": in_window(db["decisions"], "created_at", start, stop),
        "actions": in_window(db["actions"], "timestamp", start, stop),
        "recovery_events": in_window(db["recovery_events"], "timestamp", start, stop),
        "experiment_timestamps": [r for r in db["experiment_timestamps"]
                                  if (r["notes"] or "").startswith(f"run={run['run_id']};")],
    }
    return got


def csv_row(run, got):
    s = gen.SCENARIOS[run["test_id"]]
    et = got["experiment_timestamps"][0] if got["experiment_timestamps"] else {}
    pat = got["correlated_patterns"][-1] if got["correlated_patterns"] else {}
    risk = got["risk_assessments"][-1] if got["risk_assessments"] else {}
    dec = got["decisions"][-1] if got["decisions"] else {}
    # BLOCK ก่อน ถ้าไม่มีใช้ action แรก (ALERT -> NOT_APPLICABLE ตาม repository)
    block = next((a for a in got["actions"] if a["action"] == "BLOCK"),
                 next((a for a in got["actions"] if a["action"] != "UNBLOCK"), {}))
    unblock = next((a for a in got["actions"] if a["action"] == "UNBLOCK"), {})
    rec_ok = next((r for r in got["recovery_events"] if r["result"] == "SUCCESS"), {})
    rec_last = got["recovery_events"][-1] if got["recovery_events"] else {}
    g = lambda d, k: "" if d.get(k) is None else d.get(k)
    m = re.search(r"t_fault=(\S+)", run["notes"])
    t_fault = m.group(1) if m else None
    return {
        "test_id": run["test_id"], "run_id": run["run_id"], "scenario": s.name,
        "src_ip": run["src_ip"], "expected_result": s.expected_result,
        "t_event": g(et, "t_event"), "t_detection": g(et, "t_detection"),
        "t_decision": g(et, "t_decision"), "t_block_cmd": g(et, "t_block_cmd"),
        "t_block_verified": g(et, "t_block_verified"),
        "t_unblock": g(unblock, "timestamp"), "t_recovery": g(rec_ok, "timestamp"),
        "detection_latency_ms": ms(et.get("t_event"), et.get("t_detection")),
        "decision_latency_ms": ms(et.get("t_detection"), et.get("t_decision")),
        "enforcement_latency_ms": ms(et.get("t_decision"), et.get("t_block_verified")),
        "end_to_end_latency_ms": ms(et.get("t_event"), et.get("t_block_verified")),
        # recovery time = t_recovery (DB) − t_fault (เวลาที่ run_fault.sh สั่ง stop บน SEC01, เก็บใน notes)
        "recovery_time_ms": ms(t_fault, g(rec_ok, "timestamp") or None),
        "event_count": g(pat, "event_count"), "max_severity": g(pat, "max_severity"),
        "severity_score": g(risk, "severity_score"), "frequency_score": g(risk, "frequency_score"),
        "temporal_score": g(risk, "temporal_score"), "context_score": g(risk, "context_score"),
        "risk_score": g(risk, "risk_score"), "risk_level": g(risk, "risk_level"),
        "weight_set": g(risk, "weight_set"),
        "rule_id": g(dec, "rule_id"), "decision": g(dec, "decision"),
        "allowlisted": g(dec, "allowlisted"),
        "action_result": g(block, "command_result"), "verify_result": g(block, "verify_result"),
        "recovery_result": g(rec_last, "result"),
        "cpu_percent": "", "ram_percent": "", "pps": "",
        "notes": run["notes"],
        "evidence_path": f"docs/evidence/{run['test_id']}/{run['run_id'].split('-')[1]}/",
    }


def write_evidence(run, got, log_lines):
    a, b = (int(x) for x in run["log_lines"].split("-"))
    folder = ROOT / "docs" / "evidence" / run["test_id"] / run["run_id"].split("-")[1]
    folder.mkdir(parents=True, exist_ok=True)
    (folder / "engine_log.txt").write_text("".join(log_lines[a - 1:b]), encoding="utf-8")
    counts = {k: len(v) for k, v in got.items()}
    lines = [f"# {run['run_id']} — {gen.SCENARIOS[run['test_id']].name}", "",
             f"- engine: {run['engine_start_utc']} → {run['engine_stop_utc']} "
             f"(logs/engine.log บรรทัด {run['log_lines']})",
             f"- input: {run['input']}",
             f"- src_ip: {run['src_ip'] or '—'} · variant: {run['variant'] or '—'} · "
             f"weight_set: {run['weight_set']}",
             f"- ผลตรวจหลัง run: {run['notes']}", "",
             "## แถวใน `data/step11_experiment.db` ของ run นี้", "",
             "```json", json.dumps(counts, ensure_ascii=False), "```", ""]
    for table, rows in got.items():
        if rows:
            lines += [f"### {table}", "", "```json"]
            lines += [json.dumps({k: v for k, v in r.items() if k != "raw_json"},
                                 ensure_ascii=False) for r in rows]
            lines += ["```", ""]
    (folder / "summary.md").write_text("\n".join(lines), encoding="utf-8")


def main(test_ids):
    with open(REGISTRY, encoding="utf-8", newline="") as f:
        runs = [r for r in csv.DictReader(f) if r["test_id"] in test_ids]
    db = load_db()
    log_lines = LOG.read_text(encoding="utf-8").splitlines(keepends=True)
    header = next(csv.reader(open(TEMPLATE, encoding="utf-8")))

    existing = []
    if RESULTS.exists():
        with open(RESULTS, encoding="utf-8", newline="") as f:
            existing = [r for r in csv.DictReader(f) if r["test_id"] not in test_ids]
    new_rows = []
    for run in runs:
        got = collect(run, db)
        write_evidence(run, got, log_lines)
        new_rows.append(csv_row(run, got))
        print(run["run_id"], {k: len(v) for k, v in got.items()})
    order = lambda r: (int(r["test_id"][1:]), r["run_id"])
    with open(RESULTS, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=header)
        w.writeheader()
        w.writerows(sorted(existing + new_rows, key=order))
    print(f"wrote {len(new_rows)} rows -> {RESULTS.relative_to(ROOT)}")


if __name__ == "__main__":
    main(sys.argv[1:])
