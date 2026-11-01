"""Figure: องค์ประกอบของ M4 ต่อ run (ทุก run ที่ block — T4, T6, T7, T11) จาก experiment_timestamps
อ่านอย่างเดียว · output docs/report/figures/step11_m4_breakdown.png
"""
import sqlite3
from datetime import datetime
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402

ROOT = Path("D:/IT/Year 3/ITIS/Project-ITIS")
OUT = ROOT / "docs" / "report" / "figures" / "step11_m4_breakdown.png"
SURFACE, INK, INK2, MUTED, GRID, AXIS = "#fcfcfb", "#0b0b0b", "#52514e", "#898781", "#e1e0d9", "#c3c2b7"
SEGMENTS = [("M1 EVE ingestion", "t_event", "t_detection", "#2a78d6"),
            ("M2 decision", "t_detection", "t_decision", "#eb6834"),
            ("M3 pre-block", "t_decision", "t_block_cmd", "#1baf7a"),
            ("M3 command + verification", "t_block_cmd", "t_block_verified", "#eda100")]

ts = datetime.fromisoformat
c = sqlite3.connect(f"file:{ROOT / 'data' / 'step11_experiment.db'}?mode=ro", uri=True)
rows = c.execute("SELECT notes, t_event, t_detection, t_decision, t_block_cmd, t_block_verified "
                 "FROM experiment_timestamps WHERE t_block_verified IS NOT NULL ORDER BY id").fetchall()
order = {"T4": 0, "T6": 1, "T7": 2, "T11": 3}
data = []
for notes, *t in rows:
    run = notes.split(";")[0].removeprefix("run=")
    tt = dict(zip(["t_event", "t_detection", "t_decision", "t_block_cmd", "t_block_verified"], t))
    data.append((run, [(ts(tt[b]) - ts(tt[a])).total_seconds() * 1000 for _, a, b, _ in SEGMENTS]))
data.sort(key=lambda d: (order[d[0].split("-")[0]], d[0]))
assert len(data) == 18, len(data)

plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 9})
fig, ax = plt.subplots(figsize=(8, 6.2), dpi=200)
fig.patch.set_facecolor(SURFACE)
ax.set_facecolor(SURFACE)
y = list(range(len(data)))[::-1]
for i, (label, _, _, color) in enumerate(SEGMENTS):
    left = [sum(v[:i]) for _, v in data]
    ax.barh(y, [v[i] for _, v in data], left=left, height=0.62, color=color,
            edgecolor=SURFACE, linewidth=1.5, label=label, zorder=2)
for yi, (run, v) in zip(y, data):
    ax.text(sum(v) + 15, yi, f"{sum(v):.0f}", va="center", ha="left", fontsize=8, color=INK2)
ax.set_yticks(y, [r for r, _ in data], color=INK2)
ax.set_xlabel("ms (same clock: SEC01)", color=INK2)
ax.set_xlim(0, 2250)
ax.xaxis.grid(True, color=GRID, linewidth=0.6, zorder=0)
ax.tick_params(colors=MUTED, length=0)
for s in ("top", "right", "left"):
    ax.spines[s].set_visible(False)
ax.spines["bottom"].set_color(AXIS)
ax.set_title("M4 end-to-end latency by component (all BLOCK runs, n = 18)",
             loc="left", color=INK, fontsize=10.5, pad=28)
ax.legend(ncol=4, loc="lower left", bbox_to_anchor=(0, 1.0), frameon=False, fontsize=8,
          labelcolor=INK2, handlelength=1.2, columnspacing=1.2)
fig.tight_layout()
OUT.parent.mkdir(parents=True, exist_ok=True)
fig.savefig(OUT, facecolor=SURFACE)
print(OUT, len(data))
