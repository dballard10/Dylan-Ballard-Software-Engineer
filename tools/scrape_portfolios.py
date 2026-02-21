#!/usr/bin/env python3
"""Portfolio inspiration tracker.

Manages a CSV spreadsheet of developer portfolio websites for design inspiration.
Part of the Workspaces, Agents, and Tools architecture — called by Claude (orchestration) or the user directly.

Usage:
    python tools/scrape_portfolios.py --list
    python tools/scrape_portfolios.py --add --name "Jane Doe" --role "Engineer" ...
    python tools/scrape_portfolios.py --schema
    python tools/scrape_portfolios.py --export
"""

import argparse
import csv
import io
import os
import sys
from datetime import date

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV_PATH = os.path.join(PROJECT_ROOT, "data", "portfolio-inspiration.csv")

FIELDS = ["name", "role", "company", "portfolio_url", "company_url", "notes", "date_added"]

SCHEMA = {
    "name": "str — Person's full name",
    "role": "str — Current job title / role",
    "company": "str — Current company (or 'Self-employed')",
    "portfolio_url": "str — URL to their portfolio website",
    "company_url": "str — URL to the company website",
    "notes": "str — What makes this portfolio notable",
    "date_added": "str — Date added (YYYY-MM-DD, auto-filled)",
}


def ensure_csv_exists():
    """Create the CSV with headers if it doesn't exist."""
    os.makedirs(os.path.dirname(CSV_PATH), exist_ok=True)
    if not os.path.isfile(CSV_PATH):
        with open(CSV_PATH, "w", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=FIELDS)
            writer.writeheader()


def read_entries() -> list[dict]:
    """Read all entries from the CSV."""
    ensure_csv_exists()
    with open(CSV_PATH, "r", newline="") as f:
        reader = csv.DictReader(f)
        return list(reader)


def add_entry(name: str, role: str, company: str, portfolio_url: str,
              company_url: str, notes: str = "") -> dict:
    """Append a new entry to the CSV. Returns the new row."""
    ensure_csv_exists()
    row = {
        "name": name,
        "role": role,
        "company": company,
        "portfolio_url": portfolio_url,
        "company_url": company_url,
        "notes": notes,
        "date_added": date.today().isoformat(),
    }
    with open(CSV_PATH, "a", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDS)
        writer.writerow(row)
    return row


def format_table(entries: list[dict]) -> str:
    """Format entries as a readable table."""
    if not entries:
        return "No entries found."

    # Calculate column widths
    display_fields = ["name", "role", "company", "portfolio_url", "date_added"]
    headers = {"name": "Name", "role": "Role", "company": "Company",
               "portfolio_url": "Portfolio URL", "date_added": "Added"}
    widths = {}
    for field in display_fields:
        col_values = [headers[field]] + [e.get(field, "") for e in entries]
        widths[field] = min(max(len(v) for v in col_values), 50)

    # Build table
    buf = io.StringIO()
    header_line = " | ".join(headers[f].ljust(widths[f]) for f in display_fields)
    sep_line = "-+-".join("-" * widths[f] for f in display_fields)
    buf.write(header_line + "\n")
    buf.write(sep_line + "\n")
    for entry in entries:
        row_line = " | ".join(
            entry.get(f, "")[:widths[f]].ljust(widths[f]) for f in display_fields
        )
        buf.write(row_line + "\n")
    return buf.getvalue()


def main():
    parser = argparse.ArgumentParser(
        description="Portfolio inspiration tracker — manage a CSV of notable portfolios"
    )
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--list", action="store_true", help="List all entries")
    group.add_argument("--add", action="store_true", help="Add a new entry")
    group.add_argument("--schema", action="store_true", help="Print the CSV schema")
    group.add_argument("--export", action="store_true", help="Export as formatted table")

    # Fields for --add
    parser.add_argument("--name", type=str, help="Person's full name")
    parser.add_argument("--role", type=str, help="Current job title")
    parser.add_argument("--company", type=str, help="Current company")
    parser.add_argument("--portfolio-url", type=str, help="Portfolio website URL")
    parser.add_argument("--company-url", type=str, help="Company website URL")
    parser.add_argument("--notes", type=str, default="", help="What makes this notable")

    args = parser.parse_args()

    if args.schema:
        print("Portfolio Inspiration CSV Schema:")
        print(f"  File: {CSV_PATH}")
        print()
        for field, desc in SCHEMA.items():
            print(f"  {field}: {desc}")
        sys.exit(0)

    if args.list:
        entries = read_entries()
        if not entries:
            print("No entries yet. Use --add to add one.")
        else:
            print(f"{len(entries)} portfolio(s) found:\n")
            for i, e in enumerate(entries, 1):
                print(f"  {i}. {e['name']} — {e['role']}")
                print(f"     Company: {e['company']}")
                print(f"     Portfolio: {e['portfolio_url']}")
                print(f"     Company URL: {e['company_url']}")
                if e.get("notes"):
                    print(f"     Notes: {e['notes']}")
                print(f"     Added: {e['date_added']}")
                print()
        sys.exit(0)

    if args.export:
        entries = read_entries()
        print(format_table(entries))
        sys.exit(0)

    if args.add:
        required = ["name", "role", "company", "portfolio_url", "company_url"]
        missing = [f for f in required if not getattr(args, f.replace("-", "_"), None)]
        if missing:
            print(f"Error: --add requires: {', '.join('--' + f.replace('_', '-') for f in missing)}")
            sys.exit(1)
        row = add_entry(
            name=args.name,
            role=args.role,
            company=args.company,
            portfolio_url=args.portfolio_url,
            company_url=args.company_url,
            notes=args.notes,
        )
        print(f"Added: {row['name']} ({row['portfolio_url']})")
        sys.exit(0)


if __name__ == "__main__":
    main()
