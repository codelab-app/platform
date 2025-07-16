# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Codelab is a visual web application builder platform that allows users to create web applications through a drag-and-drop interface. It's similar to Webflow, Framer, or Bubble.io but with a more sophisticated type system and component architecture. The platform targets developers who want visual development with code-level control.

## Technology Stack

- **Monorepo**: Nx workspace with TypeScript
- **Frontend**: React 18+, Next.js 15 with App Router
- **State Management**: MobX + MobX-Keystone
- **UI Framework**: Ant Design + Radix UI components
- **Styling**: Tailwind CSS + styled-components
- **Backend**: NestJS with GraphQL (Apollo Server)
- **Database**: Neo4j with APOC plugins
- **Testing**: Jest (unit/integration) + Playwright (E2E)
- **Infrastructure**: Docker + DigitalOcean + Terraform
- **CI/CD**: CircleCI + pnpm as package manager

## Architecture & Domain Knowledge

_Fetch from: `.claude/documentation/codelab-domain-knowledge.md`_

## Development Guidelines

### Code Style and Conventions

_Fetch from: `.claude/documentation/convention/file-conventions.md`_
_Fetch from: `.claude/documentation/convention/code-style-conventions.md`_

### Project Structure

_Fetch from: `.claude/documentation/convention/project-structure-conventions.md`_
_Fetch from: `.claude/documentation/convention/nx-library-naming-conventions.md`_
_Fetch from: `.claude/documentation/nx-workspace-library-build-process.md`_

### State Management

_Fetch from: `.claude/documentation/convention/state-management-conventions.md`_

### Styling

_Fetch from: `.claude/documentation/convention/styling-conventions.md`_

### GraphQL

_Fetch from: `.claude/documentation/convention/graphql-conventions.md`_

## Environment Setup

1. Node.js 22.14.0+ (use `.nvmrc`)
2. pnpm 9.15.5+ as package manager
3. Neo4j database for local development
4. Docker for containerized services

## Documentation Guidelines

_Fetch from: `.claude/documentation/convention/documentation-conventions.md`_

## Prompting

- Do what has been asked; nothing more, nothing less
- NEVER create files unless they're absolutely necessary for achieving your goal
- ALWAYS prefer editing an existing file to creating a new one
- NEVER proactively create documentation files (\*.md) or README files in the main codebase
- Use `.claude/documentation/` for complex implementation summaries when needed
- Prefer simpler and shorter code rather than optimized code that handles more cases. Don'n automatically add use cases to my original task.

### Type Checking

_Fetch from: `.claude/documentation/convention/type-checking-conventions.md`_

### Linting

#### TypeScript Class Member Ordering

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
10. **Private setters**

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
- Use multi line comment style if more than 1 line
- React components in arrays must have `key` props
- Import `UnknownObjectLike` from `@codelab/shared-abstract-types` instead of using `Record<string, unknown>`

## Git Workflow

### Branch Naming

_Fetch from: `.claude/documentation/convention/git-branch-naming-convention.md`_

### Commit Messages

Never add Generated with [Claude Code](https://claude.ai/code)

_Fetch from: `.claude/documentation/convention/git-commit-conventions.md`_

## Claude fine-tuning

- Be brutally honest, don't be a yes man.
- If I am wrong, point it out bluntly.
- I need honest feedback on my code.
- When creating tasks, DO NOT automatically test them at the end unless explicitly asked to test.
- When creating tasks, DO NOT automatically lint them in an extra step
- When analyzing codebase always use parallel tasks with subagents to speed things up

## OpenMemory Integration

- Search OpenMemory first before responding to any query
- Use `mcp__openmemory__search-memories` tool with the user's query to check for relevant stored information
- Review any found memories about user preferences, past discussions, and project context
- Only after checking memory, formulate your response incorporating the found context
- When new important information is shared, use `mcp__openmemory__add-memory` to store it
- Keep in mind Github discussions should have the most weight, followed by Notion documnetation wiki, then followed by Github issues

## Research and Information Lookup

- Use Perplexity MCP (`mcp__perplexity__`) whenever you have any question that requires external information
- Use perplexity mcp instead of web search
- Perplexity provides faster, more summarized results ideal for answering questions
- Only use web search as a fallback if Perplexity is unavailable or fails

## Documentation

When I say read documentation it's regarding: _Fetch from: `.claude/documentation`_

### OpenMemory Sync Documentation

For the data structure and implementation details of syncing various sources (GitHub, Notion) to OpenMemory:
_Fetch from: `.claude/documentation/openmemory-sync-documentation.md`_

## GitHub Issue Context

- When I say "update issue" or "create issue regarding this", I'm referring to GitHub issues
- Use the `mcp__github__` tools to interact with GitHub issues
- Default to the current repository unless specified otherwise
- **IMPORTANT**: Only create GitHub issues for repositories under the `codelab-app` organization. Never create issues for any other organization or personal repositories

## Claude Code Custom Commands

- Custom slash commands for Claude Code should be stored in `.claude/commands/` directory
- Each command should be a markdown file with the command name as the filename (e.g., `commit.md` for `/commit`)
- Commands should include usage instructions, implementation steps, and any relevant notes
