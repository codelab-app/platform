"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLRequestVisitor = void 0;
const tslib_1 = require("tslib");
const visitor_plugin_common_1 = require("@graphql-codegen/visitor-plugin-common");
const auto_bind_1 = tslib_1.__importDefault(require("auto-bind"));
const change_case_all_1 = require("change-case-all");
class GraphQLRequestVisitor extends visitor_plugin_common_1.ClientSideBaseVisitor {
    constructor(schema, fragments, rawConfig) {
        super(schema, fragments, rawConfig, {
            documentMode: visitor_plugin_common_1.DocumentMode.string,
            // From `graphql-request` to show how to add additional params
            // extensionsType: getConfigValue(rawConfig.extensionsType, 'any'),
        });
        Object.defineProperty(this, "_externalImportPrefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_operationsToInclude", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        (0, auto_bind_1.default)(this);
        this._additionalImports = [
            "import { graphql } from '@codelab/frontend/infra/gql'",
            "import { gqlFetch } from '@codelab/frontend/infra/graphql'",
        ];
        this._externalImportPrefix = this.config.importOperationTypesFrom
            ? `${this.config.importOperationTypesFrom}`
            : '@codelab/frontend/infra/gql';
    }
    /**
     * `export const GetAppsDocument = graphql(gql`
    query GetApps($options: AppOptions, $where: AppWhere) {
      aggregate: appsAggregate(where: $where) {
        count
      }
      items: apps(options: $options, where: $where) {
        ...App
      }
    }
    ${AppFragmentDoc}
  `)`
      Removes fragments
     */
    _includeFragments() {
        return '';
    }
    OperationDefinition(node) {
        this._collectedOperations.push(node);
        const documentVariableName = this.getOperationVariableName(node);
        const operationType = (0, change_case_all_1.pascalCase)(node.operation);
        const operationTypeSuffix = this.getOperationSuffix(node, operationType);
        const operationResultType = this.convertName(node, {
            suffix: operationTypeSuffix + this._parsedConfig.operationResultSuffix,
        });
        const operationVariablesTypes = this.convertName(node, {
            suffix: operationTypeSuffix + 'Variables',
        });
        let documentString = '';
        if (documentVariableName !== '') {
            console.log(this._gql(node));
            documentString = `
      export const ${documentVariableName} = graphql(${this._gql(node)})${this.getDocumentNodeSignature(operationResultType, operationVariablesTypes, node)}`;
        }
        const hasRequiredVariables = this.checkVariablesRequirements(node);
        const additional = this.buildOperation(node, documentVariableName, operationType, operationResultType, operationVariablesTypes, hasRequiredVariables);
        return [documentString, additional].filter((a) => a).join('\n');
    }
    buildOperation(node, documentVariableName, operationType, operationResultType, operationVariablesTypes, _hasRequiredVariables) {
        // operationResultType = this._externalImportPrefix + operationResultType
        // operationVariablesTypes =
        //   this._externalImportPrefix + operationVariablesTypes
        this._operationsToInclude.push({
            documentVariableName,
            node,
            operationResultType,
            operationType,
            operationVariablesTypes,
        });
        return '';
    }
    get content() {
        const typeImports = this._operationsToInclude
            .map((o) => `type ${o.operationVariablesTypes}`)
            .join(', ');
        const documentImports = this._operationsToInclude
            .map((o) => o.documentVariableName)
            .join(', ');
        const imports = [
            `import { ${typeImports} } from '${this._externalImportPrefix}'`,
            // ...this._additionalImports,
        ];
        const graphqlOperations = this._operationsToInclude.map((o) => {
            const operationName = o.node.name?.value;
            if (!operationName) {
                throw new Error('Missing operation name');
            }
            const pascalCaseName = operationName.charAt(0).toUpperCase() + operationName.slice(1);
            return `const ${pascalCaseName} = (variables: ${o.operationVariablesTypes}, next?: NextFetchRequestConfig) =>
  gqlFetch(${o.documentVariableName}, variables, next)`;
        });
        /**
         * Export everything under a function `getSdk()` to resemble the `graphql-request` package for easier migration
         */
        const sdkExport = `export const getSdk = () => ({ ${this._operationsToInclude
            .map((o) => {
            const operationName = o.node.name?.value;
            if (!operationName) {
                throw new Error('Missing operation name');
            }
            const pascalCaseName = operationName.charAt(0).toUpperCase() + operationName.slice(1);
            return `${pascalCaseName}`;
        })
            .join(',')} })`;
        return `${imports.join('\n')}

    ${graphqlOperations.join('\n\n')}

    ${sdkExport}
`;
    }
}
exports.GraphQLRequestVisitor = GraphQLRequestVisitor;
//# sourceMappingURL=visitor.js.map