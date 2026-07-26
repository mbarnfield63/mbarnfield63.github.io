"""Pull recent Garmin activities and personal records for the /running/ page.

Public-safe by design: only activities and PRs, never sleep/HRV/stress/HR
(those stay in the private local tracker, see the garmin_ai_tracking project).

Run by .github/workflows/update-garmin.yml on a schedule, using a saved
Garmin login token decoded from the GARMIN_TOKEN_B64 secret. For a manual
local run, pass GARMIN_TOKEN_B64 yourself or point GARMIN_TOKENSTORE at an
existing token directory (e.g. the one --login created).
"""

import base64
import os
import tempfile
from datetime import datetime, timezone
from pathlib import Path

import yaml
from garminconnect import Garmin

REPO_ROOT = Path(__file__).parent.parent
OUT_FILE = REPO_ROOT / "_data" / "garmin_activities.yml"
RECENT_COUNT = 5

RECORD_LABELS = {1: "1 km", 2: "1 mile", 3: "5K", 4: "10K", 5: "Half Marathon", 6: "Marathon"}
LONGEST_RUN_TYPE_ID = 7
RECORD_ORDER = ["1 km", "1 mile", "5K", "10K", "Half Marathon", "Marathon", "Longest Run"]


def format_duration(seconds: float) -> str:
    seconds = round(seconds)
    hours, rem = divmod(seconds, 3600)
    minutes, secs = divmod(rem, 60)
    return f"{hours}:{minutes:02d}:{secs:02d}" if hours else f"{minutes}:{secs:02d}"


def login() -> Garmin:
    token_b64 = os.environ.get("GARMIN_TOKEN_B64")
    if token_b64:
        tokendir = Path(tempfile.mkdtemp())
        (tokendir / "garmin_tokens.json").write_bytes(base64.b64decode(token_b64))
        tokenstore = str(tokendir)
    else:
        tokenstore = os.environ.get("GARMIN_TOKENSTORE", str(Path.home() / ".garmin_tokens"))

    client = Garmin()
    client.login(tokenstore)
    return client


def pull_recent_activities(client: Garmin) -> list[dict]:
    raw = client.get_activities(0, RECENT_COUNT) or []
    out = []
    for a in raw:
        distance_km = round((a.get("distance") or 0) / 1000, 2)
        duration_s = a.get("duration") or 0
        pace = format_duration(duration_s / distance_km) if distance_km else "n/a"
        out.append(
            {
                "name": a.get("activityName") or "Unknown",
                "type": (a.get("activityType") or {}).get("typeKey", "unknown"),
                "date": (a.get("startTimeLocal") or "").split(" ")[0].split("T")[0],
                "distance_km": distance_km,
                "duration_min": round(duration_s / 60, 1),
                "avg_pace_per_km": pace,
            }
        )
    return out


def pull_records(client: Garmin) -> list[dict]:
    raw = client.get_personal_record() or []
    out = []
    for r in raw:
        type_id = r.get("typeId")
        date_str = (r.get("activityStartDateTimeLocalFormatted") or "").split("T")[0]
        if type_id in RECORD_LABELS:
            out.append(
                {
                    "label": RECORD_LABELS[type_id],
                    "value": format_duration(r["value"]),
                    "date": date_str,
                    "activity_name": r.get("activityName"),
                }
            )
        elif type_id == LONGEST_RUN_TYPE_ID:
            out.append(
                {
                    "label": "Longest Run",
                    "value": f"{round(r['value'] / 1000, 2)} km",
                    "date": date_str,
                    "activity_name": r.get("activityName"),
                }
            )
    out.sort(key=lambda r: RECORD_ORDER.index(r["label"]) if r["label"] in RECORD_ORDER else 99)
    return out


def main() -> None:
    client = login()
    data = {
        "updated": datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
        "recent": pull_recent_activities(client),
        "records": pull_records(client),
    }
    OUT_FILE.write_text(yaml.dump(data, sort_keys=False, allow_unicode=True), encoding="utf-8")
    print(f"Wrote {OUT_FILE}")


if __name__ == "__main__":
    main()
