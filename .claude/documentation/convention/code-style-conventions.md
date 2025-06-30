# Code Style Conventions

## General Principles
- File naming: PascalCase for components, kebab-case for services
- Class member ordering: [@typescript-eslint/member-ordering](https://typescript-eslint.io/rules/member-ordering/)
- Named exports only (no default exports)
- Use `import type` for type imports
- Arrow functions preferred over function declarations

## Code Comments
- **IMPORTANT**: DO NOT ADD ***ANY*** COMMENTS unless asked
- Only add comments when explicitly requested by the user

## Security Best Practices
- Always follow security best practices
- Never introduce code that exposes or logs secrets and keys
- Never commit secrets or keys to the repository