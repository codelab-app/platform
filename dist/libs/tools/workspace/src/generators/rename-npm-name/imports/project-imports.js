"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectImports = exports.getProjectImports = void 0;
const devkit_1 = require("@nx/devkit");
const parse_imports_1 = require("./parse-imports");
/**
 * Get all imports from a project
 */
const getProjectImports = (tree, projectConfig) => {
    const allImports = [];
    // Use project root instead of sourceRoot to catch all files in the project
    const projectRoot = projectConfig.root;
    if (!tree.exists(projectRoot)) {
        console.log(`Project root ${projectRoot} does not exist`);
        return allImports;
    }
    // Use visitNotIgnoredFiles to traverse the directory structure efficiently
    (0, devkit_1.visitNotIgnoredFiles)(tree, projectRoot, (filePath) => {
        // Only process TypeScript/JavaScript files
        if (!/\.(ts|tsx|js|jsx)$/.test(filePath)) {
            return;
        }
        // Read file content
        const content = tree.read(filePath, 'utf-8');
        if (!content) {
            return;
        }
        // Parse imports from the file using AST
        const imports = (0, parse_imports_1.parseImports)(content, filePath);
        // Collect all imports
        allImports.push(...imports);
    });
    // Return unique imports
    return [...new Set(allImports)];
};
exports.getProjectImports = getProjectImports;
/**
 * Update imports in all project files
 */
const updateProjectImports = (tree, projectConfig, transformFn) => {
    // Use project root instead of sourceRoot to catch all files in the project
    const projectRoot = projectConfig.root;
    if (!tree.exists(projectRoot)) {
        console.log(`Project root ${projectRoot} does not exist`);
        return;
    }
    console.log(`  Scanning project root: ${projectRoot}`);
    // Use visitNotIgnoredFiles to traverse the directory structure efficiently
    (0, devkit_1.visitNotIgnoredFiles)(tree, projectRoot, (filePath) => {
        // Only process TypeScript/JavaScript files
        if (!/\.(ts|tsx|js|jsx)$/.test(filePath)) {
            return;
        }
        // Read file content
        const content = tree.read(filePath, 'utf-8');
        if (!content) {
            return;
        }
        // Parse imports from the file using AST
        const imports = (0, parse_imports_1.parseImports)(content, filePath);
        // Check if any imports need to be transformed
        const transformations = {};
        imports.forEach((importPath) => {
            const newPath = transformFn(importPath);
            if (newPath !== importPath) {
                transformations[importPath] = newPath;
            }
        });
        // If no transformations needed, skip this file
        if (Object.keys(transformations).length === 0) {
            return;
        }
        // Apply transformations using simple string replacement
        let updatedContent = content;
        Object.entries(transformations).forEach(([oldPath, newPath]) => {
            // Replace all occurrences of the old path with the new path
            // This works because import paths are always in quotes
            const searchStrings = [`'${oldPath}'`, `"${oldPath}"`];
            searchStrings.forEach((searchString) => {
                const replacement = searchString.replace(oldPath, newPath);
                if (updatedContent.includes(searchString)) {
                    updatedContent = updatedContent.replaceAll(searchString, replacement);
                    console.log(`File: ${filePath} -> Replaced "${oldPath}" with "${newPath}"`);
                }
            });
        });
        // Write the updated content
        console.log(`Updating ${filePath} with new import paths.`);
        tree.write(filePath, updatedContent);
    });
};
exports.updateProjectImports = updateProjectImports;
//# sourceMappingURL=project-imports.js.map