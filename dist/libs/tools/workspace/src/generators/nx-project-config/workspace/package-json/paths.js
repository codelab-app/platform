"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelativeExports = exports.getBaseImportPaths = void 0;
/**
 * Filters an array of import paths to return only the unique base paths
 * for scoped packages (e.g., "@scope/package-name").
 * Example: "@scope/package/sub/path" becomes "@scope/package".
 *
 * @param imports - An array of import path strings.
 * @returns An array of unique base import paths.
 */
const getBaseImportPaths = (imports) => {
    const basePaths = new Set();
    for (const importPath of imports) {
        if (importPath.startsWith('@')) {
            const parts = importPath.split('/');
            // A valid scoped package has at least two parts: @scope/package
            // and the package name part should not be empty
            if (parts.length >= 2 && parts[1]) {
                const basePath = `${parts[0]}/${parts[1]}`;
                basePaths.add(basePath);
            }
        }
        // Optionally handle non-scoped paths or add other filtering logic here
        // Currently, non-scoped paths or invalid scoped paths are ignored
    }
    return Array.from(basePaths);
};
exports.getBaseImportPaths = getBaseImportPaths;
/**
 * Generates the 'exports' field for package.json based on discovered import paths.
 * It maps relative import paths (e.g., "./sub/path") to a default source entry point.
 *
 * @param allImports - An array of all discovered import path strings within the project.
 * @param baseImportPaths - An array of unique base package import paths (e.g., "@scope/package").
 * @param defaultSourcePath - The default source file path for exports (e.g., './src/index.ts').
 * @returns An object representing the 'exports' field for package.json.
 */
const getRelativeExports = (allImports, baseImportPaths, defaultSourcePath = './src/index.ts') => {
    const exportsMap = {};
    // Add the main export pointing to the default source path
    exportsMap['.'] = {
        default: defaultSourcePath,
        import: defaultSourcePath,
        types: defaultSourcePath,
    };
    for (const importPath of allImports) {
        for (const basePath of baseImportPaths) {
            // Check if the import starts with the base path followed by a '/'
            if (importPath.startsWith(`${basePath}/`)) {
                // Extract the part after the base path (e.g., "/sub/path")
                const rawRelativePath = importPath.substring(basePath.length);
                // Create the export key (e.g., "./sub/path")
                const exportKey = `.${rawRelativePath}`;
                // Add the export entry if it doesn't exist yet
                if (!exportsMap[exportKey]) {
                    // For now, all relative paths point to the same default source path
                    // This might need adjustment based on actual file structure mapping
                    exportsMap[exportKey] = {
                        default: defaultSourcePath,
                        import: defaultSourcePath,
                        types: defaultSourcePath,
                    };
                    // console.log(`Mapped export '${exportKey}' to '${defaultSourcePath}'`)
                }
                // Found the corresponding base path, move to the next import path
                break;
            }
        }
    }
    return exportsMap;
};
exports.getRelativeExports = getRelativeExports;
//# sourceMappingURL=paths.js.map