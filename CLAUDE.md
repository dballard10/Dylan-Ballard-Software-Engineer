# Portfolio — Project Context

## Project
Portfolio website and job search tool for Dylan Ballard, Full-Stack Software
Engineer. The site showcases work, skills, and projects. It also serves as a
job search tool for applying to roles at tech startups.

## Tech Stack
- Framework: React 19, TypeScript, Vite
- Styling: CSS3 (custom properties, flexbox, grid)
- Deployment: Vercel (auto-deploy from main)
- Email: Resend API via Vercel serverless function
- Icons: Lucide (global CDN), Simple Icons (tech logos CDN)

## Architecture: Workspaces, Agents, and Tools
- **Workspaces** (`workspaces/`): Markdown SOPs that define workflows.
  Read the relevant workspace before starting any workflow.
- **Agents** (`.claude/agents/`): Specialist subagents for focused tasks.
  Spawn these for research, component building, style reviews, SEO audits,
  and job search work. Each agent has its own context window.
- **Commands** (`.claude/commands/`): Slash commands for common workflows.
  Use `/handoff` at end of session to save state.
- **Tools** (`tools/`): Python scripts for deterministic tasks.
  Check tools/ before building new ones.
- **Tests** (`tests/`): Test suite for the application.
- **Docs** (`docs/`): Symlink to the Dev-Docs vault repo (`../Dev-Docs/<project>/`).
  Plans and documentation written here go to the central Obsidian vault.
  When a plan is finalized or worth preserving, save it here.
  The Dev-Docs repo is versioned separately via Obsidian Git.
  If `docs/` doesn't exist yet, create a subfolder in `../Dev-Docs/` matching
  this project's name, symlink it as `docs`, and add `docs` to `.gitignore`.
- **Deliverables**: Final outputs go to Vercel (deploy) or stdout (reports).
  Do not create local output files.

## Session Continuity
- **Start of session**: Read `.scratchpad/status.md` for current project state.
- **During work**: Log non-obvious decisions in `.scratchpad/decisions.md`.
- **End of session**: Run `/handoff` to save state, or when I say "wrap up"
  or "handoff", update status.md and append to session-log.md.
- **Blockers**: Log immediately in `.scratchpad/blockers.md`.

## Conventions
- All portfolio content lives in React component files, not in data files.
- Images go in `public/assets/` as `.webp` (photos) or `.svg` (icons).
- Tech logos: use Simple Icons CDN when available, local SVG otherwise.
- CSS uses custom properties defined in :root — never hardcode colors.
- All styles live in `src/styles.css` (single stylesheet, not per-component).
- Never commit `.env` files or API keys.
- Deploy by pushing to main (Vercel auto-deploys).

## Rules
1. Read `.scratchpad/status.md` at the start of every session.
2. Check `tools/` for existing scripts before creating new ones.
3. Read the relevant workspace in `workspaces/` before multi-step work.
4. Spawn subagents for focused tasks (research, building, reviewing).
5. Ask before running tools that use paid API calls or credits.
6. When something fails: fix it, verify, update the workspace if needed.
7. Do not create or overwrite workspaces without asking.
