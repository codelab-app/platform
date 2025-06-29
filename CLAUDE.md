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
pnpm nx run-many --target=tsc-check  # Type checking

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
pnpm nx lint frontend-application-admin  # Lint specific project

# Run tasks across multiple projects
pnpm nx run-many --target=build --all
pnpm nx run-many --target=test --parallel=3
```

## Architecture & Domain Knowledge

@import .claude/documentation/codelab-domain-knowledge.md

## Development Guidelines

### Code Style and Conventions

@import .claude/documentation/file-conventions.md

Key conventions:

- File naming: PascalCase for components, kebab-case for services
- Class member ordering: [@typescript-eslint/member-ordering](https://typescript-eslint.io/rules/member-ordering/)
- Named exports only (no default exports)
- Use `import type` for type imports
- Arrow functions preferred over function declarations

### Project Structure Rules

1. Code is organized in an Nx monorepo with clear boundaries
2. Frontend code lives in `libs/frontend/`, backend in `libs/backend/`
3. Shared code goes in `libs/shared/`
4. Each domain has parallel modules across application/domain layers
5. Main web app routes are in `apps/web/app/(dashboard)/(authenticated)/`

@import .claude/documentation/nx-library-naming-conventions.md

### Directory Conventions

- Each module follows the pattern: `{layer}/{domain}/{service-type}/`
- Use barrel exports (`index.ts`) for clean public APIs
- Separate concerns: `/models`, `/services`, `/repositories`, `/use-cases`
- Test files use `.spec.ts` (unit) or `.i.spec.ts` (integration)

### State Management Patterns

- Use MobX stores for reactive state management
- Domain stores contain business logic
- Application stores handle UI state
- Context providers inject dependencies
- Separate data fetching from presentation

### Styling Conventions

- Use Tailwind CSS for utility-first styling
- Styled-components for component-specific styles
- Follow Atomic Design for component organization
- Use CVA (Class Variance Authority) for type-safe variants

### GraphQL Patterns

- Generate types from schema: `pnpm codegen`
- Use fragments for modular queries
- Separate HTTP (queries/mutations) from WebSocket (subscriptions)
- Follow operation naming conventions

## Environment Setup

1. Node.js 22.14.0+ (use `.nvmrc`)
2. pnpm 9.15.5+ as package manager
3. Neo4j database for local development
4. Docker for containerized services

## Documentation Guidelines

When creating documentation for complex implementations that span multiple files:

- Save documentation summaries in `.claude/documentation/` directory
- Use descriptive filenames like `feature-name-implementation.md`
- This keeps implementation docs separate from the main codebase
- Only create these when the implementation is complex or non-obvious
- Examples: multi-file refactors, new architectural patterns, debugging solutions

## Important Reminders

- Do what has been asked; nothing more, nothing less
- NEVER create files unless they're absolutely necessary for achieving your goal
- ALWAYS prefer editing an existing file to creating a new one
- NEVER proactively create documentation files (\*.md) or README files in the main codebase
- Use `.claude/documentation/` for complex implementation summaries when needed

## Git Workflow

### Branch Naming Convention

All branches must follow this format: `<type>/<issue-number>-<short-description>`

Allowed types:

- `feat/` - New features or enhancements
- `fix/` - Bug fixes
- `refactor/` - Code refactoring without changing functionality
- `test/` - Adding or updating tests

Examples:

- `feat/3736-debug-env-service-tracking`
- `fix/3742-login-validation-error`
- `refactor/3755-simplify-repository-pattern`
- `test/3761-add-user-service-tests`

See `.claude/documentation/git-branch-naming-convention.md` for detailed guidelines.

## Git Commit Messages

- Don't add "Co-Authored-By: Claude <noreply@anthropic.com>" to commit messages
- Don't add "🤖 Generated with [Claude Code](https://claude.ai/code)" to commit messages
- Keep commit messages clean and focused on the changes made

## Claude finetuning

- Be brutally honest, don't be a yes man.
- If I am wrong, point it out bluntly.
- I need honest feedback on my code.

## OpenMemory Integration

- **ALWAYS** search OpenMemory first before responding to any query
- Use `mcp__openmemory__search-memories` tool with the user's query to check for relevant stored information
- Review any found memories about user preferences, past discussions, and project context
- Only after checking memory, formulate your response incorporating the found context
- When new important information is shared, use `mcp__openmemory__add-memory` to store it

## GitHub Issue Context

- When I say "update issue" or "create issue regarding this", I'm referring to GitHub issues
- Use the `mcp__github__` tools to interact with GitHub issues
- Default to the current repository unless specified otherwise
