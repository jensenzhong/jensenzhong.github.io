"""Refresh the sidebar chart from GitHub's public contribution calendar."""

import json
import time
from datetime import date, datetime, timedelta, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
USERNAME = "jensenzhong"


class CalendarParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.days = {}

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "ContributionCalendar-day" in attrs.get("class", "").split() and "data-date" in attrs:
            day = date.fromisoformat(attrs["data-date"])
            level = int(attrs["data-level"])
            if level not in range(5):
                raise ValueError("Unexpected contribution level")
            self.days[day] = level


def refresh():
    request = Request(
        f"https://github.com/users/{USERNAME}/contributions",
        headers={"User-Agent": "personal-site-activity-updater", "Accept": "text/html"},
    )
    for attempt in range(3):
        try:
            with urlopen(request, timeout=30) as response:
                html = response.read().decode("utf-8")
            break
        except OSError:
            if attempt == 2:
                raise
            time.sleep(2 ** attempt)

    calendar = CalendarParser()
    calendar.feed(html)
    now = datetime.now(timezone.utc)
    days = calendar.days
    if len(days) < 300 or abs((max(days) - now.date()).days) > 2:
        raise ValueError("Missing or stale GitHub calendar; keeping the previous deployment")

    end = max(days)
    start = end - timedelta(days=(end.weekday() + 1) % 7 + 31 * 7)
    colors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"]
    svg = ['<svg xmlns="http://www.w3.org/2000/svg" width="447" height="104" viewBox="0 0 447 104" role="img">',
           f'<title>{USERNAME} GitHub contributions: {start} to {end}</title>',
           '<rect width="447" height="104" fill="#ffffff"/>',
           '<g font-family="Arial,sans-serif" font-size="7" fill="#66717e">']
    for row, label in [(1, "Mon"), (3, "Wed"), (5, "Fri")]:
        svg.append(f'<text x="3" y="{24 + row * 11}">{label}</text>')
    previous_month = None
    for week in range(32):
        sunday = start + timedelta(days=week * 7)
        if sunday.month != previous_month:
            svg.append(f'<text x="{27 + week * 13}" y="10">{sunday.strftime("%b")}</text>')
            previous_month = sunday.month
        for row in range(7):
            day = sunday + timedelta(days=row)
            if day > end:
                continue
            level = days[day]
            svg.append(f'<rect x="{27 + week * 13}" y="{16 + row * 11}" width="10" height="9" rx="1" fill="{colors[level]}"><title>{day}: contribution level {level} of 4</title></rect>')
    svg.append('</g></svg>')
    metadata = {
        "updated_at": now.isoformat(timespec="seconds"),
        "updated_date": now.astimezone(timezone(timedelta(hours=8))).strftime("%Y-%m-%d"),
        "start": str(start), "end": str(end),
    }
    (ROOT / "images/github-contributions.svg").write_text("\n".join(svg), encoding="utf-8")
    (ROOT / "_data/github-activity.json").write_text(json.dumps(metadata, indent=2) + "\n", encoding="utf-8")
    print(f"Updated {USERNAME}: {len(days)} days fetched, chart through {end}")


if __name__ == "__main__":
    refresh()
