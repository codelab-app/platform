import type { Types } from '@graphql-codegen/plugin-helpers'
import type { ParsedConfig } from '@graphql-codegen/visitor-plugin-common'

import {
  BaseVisitor,
  getConfigValue,
} from '@graphql-codegen/visitor-plugin-common'
import autoBind from 'auto-bind'
import { pascalCase } from 'change-case-all'
import { Kind, type OperationDefinitionNode } from 'graphql'

import type { FetchPluginRawConfig } from './index'

interface Operation {
  name: string
  node: OperationDefinitionNode
  resultType: string
  type: string
  variablesTypes: string
}
export interface FetchVisitorConfig extends ParsedConfig {
  gqlFn: string
  gqlFnPath: string
  graphqlPath: string
}

export class FetchVisitor extends BaseVisitor<
  FetchPluginRawConfig,
  FetchVisitorConfig
> {
  constructor(
    documents: Array<Types.DocumentFile>,
    rawConfig: FetchPluginRawConfig,
  ) {
    super(rawConfig, {
      gqlFn: getConfigValue(rawConfig.gqlFn, ''),
      gqlFnPath: getConfigValue(rawConfig.gqlFnPath, ''),
      graphqlPath: getConfigValue(rawConfig.graphqlPath, ''),
    })

    this._operations = documents
      .flatMap((doc) => doc.document?.definitions)
      .filter((de) => de?.kind === Kind.OPERATION_DEFINITION)
      .map((node) => {
        const name = this.convertName(node)
        const type: string = pascalCase(node.operation)
        const typeSuffix: string = this.getOperationSuffix(node, type)
        const resultType: string = this.convertName(node)

        const variablesTypes: string = this.convertName(node, {
          suffix: `${typeSuffix} Variables`,
        })

        return {
          name,
          node,
          resultType,
          type,
          variablesTypes,
        }
      })

    autoBind(this)
  }
  public get content(): string {
    const graphqlOperations = this._operations.map((operation) => {
      const operationName = operation.node.name?.value

      if (!operationName) {
        throw new Error('Missing operation name')
      }

      const pascalCaseName =
        operationName.charAt(0).toUpperCase() + operationName.slice(1)

      const operationBody = `${this.config.gqlFn}(client, ${operation.name}Document.toString(), variables)`
      const operationArgs = [
        `variables: Types.${operation.variablesTypes}`,
      ].join(', ')

      // server actions must be exported individually
      return `${pascalCaseName}: (${operationArgs}) => ${operationBody}`
    })

    const operations =
      graphqlOperations.length > 1
        ? `\n\t${graphqlOperations.join(',\n\t')}\n`
        : graphqlOperations[0]

    return `export const getSdk = (client: GraphQLClient) => ({${operations}})\n`
  }

  getImports() {
    const documentImports = this._operations
      .map((operation) => `${operation.name}Document`)
      .join(', ')

    return [
      `import { ${this.config.gqlFn} } from '${this.config.gqlFnPath}'`,
      "import { GraphQLClient } from 'graphql-request'",
      `import { ${documentImports} } from '${this.config.graphqlPath}'\n`,
    ]
  }

  private _operations: Array<Operation> = []
}
