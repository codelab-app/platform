import type {
  ClientSideBasePluginConfig,
  LoadedFragment,
} from '@graphql-codegen/visitor-plugin-common'
import {
  ClientSideBaseVisitor,
  DocumentMode,
  getConfigValue,
  indentMultiline,
} from '@graphql-codegen/visitor-plugin-common'
import autoBind from 'auto-bind'
import { pascalCase } from 'change-case-all'
import type { GraphQLSchema, OperationDefinitionNode } from 'graphql'
import { Kind, print } from 'graphql'
import type { RawGraphQLRequestPluginConfig } from './config.js'

export type GraphQLRequestPluginConfig = ClientSideBasePluginConfig

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
      documentMode: DocumentMode.string,
    })

    autoBind(this)

    this._additionalImports = [
      "import { graphql } from '@codelab/frontend/infra/gql'",
      "import { gqlFetch } from '@codelab/frontend/infra/graphql'",
    ]

    // this._externalImportPrefix = this.config.importOperationTypesFrom
    //   ? `${this.config.importOperationTypesFrom}`
    //   : '@codelab/frontend/infra/gql'
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
    const typeImports = this._operationsToInclude
      .map((o) => `type ${o.operationVariablesTypes}`)
      .join(', ')

    const documentImports = this._operationsToInclude
      .map((o) => o.documentVariableName)
      .join(', ')

    const imports = [
      `import { ${typeImports} } from '${this._externalImportPrefix}'`,
      // ...this._additionalImports,
    ]

    const apiFunctions = this._operationsToInclude
      .map((o) => {
        const operationName = o.node.name?.value

        if (!operationName) {
          return ''
        }

        const camelCaseName =
          operationName.charAt(0).toLowerCase() + operationName.slice(1)

        return `export const ${camelCaseName}${o.operationType} = (variables: ${o.operationVariablesTypes}) =>
  gqlFetch(${o.documentVariableName}, variables)`
      })
      .filter(Boolean)

    return `${imports.join('\n')}

    ${apiFunctions.join('\n\n')}
`
  }
}
