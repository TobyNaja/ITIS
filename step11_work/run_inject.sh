#!/usr/bin/env bash
# รัน 1 run แบบ controlled EVE injection (§1.2):
#   start engine -> รอ "เริ่มอ่าน EVE" -> settle 3s -> generate --spacing 0 | ssh cat >> eve.json
#   -> รอ POST_WAIT s -> stop engine -> สรุป delta/pf/log
# usage: run_inject.sh <TEST_ID> <RUN_ID> <GEN_RUN> <POST_WAIT_SEC> [VARIANT]
set -u
TEST_ID=$1; RUN_ID=$2; GEN_RUN=$3; POST_WAIT=$4; VARIANT=${5:-}
REPO="D:/IT/Year 3/ITIS/Project-ITIS"
S="D:/IT/Year 3/ITIS/step11_work"
PY="$REPO/.venv/Scripts/python.exe"
cd "$REPO" || exit 1
export MSYS_NO_PATHCONV=1 PYTHONIOENCODING=utf-8
export ITIS_PFSENSE_HOST=admin@192.168.227.150
export ITIS_EVE_PATH=/var/log/suricata/suricata_em224404/eve.json
SSHF='post-quantum\|store now\|pq.html'
PFSH() { ssh -T -o BatchMode=yes admin@192.168.227.150 "$1" 2>&1 | grep -v "$SSHF"; }

echo "===== $RUN_ID ${VARIANT:+(variant $VARIANT)} ====="
if tasklist //FI "IMAGENAME eq python.exe" 2>/dev/null | grep -qi python; then
  echo "ABORT: มี python.exe ค้างอยู่ก่อนเริ่ม"; exit 1; fi
PF_BEFORE=$(PFSH 'pfctl -t ITIS_BLOCK_TEST -T show | wc -l' | tr -d ' ')
[ "$PF_BEFORE" = "0" ] || { echo "ABORT: pf table ไม่ว่างก่อนเริ่ม ($PF_BEFORE)"; exit 1; }
BEFORE=$("$PY" "$S/db_counts.py")
LOG_START=$(( $(wc -l < logs/engine.log) + 1 ))
SURI_BEFORE=$(PFSH 'pgrep -x suricata')

"$PY" "$S/run_t1_debug_health.py" --test-id "$TEST_ID" --run-id "$RUN_ID" > "$S/${RUN_ID}_engine.out" 2>&1 &
ENGINE_PID=$!
for i in $(seq 1 30); do
  tail -n +"$LOG_START" logs/engine.log | grep -q "เริ่มอ่าน EVE" && break; sleep 1; done
START_LINE=$(tail -n +"$LOG_START" logs/engine.log | grep "เริ่มอ่าน EVE" | head -1)
[ -n "$START_LINE" ] || { echo "ABORT: ไม่เห็น 'เริ่มอ่าน EVE'"; kill $ENGINE_PID; exit 1; }
echo "$START_LINE" | grep -q "Program Files" && { echo "ABORT: EVE path ถูกแปลง"; kill $ENGINE_PID; exit 1; }
echo "$START_LINE" | cut -c1-100
sleep 3

GEN_ARGS=(--test-id "$TEST_ID" --run "$GEN_RUN" --spacing 0)
[ -n "$VARIANT" ] && GEN_ARGS+=(--variant "$VARIANT")
"$PY" scripts/generate_test_events.py "${GEN_ARGS[@]}" > "$S/${RUN_ID}_input.jsonl" 2> "$S/${RUN_ID}_gen.err"
N_EVENTS=$(wc -l < "$S/${RUN_ID}_input.jsonl")
INJECT_AT=$(date -u +%Y-%m-%dT%H:%M:%S.%NZ)
PFSH 'cat >> /var/log/suricata/suricata_em224404/eve.json' < "$S/${RUN_ID}_input.jsonl"
echo "injected $N_EVENTS events at $INJECT_AT ($(cat "$S/${RUN_ID}_gen.err" | head -1))"

MID=${MIDCHECK_AT:-0}
if [ "$MID" -gt 0 ]; then
  sleep "$MID"
  echo "midcheck @+${MID}s ($(date -u +%H:%M:%SZ)) pfctl -t ITIS_BLOCK_TEST -T show: [$(PFSH 'pfctl -t ITIS_BLOCK_TEST -T show' | tr -d ' ' | tr '\n' ' ')]"
  sleep $(( POST_WAIT - MID ))
else
  sleep "$POST_WAIT"
fi
kill $ENGINE_PID 2>/dev/null; wait $ENGINE_PID 2>/dev/null
sleep 2
LOG_END=$(wc -l < logs/engine.log)

AFTER=$("$PY" "$S/db_counts.py")
PF_AFTER=$(PFSH 'pfctl -t ITIS_BLOCK_TEST -T show | wc -l' | tr -d ' ')
SURI_AFTER=$(PFSH 'pgrep -x suricata')
SLICE=$(sed -n "${LOG_START},${LOG_END}p" logs/engine.log)
echo "engine         : $(sed -n "${LOG_START}p" logs/engine.log | cut -c1-20) -> $(sed -n "${LOG_END}p" logs/engine.log | cut -c1-20)"
echo "log lines      : $LOG_START-$LOG_END"
echo "delta          : $("$PY" -c "import json,sys;b=json.loads(sys.argv[1]);a=json.loads(sys.argv[2]);print({k:a[k]-b[k] for k in a})" "$BEFORE" "$AFTER")"
echo "pf before/after: $PF_BEFORE / $PF_AFTER"
echo "suricata pid   : $SURI_BEFORE -> $SURI_AFTER"
echo "HEALTHY/DEGRADED: $(echo "$SLICE" | grep -c 'health = HEALTHY') / $(echo "$SLICE" | grep -c 'DEGRADED')"
echo "decisions log  : $(echo "$SLICE" | grep -o 'matched=[A-Za-z]* decision=[A-Z_a-z]*' | sort | uniq -c | tr '\n' ';')"
echo "WARNING/ERROR  : $(echo "$SLICE" | grep -cE ' (WARNING|ERROR|CRITICAL) ')"
echo "$SLICE" | grep -E ' (WARNING|ERROR|CRITICAL) ' | cut -c1-200
"$PY" "$S/run_detail.py" "$RUN_ID"
if tasklist //FI "IMAGENAME eq python.exe" 2>/dev/null | grep -qi python; then
  echo "WARN: python.exe ยังค้างหลัง stop"; fi
