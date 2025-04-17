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
