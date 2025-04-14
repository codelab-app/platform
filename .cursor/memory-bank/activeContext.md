# Project Structure: No-Code UI Builder with GraphQL Integration

_Version: 1.0_
_Created: 2023-05-07_
_Last Updated: 2023-05-07_
_Current RIPER Mode: NONE_

## Project Organization

The project follows a clean architecture approach with a monorepo structure managed by Nx. The codebase is organized into two main directories:

### Apps Directory

Contains deployable applications:

- `web/` - The main Next.js web application for the no-code UI builder
- `api/` - The NestJS backend application exposing the GraphQL API
- `web-e2e/` - End-to-end tests for the web application using Playwright
- `landing/` - Marketing site
- `sites/` - Site hosting capabilities
- `demo/` - Demonstration projects
- `cli/` - Command-line interface tools
- `design-system/` - Component showcase

### Libs Directory

Contains shared libraries organized by layer and domain:

#### Frontend Libraries

- `frontend/application/` - Application services for the UI builder
- `frontend/domain/` - Domain models and business logic for UI components
- `frontend/presentation/` - Presentational components
- `frontend/shared/` - Shared utilities and helpers for frontend
- `frontend/infra/` - Infrastructure code for frontend
- `frontend/test/` - Testing utilities for frontend
- `frontend/cui/` - Composite UI components
- `frontend/abstract/` - Abstract interfaces and types

#### Backend Libraries

- `backend/application/` - Application services for the backend
- `backend/domain/` - Domain models and business logic
- `backend/shared/` - Shared utilities and helpers for backend
- `backend/infra/` - Infrastructure code including Neo4j and GraphQL integration
- `backend/test/` - Testing utilities for backend
- `backend/abstract/` - Abstract interfaces and types
- `backend/data/` - Data access layer

#### Shared Libraries

- `shared/` - Code shared between frontend and backend
- `external/` - Integrations with external services
- `tools/` - Development and build tools

## Current Focus

Implementing the no-code UI builder with the component system that supports atoms (UI framework components) and composites (custom DOM trees) with GraphQL data binding.

## Recent Changes

- Initial project setup with Nx monorepo
- GraphQL schema generation from Neo4j
- Basic component registry implementation

## Active Decisions

- Component model implementation: In progress
- Props binding system design: In progress
- Data fetching strategy: Decided to use Next.js fetch with cache invalidation

## Next Steps

1. Complete component registry implementation
2. Develop the props binding system
3. Implement the UI builder interface
4. Set up the GraphQL integration layer
5. Develop state management tracing tools

## Current Challenges

- Complex domain modeling with Neo4j
- MobX state management traceability
- Component nesting and props passing
- GraphQL schema generation from Neo4j model

## Implementation Progress

- [✓] Project setup with Nx
- [✓] Basic component definitions
- [ ] Component registry
- [ ] Props binding system
- [ ] UI builder interface
- [ ] GraphQL integration
- [ ] State management service
- [ ] Live preview engine
- [ ] Serverless function builder (future)

---

_This document captures the current state of work and immediate next steps._
