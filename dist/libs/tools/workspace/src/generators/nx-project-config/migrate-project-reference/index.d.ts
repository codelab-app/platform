import type { ProjectConfiguration, Tree } from '@nx/devkit';
export { createNonbuildablePackageJson } from '../workspace/package-json/create-nonbuildable-package-json';
export { getProjectDependencies } from './get-project-dependencies';
export { updateProjectTsconfig } from './update-project-tsconfig';
/**
 * Migrates a project to use TypeScript project references
 */
export declare const migrateProjectReference: (tree: Tree, projectConfig: ProjectConfiguration) => Promise<void>;
