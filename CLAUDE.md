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

## Architecture Overview

### Repository Structure

```
apps/
├── web/          # Main web application (Next.js)
├── api/          # Backend API (NestJS + GraphQL)
├── sites/        # Multi-tenant site hosting
├── landing/      # Marketing landing page
├── cli/          # Custom CLI tools
└── web-e2e/      # E2E test suite

libs/
├── frontend/     # Frontend libraries
│   ├── application/     # Use cases and application services
│   ├── domain/         # Business logic and domain models
│   ├── presentation/   # UI components and views
│   └── infra/         # Infrastructure (state, API clients)
├── backend/      # Backend libraries
│   ├── application/    # Application services
│   ├── domain/        # Domain models and business logic
│   └── infra/         # Infrastructure adapters
├── shared/       # Code shared between frontend/backend
└── tools/        # Development tools and utilities
```

### Frontend Architecture

- **Clean Architecture** with Domain-Driven Design
- **State Management**: MobX + MobX-Keystone for reactive domain models
- **UI Components**: Atomic Design pattern (Atoms → Molecules → Organisms)
- **Data Layer**: GraphQL with Apollo Client (HTTP + WebSocket)
- **Routing**: Next.js App Router with custom MobX router service

### Backend Architecture

- **Domain Entities**: User, App, Page, Element, Atom, Component, Store, Action, Resource
- **GraphQL API**: Apollo Server with Neo4j integration
- **Database**: Neo4j graph database with @neo4j/graphql
- **Authentication**: Auth0 integration
- **Type System**: Sophisticated type system for visual builder components

### Key Domain Concepts

- **App**: Web applications created by users
- **Page**: Individual pages within an app
- **Element**: UI building blocks forming tree structures
- **Atom**: Reusable UI components (HTML, React components)
- **Component**: Custom user-created components
- **Store**: Application state and data management
- **Action**: API calls and custom JavaScript code execution
- **Resource**: External data sources and APIs

## Development Guidelines

### Project Structure Rules

1. Code is organized in an Nx monorepo with clear boundaries
2. Frontend code lives in `libs/frontend/`, backend in `libs/backend/`
3. Shared code goes in `libs/shared/`
4. Each domain has parallel modules across application/domain layers
5. Main web app routes are in `apps/web/app/(dashboard)/(authenticated)/`

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

## Common Workflows

### Adding a New Feature

1. Create domain models in `libs/{layer}/domain/{feature}/`
2. Implement application services in `libs/{layer}/application/{feature}/`
3. Add UI components in `libs/frontend/presentation/`
4. Wire up with MobX stores and context providers
5. Add routes in `apps/web/app/(dashboard)/(authenticated)/`

### Database Changes

1. Update Neo4j schema and constraints
2. Run `pnpm codegen` to regenerate GraphQL types
3. Update domain models and repositories
4. Run integration tests with Neo4j

### Running Tests

- Unit tests run in isolation with mocked dependencies
- Integration tests require Neo4j database
- E2E tests run against full application stack
- Use `pnpm test.unit` for fast feedback loop

### CI/CD Pipeline

- CircleCI runs on pull requests
- Tests: lint → unit → integration → E2E
- Builds: apps → Docker images → deployment
- Terraform manages infrastructure as code

## Important Files

- `nx.json`: Nx workspace configuration and build targets
- `package.json`: Dependencies and npm scripts
- `tsconfig.base.json`: TypeScript configuration with path mappings
- `schema.graphql`: GraphQL schema definition
- `.circleci/config.yml`: CI/CD pipeline configuration

## Environment Setup

1. Node.js 22.14.0+ (use `.nvmrc`)
2. pnpm 9.15.5+ as package manager
3. Neo4j database for local development
4. Docker for containerized services

When working with this codebase, prioritize understanding the domain models and business logic before making changes. The visual builder's complexity requires careful consideration of the element tree structure and type system.