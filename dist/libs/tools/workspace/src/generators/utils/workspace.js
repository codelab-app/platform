"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAliasMapping = void 0;
const devkit_1 = require("@nx/devkit");
const utils_1 = require("../migrate-project-reference/utils");
const createAliasMapping = (tree) => {
    const projects = (0, devkit_1.getProjects)(tree);
    const projectMapping = {};
    for (const [projectName, projectConfig] of projects) {
        projectMapping[projectName] = {
            alias: (0, utils_1.getPackageJsonNameFromProjectName)(projectName),
            path: projectConfig.root,
        };
    }
    return projectMapping;
};
exports.createAliasMapping = createAliasMapping;
//# sourceMappingURL=workspace.js.map