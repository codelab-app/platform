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
        (0, auto_bind_1.default)(this);
        this._additionalImports = [
            "import { graphql } from '@codelab/shared/infra/gqlgen'",
        ];
        this._externalImportPrefix = this.config.importOperationTypesFrom
            ? `${this.config.importOperationTypesFrom}`
            : '@codelab/shared/infra/gqlgen';
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
            // console.log(this._gql(node))
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
        return '';
    }
}
exports.GraphQLRequestVisitor = GraphQLRequestVisitor;
//# sourceMappingURL=visitor.js.map