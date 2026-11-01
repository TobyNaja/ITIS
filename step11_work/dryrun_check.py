import sqlite3, sys
from datetime import datetime
db = sys.argv[1]
c = sqlite3.connect(f"file:{db}?mode=ro", uri=True)
c.row_factory = sqlite3.Row
for t in ["security_events", "correlated_patterns", "risk_assessments", "decisions",
          "actions", "active_blocks", "experiment_timestamps", "recovery_events"]:
    n = c.execute(f"SELECT COUNT(*) FROM {t}").fetchone()[0]
    print(f"{t:22s} {n}")
print("--- decisions")
for r in c.execute("SELECT * FROM decisions"): print(dict(r))
print("--- risk")
for r in c.execute("SELECT * FROM risk_assessments"): print(dict(r))
print("--- actions")
for r in c.execute("SELECT * FROM actions"): print(dict(r))
print("--- active_blocks")
for r in c.execute("SELECT * FROM active_blocks"): print(dict(r))
print("--- experiment_timestamps")
for r in c.execute("SELECT * FROM experiment_timestamps"):
    r = dict(r); print(r)
    f = ["t_event", "t_detection", "t_decision", "t_block_cmd", "t_block_verified"]
    if all(r[k] for k in f):
        t = [datetime.fromisoformat(r[k]) for k in f]
        print("monotonic:", t == sorted(t))
        ms = lambda a, b: (b - a).total_seconds() * 1000
        print(f"M1={ms(t[0],t[1]):.1f} M2={ms(t[1],t[2]):.1f} M3={ms(t[2],t[4]):.1f} "
              f"(cmd-dec={ms(t[2],t[3]):.1f} ver-cmd={ms(t[3],t[4]):.1f}) M4={ms(t[0],t[4]):.1f} ms")
