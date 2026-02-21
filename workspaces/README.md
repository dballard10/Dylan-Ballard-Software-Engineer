# Workspaces

Workspaces are markdown SOPs that Claude reads to orchestrate workflows. Each file defines a repeatable process with clear triggers, steps, and constraints.

| Workspace | Description |
|-----------|-------------|
| [update-content.md](update-content.md) | Update portfolio text, skills, experience |
| [add-project.md](add-project.md) | Add a new featured project |
| [deploy.md](deploy.md) | Deploy changes to Vercel |
| [job-search.md](job-search.md) | Find roles, tailor resume, track applications |

## Adding a new workspace

Create a new `.md` file in this folder following this structure:

```markdown
# Workspace Name

## Trigger
When to use this workspace.

## Steps
1. Step one
2. Step two

## Constraints
- What to avoid
```
