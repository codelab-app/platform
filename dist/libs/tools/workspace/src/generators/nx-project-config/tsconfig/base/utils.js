"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTsconfigPath = exports.appendTsconfigPath = exports.getModuleAlias = exports.sortKeys = void 0;
const devkit_1 = require("@nx/devkit");
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
        // Replace hold alias with new
        paths[moduleAlias] = [targetPath];
        json.compilerOptions.paths = (0, exports.sortKeys)(paths);
        return json;
    });
};
exports.appendTsconfigPath = appendTsconfigPath;
const removeTsconfigPath = (tree, moduleAlias) => {
    (0, devkit_1.updateJson)(tree, 'tsconfig.base.json', (json) => {
        const paths = json.compilerOptions.paths ?? {};
        // Check if the path exists before attempting to delete it
        if (moduleAlias in paths) {
            console.log(`Removing existing path alias: ${moduleAlias}`);
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete paths[moduleAlias];
        }
        else {
            console.log(`Attempted to remove non-existent path alias: ${moduleAlias}`);
        }
        json.compilerOptions.paths = (0, exports.sortKeys)(paths);
        return json;
    });
};
exports.removeTsconfigPath = removeTsconfigPath;
//# sourceMappingURL=utils.js.map