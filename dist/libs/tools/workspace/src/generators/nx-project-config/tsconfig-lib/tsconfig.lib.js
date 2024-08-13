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
                module: 'commonjs',
                forceConsistentCasingInFileNames: true,
                strict: true,
                noImplicitOverride: true,
                noPropertyAccessFromIndexSignature: true,
                noImplicitReturns: true,
                noFallthroughCasesInSwitch: true,
            };
            return json;
        });
        (0, devkit_1.updateJson)(tree, `${project.root}/tsconfig.lib.json`, (json) => {
            json.compilerOptions = {
                outDir: json.compilerOptions.outDir,
                declaration: true,
                types: ['node'],
                target: 'es2021',
                strictNullChecks: true,
                noImplicitAny: true,
                strictBindCallApply: true,
                forceConsistentCasingInFileNames: true,
                noFallthroughCasesInSwitch: true,
            };
            return json;
        });
    }
};
exports.updateLibraryTsconfig = updateLibraryTsconfig;
//# sourceMappingURL=tsconfig.lib.js.map