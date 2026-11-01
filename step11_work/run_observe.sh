#!/usr/bin/env bash
# รัน 1 run แบบ "ไม่ inject" (T1): start engine -> รอ "เริ่มอ่าน EVE" -> observe N s -> stop -> สรุป
# usage: run_observe.sh <TEST_ID> <RUN_ID> [WINDOW_SEC=60]
set -u
TEST_ID=$1; RUN_ID=$2; WINDOW=${3:-60}
REPO="D:/IT/Year 3/ITIS/Project-ITIS"
S="D:/IT/Year 3/ITIS/step11_work"
PY="$REPO/.venv/Scripts/python.exe"
cd "$REPO" || exit 1
export MSYS_NO_PATHCONV=1 PYTHONIOENCODING=utf-8
export ITIS_PFSENSE_HOST=admin@192.168.227.150
export ITIS_EVE_PATH=/var/log/suricata/suricata_em224404/eve.json
SSHF='post-quantum\|store now\|pq.html'

echo "===== $RUN_ID ====="
if tasklist //FI "IMAGENAME eq python.exe" 2>/dev/null | grep -qi python; then
  echo "ABORT: มี python.exe ค้างอยู่ก่อนเริ่ม"; exit 1; fi
PF_BEFORE=$(ssh -T -o BatchMode=yes admin@192.168.227.150 'pfctl -t ITIS_BLOCK_TEST -T show | wc -l' 2>&1 | grep -v "$SSHF" | tr -d ' ')
[ "$PF_BEFORE" = "0" ] || { echo "ABORT: pf table ไม่ว่างก่อนเริ่ม ($PF_BEFORE)"; exit 1; }
BEFORE=$("$PY" "$S/db_counts.py")
LOG_START=$(( $(wc -l < logs/engine.log) + 1 ))
SURI_BEFORE=$(ssh -T -o BatchMode=yes admin@192.168.227.150 'pgrep -x suricata' 2>&1 | grep -v "$SSHF")

"$PY" "$S/run_t1_debug_health.py" --test-id "$TEST_ID" --run-id "$RUN_ID" > "$S/${RUN_ID}_engine.out" 2>&1 &
ENGINE_PID=$!

for i in $(seq 1 30); do
  tail -n +"$LOG_START" logs/engine.log | grep -q "เริ่มอ่าน EVE" && break; sleep 1; done
START_LINE=$(tail -n +"$LOG_START" logs/engine.log | grep "เริ่มอ่าน EVE" | head -1)
[ -n "$START_LINE" ] || { echo "ABORT: ไม่เห็น 'เริ่มอ่าน EVE'"; kill $ENGINE_PID; exit 1; }
echo "$START_LINE" | cut -c1-150
echo "$START_LINE" | grep -q "Program Files" && { echo "ABORT: EVE path ถูกแปลง"; kill $ENGINE_PID; exit 1; }

sleep "$WINDOW"
kill $ENGINE_PID 2>/dev/null; wait $ENGINE_PID 2>/dev/null
sleep 2
LOG_END=$(wc -l < logs/engine.log)

AFTER=$("$PY" "$S/db_counts.py")
PF_AFTER=$(ssh -T -o BatchMode=yes admin@192.168.227.150 'pfctl -t ITIS_BLOCK_TEST -T show | wc -l' 2>&1 | grep -v "$SSHF" | tr -d ' ')
SURI_AFTER=$(ssh -T -o BatchMode=yes admin@192.168.227.150 'pgrep -x suricata' 2>&1 | grep -v "$SSHF")
SLICE=$(sed -n "${LOG_START},${LOG_END}p" logs/engine.log)

echo "log lines      : $LOG_START-$LOG_END"
echo "window         : ${WINDOW}s"
echo "delta          : $("$PY" -c "import json,sys;b=json.loads(sys.argv[1]);a=json.loads(sys.argv[2]);print({k:a[k]-b[k] for k in a})" "$BEFORE" "$AFTER")"
echo "totals after   : $AFTER"
echo "pf before/after: $PF_BEFORE / $PF_AFTER"
echo "suricata pid   : $SURI_BEFORE -> $SURI_AFTER"
echo "HEALTHY lines  : $(echo "$SLICE" | grep -c 'health = HEALTHY')"
echo "stats received : $(echo "$SLICE" | grep -c 'ได้รับ EVE stats')"
echo "DEGRADED lines : $(echo "$SLICE" | grep -c 'DEGRADED')"
echo "WARNING/ERROR  : $(echo "$SLICE" | grep -cE ' (WARNING|ERROR|CRITICAL) ')"
echo "$SLICE" | grep -E ' (WARNING|ERROR|CRITICAL) ' | cut -c1-200
if tasklist //FI "IMAGENAME eq python.exe" 2>/dev/null | grep -qi python; then
  echo "WARN: python.exe ยังค้างหลัง stop"; fi
