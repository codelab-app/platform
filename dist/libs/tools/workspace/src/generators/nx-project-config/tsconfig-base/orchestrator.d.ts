import type { ProjectConfiguration, Tree } from '@nx/devkit';
import { type Paths } from './utils';
/**
 * Does not work with multiple wildcards `/*\/*`
 */
export declare const aliasMap: Paths;
/**
 * For each library, go through the regex patterns and see if any callbacks shoudl be applied
 */
export declare const handleProjectNamePatterns: (project: ProjectConfiguration, callback: (patterns: Array<string>) => void) => void;
/**
 * Given a lib & folder patterns, we want to create tsconfig path references
 */
export declare const generateReferencePathsForLib: (tree: Tree, project: ProjectConfiguration, folderPattern: string) => void;
