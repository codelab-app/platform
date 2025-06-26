# Nx Library Naming Conventions

## Library Structure
- **Path**: libs/{layer}/{domain}/{adapter}/{feature}
  - Example: `libs/backend/infra/adapter/dataloader`

## Library Naming
- **Project Name**: {layer}-{domain}-{adapter}-{feature}
  - Example: `backend-infra-adapter-dataloader`
  - **Important**: The project name in `project.json` must match this convention

## Import Path
- **Import Path**: @codelab/{project-name}
  - Example: `@codelab/backend-infra-adapter-dataloader`

## Project Configuration
When generating a library:
1. The `name` field in `project.json` should be the full project name (e.g., `backend-infra-adapter-dataloader`)
2. Always include a `lint` target in the `targets` section:
   ```json
   "lint": {
     "executor": "@nx/eslint:lint"
   }
   ```

## Generator Command Pattern
```bash
pnpm nx generate @nx/node:library {project-name} \
  --directory={path} \
  --importPath=@codelab/{project-name} \
  --linter=eslint \
  --unitTestRunner=jest
```

## Example
For creating a dataloader library:
- Path: `libs/backend/infra/adapter/dataloader`
- Project Name: `backend-infra-adapter-dataloader`
- Import Path: `@codelab/backend-infra-adapter-dataloader`

## Post-Generation Tasks
After generating a library:
1. Verify the `name` in `project.json` matches the full project name
2. Ensure the `lint` target is present in `project.json`
3. Run `pnpm nx run {project-name}:lint` to verify configuration