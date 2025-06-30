# git-issue-sync

Sync GitHub issues mentioned in commits with issue tracker

## Prompt

Check all commit messages in the current branch (compared to master) for GitHub issue references (e.g., #123, fixes #456, closes #789) and:

1. Verify that all referenced issues exist in the GitHub repository
2. Check if the issues are properly linked in GitHub
3. Identify any commits that mention work related to issues but don't have issue numbers
4. Create a summary report of:
   - Commits with proper issue links
   - Commits missing issue links
   - Issues that might be related but aren't linked

Provide suggestions for improving commit-issue linkage going forward.