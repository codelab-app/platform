import type { PackageJson } from 'type-fest';
/**
 * We look at the entire path list from `path-alias.json` and generate the relative exports with regards to the current package name
 */
export declare const getRelativeExports: (packageName: string) => Record<string, PackageJson.Exports>;
