"""เพิ่มแถว registry จาก log range + input.jsonl ของ run (ไม่เขียนทับแถวที่มีอยู่)
usage: add_registry.py <TEST_ID> <RUN_ID> <LOG_A-LOG_B> <VARIANT|-> <WEIGHT_SET> <INPUT_DESC> <NOTES>
"""
import csv
import json
import sys
from datetime import datetime, timedelta
from pathlib import Path

ROOT = Path("D:/IT/Year 3/ITIS/Project-ITIS")
S = Path("D:/IT/Year 3/ITIS/step11_work")
REGISTRY = ROOT / "docs" / "evidence" / "step11_runs.csv"

test_id, run_id, rng, variant, weight_set, input_desc, notes = sys.argv[1:8]
a, b = (int(x) for x in rng.split("-"))
lines = (ROOT / "logs" / "engine.log").read_text(encoding="utf-8").splitlines()
start = lines[a - 1][:20]
stop = (datetime.fromisoformat(lines[b - 1][:20].replace("Z", "+00:00"))
        + timedelta(seconds=1)).strftime("%Y-%m-%dT%H:%M:%SZ")
src = ""
inp = S / f"{run_id}_input.jsonl"
if inp.exists():
    srcs = {json.loads(l).get("src_ip") for l in inp.read_text(encoding="utf-8").splitlines() if l}
    src = ";".join(sorted(s for s in srcs if s))

with open(REGISTRY, encoding="utf-8", newline="") as f:
    rows = list(csv.DictReader(f))
if any(r["run_id"] == run_id for r in rows):
    sys.exit(f"{run_id} มีใน registry แล้ว — ไม่เขียนทับ")
with open(REGISTRY, "a", encoding="utf-8", newline="") as f:
    csv.writer(f).writerow([test_id, run_id, "" if variant == "-" else variant, weight_set, src,
                            start, stop, rng, "", input_desc, notes])
print(f"{run_id}: {start} -> {stop} lines {rng} src={src or '—'}")
