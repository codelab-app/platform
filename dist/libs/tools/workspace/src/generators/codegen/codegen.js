"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codegen = void 0;
const devkit_1 = require("@nx/devkit");
const graphql_codegen_1 = require("./graphql-codegen");
/**
 * @deprecated Not used since it's impossible to break up each module to its own types, too much dependency
 */
const codegen = async (tree, projectName) => {
    const projectConfig = (0, devkit_1.readProjectConfiguration)(tree, projectName);
    const { name, sourceRoot } = projectConfig;
    if (!sourceRoot || !name) {
        throw new Error('Missing project configurations');
    }
    await (0, graphql_codegen_1.graphqlCodegen)(sourceRoot, name);
};
exports.codegen = codegen;
//# sourceMappingURL=codegen.js.map