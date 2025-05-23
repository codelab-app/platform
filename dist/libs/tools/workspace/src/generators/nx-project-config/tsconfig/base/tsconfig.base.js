"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBaseTsconfig = void 0;
const orchestrator_1 = require("./orchestrator");
/**
 * Update alias map then run `nx build tools-workspace && pnpm install && nx generate @codelab/tools-workspace:nx-project-config --no-interactive --verbose`
 */
const updateBaseTsconfig = (tree, project) => {
    const baseTsConfigFile = 'tsconfig.base.json';
    if (!tree.exists(baseTsConfigFile)) {
        console.error('tsconfig.base.json does not exist at the root of your workspace.');
        return;
    }
    const projectName = project.name;
    const sourceRoot = project.sourceRoot;
    if (!projectName || !sourceRoot) {
        console.log('Missing projectName and sourceRoot');
        return;
    }
    /**
     * 1. Go through the directory mapping
     */
    (0, orchestrator_1.handleProjectNamePatterns)(project, (patterns) => {
        // Add/remove paths
        patterns.forEach((pattern) => {
            (0, orchestrator_1.generateReferencePathsForLib)(tree, project, pattern);
        });
    });
};
exports.updateBaseTsconfig = updateBaseTsconfig;
//# sourceMappingURL=tsconfig.base.js.map