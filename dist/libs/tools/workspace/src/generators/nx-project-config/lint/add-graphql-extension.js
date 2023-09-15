"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGraphqlExtension = void 0;
const tslib_1 = require("tslib");
const merge_1 = tslib_1.__importDefault(require("lodash/merge"));
const addExtensionToGlob = (glob, extension) => {
    return glob.replace(/(\{.*\})/, `$1,${extension}`);
};
const addGraphqlExtension = (tree, projectConfig) => {
    const lintFilePatterns = projectConfig.targets?.lint?.options.lintFilePatterns;
    (0, merge_1.default)(projectConfig, {
        targets: {
            lint: {
                options: {
                    lintFilePatterns: addExtensionToGlob(lintFilePatterns, 'graphql'),
                },
            },
        },
    });
};
exports.addGraphqlExtension = addGraphqlExtension;
//# sourceMappingURL=add-graphql-extension.js.map