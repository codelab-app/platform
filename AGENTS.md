# Repository Guidelines

## Project Structure & Module Organization
- Monorepo managed by Nx (pnpm). Key roots:
  - `apps/` — runnable projects (e.g., `web` Next.js, `api` NestJS, `sites`, `demo`, `web-e2e`).
  - `libs/` — shared TypeScript libraries and tooling.
  - `infra/` — Terraform, Packer, deployment assets.
  - `scripts/` — dev/CI utilities; lint staged config, Caddy, Docker helpers.
  - `types/`, `examples/`, `data/` — shared types, samples, fixtures.

## Build, Test, and Development Commands
- `pnpm serve` — run `api` and `web` locally via Nx.
- `pnpm serve:sites` — run `api`, `web`, and `sites` together.
- `pnpm build` — build all projects.
- `pnpm test` — run all tests (Nx orchestrated).
- `pnpm test.unit` / `pnpm test.integration` — targeted unit/integration test sets.
- `pnpm e2e` — Playwright E2E for `apps/web-e2e` (uses test config).
- `pnpm lint` / `pnpm format` — lint and format sources.
- `pnpm dep-graph` — live dependency graph.
- Node >= `22.14`, pnpm >= `9`. Copy `.env.example` → `.env` where needed.

## Coding Style & Naming Conventions
- 2-space indentation, UTF-8, trim trailing whitespace (`.editorconfig`).
- TypeScript throughout; prefer `camelCase` vars/functions, `PascalCase` React components, `kebab-case` filenames.
- GraphQL files: kebab-case before extension (see `.ls-lint.yml`).
- Linting via flat `eslint.config.mjs`; formatting with Prettier. Fix locally with `pnpm lint` and `pnpm format`.

## Testing Guidelines
- Unit/Integration: Jest (project-level configs in `apps/*`/`libs/*`). Name tests `*.spec.ts[x]` near code or under `__tests__`.
- E2E: Playwright in `apps/web-e2e` with fixtures and specs under `src/`.
- Run before pushing: `pnpm test`, `pnpm e2e` (when UI flows change). Keep tests deterministic and fast.

## Commit & Pull Request Guidelines
- Conventional Commits enforced (Commitizen: `pnpm commit`). Types/scopes defined in `.cz-config.js`.
- Branch names validated (see `package.json:validate-branch-name`). Example: `feat/3736-debug-env-service-tracking`.
- Pre-commit hooks run lint/commitlint (Husky + lint-staged). Ensure local checks pass.
- PRs: clear description, link issues (`#1234`), screenshots for UI changes, and note breaking changes. CI must be green.

## Security & Configuration
- Never commit secrets. Use `.env.example` templates (e.g., `apps/web-e2e/.env.example`, `apps/sites/.env.example`).
- For local mocks, MSW worker assets live under `apps/web/public`.
