"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateToViteLibs = void 0;
const devkit_1 = require("@nx/devkit");
const path_1 = require("path");
const migrateToViteLibs = async (tree, projectConfig) => {
    console.log('Migrating to Vite libs:', projectConfig.name);
    // Cast to include npmScope, handling potential type mismatch
    const nxJson = (0, devkit_1.readNxJson)(tree);
    if (!nxJson) {
        throw new Error('nx.json not found');
    }
    const substitutions = {
        // Calculate cacheDir relative to workspace root
        cacheDir: (0, devkit_1.joinPathFragments)((0, devkit_1.offsetFromRoot)(projectConfig.root), 'node_modules/.vite', projectConfig.root),
        libName: projectConfig.name,
    };
    // Path to the template files directory
    const templateDir = (0, path_1.join)(__dirname, 'files');
    // Target directory (project root)
    const targetDir = projectConfig.root;
    (0, devkit_1.generateFiles)(tree, templateDir, targetDir, substitutions);
    console.log(`Generated Vite config in: ${targetDir}`);
};
exports.migrateToViteLibs = migrateToViteLibs;
//# sourceMappingURL=migrate-to-vite-libs.js.map