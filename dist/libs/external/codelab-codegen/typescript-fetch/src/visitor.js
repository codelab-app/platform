"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLRequestVisitor = void 0;
const tslib_1 = require("tslib");
const visitor_plugin_common_1 = require("@graphql-codegen/visitor-plugin-common");
const auto_bind_1 = tslib_1.__importDefault(require("auto-bind"));
const change_case_all_1 = require("change-case-all");
const path_1 = tslib_1.__importDefault(require("path"));
class GraphQLRequestVisitor extends visitor_plugin_common_1.ClientSideBaseVisitor {
    constructor(schema, fragments, rawConfig, info) {
        super(schema, fragments, rawConfig, {
            documentMode: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.documentMode, visitor_plugin_common_1.DocumentMode.string),
            importOperationTypesFrom: '',
            inlineFragmentTypes: (0, visitor_plugin_common_1.getConfigValue)(rawConfig.inlineFragmentTypes, 'combine'),
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
        Object.defineProperty(this, "_outputFile", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._outputFile = path_1.default.basename(info?.outputFile || '');
        (0, auto_bind_1.default)(this);
        this._additionalImports = [
            "import { graphql } from '@codelab/shared/infra/gql'",
            "import { gqlFetch } from '@codelab/shared/infra/fetch'",
        ];
        this._externalImportPrefix = this.config.importOperationTypesFrom
            ? `${this.config.importOperationTypesFrom}`
            : '@codelab/shared/infra/gql';
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
        const hasRequiredVariables = this.checkVariablesRequirements(node);
        const additional = this.buildOperation(node, documentVariableName, operationType, operationResultType, operationVariablesTypes, hasRequiredVariables);
        return [additional].filter((a) => a).join('\n');
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
            // Here we import the generated documents to use with our operations
            `import { ${documentImports} } from './${this._outputFile
                ?.replace('.api.', '.api.documents.')
                .replace('.ts', '')}'`,
            // ...this._additionalImports,
        ];
        const graphqlOperations = this._operationsToInclude.map((o) => {
            const operationName = o.node.name?.value;
            if (!operationName) {
                throw new Error('Missing operation name');
            }
            const pascalCaseName = operationName.charAt(0).toUpperCase() + operationName.slice(1);
            // server actions must be exported individually
            return `export const ${pascalCaseName} = (variables: ${o.operationVariablesTypes}, next?: NextFetchRequestConfig) =>
  gqlFetch(${o.documentVariableName}.toString(), variables, next)`;
        });
        return `
      ${imports.join('\n')}

      ${graphqlOperations.join('\n\n')}`;
    }
}
exports.GraphQLRequestVisitor = GraphQLRequestVisitor;
//# sourceMappingURL=visitor.js.map