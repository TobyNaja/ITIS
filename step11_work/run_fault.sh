#!/usr/bin/env bash
# T8/T9 fault injection 1 run:
#   start engine -> รอ "เริ่มอ่าน EVE" + HEALTHY -> stop Suricata (suricata.sh stop)
#   -> รอ POST_WAIT s (engine ตรวจเอง / กู้เอง) -> stop engine
#   -> (T9) start Suricata กลับด้วยคำสั่งจริง -> ยืนยัน PID ใหม่ + stats ใหม่
# usage: run_fault.sh <TEST_ID> <RUN_ID> <POST_WAIT_SEC>
set -u
TEST_ID=$1; RUN_ID=$2; POST_WAIT=$3
REPO="D:/IT/Year 3/ITIS/Project-ITIS"
S="D:/IT/Year 3/ITIS/step11_work"
PY="$REPO/.venv/Scripts/python.exe"
EVE=/var/log/suricata/suricata_em224404/eve.json
cd "$REPO" || exit 1
export MSYS_NO_PATHCONV=1 PYTHONIOENCODING=utf-8
export ITIS_PFSENSE_HOST=admin@192.168.227.150 ITIS_EVE_PATH=$EVE
SSHF='post-quantum\|store now\|pq.html'
PFSH() { ssh -T -o BatchMode=yes admin@192.168.227.150 "$1" 2>&1 | grep -v "$SSHF"; }
last_stats() { PFSH "grep event_type.:.stats $EVE | tail -1" | grep -o '"timestamp":"[^"]*"\|"uptime":[0-9]*' | head -2 | tr '\n' ' '; }

echo "===== $RUN_ID ====="
if tasklist //FI "IMAGENAME eq python.exe" 2>/dev/null | grep -qi python; then
  echo "ABORT: มี python.exe ค้างอยู่ก่อนเริ่ม"; exit 1; fi
SURI_BEFORE=$(PFSH 'pgrep -x suricata')
[ -n "$SURI_BEFORE" ] || { echo "ABORT: Suricata ไม่ทำงานก่อนเริ่ม"; exit 1; }
echo "restart_command (config): $(grep 'restart_command:' config/config.yaml | sed 's/#.*//' | tr -s ' ')"
BEFORE=$("$PY" "$S/db_counts.py")
LOG_START=$(( $(wc -l < logs/engine.log) + 1 ))

"$PY" "$S/run_t1_debug_health.py" --test-id "$TEST_ID" --run-id "$RUN_ID" > "$S/${RUN_ID}_engine.out" 2>&1 &
ENGINE_PID=$!
for i in $(seq 1 40); do
  tail -n +"$LOG_START" logs/engine.log | grep -q "health = HEALTHY" && break; sleep 1; done
tail -n +"$LOG_START" logs/engine.log | grep -q "health = HEALTHY" \
  || { echo "ABORT: ไม่เห็น HEALTHY ก่อนฉีด fault"; kill $ENGINE_PID; exit 1; }
tail -n +"$LOG_START" logs/engine.log | grep "เริ่มอ่าน EVE" | grep -q "Program Files" \
  && { echo "ABORT: EVE path ถูกแปลง"; kill $ENGINE_PID; exit 1; }
echo "baseline HEALTHY · suricata pid $SURI_BEFORE · last stats: $(last_stats)"

FAULT_AT=$(date -u +%Y-%m-%dT%H:%M:%S.%NZ)
echo "fault: suricata.sh stop at $FAULT_AT -> $(PFSH '/usr/local/etc/rc.d/suricata.sh stop >/dev/null 2>&1; echo rc=$?; pgrep -x suricata || echo no-process')"

sleep "$POST_WAIT"
kill $ENGINE_PID 2>/dev/null; wait $ENGINE_PID 2>/dev/null
sleep 2
LOG_END=$(wc -l < logs/engine.log)
AFTER=$("$PY" "$S/db_counts.py")
SURI_ENGINE_END=$(PFSH 'pgrep -x suricata')
SLICE=$(sed -n "${LOG_START},${LOG_END}p" logs/engine.log)

echo "engine         : $(sed -n "${LOG_START}p" logs/engine.log | cut -c1-20) -> $(sed -n "${LOG_END}p" logs/engine.log | cut -c1-20)"
echo "log lines      : $LOG_START-$LOG_END"
echo "delta          : $("$PY" -c "import json,sys;b=json.loads(sys.argv[1]);a=json.loads(sys.argv[2]);print({k:a[k]-b[k] for k in a})" "$BEFORE" "$AFTER")"
echo "suricata pid   : before=$SURI_BEFORE · at engine stop=${SURI_ENGINE_END:-none}"
echo "--- health/recovery log"
echo "$SLICE" | grep -E "DEGRADED|recovery|restart|CRITICAL|กลับมา HEALTHY|ERROR" | cut -c1-210
echo "HEALTHY after fault: $(echo "$SLICE" | awk -v t="${FAULT_AT:0:19}Z" '$1 > t' | grep -c 'health = HEALTHY')"
"$PY" - "$BEFORE" <<'EOF'
import json, sqlite3, sys
before = json.loads(sys.argv[1])["recovery_events"]
c = sqlite3.connect("file:data/step11_experiment.db?mode=ro", uri=True)
for r in c.execute("SELECT * FROM recovery_events WHERE id > ? ORDER BY id", (before,)):
    print("recovery_event :", r)
EOF

if [ -z "$SURI_ENGINE_END" ]; then
  echo "restore: suricata.sh start -> $(PFSH '/usr/local/etc/rc.d/suricata.sh start >/dev/null 2>&1; echo rc=$?')"
  for i in $(seq 1 30); do sleep 2; P=$(PFSH 'pgrep -x suricata'); [ -n "$P" ] && break; done
  echo "restore pid    : ${P:-none}"
fi
S0=$(last_stats); for i in $(seq 1 20); do sleep 3; S1=$(last_stats); [ "$S1" != "$S0" ] && break; done
echo "stats after    : $S1"
echo "suricata pid   : final=$(PFSH 'pgrep -x suricata')"
if tasklist //FI "IMAGENAME eq python.exe" 2>/dev/null | grep -qi python; then
  echo "WARN: python.exe ยังค้างหลัง stop"; fi
