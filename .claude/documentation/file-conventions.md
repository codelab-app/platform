# File Conventions and Code Organization

This document outlines the file naming conventions and code organization patterns for the Codelab platform.

## File Naming Conventions

### TypeScript Files (.ts)
- **General files**: `kebab-case` (e.g., `user-service.ts`, `auth-guard.ts`)
- **Interfaces/Types**: `.interface.ts` or `.type.ts` suffix
- **Domain files**: `.schema.ts`, `.repository.ts`, `.service.ts`, `.module.ts`
- **CQRS patterns**: `.command.ts`, `.query.ts`, `.handler.ts`
- **GraphQL**: `.fragment.ts`, `.query.ts`, `.mutation.ts`

### React Components (.tsx)
- **Components**: `PascalCase` (e.g., `UserProfile.tsx`)
- **Hooks**: `camelCase` with `.hook.tsx` suffix (e.g., `useAuth.hook.tsx`)
- **Pages**: Follow Next.js conventions

### Test Files
- **Unit tests**: `.spec.ts` or `.spec.tsx`
- **Integration tests**: `.i.spec.ts`
- **E2E tests**: `.e2e.ts`

## Code Organization

### Class Member Ordering
Follow [@typescript-eslint/member-ordering](https://typescript-eslint.io/rules/member-ordering/):

1. Instance properties (public → protected → private)
2. Constructor
3. Public methods (alphabetical order)
4. Static properties (alphabetical order within visibility: public → private)
5. Static methods (alphabetical order within visibility: public → private)
6. Protected methods (alphabetical order)
7. Private methods (alphabetical order)

**Important**: 
- Within each visibility group (public/private/protected), methods are ordered alphabetically.
- Static members come after instance members and public methods.
- The order is: instance properties → constructor → public methods → static members → protected methods → private methods.

### Import Organization
1. Node.js built-ins
2. External packages
3. `@codelab/*` imports
4. Relative imports
5. Type imports (using `import type`)

## TypeScript Patterns

### Naming Conventions
- **Interfaces**: Prefix with `I` (e.g., `IUserService`)
- **Types**: Descriptive names without prefix (e.g., `UserRole`)
- **Enums**: Singular PascalCase (e.g., `UserStatus`)
- **Constants**: `UPPER_SNAKE_CASE`

### Export Patterns
- Use named exports only (no default exports)
- Use barrel exports (`index.ts`) for public APIs
- Separate type exports: `export type * from './interfaces'`

## Key Linting Rules

- **@typescript-eslint/array-type**: Use `Array<T>` syntax
- **@typescript-eslint/consistent-type-imports**: Use `import type` for types
- **@typescript-eslint/no-explicit-any**: Avoid `any`, use `unknown` or specific types
- **prefer-arrow/prefer-arrow-functions**: Use arrow functions
- **id-length**: Min 2 characters (exceptions: `_`, `a`, `b`, `$`, `z`, `i`)

For complete ESLint rule documentation, see: https://typescript-eslint.io/rules/

## Directory Structure

```
libs/{layer}/{domain}/src/
├── models/
├── services/
├── repositories/
├── use-cases/
└── index.ts (barrel export)
```

## Common Anti-patterns to Avoid

- Don't use `any` type
- Don't use default exports
- Don't use `function` declarations (use arrow functions)
- Don't mix file naming conventions
- Don't skip barrel exports
- Don't use relative imports across module boundaries