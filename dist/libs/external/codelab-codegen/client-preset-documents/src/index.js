"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.plugin = void 0;
const plugin_helpers_1 = require("@graphql-codegen/plugin-helpers");
const graphql_1 = require("graphql");
const path_1 = require("path");
const visitor_1 = require("./visitor");
const plugin = (schema, documents, config, info) => {
    const allAst = (0, graphql_1.concatAST)(documents.map((v) => v.document));
    const allFragments = [
        ...allAst.definitions.filter(d => d.kind === graphql_1.Kind.FRAGMENT_DEFINITION).map(fragmentDef => ({
            node: fragmentDef,
            name: fragmentDef.name.value,
            onType: fragmentDef.typeCondition.name.value,
            isExternal: false,
        })),
        ...(config.externalFragments || []),
    ];
    const visitor = new visitor_1.ClientPresetVisitor(schema, config, documents, info);
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