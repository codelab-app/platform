"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.antDesignIconImport = exports.createESLintRule = void 0;
const utils_1 = require("@typescript-eslint/utils");
exports.createESLintRule = utils_1.ESLintUtils.RuleCreator(() => ``);
exports.antDesignIconImport = (0, exports.createESLintRule)({
    create: (context) => {
        return {
            ImportDeclaration: (node) => {
                const importSourceValue = node.source.value;
                if (importSourceValue.endsWith('@ant-design/icons')) {
                    context.report({
                        messageId: 'iconImportPath',
                        node,
                    });
                }
            },
        };
    },
    defaultOptions: [],
    meta: {
        docs: {
            description: 'Disallow import of icons from barrel',
            recommended: 'error',
        },
        messages: {
            iconImportPath: 'Must import individual icons',
        },
        schema: [],
        type: 'problem',
    },
    name: 'ant-design-icon-import',
});
//# sourceMappingURL=ant-design-icon-import.js.map