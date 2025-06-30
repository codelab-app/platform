# link-issues

Analyze commits and link them to related GitHub issues

## Prompt

Analyze the git commits in the current branch and identify which commits should have GitHub issue numbers added to their messages. For each commit:

1. Look at all commits between the current branch and master using `git log master..HEAD`
2. Fetch the last 10 GitHub issues from the repository
3. Match commits to issues based on:
   - Commit message content relating to issue title/description
   - File changes that relate to issues
   - Timing correlation between commits and issues
4. Create a report showing:
   - Which commits should have issue numbers added
   - The suggested new commit message with issue number
   - Commands to update the commit messages

After showing the report, if the user confirms they want to update the commit messages:

1. Use a one-shot interactive rebase approach:
   - Create a script that modifies the rebase todo list to change specific commits from "pick" to "reword"
   - Create another script that provides new commit messages based on commit SHA
   - Execute `git rebase -i master` with `GIT_SEQUENCE_EDITOR` and `GIT_EDITOR` environment variables
2. Apply the new commit messages directly without opening any editor
3. Show real-time progress as each commit is being updated
4. Handle any conflicts or errors that arise during the rebase
5. Only warn about rewriting history if the commits have already been pushed to remote
6. **IMPORTANT**: Do NOT force push unless explicitly requested by the user

## Implementation Details

The one-shot rebase approach uses two scripts:

1. **Todo List Editor** (via `GIT_SEQUENCE_EDITOR`):
   ```bash
   #!/bin/bash
   perl -i -pe 's/^pick (SHA1|SHA2|...)/reword $1/' "$1"
   ```

2. **Commit Message Editor** (via `GIT_EDITOR`):
   ```bash
   #!/bin/bash
   COMMIT_SHA=$(git rev-parse HEAD)
   case "${COMMIT_SHA:0:10}" in
     "abc123def4") echo "feat: original message (#1234)" > "$1" ;;
     "def456ghi7") echo "fix: another message (#5678)" > "$1" ;;
     *) ;; # Keep original for non-matched commits
   esac
   ```

3. **Execute the rebase**:
   ```bash
   GIT_SEQUENCE_EDITOR="/tmp/rebase-todo-editor.sh" \
   GIT_EDITOR="/tmp/commit-msg-editor.sh" \
   git rebase -i master
   ```

This approach is cleaner and more efficient than `git filter-branch` as it:
- Uses standard Git workflow
- Preserves commit structure better
- Handles conflicts more gracefully
- Is more efficient for selective updates