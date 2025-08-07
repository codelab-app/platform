# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Codelab is a visual web application builder platform that allows users to create web applications through a drag-and-drop interface. It's similar to Webflow, Framer, or Bubble.io but with a more sophisticated type system and component architecture. The platform targets developers who want visual development with code-level control.

## Architecture & Domain Knowledge

_Fetch from: `.claude/documentation/codelab-domain-knowledge.md`_

## Development Guidelines

<!-- ### Code Style and Conventions

_Fetch from: `.claude/documentation/convention/file-conventions.md`_
_Fetch from: `.claude/documentation/convention/code-style-conventions.md`_ -->

### Project Structure

_Fetch from: `.claude/documentation/convention/project-structure-conventions.md`_
_Fetch from: `.claude/documentation/convention/nx-library-naming-conventions.md`_
_Fetch from: `.claude/documentation/nx-workspace-library-build-process.md`_

<!-- ### State Management

_Fetch from: `.claude/documentation/convention/state-management-conventions.md`_ -->

### Styling

_Fetch from: `.claude/documentation/convention/styling-conventions.md`_

<!-- ### GraphQL

Load when needed: `Read .claude/documentation/convention/graphql-conventions.md` -->

## Documentation Guidelines

Load when needed: `Read .claude/documentation/convention/documentation-conventions.md`

## Prompting

- Do what has been asked; nothing more, nothing less
- NEVER create files unless they're absolutely necessary for achieving your goal
- ALWAYS prefer editing an existing file to creating a new one
- NEVER proactively create documentation files (\*.md) or README files in the main codebase
- Use `.claude/documentation/` for complex implementation summaries when needed
- Prefer simpler and shorter code rather than optimized code that handles more cases. Don'n automatically add use cases to my original task.

### Linting

<!-- #### TypeScript Class Member Ordering

The codebase enforces strict member ordering for TypeScript classes via `@typescript-eslint/member-ordering`:

1. **Public static fields and methods** (grouped together)
2. **Getters** (`get` accessors)
3. **Public fields**
4. **Public methods**
5. **Protected members** (fields, getters, setters, methods - grouped together)
6. **Private static methods**
7. **Private static fields**
8. **Private fields and methods** (grouped together)
9. **Private getters**
10. **Private setters** -->

Within each group, members are ordered alphabetically.

**Important**: Constructor should be placed after field declarations but before other methods.

#### Ant Design Icon Imports

Icons from Ant Design must be imported individually from their specific paths:

```typescript
// ❌ Wrong
import { EyeOutlined } from '@ant-design/icons'

// ✅ Correct
import EyeOutlined from '@ant-design/icons/lib/icons/EyeOutlined'
```

#### Other Linting Rules

- No inline comments are allowed (use separate line comments, put before the code)
- Don't remove comment simply for the lint error
- Use multi line comment style if more than 1 line
- React components in arrays must have `key` props
- Import `UnknownObjectLike` from `@codelab/shared-abstract-types` instead of using `Record<string, unknown>`

## Git Workflow

### Branch Naming

Load when needed: `Read .claude/documentation/convention/git-branch-naming-convention.md`

### Commit Messages

Never add Generated with [Claude Code](https://claude.ai/code)

Load when needed: `Read .claude/documentation/convention/git-commit-conventions.md`

## Claude fine-tuning

- Be brutally honest, don't be a yes man.
- If I am wrong, point it out bluntly.
- I need honest feedback on my code.
- When creating tasks, DO NOT automatically test them at the end unless explicitly asked to test.
- When creating tasks, DO NOT automatically lint them in an extra step
- When analyzing codebase always use parallel tasks with subagents to speed things up

## Research and Information Lookup

- Use Perplexity MCP (`mcp__perplexity__`) whenever you have any question that requires external information
- Use perplexity mcp instead of web search
- Perplexity provides faster, more summarized results ideal for answering questions
- Only use web search as a fallback if Perplexity is unavailable or fails

## Documentation

When I say read documentation it's regarding: Use the CLI tool to read from `.claude/documentation` directory

## GitHub Issue Context

- When I say "update issue" or "create issue regarding this", I'm referring to GitHub issues
- Use the `mcp__github__` tools to interact with GitHub issues
- Default to the current repository unless specified otherwise
- **IMPORTANT**: Only create GitHub issues for repositories under the `codelab-app` organization. Never create issues for any other organization or personal repositories
