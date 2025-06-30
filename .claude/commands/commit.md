# /commit

Performs a git commit with automatic message generation based on changes.

## Usage

```
/commit
```

## Steps

1. Check git status to see what files have changes
2. Review staged and unstaged changes with git diff
3. Check recent commit history for style consistency
4. Stage all changes (if any unstaged)
5. Generate and create commit with proper formatting:
   - Follows conventional commit format (feat/fix/refactor/etc)
   - Wraps body lines at 100 characters
   - Includes Claude Code attribution

## Implementation

```bash
# Run in parallel to gather information
git status
git diff --cached
git diff
git log -5 --oneline

# Stage any unstaged changes
git add -A

# Create commit with proper message format
git commit -m "$(cat <<'EOF'
<type>: <concise description>

<detailed explanation wrapped at 100 chars>
EOF
)"

# Verify commit succeeded
git status
```

## Notes

- Automatically handles pre-commit hooks and linting
- Wraps commit body at 100 characters to comply with commitlint
- Only commits when there are actual changes
- Does not push to remote unless explicitly requested
