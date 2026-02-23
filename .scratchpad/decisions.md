# Decisions Log

## 2026-02-13: Agent architecture approach
**Decision**: Use `.claude/agents/` for subagents, `.scratchpad/` for inter-session memory, `.claude/commands/` for slash commands.
**Why**: Claude Code natively supports these directories. Subagents get their own context windows, scratchpad persists between sessions, commands provide quick access to common workflows.
**Alternative considered**: Keeping everything in CLAUDE.md — rejected because it bloats the main context file and doesn't leverage subagent isolation.

## 2026-02-13: Scratchpad gitignored
**Decision**: `.scratchpad/` is gitignored (local-only, not committed).
**Why**: Session-specific state shouldn't be in version control. Keeps git history clean.
**Trade-off**: Won't persist if repo is cloned elsewhere. First session on a new machine will need to create it fresh.

## Pre-existing: Tech logo approach
**Decision**: Use Simple Icons CDN for tech logos, fall back to local SVG in public/assets/technologies/.
**Why**: CDN reduces bundle size, Simple Icons has 2600+ logos, consistent monochrome style. Local SVGs only for logos not in Simple Icons.
**Gotcha**: Color variants on hover use data-mono-src/data-color-src attributes.

## Pre-existing: Contact form backend
**Decision**: Vercel serverless function with Resend API.
**Why**: No separate backend needed, Resend free tier covers 100 emails/day, keeps everything in the Vercel ecosystem.
**Gotcha**: Must use POST to /api/contact. Resend requires verified domain for production.

## Pre-existing: Content architecture
**Decision**: All portfolio content lives directly in React component files, not in separate data files.
**Why**: Single source of truth per section, no mapping layer needed, easy to find and edit.
**Trade-off**: Components are larger but content is always co-located with its presentation.

## Pre-existing: CSS approach
**Decision**: Plain CSS3 with custom properties in a single stylesheet (src/styles.css), no CSS-in-JS or Tailwind.
**Why**: Zero runtime cost, full control, custom properties give theming capability.
**Note**: All styles live in src/styles.css. Components do not have individual CSS files.
