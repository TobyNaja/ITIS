"""รายละเอียดของ run ล่าสุด: แถว decision/action/FR-15 ที่ผูกกับ run_id (read-only)"""
import sqlite3
import sys
from datetime import datetime

RUN_ID = sys.argv[1]
c = sqlite3.connect("file:data/step11_experiment.db?mode=ro", uri=True)
c.row_factory = sqlite3.Row

et = [dict(r) for r in c.execute(
    "SELECT * FROM experiment_timestamps WHERE notes LIKE ?", (f"run={RUN_ID};%",))]
print(f"FR-15 rows     : {len(et)}")
for r in et:
    f = ["t_event", "t_detection", "t_decision", "t_block_cmd", "t_block_verified"]
    present = [k for k in f if r[k]]
    t = [datetime.fromisoformat(r[k]) for k in present]
    print(f"  notes={r['notes']}")
    print(f"  present={present} monotonic={t == sorted(t)}")
    if r["t_event"] and r["t_detection"]:
        m = lambda a, b: (datetime.fromisoformat(r[b]) - datetime.fromisoformat(r[a])).total_seconds() * 1000
        s = f"  M1={m('t_event','t_detection'):.1f}"
        if r["t_decision"]:
            s += f" M2={m('t_detection','t_decision'):.1f}"
        if r["t_block_verified"]:
            s += f" M3={m('t_decision','t_block_verified'):.1f} M4={m('t_event','t_block_verified'):.1f}"
        print(s + " ms")

last_dec = c.execute("SELECT d.*, r.risk_score, r.risk_level, r.weight_set, r.severity_score, "
                     "r.frequency_score, r.temporal_score, r.context_score "
                     "FROM decisions d JOIN risk_assessments r ON r.id=d.assessment_id "
                     "ORDER BY d.id DESC LIMIT 1").fetchone()
if last_dec:
    d = dict(last_dec)
    print(f"last decision  : id={d['id']} {d['rule_id']} {d['decision']} allowlisted={d['allowlisted']} "
          f"S/F/T/C={d['severity_score']}/{d['frequency_score']}/{d['temporal_score']}/"
          f"{d['context_score']} set={d['weight_set']} risk={d['risk_score']} {d['risk_level']}")
for a in c.execute("SELECT * FROM actions ORDER BY id DESC LIMIT 2"):
    print(f"recent action  : {dict(a)}")
for b in c.execute("SELECT * FROM active_blocks"):
    print(f"active_block   : {dict(b)}")
