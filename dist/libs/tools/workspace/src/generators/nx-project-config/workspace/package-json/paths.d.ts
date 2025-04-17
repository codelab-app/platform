/**
 * Filters an array of import paths to return only the unique base paths
 * for scoped packages (e.g., "@scope/package-name").
 * Example: "@scope/package/sub/path" becomes "@scope/package".
 *
 * @param imports - An array of import path strings.
 * @returns An array of unique base import paths.
 */
export declare const getBaseImportPaths: (imports: Array<string>) => Array<string>;
/**
 * Generates the 'exports' field for package.json based on discovered import paths.
 * It maps relative import paths (e.g., "./sub/path") to a default source entry point.
 *
 * @param allImports - An array of all discovered import path strings within the project.
 * @param baseImportPaths - An array of unique base package import paths (e.g., "@scope/package").
 * @param defaultSourcePath - The default source file path for exports (e.g., './src/index.ts').
 * @returns An object representing the 'exports' field for package.json.
 */
export declare const getRelativeExports: (allImports: Array<string>, baseImportPaths: Array<string>, defaultSourcePath?: string) => Record<string, {
    default: string;
    import: string;
    types: string;
}>;
