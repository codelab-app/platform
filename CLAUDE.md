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

## Development Commands

### Common Development Tasks

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm e2e:web        # Start web app in test mode
pnpm e2e:api        # Start API in test mode

# Build applications
pnpm build          # Build all applications
pnpm nx build web   # Build specific app
pnpm nx build api   # Build API app

# Testing
pnpm test.unit      # Run unit tests (parallel)
pnpm test.integration  # Run integration tests (sequential)
pnpm e2e           # Run E2E tests

# Linting and type checking
pnpm lint          # Run ESLint on all projects

# Type checking individual projects
pnpm nx run <project-name>:tsc-check      # Check TypeScript types for source files
pnpm nx run <project-name>:tsc-check:spec # Check TypeScript types for test files

# Code generation
pnpm codegen       # Generate GraphQL types and schemas

# CLI utilities
pnpm cli           # Access custom CLI tools
```

### Nx Commands

```bash
# Run specific project tasks
pnpm nx <target> <project>

# Examples
pnpm nx serve web           # Start web development server
pnpm nx test backend-domain-app  # Run tests for specific library

# When linting always use subagent so we don't block the main thread
# This way we can run this task in parallel in the background
pnpm nx lint frontend-application-admin  # Lint specific project

# Run tasks across multiple projects
pnpm nx run-many --target=build --all
pnpm nx run-many --target=test --parallel=3
```

## Architecture & Domain Knowledge

@import .claude/documentation/codelab-domain-knowledge.md

## Development Guidelines

### Code Style and Conventions

@import .claude/documentation/convention/file-conventions.md
@import .claude/documentation/convention/code-style-conventions.md

### Project Structure

@import .claude/documentation/convention/project-structure-conventions.md
@import .claude/documentation/convention/nx-library-naming-conventions.md
@import .claude/documentation/nx-workspace-library-build-process.md

### State Management

@import .claude/documentation/convention/state-management-conventions.md

### Styling

@import .claude/documentation/convention/styling-conventions.md

### GraphQL

@import .claude/documentation/convention/graphql-conventions.md

## Environment Setup

1. Node.js 22.14.0+ (use `.nvmrc`)
2. pnpm 9.15.5+ as package manager
3. Neo4j database for local development
4. Docker for containerized services

## Documentation Guidelines

@import .claude/documentation/convention/documentation-conventions.md

## Important Reminders

- Do what has been asked; nothing more, nothing less
- NEVER create files unless they're absolutely necessary for achieving your goal
- ALWAYS prefer editing an existing file to creating a new one
- NEVER proactively create documentation files (\*.md) or README files in the main codebase
- Use `.claude/documentation/` for complex implementation summaries when needed

### Type Checking

@import .claude/documentation/convention/type-checking-conventions.md

## Git Workflow

### Branch Naming

@import .claude/documentation/convention/git-branch-naming-convention.md

### Commit Messages

@import .claude/documentation/convention/git-commit-conventions.md

## Claude fine-tuning

- Be brutally honest, don't be a yes man.
- If I am wrong, point it out bluntly.
- I need honest feedback on my code.

## OpenMemory Integration

- **ALWAYS** search OpenMemory first before responding to any query
- Use `mcp__openmemory__search-memories` tool with the user's query to check for relevant stored information
- Review any found memories about user preferences, past discussions, and project context
- Only after checking memory, formulate your response incorporating the found context
- When new important information is shared, use `mcp__openmemory__add-memory` to store it
- Keep in mind Github discussions should have the most weight, followed by Notion documnetation wiki, then followed by Github issues

## Documentation

When I say read documentation it's regarding @import .claude/documentation

### OpenMemory Sync Documentation

For the data structure and implementation details of syncing various sources (GitHub, Notion) to OpenMemory:
@import .claude/documentation/openmemory-sync-documentation.md

## GitHub Issue Context

- When I say "update issue" or "create issue regarding this", I'm referring to GitHub issues
- Use the `mcp__github__` tools to interact with GitHub issues
- Default to the current repository unless specified otherwise
- **IMPORTANT**: Only create GitHub issues for repositories under the `codelab-app` organization. Never create issues for any other organization or personal repositories
