"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preset = void 0;
const tslib_1 = require("tslib");
const addPlugin = tslib_1.__importStar(require("@graphql-codegen/add"));
const typedDocumentNodePlugin = tslib_1.__importStar(require("@graphql-codegen/typed-document-node"));
const typescriptPlugin = tslib_1.__importStar(require("@graphql-codegen/typescript"));
const typescriptOperationPlugin = tslib_1.__importStar(require("@graphql-codegen/typescript-operations"));
const visitor_plugin_common_1 = require("@graphql-codegen/visitor-plugin-common");
const graphql_1 = require("graphql");
exports.preset = {
    buildGeneratesSection: (options) => {
        if (!options.schemaAst) {
            throw new Error('Schema AST is required');
        }
        const visitor = new visitor_plugin_common_1.ClientSideBaseVisitor(options.schemaAst, [], options.config, options.config);
        const sourcesWithOperations = options.documents.map((source) => {
            const { document } = source;
            const operations = (document?.definitions || [])
                .filter((definition) => definition.kind === graphql_1.Kind.OPERATION_DEFINITION ||
                definition.kind === graphql_1.Kind.FRAGMENT_DEFINITION)
                .map((definition) => ({
                definition,
                initialName: definition.kind === graphql_1.Kind.FRAGMENT_DEFINITION
                    ? visitor.getFragmentVariableName(definition)
                    : visitor.getOperationVariableName(definition),
            }));
            return { operations, source };
        });
        const sources = sourcesWithOperations.map(({ source }) => source);
        const tdnFinished = createDeferred();
        const pluginMap = {
            ...options.pluginMap,
            ['add']: addPlugin,
            ['typed-document-node']: {
                ...typedDocumentNodePlugin,
                plugin: async (...args) => {
                    try {
                        return await typedDocumentNodePlugin.plugin(...args);
                    }
                    finally {
                        tdnFinished.resolve();
                    }
                },
            },
            ['typescript']: typescriptPlugin,
            ['typescript-operations']: typescriptOperationPlugin,
        };
        const plugins = [
            { ['add']: { content: '/* eslint-disable */' } },
            { ['typescript']: {} },
            { ['typescript-operations']: {} },
            { ['typed-document-node']: {} },
        ];
        return [
            /**
             * create index.ts file to export generated types
             */
            {
                config: {},
                documents: [],
                documentTransforms: options.documentTransforms,
                filename: `${options.baseOutputDir}index.ts`,
                pluginMap: { ['add']: addPlugin },
                plugins: [{ ['add']: { content: "export * from './graphql'\n" } }],
                schema: options.schema,
            },
            /**
             * create gql file which contain generated fragments and operations
             */
            {
                config: {
                    documentMode: visitor_plugin_common_1.DocumentMode.string,
                },
                documents: sources,
                documentTransforms: options.documentTransforms,
                filename: `${options.baseOutputDir}graphql.ts`,
                pluginMap,
                plugins,
                schema: options.schema,
            },
        ];
    },
    prepareDocuments: (outputFilePath, outputSpecificDocuments) => [
        ...outputSpecificDocuments,
        `!${outputFilePath}`,
    ],
};
const createDeferred = () => {
    const deferred = {};
    deferred.promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve;
        deferred.reject = reject;
    });
    return deferred;
};
//# sourceMappingURL=index.js.map