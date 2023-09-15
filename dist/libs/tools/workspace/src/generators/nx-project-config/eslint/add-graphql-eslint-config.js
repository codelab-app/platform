"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGraphqlEslintConfig = void 0;
const devkit_1 = require("@nx/devkit");
const path_1 = require("path");
/**
 * Output ESLint reporter to tmp library
 */
const addGraphqlEslintConfig = (tree, projectConfig) => {
    console.log('Adding CI lint config...');
    const eslintJsonPath = (0, path_1.join)(projectConfig.root, '.eslintrc.json');
    const addGraphqlOverrides = (json) => {
        const config = {
            files: ['*.graphql'],
            parserOptions: {
                schema: (0, devkit_1.offsetFromRoot)('schema.graphql'),
            },
        };
        json.overrides?.push(config);
        return json;
    };
    (0, devkit_1.updateJson)(tree, eslintJsonPath, addGraphqlOverrides);
};
exports.addGraphqlEslintConfig = addGraphqlEslintConfig;
//# sourceMappingURL=add-graphql-eslint-config.js.map