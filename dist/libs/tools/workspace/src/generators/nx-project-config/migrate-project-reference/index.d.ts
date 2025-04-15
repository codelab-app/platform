import { Tree, ProjectConfiguration } from '@nx/devkit';
export { createNonbuildableProjectPackageJson } from './create-nonbuildable-project-package-json';
export { updateProjectTsconfig } from './update-project-tsconfig';
export { getProjectDependencies } from './get-project-dependencies';
export { updateAppDependencies } from './update-app-dependencies';
/**
 * Migrates a project to use TypeScript project references
 */
export declare const migrateProjectReference: (tree: Tree, projectConfig: ProjectConfiguration) => Promise<void>;
