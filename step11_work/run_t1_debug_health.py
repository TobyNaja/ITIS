"""scratch wrapper (ไม่อยู่ใน repo): รัน run_phase4.main() เหมือนเดิมทุกอย่าง
แค่เปิด DEBUG เฉพาะ logger security_engine.health เพื่อให้เห็น "health = HEALTHY" ใน engine.log
logger อื่นยังเป็นระดับตาม config (INFO) — ไม่แตะ pipeline/decision ใด ๆ
"""
import logging
import sys

sys.path.insert(0, r"D:\IT\Year 3\ITIS\Project-ITIS")
import run_phase4  # noqa: E402

_original = run_phase4.configure_from_settings


def configure_with_health_debug(settings, *args, **kwargs):
    _original(settings, *args, **kwargs)
    for handler in logging.getLogger().handlers:
        handler.setLevel(logging.DEBUG)          # ให้ record DEBUG ผ่าน handler ได้
    logging.getLogger("security_engine.health").setLevel(logging.DEBUG)


run_phase4.configure_from_settings = configure_with_health_debug

if __name__ == "__main__":
    run_phase4.main(sys.argv[1:])
