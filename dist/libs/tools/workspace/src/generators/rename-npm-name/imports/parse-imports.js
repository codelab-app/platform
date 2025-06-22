"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseImports = void 0;
const tslib_1 = require("tslib");
const typescript_1 = tslib_1.__importDefault(require("typescript"));
/**
 * Parse import paths from TypeScript/JavaScript source code using AST
 */
const parseImports = (content, filePath) => {
    const imports = [];
    // Create a source file from the content
    const sourceFile = typescript_1.default.createSourceFile(filePath, content, typescript_1.default.ScriptTarget.Latest, true);
    // Visit all nodes in the AST
    const visit = (node) => {
        // Handle ES6 imports: import ... from 'path'
        if (typescript_1.default.isImportDeclaration(node)) {
            if (typescript_1.default.isStringLiteral(node.moduleSpecifier)) {
                imports.push(node.moduleSpecifier.text);
            }
        }
        // Handle ES6 exports: export ... from 'path'
        if (typescript_1.default.isExportDeclaration(node) && node.moduleSpecifier) {
            if (typescript_1.default.isStringLiteral(node.moduleSpecifier)) {
                imports.push(node.moduleSpecifier.text);
            }
        }
        // Handle require calls: require('path')
        if (typescript_1.default.isCallExpression(node) &&
            typescript_1.default.isIdentifier(node.expression) &&
            node.expression.text === 'require' &&
            node.arguments.length > 0) {
            const arg = node.arguments[0];
            if (arg && typescript_1.default.isStringLiteral(arg)) {
                imports.push(arg.text);
            }
        }
        // Handle dynamic imports: import('path')
        if (typescript_1.default.isCallExpression(node) &&
            node.expression.kind === typescript_1.default.SyntaxKind.ImportKeyword &&
            node.arguments.length > 0) {
            const arg = node.arguments[0];
            if (arg && typescript_1.default.isStringLiteral(arg)) {
                imports.push(arg.text);
            }
        }
        // Continue visiting child nodes
        typescript_1.default.forEachChild(node, visit);
    };
    visit(sourceFile);
    // Return unique imports
    return [...new Set(imports)];
};
exports.parseImports = parseImports;
//# sourceMappingURL=parse-imports.js.map