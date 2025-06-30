# close-task

Close the current task by removing the git worktree and switching back to the main repository

## Prompt

Close the current task and clean up the git worktree. This command will:

1. Check if we're currently in a git worktree (not the main repository)
2. Verify there are no uncommitted changes that would be lost
3. Get the worktree path and branch name
4. Switch back to the main repository directory
5. Remove the worktree and its associated branch

## Steps

1. **Safety Checks**:
   - Verify we're in a git worktree using `git rev-parse --show-superproject-working-tree`
   - Check for uncommitted changes with `git status --porcelain`
   - If changes exist, warn the user and ask for confirmation

2. **Gather Information**:
   - Get current worktree path: `pwd`
   - Get worktree branch: `git branch --show-current`
   - Get main repository path: `git rev-parse --show-superproject-working-tree`

3. **Close Worktree**:
   - Navigate to main repository: `cd <main-repo-path>`
   - List worktrees to confirm: `git worktree list`
   - Remove the worktree: `git worktree remove <worktree-path>`
   - Optionally delete the branch if requested

4. **Confirmation**:
   - Show removed worktree details
   - Confirm current directory is the main repository
   - Show remaining worktrees if any

## Safety Features

- Never remove the main repository worktree
- Always check for uncommitted changes before removal
- Provide clear warnings if branch has unpushed commits
- Allow user to cancel at any confirmation step

## Example Output

```
Checking current worktree status...
Current worktree: /Users/user/projects/repo-3735-feature
Branch: feat/3735-new-feature
Main repository: /Users/user/projects/repo

⚠️  Warning: You have uncommitted changes:
M src/file1.ts
M src/file2.ts

Do you want to proceed with removing the worktree? (y/N)

Removing worktree...
✓ Worktree removed: /Users/user/projects/repo-3735-feature
✓ Switched to main repository: /Users/user/projects/repo

Current worktrees:
/Users/user/projects/repo  main
```

## Options

- `--force`: Skip confirmation prompts (use with caution)
- `--delete-branch`: Also delete the associated branch after removing worktree
- `--stash`: Stash any uncommitted changes before removing worktree