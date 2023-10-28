"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.domainLayerConstraint = exports.createESLintRule = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
const devkit_1 = require("@nx/devkit");
const utils_1 = require("@typescript-eslint/utils");
const path_1 = tslib_1.__importDefault(require("path"));
exports.createESLintRule = utils_1.ESLintUtils.RuleCreator(() => ``);
exports.domainLayerConstraint = (0, exports.createESLintRule)({
    create: (context) => {
        const projectPath = (0, devkit_1.normalizePath)(global.projectPath || devkit_1.workspaceRoot);
        return {
            ImportDeclaration: (node) => {
                const importSourceValue = node.source.value;
                if (importSourceValue.endsWith('.graphql.gen')) {
                    const currentFilename = context.getFilename();
                    // if (!currentFilename.endsWith('.api.ts')) {
                    //   context.report({
                    //     messageId: 'noCodegenImport',
                    //     node,
                    //   })
                    // }
                }
            },
            Program: (node) => {
                const absoluteFilename = context.getFilename();
                // console.log(absoluteFilename, projectPath)
                const relativePath = path_1.default.relative(projectPath, absoluteFilename);
                // console.log(relativePath)
                /**
                 * If we are in the domain layer, we cannot have `.graphql` files
                 */
                if (['libs/frontend/domain'].some((lib) => relativePath.startsWith(lib)) &&
                    relativePath.endsWith('.graphql')) {
                    context.report({
                        messageId: 'noGraphqlFiles',
                        node,
                    });
                }
            },
        };
    },
    defaultOptions: [],
    meta: {
        docs: {
            description: 'Disallow .graphql files in project paths including "domain"',
            recommended: 'error',
        },
        messages: {
            noCodegenImport: 'Only files ending with `.api.ts` can import from codegen files',
            noGraphqlFiles: 'Domain layer cannot have GraphQL files',
        },
        schema: [],
        type: 'problem',
    },
    name: 'domain-layer-constraint',
});
//# sourceMappingURL=domain-layer-constraint.js.map