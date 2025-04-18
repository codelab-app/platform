"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyLibTsconfigToTsconfig = void 0;
const devkit_1 = require("@nx/devkit");
/**
 * Moves compilerOptions from tsconfig.json to tsconfig.lib.json for a project.
 */
const copyLibTsconfigToTsconfig = (tree, project) => {
    const tsconfigPath = `${project.root}/tsconfig.json`;
    const tsconfigLibPath = `${project.root}/tsconfig.lib.json`;
    if (!tree.exists(tsconfigPath) || !tree.exists(tsconfigLibPath)) {
        console.warn(`Skipping ${project.name}: tsconfig.json or tsconfig.lib.json not found.`);
        return;
    }
    const tsconfigJson = (0, devkit_1.readJson)(tree, tsconfigPath);
    const compilerOptionsToMove = tsconfigJson.compilerOptions;
    if (!compilerOptionsToMove) {
        console.warn(`Skipping ${project.name}: No compilerOptions found in tsconfig.json.`);
        return;
    }
    // Update tsconfig.lib.json with the compilerOptions
    (0, devkit_1.updateJson)(tree, tsconfigLibPath, (json) => {
        json.compilerOptions = { ...json.compilerOptions, ...compilerOptionsToMove };
        return json;
    });
    // Remove compilerOptions from tsconfig.json
    (0, devkit_1.updateJson)(tree, tsconfigPath, (json) => {
        delete json.compilerOptions;
        return json;
    });
    console.log(`Moved compilerOptions for project: ${project.name}`);
};
exports.copyLibTsconfigToTsconfig = copyLibTsconfigToTsconfig;
//# sourceMappingURL=copy-options.js.map