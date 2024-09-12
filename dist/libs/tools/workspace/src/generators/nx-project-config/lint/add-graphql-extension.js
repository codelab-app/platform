"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGraphqlExtension = void 0;
const path_1 = require("path");
const remeda_1 = require("remeda");
/**
 * Add `.graphql` to lintFilePatterns
 */
const addGraphqlExtension = (tree, projectConfig) => {
    console.debug('Adding GraphQL extensions...');
    const lintFilePatterns = [
        (0, path_1.join)(projectConfig.root, '/**/*.{ts,tsx,js,jsx,graphql}'),
    ];
    (0, remeda_1.setPath)(projectConfig, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ['targets', 'lint', 'options', 'lintFilePatterns'], lintFilePatterns);
};
exports.addGraphqlExtension = addGraphqlExtension;
//# sourceMappingURL=add-graphql-extension.js.map