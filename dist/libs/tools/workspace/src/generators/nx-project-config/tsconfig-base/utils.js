"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTsconfigPath = exports.appendTsconfigPath = exports.getModuleAlias = exports.sortKeys = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nx/devkit");
const merge_1 = tslib_1.__importDefault(require("lodash/merge"));
const unset_1 = tslib_1.__importDefault(require("lodash/unset"));
const sortKeys = (object) => Object.fromEntries(Object.entries(object).sort());
exports.sortKeys = sortKeys;
/**
 *
 * @param project
 * @param relativePathFromProjectSourceRoot `services` in `src/services` or `use-cases/create-app` in ` in `src/uses-cases/create-app`
 * @returns
 */
const getModuleAlias = (project, relativePathFromProjectSourceRoot) => {
    return `@codelab/${project.name}/${relativePathFromProjectSourceRoot}`;
};
exports.getModuleAlias = getModuleAlias;
const appendTsconfigPath = (tree, project, moduleAlias, targetPath) => {
    const sourceRoot = project.sourceRoot;
    if (!sourceRoot) {
        return;
    }
    (0, devkit_1.updateJson)(tree, 'tsconfig.base.json', (json) => {
        console.log('Appending path', {
            [moduleAlias]: [targetPath],
        });
        const paths = json.compilerOptions.paths ?? {};
        (0, merge_1.default)(paths, {
            [moduleAlias]: [targetPath],
        });
        json.compilerOptions.paths = (0, exports.sortKeys)(paths);
        return json;
    });
};
exports.appendTsconfigPath = appendTsconfigPath;
const removeTsconfigPath = (tree, moduleAlias) => {
    (0, devkit_1.updateJson)(tree, 'tsconfig.base.json', (json) => {
        const paths = json.compilerOptions.paths ?? {};
        (0, unset_1.default)(json, `compilerOptions.paths.${moduleAlias}`);
        json.compilerOptions.paths = paths;
        return json;
    });
};
exports.removeTsconfigPath = removeTsconfigPath;
//# sourceMappingURL=utils.js.map