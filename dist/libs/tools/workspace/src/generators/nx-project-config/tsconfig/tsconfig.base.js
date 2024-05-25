"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBaseTsconfig = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nx/devkit");
const minimatch_1 = require("minimatch");
const path_1 = tslib_1.__importDefault(require("path"));
const sortKeys = (object) => {
    return Object.fromEntries(Object.entries(object).sort());
};
const updatePaths = (paths, projectSourceRoot, projectFolderPatterns, prefix, tree) => {
    projectFolderPatterns.forEach((projectFolderPattern) => {
        // Determine if the pattern includes a wildcard for subdirectories
        const hasWildcard = projectFolderPattern.includes('/*');
        const baseDir = hasWildcard
            ? projectFolderPattern.split('/*')[0]
            : projectFolderPattern;
        const fullDirPath = `${projectSourceRoot}/${baseDir}`;
        // Log the directory check
        console.log('Checking if exists...', fullDirPath, projectFolderPattern);
        // Check if the directory exists, if not, clear any paths associated with it
        if (!tree.exists(fullDirPath)) {
            console.log('Directory does not exist, clearing related paths:', fullDirPath);
            Object.keys(paths).forEach((key) => {
                if (key.startsWith(`${prefix}/${baseDir}`)) {
                    console.log('Removing path key:', key);
                    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                    delete paths[key];
                }
            });
            return;
        }
        // Handle directory based on whether a wildcard is used
        if (hasWildcard) {
            tree.children(fullDirPath).forEach((subDir) => {
                const fullPath = path_1.default.join(fullDirPath, subDir);
                const relativePath = path_1.default.relative(projectSourceRoot, fullPath);
                if (!tree.isFile(fullPath) &&
                    (0, minimatch_1.minimatch)(relativePath, projectFolderPattern)) {
                    const pathKey = `${prefix}/${baseDir}/${subDir}`;
                    const pathValue = [`${fullPath}/index.ts`];
                    paths[pathKey] = pathValue;
                }
            });
        }
        else {
            // Directly handle the base directory if no wildcard
            const relativePath = path_1.default.relative(projectSourceRoot, fullDirPath);
            if ((0, minimatch_1.minimatch)(relativePath, projectFolderPattern)) {
                const pathKey = `${prefix}/${baseDir}`;
                const pathValue = [`${fullDirPath}/index.ts`];
                paths[pathKey] = pathValue;
            }
        }
    });
};
const updateBaseTsconfig = (tree, project) => {
    const baseTsConfigFile = 'tsconfig.base.json';
    if (!tree.exists(baseTsConfigFile)) {
        console.error('tsconfig.base.json does not exist at the root of your workspace.');
        return;
    }
    const projectName = project.name;
    const sourceRoot = project.sourceRoot;
    if (!projectName || !sourceRoot) {
        console.log('Missing projectName and sourceRoot');
        return;
    }
    const projectPrefix = `@codelab/${projectName}`;
    const directoryMappings = {
        '^frontend-application-(?!shared)$': [
            'graphql',
            'services',
            'views',
            'use-cases/*',
        ],
        '^frontend-application-builder$': ['dnd', 'hooks', 'sections', 'utils'],
        '^frontend-application-dnd$': ['components', 'collision-detection'],
        '^frontend-application-renderer$': ['atoms', 'components', 'hooks'],
        '^frontend-application-resource$': ['components'],
        '^frontend-application-type$': ['interface-form', 'props-form'],
        '^frontend-domain-': ['services', 'store', 'test', 'views', 'use-cases/*'],
        '^frontend-domain-prop$': ['utils'],
    };
    (0, devkit_1.updateJson)(tree, baseTsConfigFile, (json) => {
        const paths = json.compilerOptions.paths || {};
        Object.entries(directoryMappings).forEach(([projectNamePattern, projectFolderPatterns]) => {
            if (new RegExp(projectNamePattern).test(projectName)) {
                console.log('Executing for pattern', projectNamePattern);
                updatePaths(paths, sourceRoot, projectFolderPatterns, projectPrefix, tree);
            }
        });
        json.compilerOptions.paths = sortKeys(paths);
        return json;
    });
};
exports.updateBaseTsconfig = updateBaseTsconfig;
//# sourceMappingURL=tsconfig.base.js.map