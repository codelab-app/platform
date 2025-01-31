"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchVisitor = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const visitor_plugin_common_1 = require("@graphql-codegen/visitor-plugin-common");
const auto_bind_1 = tslib_1.__importDefault(require("auto-bind"));
const change_case_all_1 = require("change-case-all");
class FetchVisitor extends visitor_plugin_common_1.BaseVisitor {
    constructor(documents, rawConfig) {
        super(rawConfig, {
            gqlFn: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.gqlFn, ''),
            gqlFnPath: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.gqlFnPath, ''),
            graphqlPath: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.graphqlPath, ''),
        });
        Object.defineProperty(this, "_operations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this._operations = documents
            .flatMap((v) => v.document?.definitions)
            .filter((de) => de?.kind === graphql_1.Kind.OPERATION_DEFINITION)
            .map((node) => {
            const name = this.convertName(node);
            const type = (0, change_case_all_1.pascalCase)(node.operation);
            const typeSuffix = this.getOperationSuffix(node, type);
            const resultType = this.convertName(node);
            const variablesTypes = this.convertName(node, {
                suffix: `${typeSuffix} Variables`,
            });
            return {
                name,
                node,
                resultType,
                type,
                variablesTypes,
            };
        });
        (0, auto_bind_1.default)(this);
    }
    getImports() {
        const documentImports = this._operations
            .map((operation) => `${operation.name}Document`)
            .join(', ');
        return [
            `import { ${this.config.gqlFn} } from '${this.config.gqlFnPath}'`,
            "import { GraphQLClient } from 'graphql-request'",
            `import { ${documentImports} } from '${this.config.graphqlPath}'\n`,
        ];
    }
    get content() {
        const graphqlOperations = this._operations.map((o) => {
            const operationName = o.node.name?.value;
            if (!operationName) {
                throw new Error('Missing operation name');
            }
            const pascalCaseName = operationName.charAt(0).toUpperCase() + operationName.slice(1);
            const operationBody = `${this.config.gqlFn}(client, ${o.name}Document.toString(), variables)`;
            const operationArgs = [`variables: Types.${o.variablesTypes}`].join(' ,');
            // server actions must be exported individually
            return `${pascalCaseName} : (${operationArgs}) => ${operationBody}`;
        });
        const operations = graphqlOperations.length > 1
            ? `\n\t${graphqlOperations.join(',\n\t')}\n`
            : graphqlOperations[0];
        return `export const getSdk = (client: GraphQLClient) => ({${operations}})`;
    }
}
exports.FetchVisitor = FetchVisitor;
//# sourceMappingURL=visitor.js.map