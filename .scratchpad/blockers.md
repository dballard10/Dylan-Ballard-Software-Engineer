# Blockers & Known Issues

## Active

### Empty tests directory
**Status**: Low priority
**Issue**: tests/ directory exists but contains no files. No test framework is configured.
**Impact**: No automated testing. Content validation relies on tools/validate_content.py only.

### Job search tool is placeholder
**Status**: Blocked — needs API decision
**Issue**: tools/scrape_jobs.py is a placeholder with no real integration.
**Decision needed**: Which job board APIs to integrate (Wellfound, HN Who's Hiring, LinkedIn)?
**Impact**: Job search workspace (workspaces/job-search.md) can't be fully automated yet.

## Resolved
(none yet)
