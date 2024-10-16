"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLibraryTsconfig = void 0;
const devkit_1 = require("@nx/devkit");
const updateLibraryTsconfig = (tree, project) => {
    const projectName = project.name;
    /**
     * Only update if the lib is a backend project, which we will use default nestjs config for
     */
    if (projectName?.startsWith('backend')) {
        (0, devkit_1.updateJson)(tree, `${project.root}/tsconfig.json`, (json) => {
            json.compilerOptions = {
                forceConsistentCasingInFileNames: true,
                module: 'commonjs',
                noFallthroughCasesInSwitch: true,
                noImplicitOverride: true,
                noImplicitReturns: true,
                noPropertyAccessFromIndexSignature: true,
                strict: true,
            };
            return json;
        });
        (0, devkit_1.updateJson)(tree, `${project.root}/tsconfig.lib.json`, (json) => {
            json.compilerOptions = {
                declaration: true,
                forceConsistentCasingInFileNames: true,
                noFallthroughCasesInSwitch: true,
                noImplicitAny: true,
                outDir: json.compilerOptions.outDir,
                strictBindCallApply: true,
                strictNullChecks: true,
                target: 'es2021',
                types: ['node'],
            };
            return json;
        });
    }
};
exports.updateLibraryTsconfig = updateLibraryTsconfig;
//# sourceMappingURL=tsconfig.lib.js.map