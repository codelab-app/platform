# Git Commit Message Conventions

- Don't add "Co-Authored-By: Claude <noreply@anthropic.com>" to commit messages
- Don't use no-verify to skip the commit hooks
- Also don't remove comments to fix lint issues, don't remove comments unless asked
- Don't add "🤖 Generated with [Claude Code](https://claude.ai/code)" to commit messages
- Keep commit messages clean and focused on the changes made
- The project uses Commitizen with a custom configuration (see `.cz-config.js`)
- To close issues in commit messages, use the footer section with format: `CLOSES: #123`
- The commitizen config supports various commit types (feat, fix, docs, etc.) and scope selection
