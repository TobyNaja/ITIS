"""นับแถวทุกตารางของ dataset DB แบบ read-only — พิมพ์ JSON บรรทัดเดียว (ไม่มี DB = ทุกตาราง 0)"""
import json
import os
import sqlite3
import sys

DB = sys.argv[1] if len(sys.argv) > 1 else "data/step11_experiment.db"
TABLES = ["security_events", "correlated_patterns", "risk_assessments", "decisions",
          "actions", "active_blocks", "experiment_timestamps", "recovery_events"]

if not os.path.exists(DB):
    print(json.dumps({t: 0 for t in TABLES}))
    sys.exit(0)
c = sqlite3.connect(f"file:{DB}?mode=ro", uri=True)
print(json.dumps({t: c.execute(f"SELECT COUNT(*) FROM {t}").fetchone()[0] for t in TABLES}))
