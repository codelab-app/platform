"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBaseTsconfig = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nx/devkit");
const merge_1 = tslib_1.__importDefault(require("lodash/merge"));
const path_1 = tslib_1.__importDefault(require("path"));
/**
 * Wildcard paths drains CPU & battery, so we create paths for import
 */
const updateBaseTsconfig = (tree, project) => {
    const projectName = project.name;
    const baseTsconfigPath = path_1.default.resolve(tree.root, 'tsconfig.base.json');
    /**
     * Only update if the lib is a backend project, which we will use default nestjs config for
     */
    if (projectName?.startsWith('frontend-application')) {
        const firstLevelDirs = ['graphql', 'services', 'use-cases', 'views'];
        (0, devkit_1.updateJson)(tree, baseTsconfigPath, (json) => {
            // Map the project reference to the src folder
            const projectReferences = firstLevelDirs.map((dir) => ({
                [`@codelab/${projectName}/dir`]: [`${project.sourceRoot}/dir`],
            }));
            const wildcardProjectReference = `@codelab/${projectName}/*`;
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete json.compilerOptions.paths[wildcardProjectReference];
            json.compilerOptions.paths = (0, merge_1.default)(json.compilerOptions.paths, projectReferences);
            return json;
        });
    }
    // if (projectName?.startsWith('frontend-domain')) {
    //   const firstLevelDirs = ['services', 'store', 'test', 'views']
    //   updateJson(tree, `${project.root}/tsconfig.json`, (json) => {
    //     json.compilerOptions = {
    //       module: 'commonjs',
    //       forceConsistentCasingInFileNames: true,
    //       strict: true,
    //       noImplicitOverride: true,
    //       noPropertyAccessFromIndexSignature: true,
    //       noImplicitReturns: true,
    //       noFallthroughCasesInSwitch: true,
    //     }
    //     return json
    //   })
    // }
};
exports.updateBaseTsconfig = updateBaseTsconfig;
//# sourceMappingURL=tsconfig.base.js.map