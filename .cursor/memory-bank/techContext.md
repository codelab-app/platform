# Technical Context: No-Code UI Builder with GraphQL Integration

_Version: 1.0_
_Created: 2023-05-07_
_Last Updated: 2023-05-07_

## Technology Stack

- Frontend:

  - React 19.x with Next.js 15.x
  - Ant Design 5.x for UI components
  - MobX 6.x and mobx-keystone 1.x for state management
  - Next.js fetch API for data fetching with built-in cache invalidation
  - TypeBox for schema validation
  - Uniform for JSON schema forms

- Backend:

  - NestJS for API and server functionality
  - Neo4j database with Neo4j GraphQL schema generation
  - TypeBox for schema validation

- Infrastructure:
  - Serverless functions (future feature)

## Development Environment Setup

- Node.js v22+ (as specified in .nvmrc)
- pnpm v9.0.0+ for package management
- Docker for local development
- Nx for monorepo management

### Getting Started

1. Clone the repository
2. Install Node.js v22+ (use nvm: `nvm install` to use version from .nvmrc)
3. Install pnpm: `npm install -g pnpm@9`
4. Install dependencies: `pnpm install`
5. Start Docker containers: `pnpm docker:up`
6. Start the development servers:
   - Web: `nx serve web`
   - API: `nx serve api`
   - Both for E2E: `pnpm e2e:web` and `pnpm e2e:api`

### Environment Configuration

1. Copy `.env.example` to `.env` for development
2. Copy `.env.test.example` to `.env.test` for testing
3. Configure required environment variables:
   - Database connection details
   - Auth0 credentials
   - API endpoints
   - Feature flags

### Docker Setup

- Local development containers are managed via `docker:up` script
- Production-like environment available via `docker:prod:up` script
- Database migrations run automatically during container startup

### Development Workflow

1. Generate GraphQL code: `pnpm codegen`
2. Run tests: `pnpm test`
3. Run linting: `pnpm lint`
4. Build for production: `pnpm build`
5. Create a new commit: `pnpm commit` (uses commitizen)

## Dependencies

- @nestjs/\* - Core backend framework
- @neo4j/graphql - GraphQL schema generation from Neo4j
- mobx / mobx-keystone - State management
- react / next - UI framework
- ant-design - Component library
- @dnd-kit/\* - Drag and drop functionality
- @sinclair/typebox - Schema validation
- react-hook-form - Form handling

## Technical Constraints

- Complex domain modeling requires sophisticated state management
- MobX state management traceability is challenging
- Deeply nested component structures require clear data flow mechanisms
- Need for optimized performance with complex UI trees

## Build and Deployment

- Build Process: Nx-based build pipeline

  - Command: `nx run-many --all --target=build`
  - Output: `dist/` directory containing build artifacts

- Deployment Procedure:

  - CircleCI automated deployment pipeline
  - Containerized deployment using Docker
  - Infrastructure managed with Terraform (in `infra/terraform/`)

- CI/CD:
  - CircleCI configuration in `.circleci/` directory
  - Automated testing on PR submission
  - Deployment on merge to main branch

## Testing Approach

- Unit Testing:

  - Jest for unit tests
  - Command: `pnpm test.unit`
  - Coverage tracking in `coverage/` directory

- Integration Testing:

  - React Testing Library for component testing
  - Command: `pnpm test.integration`
  - Focused on component integration

- E2E Testing:
  - Playwright for end-to-end testing
  - Command: `pnpm e2e`
  - Tests in `apps/web-e2e/` directory

## Key Technical Decisions

- Use of MobX for state management due to its reactivity model
- Neo4j as database for complex domain relationships
- GraphQL for flexible data fetching and schema definition
- Direct use of Next.js fetch API instead of Apollo Client for better integration with Next.js cache invalidation
- Ant Design as primary component library for rich UI elements
- TypeBox for schema validation to ensure type safety
- Nx monorepo for code organization and build management
- Docker-based development environment for consistency

---

_This document describes the technologies used in the project and how they're configured._
