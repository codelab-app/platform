# GitHub Issue Creation Guidelines

When creating or updating GitHub issues:

## What NOT to Include

### Files Changed Section
- **DO NOT** list the files changed in the issue description
- The pull request automatically tracks and displays all file changes
- Adding a "Files Changed" section is redundant and unnecessary

## What to Include

1. **Clear problem statement** - What issue is being addressed
2. **Solution approach** - High-level description of the fix/feature
3. **Testing** - How the changes were/will be tested
4. **Related issues** - Links to related issues if applicable
5. **Breaking changes** - Note if the changes break existing functionality

## Example Issue Description

```markdown
## Problem
The pre-commit hook was using a custom shell script that wasn't properly validating branch names according to our conventions.

## Solution
Replaced the custom script with the `validate-branch-name` npm package and added comprehensive Jest tests to ensure branch naming conventions are enforced.

## Testing
- Added unit tests in `.husky/pre-commit.spec.ts`
- Tested with various valid and invalid branch names
- Verified hooks work correctly during git operations
```

Note: The PR will automatically show all modified files with diffs, so there's no need to duplicate this information in the issue.