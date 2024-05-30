"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeboxSchemaNaming = exports.createESLintRule = void 0;
const utils_1 = require("@typescript-eslint/utils");
exports.createESLintRule = utils_1.ESLintUtils.RuleCreator(() => '');
const TYPEBOX_IMPORT_NAME = 'Typebox';
const TYPE_IMPORT_NAME = 'Type';
exports.typeboxSchemaNaming = (0, exports.createESLintRule)({
    create: (context) => {
        /**
         * Rule depends on where `Type` is imported from
         */
        let isTypeImported = false;
        let isTypeboxImported = false;
        /**
         *
         * @param name of the import
         */
        const isVariableDeclarator = (name, node) => {
            return (node.init?.type === utils_1.AST_NODE_TYPES.CallExpression &&
                node.init.callee.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                node.init.callee.object.type === utils_1.AST_NODE_TYPES.Identifier &&
                // Both imports should trigger
                node.init.callee.object.name === name &&
                node.init.callee.property.type === utils_1.AST_NODE_TYPES.Identifier);
            // This makes it such that we need to have `Type.Object`
            // && node.init.callee.property.name === 'Object'
        };
        /**
         * Check if the function's return type is an object created using the specified import name
         * @param name of the import
         * @param node Function node
         */
        const checkFunctionReturnType = (name, node) => {
            const functionName = node.type === utils_1.AST_NODE_TYPES.FunctionDeclaration
                ? node.id?.type === utils_1.AST_NODE_TYPES.Identifier
                    ? node.id.name
                    : null
                : node.parent.type === utils_1.AST_NODE_TYPES.VariableDeclarator &&
                    node.parent.id.type === utils_1.AST_NODE_TYPES.Identifier
                    ? node.parent.id.name
                    : null;
            /**
             * ESLint can't get the inferred type, only if there exists an explicit annotation, so we have to turn off checking for functions.
             *
             * https://stackoverflow.com/questions/69094002/why-eslint-ignored-type-inference-of-typescript
             */
            const returnTypeNode = node.returnType?.typeAnnotation;
            // if (functionName && !functionName.endsWith('Schema')) {
            //   context.report({
            //     messageId: 'suffixWithSchema',
            //     node,
            //   })
            // }
        };
        return {
            // ArrowFunctionExpression: (node: TSESTree.ArrowFunctionExpression) => {
            //   if (isTypeImported) {
            //     checkFunctionReturnType(TYPE_IMPORT_NAME, node)
            //   }
            //   if (isTypeboxImported) {
            //     checkFunctionReturnType(TYPEBOX_IMPORT_NAME, node)
            //   }
            // },
            // FunctionDeclaration: (node: TSESTree.FunctionDeclaration) => {
            //   if (isTypeImported) {
            //     checkFunctionReturnType(TYPE_IMPORT_NAME, node)
            //   }
            //   if (isTypeboxImported) {
            //     checkFunctionReturnType(TYPEBOX_IMPORT_NAME, node)
            //   }
            // },
            ImportDeclaration: (node) => {
                if (node.source.value === '@sinclair/typebox' &&
                    node.specifiers.some((specifier) => specifier.type === utils_1.AST_NODE_TYPES.ImportSpecifier &&
                        specifier.imported.name === TYPE_IMPORT_NAME)) {
                    isTypeImported = true;
                }
                if (node.source.value === '@codelab/shared/abstract/typebox' &&
                    node.specifiers.some((specifier) => specifier.type === utils_1.AST_NODE_TYPES.ImportSpecifier &&
                        specifier.imported.name === TYPEBOX_IMPORT_NAME)) {
                    isTypeboxImported = true;
                }
            },
            VariableDeclarator: (node) => {
                if (isTypeImported && isVariableDeclarator(TYPE_IMPORT_NAME, node)) {
                    if (node.id.type === utils_1.AST_NODE_TYPES.Identifier) {
                        const variableName = node.id.name;
                        if (!variableName.endsWith('Schema')) {
                            context.report({
                                messageId: 'suffixWithSchema',
                                node,
                            });
                        }
                    }
                }
                if (isTypeboxImported &&
                    isVariableDeclarator(TYPEBOX_IMPORT_NAME, node)) {
                    if (node.id.type === utils_1.AST_NODE_TYPES.Identifier) {
                        const variableName = node.id.name;
                        if (!variableName.endsWith('Schema')) {
                            context.report({
                                messageId: 'suffixWithSchema',
                                node,
                            });
                        }
                    }
                }
            },
        };
    },
    defaultOptions: [],
    meta: {
        docs: {
            description: 'enforce specific naming for Typebox schema assignments',
            recommended: 'strict',
        },
        messages: {
            suffixWithSchema: 'Must suffix a typebox type with schema',
        },
        schema: [],
        type: 'problem',
    },
    name: 'typebox-schema-naming',
});
//# sourceMappingURL=typebox-schema-naming.js.map