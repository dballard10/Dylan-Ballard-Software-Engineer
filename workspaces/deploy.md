# Deploy to Vercel

## Trigger
User requests deployment or says "deploy", "push to production", "ship it", etc.

## Pre-Deploy Checklist

1. Run type check: `npm run type-check`
2. Run build: `npm run build`
3. Check for secrets in staged files: `git diff --cached --name-only` — reject if `.env` or credential files are staged.
4. Review changed files: `git status`

## Deploy Steps

1. Stage changed files by name (never use `git add .` or `git add -A`).
2. Commit with a descriptive message.
3. Push to `main` branch. Vercel auto-deploys from main.

## Post-Deploy

1. Confirm the push succeeded.
2. Let the user know to check the Vercel dashboard for build status.

## Constraints

- Never force-push.
- Never commit `.env` files or API keys.
- Never skip pre-commit hooks.
- Always confirm with user before pushing.
