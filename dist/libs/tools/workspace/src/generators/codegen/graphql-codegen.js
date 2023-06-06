"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlCodegen = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@graphql-codegen/core");
const typescriptPlugin = tslib_1.__importStar(require("@graphql-codegen/typescript"));
const graphql_file_loader_1 = require("@graphql-tools/graphql-file-loader");
const load_1 = require("@graphql-tools/load");
const url_loader_1 = require("@graphql-tools/url-loader");
const fs_1 = tslib_1.__importDefault(require("fs"));
const globby_1 = tslib_1.__importDefault(require("globby"));
const graphql_1 = require("graphql");
/**
 *
 * @param sourceRoot Use source root of lib to search for graphql documents
 */
const graphqlCodegen = (sourceRoot, libName) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // Schema
    const schema = yield (0, load_1.loadSchema)('http://127.0.0.1:3000/api/graphql', {
        loaders: [new url_loader_1.UrlLoader()],
    });
    // const schema = await loadSchema('your-schema.graphql', {
    //   loaders: [new GraphQLFileLoader()],
    // })
    const documentFiles = globby_1.default.sync(`${sourceRoot}/**/*.graphql`, {
        gitignore: true,
    });
    console.log({ libName, sourceRoot });
    console.log({ documentFiles });
    // Documents - this is an example, you might need to adjust according to your file structure
    const documents = yield (0, load_1.loadDocuments)(documentFiles, {
        loaders: [new graphql_file_loader_1.GraphQLFileLoader()],
    });
    // Call the codegen function
    const output = yield (0, core_1.codegen)({
        config: {
            defaultScalarType: 'unknown',
            gqlImport: 'graphql-tag#gql',
            inlineFragmentTypes: 'combine',
            namingConvention: {
                enumValues: 'keep',
            },
            scalars: {
                _Any: 'any',
                DateTime: 'string',
                Int64: 'number',
                JSON: 'Record<string, any>',
                JSONObject: 'Record<string, any>',
                uuid: 'string',
                Void: 'void',
            },
            skipTypename: true,
            strictScalars: true,
        },
        documents,
        filename: 'graphql.gen.ts',
        pluginMap: {
            typescript: typescriptPlugin,
            // typescriptOperations: typescriptOperationsPlugin,
            // typescriptGraphqlRequest: typescriptGraphqlRequestPlugin,
        },
        plugins: [
            { typescript: {} },
            // { typescriptOperations: {} },
            // { typescriptGraphqlRequestPlugin: {} },
        ],
        schema: (0, graphql_1.parse)((0, graphql_1.printSchema)(schema)),
    });
    // Write output to a file
    fs_1.default.writeFileSync(`${libName}.ts`, output);
});
exports.graphqlCodegen = graphqlCodegen;
//# sourceMappingURL=graphql-codegen.js.map