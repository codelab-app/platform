# Codelab Domain Knowledge

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

When working with this codebase, prioritize understanding the domain models and business logic before making changes. The visual builder's complexity requires careful consideration of the element tree structure and type system.