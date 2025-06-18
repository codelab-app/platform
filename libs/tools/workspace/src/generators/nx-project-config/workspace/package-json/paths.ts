/**
 * Filters an array of import paths to return only the unique base paths
 * for scoped packages (e.g., "@scope/package-name").
 * Example: "@scope/package/sub/path" becomes "@scope/package".
 *
 * @param imports - An array of import path strings.
 * @returns An array of unique base import paths.
 */
export const getBaseImportPaths = (imports: Array<string>): Array<string> => {
  const basePaths = new Set<string>()

  for (const importPath of imports) {
    if (importPath.startsWith('@')) {
      const parts = importPath.split('/')

      // A valid scoped package has at least two parts: @scope/package
      // and the package name part should not be empty
      if (parts.length >= 2 && parts[1]) {
        const basePath = `${parts[0]}/${parts[1]}`

        basePaths.add(basePath)
      }
    }
    // Optionally handle non-scoped paths or add other filtering logic here
    // Currently, non-scoped paths or invalid scoped paths are ignored
  }

  return Array.from(basePaths)
}
