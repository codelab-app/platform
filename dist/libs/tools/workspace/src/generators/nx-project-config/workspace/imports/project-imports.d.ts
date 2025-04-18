import type { ProjectConfiguration, Tree } from '@nx/devkit';
/**
 * Get all imports from a project
 */
export declare const getProjectImports: (tree: Tree, projectConfig: ProjectConfiguration) => Array<string>;
/**
 * Update imports in all project files
 */
export declare const updateProjectImports: (tree: Tree, projectConfig: ProjectConfiguration, transformFn: (importPath: string) => string) => void;
//# sourceMappingURL=project-imports.d.ts.map