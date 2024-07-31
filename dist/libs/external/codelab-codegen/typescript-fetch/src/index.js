"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLRequestVisitor = exports.validate = exports.plugin = void 0;
const plugin_helpers_1 = require("@graphql-codegen/plugin-helpers");
const graphql_1 = require("graphql");
const path_1 = require("path");
const visitor_js_1 = require("./visitor.js");
Object.defineProperty(exports, "GraphQLRequestVisitor", { enumerable: true, get: function () { return visitor_js_1.GraphQLRequestVisitor; } });
const plugin = (schema, documents, config) => {
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
    const visitor = new visitor_js_1.GraphQLRequestVisitor(schema, allFragments, config);
    const visitorResult = (0, plugin_helpers_1.oldVisit)(allAst, { leave: visitor });
    return {
        content: [
            visitor.fragments,
            ...visitorResult.definitions.filter((t) => typeof t === 'string'),
            visitor.content,
        ].join('\n'),
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