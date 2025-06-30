"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectImports = void 0;
const devkit_1 = require("@nx/devkit");
const parse_imports_1 = require("./parse-imports");
/**
 * Update all imports from all files in a directory
 */
const updateProjectImports = (tree, sourceRoot) => {
    const fileImports = {};
    if (!tree.exists(sourceRoot)) {
        return fileImports;
    }
    // Use visitNotIgnoredFiles to traverse the directory structure efficiently
    (0, devkit_1.visitNotIgnoredFiles)(tree, sourceRoot, (filePath) => {
        // Only process TypeScript/JavaScript files
        if (!/\.(ts|tsx|js|jsx)$/.test(filePath)) {
            return;
        }
        // Read file content
        const content = tree.read(filePath, 'utf-8');
        if (content) {
            const imports = (0, parse_imports_1.parseImports)(content, filePath);
            if (imports.length > 0) {
                fileImports[filePath] = imports;
            }
        }
    });
    return fileImports;
};
exports.updateProjectImports = updateProjectImports;
//# sourceMappingURL=update-project-imports.js.map