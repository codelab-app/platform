"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReferencePathsForLib = exports.handleProjectNamePatterns = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const alias_map_1 = require("./alias-map");
const utils_1 = require("./utils");
/**
 * For each library, go through the regex patterns and see if any callbacks shoudl be applied
 */
const handleProjectNamePatterns = (project, callback) => {
    const projectName = project.name;
    if (!projectName) {
        return;
    }
    Object.entries(alias_map_1.aliasMap).forEach(([projectNamePattern, projectFolderPatterns]) => {
        if (new RegExp(projectNamePattern).test(projectName)) {
            console.log('Match with pattern:', projectNamePattern);
            callback(projectFolderPatterns);
        }
    });
};
exports.handleProjectNamePatterns = handleProjectNamePatterns;
/**
 * Given a lib & folder patterns, we want to create tsconfig path references
 */
const generateReferencePathsForLib = (tree, project, folderPattern) => {
    const sourceRoot = project.sourceRoot;
    if (!sourceRoot) {
        return;
    }
    console.log('Generating for folderPattern:', folderPattern);
    // This is `libs/frontend/application/application/src/store`
    // This is a minimatch pattern, could be `.../uses-cases/*
    let folderRelativeToWorkspace = path_1.default.join(sourceRoot, folderPattern);
    // Handle if folder has minimatch pattern
    const hasWildcard = folderPattern.includes('/*');
    const folderPatternPrefix = folderPattern.replace('/*', '');
    if (hasWildcard) {
        folderRelativeToWorkspace = path_1.default.join(sourceRoot, folderPatternPrefix);
        tree.children(folderRelativeToWorkspace).forEach((subDir) => {
            // Ensure it's a directory
            const subDirPath = path_1.default.join(folderRelativeToWorkspace, subDir);
            if (tree.isFile(subDirPath)) {
                return;
            }
            const moduleAlias = (0, utils_1.getModuleAlias)(project, `${folderPatternPrefix}/${subDir}`);
            const targetPath = `${subDirPath}/index.ts`;
            (0, utils_1.appendTsconfigPath)(tree, project, moduleAlias, targetPath);
        });
        return;
    }
    console.log(sourceRoot, folderRelativeToWorkspace);
    const exists = tree.children(folderRelativeToWorkspace).length;
    console.log(folderRelativeToWorkspace, exists);
    const moduleAlias = (0, utils_1.getModuleAlias)(project, folderPattern);
    if (exists) {
        const targetPath = `${sourceRoot}/${folderPattern}/index.ts`;
        (0, utils_1.appendTsconfigPath)(tree, project, moduleAlias, targetPath);
        return;
    }
    (0, utils_1.removeTsconfigPath)(tree, moduleAlias);
};
exports.generateReferencePathsForLib = generateReferencePathsForLib;
//# sourceMappingURL=orchestrator.js.map