import type { ProjectConfiguration, Tree } from '@nx/devkit';
/**
 * Add tags based on project directory structure
 *
 *  "scope": ["frontend", "backend", "shared", "codegen"]
 *  "layer": ["domain", "application", "infra", "presentation"]
 *  "type": ["abstract", "concrete", "data", "test"]
 *  "projectType": ["application", "library"]
 */
export declare const addProjectTags: (tree: Tree, projectConfig: ProjectConfiguration) => void;
