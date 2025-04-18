/**
 * Filters an array of import paths to return only the unique base paths
 * for scoped packages (e.g., "@scope/package-name").
 * Example: "@scope/package/sub/path" becomes "@scope/package".
 *
 * @param imports - An array of import path strings.
 * @returns An array of unique base import paths.
 */
export declare const getBaseImportPaths: (imports: Array<string>) => Array<string>;
