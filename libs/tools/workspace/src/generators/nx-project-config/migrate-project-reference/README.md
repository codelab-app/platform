# TypeScript Project References Migration

This generator migrates projects in the Nx workspace to use TypeScript project references and package manager workspaces.

## Overview

The migration script does the following:

1. Creates individual `package.json` files for each project
2. Updates TypeScript configuration files to use project references
3. Updates application dependencies to reference local libraries

## Usage

To run the migration, use the following command:

```bash
nx g @codelab/tools-workspace:nx-project-config --migrateToProjectReferences=true
```

## What the Migration Does

### For All Projects:

1. Creates a `package.json` file with the following structure:

   - For non-buildable libraries:
     ```json
     {
       "name": "@myorg/ui",
       "exports": {
         ".": {
           "types": "./src/index.ts",
           "import": "./src/index.ts",
           "default": "./src/index.ts"
         }
       }
     }
     ```
   - For buildable libraries:
     ```json
     {
       "name": "@myorg/ui",
       "exports": {
         ".": {
           "types": "./dist/index.d.ts",
           "import": "./dist/index.js",
           "default": "./dist/index.js"
         }
       },
       "main": "./dist/index.js",
       "typings": "./dist/index.d.ts"
     }
     ```

2. Updates `tsconfig.json` files:

   - Removes `compilerOptions.paths`
   - Sets `files` to an empty array
   - Adds references to dependencies and local tsconfig files

3. Updates `tsconfig.lib.json` files:

   - Makes sure it extends from root `tsconfig.base.json`
   - Sets `outDir` to `./out-tsc/lib`
   - Enables `composite` and `declaration` options
   - Adds references to dependencies' `tsconfig.lib.json` files

4. Updates `tsconfig.spec.json` files:
   - Makes sure it extends from root `tsconfig.base.json`
   - Sets `outDir` to `./out-tsc/spec`
   - Adds reference to the project's `tsconfig.lib.json`

### For Applications:

Adds all libraries in the workspace as `devDependencies` with `workspace:*` as the version. This is especially important for pnpm workspaces:

```json
// apps/my-app/package.json
{
  "devDependencies": {
    "@myorg/some-library": "workspace:*"
  }
}
```

The `workspace:*` notation tells pnpm that the project is in the same repository and not an npm package. Using `devDependencies` instead of `dependencies` ensures that the library is not included twice in the production bundle of the application.

## Post-Migration Steps

After running the migration, you should:

1. Run `nx sync` to update project references
2. Update any import statements that used TypeScript path aliases to use package names instead
3. Check that all projects build correctly
4. Make sure IDE features like "Go to Definition" work properly
