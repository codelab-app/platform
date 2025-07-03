---
allowed-tools: Bash, Task
description: Start a new task by creating a git worktree for a GitHub issue
---

## Context
- Current branch: !`git branch --show-current`
- Git worktrees: !`git worktree list`
- Arguments provided: $ARGUMENTS

## Your task

Create a git worktree for the specified GitHub issue and open it in VS Code.

### Steps:

1. Parse the issue number from `$ARGUMENTS` (accepts either issue number or full GitHub URL)
2. Fetch issue details using: `gh api "repos/codelab-app/platform/issues/{issue_number}"`
3. Extract issue title and create a clean directory name:
   - Convert to lowercase
   - Remove special characters (keep only alphanumeric, spaces, and hyphens)
   - Replace spaces with hyphens
   - Truncate to 50 characters maximum
4. Generate worktree path: `../platform-{issue_number}-{clean_title}`
5. Check if worktree already exists - if yes, just open it in VS Code
6. Determine branch type from issue labels (default to "feat")
7. Create branch name following convention: `{type}/{issue_number}-{clean_title}`
8. Create the worktree: `git worktree add {path} -b {branch_name}`
9. Copy environment files to the new worktree:
   - Copy `.env` if exists
   - Copy `.env.test` if exists
   - Copy `apps/api/.env` if exists
   - Copy `apps/api/.env.test` if exists
   - Copy `apps/landing/.env` if exists
   - Copy `apps/sites/.env` if exists
   - Copy `apps/web-e2e/.env` if exists
10. Open in VS Code: `code {path}`

### Example outputs:
- Issue #3740 "Add new feature" → `../platform-3740-add-new-feature`
- Branch: `feat/3740-add-new-feature`