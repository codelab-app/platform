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
        const relativeSchemaPath = (0, path_1.join)((0, devkit_1.offsetFromRoot)(projectConfig.root), 'schema.graphql');
        const graphqlConfig = {
            files: ['*.graphql'],
            rules: {},
            // parserOptions: {
            //   schema: relativeSchemaPath,
            // },
        };
        if (json.overrides) {
            // Find the index of existing GraphQL config
            const existingConfigIndex = json.overrides.findIndex((override) => JSON.stringify(override.files) ===
                JSON.stringify(graphqlConfig.files));
            if (existingConfigIndex !== -1) {
                // Replace existing config with new one
                json.overrides[existingConfigIndex] = graphqlConfig;
            }
            else {
                // Add new config if none exists
                json.overrides.push(graphqlConfig);
            }
        }
        return json;
    };
    (0, devkit_1.updateJson)(tree, eslintJsonPath, addGraphqlOverrides);
};
exports.addGraphqlEslintConfig = addGraphqlEslintConfig;
//# sourceMappingURL=add-graphql-eslint-config.js.map