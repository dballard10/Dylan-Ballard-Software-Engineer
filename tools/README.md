# Tools

Deterministic Python utilities that agents call during workflows. These handle validation, generation, and data processing tasks that should produce consistent, repeatable results.

**Requirements**: Python 3.10+, stdlib only (no pip install needed).

| Script | Usage | Description |
|--------|-------|-------------|
| `validate_content.py` | `python tools/validate_content.py [--check-urls]` | Validate images, links, sections |
| `generate_resume.py` | `python tools/generate_resume.py [--role "..."]` | Extract resume as markdown |
| `scrape_jobs.py` | `python tools/scrape_jobs.py --keywords "..."` | Job search utilities (placeholder) |
