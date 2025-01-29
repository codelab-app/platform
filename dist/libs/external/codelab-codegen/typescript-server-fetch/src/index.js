"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.plugin = void 0;
const graphql_1 = require("graphql");
const plugin_helpers_1 = require("@graphql-codegen/plugin-helpers");
const path_1 = require("path");
const server_fetch_visitor_1 = require("./server-fetch-visitor");
const plugin = (schema, documents, config, info) => {
    const allAst = (0, graphql_1.concatAST)(documents.map((v) => v.document));
    const allFragments = [
        ...allAst.definitions.filter((d) => d.kind === graphql_1.Kind.FRAGMENT_DEFINITION).map((fragmentDef) => ({
            isExternal: false,
            name: fragmentDef.name.value,
            node: fragmentDef,
            onType: fragmentDef.typeCondition.name.value,
        })),
        ...(config.externalFragments || []),
    ];
    const visitor = new server_fetch_visitor_1.ServerFetchVisitor(schema, config, documents, info);
    const visitorResult = (0, plugin_helpers_1.oldVisit)(allAst, { leave: visitor });
    return {
        content: visitor.content,
        prepend: visitor.getImports(),
    };
};
exports.plugin = plugin;
const validate = async (schema, documents, config, outputFile) => {
    if (!['.ts'].includes((0, path_1.extname)(outputFile))) {
        throw new Error('Plugin "typescript-fetch" requires extension to be ".ts"!');
    }
};
exports.validate = validate;
//# sourceMappingURL=index.js.map