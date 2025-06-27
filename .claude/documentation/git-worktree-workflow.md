# Git Worktree Workflow

When a GitHub issue URL is pasted, follow these steps:

1. **Extract repository name and issue number** from the GitHub URL
2. **Create a new worktree** from master branch with a new branch:
   ```bash
   git worktree add -b issue-{issue-number} ../{repo-name}-{issue-number} master
   ```
3. **Copy .env file** from current repository to new worktree:
   ```bash
   cp .env ../{repo-name}-{issue-number}/.env
   ```
4. **Open the new worktree in Cursor**:
   ```bash
   cursor ../{repo-name}-{issue-number}
   ```

## Example:
If issue URL is `https://github.com/codelab-app/platform/issues/3735`:
- Repository name: platform
- Issue number: 3735
- Branch name: `issue-3735`
- Worktree path: `../platform-3735`
- Commands:
  ```bash
  git worktree add -b issue-3735 ../platform-3735 master
  cp .env ../platform-3735/.env
  cursor ../platform-3735
  ```

## Notes:
- Always use master branch as the base
- Always create a new branch named `issue-{number}`
- Always copy .env to maintain environment configuration
- Worktree is created as a sibling directory to current repo
- If branch already exists, remove old worktree and force delete branch first:
  ```bash
  git worktree remove ../{repo-name}-{issue-number}
  git branch -D issue-{issue-number}
  ```