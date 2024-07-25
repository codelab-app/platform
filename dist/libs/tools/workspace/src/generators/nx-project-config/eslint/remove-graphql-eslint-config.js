"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeGraphqlEslintConfig = void 0;
const devkit_1 = require("@nx/devkit");
const path_1 = require("path");
const removeGraphqlEslintConfig = (tree, projectConfig) => {
    console.log('Removing GraphQL lint config...');
    const eslintJsonPath = (0, path_1.join)(projectConfig.root, '.eslintrc.json');
    const removeGraphqlOverrides = (json) => {
        if (json.overrides) {
            // Find the index of existing GraphQL config
            const existingConfigIndex = json.overrides.findIndex((override) => JSON.stringify(override.files) === JSON.stringify(['*.graphql']));
            if (existingConfigIndex !== -1) {
                // Remove the GraphQL config
                json.overrides.splice(existingConfigIndex, 1);
            }
        }
        return json;
    };
    (0, devkit_1.updateJson)(tree, eslintJsonPath, removeGraphqlOverrides);
};
exports.removeGraphqlEslintConfig = removeGraphqlEslintConfig;
//# sourceMappingURL=remove-graphql-eslint-config.js.map