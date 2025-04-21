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
            /**
             * "experimentalDecorators": true,
             * "emitDecoratorMetadata": true
             *
             * Is required by legacy decorators
             */
            json.compilerOptions = {
                // Needed if `moduleResolution` is set to `bundler`
                module: 'esnext',
                forceConsistentCasingInFileNames: true,
                strict: true,
                noImplicitOverride: true,
                noPropertyAccessFromIndexSignature: true,
                noImplicitReturns: true,
                noFallthroughCasesInSwitch: true,
                // experimentalDecorators: true,
                // emitDecoratorMetadata: true,
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
    /**
     * Remove legacy decorators from frontend projects
     */
    // if (projectName?.startsWith('frontend')) {
    //   const tsconfigPath = `${project.root}/tsconfig.json`
    //   const tsconfigLibPath = `${project.root}/tsconfig.lib.json`
    //   const tsconfigSpecPath = `${project.root}/tsconfig.spec.json`
    //   if (tree.exists(tsconfigPath)) {
    //     updateJson(tree, tsconfigPath, (json) => {
    //       delete json.compilerOptions.experimentalDecorators
    //       delete json.compilerOptions.emitDecoratorMetadata
    //       return json
    //     })
    //   }
    //   if (tree.exists(tsconfigLibPath)) {
    //     updateJson(tree, tsconfigLibPath, (json) => {
    //       delete json.compilerOptions.experimentalDecorators
    //       delete json.compilerOptions.emitDecoratorMetadata
    //       return json
    //     })
    //   }
    //   if (tree.exists(tsconfigSpecPath)) {
    //     updateJson(tree, tsconfigSpecPath, (json) => {
    //       delete json.compilerOptions.experimentalDecorators
    //       delete json.compilerOptions.emitDecoratorMetadata
    //       return json
    //     })
    //   }
    // }
};
exports.updateLibraryTsconfig = updateLibraryTsconfig;
//# sourceMappingURL=tsconfig.lib.js.map