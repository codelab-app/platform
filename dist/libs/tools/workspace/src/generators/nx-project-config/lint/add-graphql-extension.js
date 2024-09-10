"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGraphqlExtension = void 0;
const path_1 = require("path");
/**
 * Add `.graphql` to lintFilePatterns
 */
const addGraphqlExtension = (tree, projectConfig) => {
    console.debug('Adding GraphQL extensions...');
    const lintFilePatterns = [
        (0, path_1.join)(projectConfig.root, '/**/*.{ts,tsx,js,jsx,graphql}'),
    ];
    if (!projectConfig.targets) {
        projectConfig.targets = {};
    }
    if (!projectConfig.targets.lint) {
        projectConfig.targets.lint = { options: {} };
    }
    if (!projectConfig.targets.lint.options) {
        projectConfig.targets.lint.options = {};
    }
    projectConfig.targets.lint.options.lintFilePatterns = lintFilePatterns;
};
exports.addGraphqlExtension = addGraphqlExtension;
//# sourceMappingURL=add-graphql-extension.js.map