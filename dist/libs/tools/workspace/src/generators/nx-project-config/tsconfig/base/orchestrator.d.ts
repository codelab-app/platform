import type { ProjectConfiguration, Tree } from '@nx/devkit';
/**
 * For each library, go through the regex patterns and see if any callbacks should be applied
 */
export declare const handleProjectNamePatterns: (project: ProjectConfiguration, callback: (patterns: Array<string>) => void) => void;
/**
 * Given a lib & folder patterns, we want to create tsconfig path references
 */
export declare const generateReferencePathsForLib: (tree: Tree, project: ProjectConfiguration, folderPattern: string) => void;
//# sourceMappingURL=orchestrator.d.ts.map