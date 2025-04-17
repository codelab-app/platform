/**
 * Generates the 'exports' field for package.json based on discovered import paths.
 * It maps relative import paths (e.g., "./sub/path") to a default source entry point,
 * but only for imports that belong to the specified package.
 *
 * @param allImports - An array of all discovered import path strings within the project.
 * @param baseImportPaths - An array of unique base package import paths (e.g., "@scope/package").
 * @param packageName - The name of the current package (e.g., "@scope/package") to filter imports.
 * @param defaultSourcePath - The default source file path for exports (e.g., './src/index.ts').
 * @returns An object representing the 'exports' field for package.json.
 */
export const getRelativeExports = (
  allImports: Array<string>,
  baseImportPaths: Array<string>,
  packageName: string,
  defaultSourcePath = './src/index.ts',
): Record<string, { default: string; import: string; types: string }> => {
  const exportsMap: Record<
    string,
    { default: string; import: string; types: string }
  > = {}

  // Add the main export pointing to the default source path
  exportsMap['.'] = {
    default: defaultSourcePath,
    import: defaultSourcePath,
    types: defaultSourcePath,
  }

  for (const importPath of allImports) {
    for (const basePath of baseImportPaths) {
      // Check if the import starts with the base path followed by a '/'
      if (importPath.startsWith(`${basePath}/`)) {
        // Extract the part after the base path (e.g., "/sub/path")
        const rawRelativePath = importPath.substring(basePath.length)
        // Create the export key (e.g., "./sub/path")
        const exportKey = `.${rawRelativePath}`

        // Add the export entry if it doesn't exist yet AND the base path is application-related
        if (basePath.includes('application') && !exportsMap[exportKey]) {
          exportsMap[exportKey] = {
            default: defaultSourcePath,
            import: defaultSourcePath,
            types: defaultSourcePath,
          }
        }

        // Found the corresponding base path, move to the next import path
        break
      }
    }
  }

  return exportsMap
}
