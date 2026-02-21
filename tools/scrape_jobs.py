#!/usr/bin/env python3
"""Job search utilities. Placeholder for future job board integration."""

import argparse
import json
import sys


# Data structure for job listings
JOB_SCHEMA = {
    "title": "str — Job title",
    "company": "str — Company name",
    "url": "str — Application URL",
    "location": "str — Location or Remote",
    "posted": "str — Date posted (YYYY-MM-DD)",
    "match_score": "int — 0-100 relevance score",
    "notes": "str — Why this is a match",
}


def main():
    parser = argparse.ArgumentParser(description="Job search utilities (placeholder)")
    parser.add_argument(
        "--source",
        type=str,
        default="all",
        help="Job board source (wellfound, hn, linkedin, all)",
    )
    parser.add_argument(
        "--keywords",
        type=str,
        default="fullstack react python",
        help="Search keywords",
    )
    parser.add_argument(
        "--schema",
        action="store_true",
        help="Print the job listing schema and exit",
    )
    args = parser.parse_args()

    if args.schema:
        print(json.dumps(JOB_SCHEMA, indent=2))
        sys.exit(0)

    print("Job search is a placeholder. Future integrations:")
    print(f"  Source: {args.source}")
    print(f"  Keywords: {args.keywords}")
    print()
    print("Planned sources:")
    print("  - Wellfound (AngelList) — startup-focused")
    print("  - Hacker News Who's Hiring — monthly threads")
    print("  - LinkedIn — broad search")
    print()
    print("For now, use Claude's web search to find roles manually,")
    print("then track them using the job-search directive.")


if __name__ == "__main__":
    main()
