# Git Branch Naming Convention

## Overview

All feature branches in this project follow a consistent naming pattern that includes the issue number and a brief description of the work being done.

## Branch Naming Format

```
<type>/<issue-number>-<short-description>
```

## Allowed Branch Types

- **`feat/`** - New features or enhancements
- **`fix/`** - Bug fixes
- **`refactor/`** - Code refactoring without changing functionality
- **`test/`** - Adding or updating tests

## Format Rules

1. **Type prefix**: Must be one of the allowed types above
2. **Issue number**: Required, references the GitHub issue
3. **Description**: Short, hyphen-separated words describing the change
4. **Case**: All lowercase
5. **Separators**: Use hyphens (-) not underscores (_)

## Examples

### Feature Branches
```bash
feat/3736-debug-env-service-tracking
feat/3742-add-user-profile-page
feat/3755-implement-dark-mode
```

### Bug Fix Branches
```bash
fix/3761-login-validation-error
fix/3768-memory-leak-dashboard
fix/3772-responsive-layout-mobile
```

### Refactor Branches
```bash
refactor/3780-simplify-repository-pattern
refactor/3785-extract-common-utilities
refactor/3790-update-dependency-injection
```

### Test Branches
```bash
test/3795-add-user-service-tests
test/3798-integration-tests-auth
test/3801-e2e-checkout-flow
```

## Best Practices

1. **Keep descriptions short**: Aim for 2-4 words
2. **Be specific**: "fix-login" is better than "fix-bug"
3. **Use imperative mood**: "add-feature" not "added-feature"
4. **Reference the issue**: Always include the issue number
5. **Delete after merge**: Clean up merged branches

## Common Mistakes to Avoid

❌ `feature/add-new-feature` - Missing issue number
❌ `feat/3736_debug_env_tracking` - Use hyphens, not underscores
❌ `FEAT/3736-debug-tracking` - Use lowercase
❌ `3736-debug-tracking` - Missing type prefix
❌ `feat/debug-env-tracking` - Missing issue number
❌ `bugfix/3736-fix-error` - Use 'fix/' not 'bugfix/'

## Creating a New Branch

```bash
# From master/main branch
git checkout -b feat/3736-debug-env-service-tracking

# Or explicitly from origin/master
git checkout -b fix/3742-login-validation origin/master
```

## Git Commands Reference

```bash
# Create and switch to new branch
git checkout -b <branch-name>

# List all branches
git branch -a

# Delete local branch
git branch -d <branch-name>

# Delete remote branch
git push origin --delete <branch-name>
```

## Integration with Tools

This naming convention works well with:
- GitHub's issue linking (automatically links to issue #3736)
- CI/CD pipelines that parse branch names
- Automated changelog generation
- Project management tools

## Questions?

If you're unsure about naming, check existing branches or ask the team. Consistency is more important than perfection.