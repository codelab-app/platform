import type { PackageJson } from 'type-fest';
/**
 * Updates the devDependencies field in a package.json object.
 *
 * @param packageJson - The package.json object to modify.
 * @param baseImportPaths - An array of unique base import paths to add as dependencies.
 */
export declare const setDevDependencies: (packageJson: PackageJson, baseImportPaths: Array<string>) => void;
