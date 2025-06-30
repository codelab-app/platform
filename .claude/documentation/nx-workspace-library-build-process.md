# Nx Workspace Library Build Process

## Important: Building and Linking Workspace Libraries

When making changes to Nx libraries, specifically those in `libs/tools` and `libs/external` directories, you must follow this process:

1. **Build the library**:
   ```bash
   nx build <library-name>
   ```
   
   **Note**: The `<library-name>` is the project name from `project.json`, NOT the directory structure. For example:
   - Directory: `libs/tools/tsc-check`
   - Project name in `project.json`: `tsc-check`
   - Command: `nx build tsc-check`

2. **Link the workspace**:
   ```bash
   pnpm install
   ```

This is necessary because these libraries are used as workspace dependencies and need to be built and linked properly for changes to take effect across the monorepo.

## Example

If you modify `libs/tools/tsc-check`:
```bash
# Check the project name in libs/tools/tsc-check/project.json
nx build tsc-check  # Use the name from project.json, not the path
pnpm install
```

This ensures that all projects using the library will see the updated version.