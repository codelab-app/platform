# Project Structure Conventions

## Project Structure Rules

1. Code is organized in an Nx monorepo with clear boundaries
2. Frontend code lives in `libs/frontend/`, backend in `libs/backend/`
3. Shared code goes in `libs/shared/`
4. Each domain has parallel modules across application/domain layers
5. Main web app routes are in `apps/web/app/(dashboard)/(authenticated)/`

## Directory Conventions

- Each module follows the pattern: `{layer}/{domain}/{service-type}/`
- Use barrel exports (`index.ts`) for clean public APIs
- Separate concerns: `/models`, `/services`, `/repositories`, `/use-cases`
- Test files use `.spec.ts` (unit) or `.i.spec.ts` (integration)