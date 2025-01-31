"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preset = void 0;
const tslib_1 = require("tslib");
const addPlugin = tslib_1.__importStar(require("@graphql-codegen/add"));
const typedDocumentNodePlugin = tslib_1.__importStar(require("@graphql-codegen/typed-document-node"));
const typescriptPlugin = tslib_1.__importStar(require("@graphql-codegen/typescript"));
const typescriptOperationPlugin = tslib_1.__importStar(require("@graphql-codegen/typescript-operations"));
const visitor_plugin_common_1 = require("@graphql-codegen/visitor-plugin-common");
const process_sources_1 = require("./process-sources");
exports.preset = {
    buildGeneratesSection: (options) => {
        const visitor = new visitor_plugin_common_1.ClientSideBaseVisitor(options.schemaAst, [], options.config, options.config);
        const sourcesWithOperations = (0, process_sources_1.processSources)(options.documents, (node) => node.kind === 'FragmentDefinition'
            ? visitor.getFragmentVariableName(node)
            : visitor.getOperationVariableName(node));
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
                plugins: [{ ['add']: { content: "export * from './graphql.gen'\n" } }],
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
                filename: `${options.baseOutputDir}graphql.gen.ts`,
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
    const d = {};
    d.promise = new Promise((resolve, reject) => {
        d.resolve = resolve;
        d.reject = reject;
    });
    return d;
};
//# sourceMappingURL=index.js.map