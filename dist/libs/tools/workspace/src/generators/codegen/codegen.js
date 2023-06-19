"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codegen = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nx/devkit");
const graphql_codegen_1 = require("./graphql-codegen");
/**
 * @deprecated Not used since it's impossible to break up each module to its own types, too much dependency
 */
const codegen = (tree, projectName) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const projectConfig = (0, devkit_1.readProjectConfiguration)(tree, projectName);
    const { name, sourceRoot } = projectConfig;
    if (!sourceRoot || !name) {
        throw new Error('Missing project configurations');
    }
    yield (0, graphql_codegen_1.graphqlCodegen)(sourceRoot, name);
});
exports.codegen = codegen;
//# sourceMappingURL=codegen.js.map