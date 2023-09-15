"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGraphqlExtension = void 0;
const tslib_1 = require("tslib");
const set_1 = tslib_1.__importDefault(require("lodash/set"));
const path_1 = require("path");
/**
 * Add `.graphql` to lintFilePatterns
 */
const addGraphqlExtension = (tree, projectConfig) => {
    console.log('Adding GraphQL extensions...');
    const lintFilePatterns = [
        (0, path_1.join)(projectConfig.root, '/**/*.{ts,tsx,js,jsx,graphql}'),
    ];
    (0, set_1.default)(projectConfig, 'targets.lint.options.lintFilePatterns', lintFilePatterns);
};
exports.addGraphqlExtension = addGraphqlExtension;
//# sourceMappingURL=add-graphql-extension.js.map