import type { ClientSideBasePluginConfig, LoadedFragment } from '@graphql-codegen/visitor-plugin-common';
import type { GraphQLSchema, OperationDefinitionNode } from 'graphql';
import { ClientSideBaseVisitor } from '@graphql-codegen/visitor-plugin-common';
import type { RawGraphQLRequestPluginConfig } from './config.js';
export interface GraphQLRequestPluginConfig extends ClientSideBasePluginConfig {
}
export declare class GraphQLRequestVisitor extends ClientSideBaseVisitor<RawGraphQLRequestPluginConfig, GraphQLRequestPluginConfig> {
    private _externalImportPrefix;
    private _operationsToInclude;
    constructor(schema: GraphQLSchema, fragments: Array<LoadedFragment>, rawConfig: RawGraphQLRequestPluginConfig);
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
    protected _includeFragments(): string;
    OperationDefinition(node: OperationDefinitionNode): string;
    protected buildOperation(node: OperationDefinitionNode, documentVariableName: string, operationType: string, operationResultType: string, operationVariablesTypes: string, _hasRequiredVariables: boolean): string;
    get content(): string;
}
