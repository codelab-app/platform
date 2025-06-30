"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNodesV2 = void 0;
const devkit_1 = require("@nx/devkit");
const fs_1 = require("fs");
const path_1 = require("path");
exports.createNodesV2 = [
    '**/tsconfig{.spec,}.json',
    async (configFiles, options, context) => {
        return await (0, devkit_1.createNodesFromFiles)((configFile, _options, _context) => createNodesInternal(configFile, _options, _context), configFiles, options ?? {}, context);
    },
];
const createNodesInternal = async (configFilePath, options, context) => {
    const projectConfiguration = (0, devkit_1.readJsonFile)(configFilePath);
    const projectRoot = (0, path_1.dirname)(configFilePath);
    // Skip root project
    if (projectRoot === '.') {
        return {};
    }
    const isProject = (0, fs_1.existsSync)((0, path_1.join)(projectRoot, 'project.json')) ||
        (0, fs_1.existsSync)((0, path_1.join)(projectRoot, 'package.json'));
    if (!isProject) {
        return {};
    }
    // Check which config files exist in the project
    const tsconfigPath = (0, path_1.join)(projectRoot, 'tsconfig.json');
    const tsconfigSpecPath = (0, path_1.join)(projectRoot, 'tsconfig.spec.json');
    const hasTsconfig = (0, fs_1.existsSync)(tsconfigPath);
    const hasTsconfigSpec = (0, fs_1.existsSync)(tsconfigSpecPath);
    // Build command based on which files exist
    let command;
    if (hasTsconfig && hasTsconfigSpec) {
        command = `tsc -p ${tsconfigPath} && tsc -p ${tsconfigSpecPath}`;
    }
    else if (hasTsconfig) {
        command = `tsc -p ${tsconfigPath}`;
    }
    else {
        command = `tsc -p ${tsconfigSpecPath}`;
    }
    return {
        projects: {
            [projectRoot]: {
                targets: {
                    'tsc-check': {
                        cache: true,
                        command,
                    },
                },
            },
        },
    };
};
//# sourceMappingURL=index.js.map