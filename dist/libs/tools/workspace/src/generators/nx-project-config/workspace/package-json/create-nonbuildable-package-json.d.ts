import type { ProjectConfiguration, Tree } from '@nx/devkit';
import type { PackageJson } from 'type-fest';
/**
 * Creates package.json files for non-buildable projects, including dependency analysis
 */
export declare const createNonbuildablePackageJson: (tree: Tree, projectConfig: ProjectConfiguration) => void;
/**
 * Writes the package.json object to the specified path within the project root.
 */
export declare const writeToPackageJson: (tree: Tree, projectRoot: string, packageJson: PackageJson) => void;
//# sourceMappingURL=create-nonbuildable-package-json.d.ts.map