#!/usr/bin/env python3
"""Validate portfolio content: images, sections, and tech logo URLs."""

import argparse
import os
import re
import sys
import urllib.request
import urllib.error

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COMPONENTS_DIR = os.path.join(PROJECT_ROOT, "src", "components")
PUBLIC_DIR = os.path.join(PROJECT_ROOT, "public")

REQUIRED_COMPONENTS = [
    "Hero.tsx",
    "About.tsx",
    "Experience.tsx",
    "Education.tsx",
    "Skills.tsx",
    "Projects.tsx",
    "Contact.tsx",
    "Footer.tsx",
]

SIMPLE_ICONS_PATTERN = re.compile(
    r'https://cdn\.jsdelivr\.net/npm/simple-icons@v\d+/icons/[\w-]+\.svg'
)


def check_components_exist() -> list[str]:
    """Verify all required component files exist."""
    errors = []
    for comp in REQUIRED_COMPONENTS:
        path = os.path.join(COMPONENTS_DIR, comp)
        if not os.path.isfile(path):
            errors.append(f"Missing component: {comp}")
    return errors


def find_local_image_refs() -> list[tuple[str, str]]:
    """Find all local image src references in component files."""
    refs = []
    src_pattern = re.compile(r'src="(/assets/[^"]+)"')
    for comp in REQUIRED_COMPONENTS:
        path = os.path.join(COMPONENTS_DIR, comp)
        if not os.path.isfile(path):
            continue
        with open(path, "r") as f:
            content = f.read()
        for match in src_pattern.finditer(content):
            refs.append((comp, match.group(1)))
    return refs


def check_local_images(refs: list[tuple[str, str]]) -> list[str]:
    """Verify local image files exist in public/."""
    errors = []
    for comp, ref_path in refs:
        full_path = os.path.join(PUBLIC_DIR, ref_path.lstrip("/"))
        if not os.path.isfile(full_path):
            errors.append(f"{comp}: missing image {ref_path}")
    return errors


def find_external_urls() -> list[tuple[str, str]]:
    """Find all external URLs in component files."""
    refs = []
    url_pattern = re.compile(r'(?:src|href)="(https?://[^"]+)"')
    for comp in REQUIRED_COMPONENTS:
        path = os.path.join(COMPONENTS_DIR, comp)
        if not os.path.isfile(path):
            continue
        with open(path, "r") as f:
            content = f.read()
        for match in url_pattern.finditer(content):
            refs.append((comp, match.group(1)))
    return refs


def check_urls(urls: list[tuple[str, str]]) -> list[str]:
    """Check that external URLs are reachable (HEAD request)."""
    errors = []
    checked = set()
    for comp, url in urls:
        if url in checked:
            continue
        checked.add(url)
        try:
            req = urllib.request.Request(url, method="HEAD")
            req.add_header("User-Agent", "PortfolioValidator/1.0")
            with urllib.request.urlopen(req, timeout=10):
                pass
        except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError) as e:
            errors.append(f"{comp}: broken URL {url} ({e})")
    return errors


def main():
    parser = argparse.ArgumentParser(description="Validate portfolio content")
    parser.add_argument(
        "--check-urls",
        action="store_true",
        help="Also check external URLs are reachable (slow)",
    )
    args = parser.parse_args()

    all_errors = []

    # Check required components
    print("Checking required components...")
    errors = check_components_exist()
    all_errors.extend(errors)
    if not errors:
        print(f"  All {len(REQUIRED_COMPONENTS)} components present.")

    # Check local image references
    print("Checking local image references...")
    refs = find_local_image_refs()
    errors = check_local_images(refs)
    all_errors.extend(errors)
    if not errors:
        print(f"  All {len(refs)} local image references valid.")
    else:
        for e in errors:
            print(f"  FAIL: {e}")

    # Check external URLs (optional)
    if args.check_urls:
        print("Checking external URLs (this may take a moment)...")
        urls = find_external_urls()
        errors = check_urls(urls)
        all_errors.extend(errors)
        if not errors:
            print(f"  All {len(set(u for _, u in urls))} external URLs reachable.")
        else:
            for e in errors:
                print(f"  FAIL: {e}")

    # Summary
    print()
    if all_errors:
        print(f"VALIDATION FAILED: {len(all_errors)} error(s) found.")
        for e in all_errors:
            print(f"  - {e}")
        sys.exit(1)
    else:
        print("VALIDATION PASSED: All checks passed.")
        sys.exit(0)


if __name__ == "__main__":
    main()
