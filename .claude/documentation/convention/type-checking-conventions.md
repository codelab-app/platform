# Type Checking Conventions

## Type Checking After Changes

- **ALWAYS** run type checking after modifying TypeScript files
- For source file changes: `pnpm nx run <project-name>:tsc-check`
- For test file changes (*.spec.ts): `pnpm nx run <project-name>:tsc-check:spec`
- This ensures type safety and catches errors early