import type {
  ClientSideBasePluginConfig,
  LoadedFragment,
} from '@graphql-codegen/visitor-plugin-common'
import type { GraphQLSchema, OperationDefinitionNode } from 'graphql'

import {
  ClientSideBaseVisitor,
  DocumentMode,
  getConfigValue,
} from '@graphql-codegen/visitor-plugin-common'
import autoBind from 'auto-bind'
import { pascalCase } from 'change-case-all'

import type { RawGraphQLRequestPluginConfig } from './config.js'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GraphQLRequestPluginConfig extends ClientSideBasePluginConfig {
  // extensionsType: string;
}

export class GraphQLRequestVisitor extends ClientSideBaseVisitor<
  RawGraphQLRequestPluginConfig,
  GraphQLRequestPluginConfig
> {
  private _externalImportPrefix: string

  private _operationsToInclude: Array<{
    node: OperationDefinitionNode
    documentVariableName: string
    operationType: string
    operationResultType: string
    operationVariablesTypes: string
  }> = []

  constructor(
    schema: GraphQLSchema,
    fragments: Array<LoadedFragment>,
    rawConfig: RawGraphQLRequestPluginConfig,
  ) {
    super(schema, fragments, rawConfig, {
      documentMode: getConfigValue(rawConfig.documentMode, DocumentMode.string),
      importOperationTypesFrom: '',
      inlineFragmentTypes: getConfigValue(
        rawConfig.inlineFragmentTypes,
        'combine',
      ),
      // From `graphql-request` to show how to add additional params
      // extensionsType: getConfigValue(rawConfig.extensionsType, 'any'),
    })

    autoBind(this)

    this._additionalImports = [
      "import { graphql } from '@codelab/shared/infra/gqlgen'",
    ]

    this._externalImportPrefix = this.config.importOperationTypesFrom
      ? `${this.config.importOperationTypesFrom}`
      : '@codelab/shared/infra/gqlgen'
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
  protected override _includeFragments() {
    return ''
  }

  public override OperationDefinition(node: OperationDefinitionNode): string {
    this._collectedOperations.push(node)

    const documentVariableName = this.getOperationVariableName(node)
    const operationType: string = pascalCase(node.operation)

    const operationTypeSuffix: string = this.getOperationSuffix(
      node,
      operationType,
    )

    const operationResultType: string = this.convertName(node, {
      suffix: operationTypeSuffix + this._parsedConfig.operationResultSuffix,
    })

    const operationVariablesTypes: string = this.convertName(node, {
      suffix: operationTypeSuffix + 'Variables',
    })

    let documentString = ''

    if (documentVariableName !== '') {
      // console.log(this._gql(node))

      documentString = `
      export const ${documentVariableName} = graphql(${this._gql(
        node,
      )})${this.getDocumentNodeSignature(
        operationResultType,
        operationVariablesTypes,
        node,
      )}`
    }

    const hasRequiredVariables = this.checkVariablesRequirements(node)

    const additional = this.buildOperation(
      node,
      documentVariableName,
      operationType,
      operationResultType,
      operationVariablesTypes,
      hasRequiredVariables,
    )

    return [documentString, additional].filter((a) => a).join('\n')
  }

  protected override buildOperation(
    node: OperationDefinitionNode,
    documentVariableName: string,
    operationType: string,
    operationResultType: string,
    operationVariablesTypes: string,
    _hasRequiredVariables: boolean,
  ): string {
    // operationResultType = this._externalImportPrefix + operationResultType
    // operationVariablesTypes =
    //   this._externalImportPrefix + operationVariablesTypes

    this._operationsToInclude.push({
      documentVariableName,
      node,
      operationResultType,
      operationType,
      operationVariablesTypes,
    })

    return ''
  }

  public get content(): string {
    return ''
  }
}
