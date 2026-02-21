# Job Search

## Trigger
User wants to search for jobs, tailor their resume, or prepare application materials.

## User Profile

- **Name**: Dylan Ballard
- **Role**: Full-Stack Software Engineer
- **Experience**: 2+ years professional + internships (Eigennet, Freddie Mac, Criterion Systems)
- **Education**: MS Computer Science (George Mason), BS Computer Science (James Madison)
- **Core Stack**: React, TypeScript, Python, FastAPI, PostgreSQL, AWS
- **Location**: Northern Virginia (open to remote)
- **Target**: Tech startups (early/growth stage)

## Workflows

### Find Roles
1. Search for software engineer roles at tech startups matching the user's stack.
2. Prioritize: React/TypeScript frontend, Python backend, startup culture, remote-friendly.
3. Present findings to user with company name, role, URL, and why it's a match.

### Tailor Resume
1. Run `python tools/generate_resume.py` to extract current resume content.
2. Review the job description the user provides.
3. Suggest adjustments to emphasize relevant skills and experience for the target role.
4. If changes to the portfolio are needed, follow `workspaces/update-content.md`.

### Track Applications
- Placeholder for future implementation.
- Could be a simple markdown file, spreadsheet, or a dedicated tracking feature.

## Constraints

- Always confirm with the user before submitting anything or making changes.
- This is an assist tool, not an auto-apply bot.
- Never fabricate experience or skills — only reframe existing ones.
