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

1. Execute git rebase non-interactively using environment variables like GIT_SEQUENCE_EDITOR and GIT_EDITOR
2. Use commands like `git rebase -i master --exec` to update each identified commit
3. Apply the new commit messages directly without opening any editor
4. Show real-time progress as each commit is being updated
5. Handle any conflicts or errors that arise during the rebase
6. Only warn about rewriting history if the commits have already been pushed to remote