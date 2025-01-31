import type { Types } from '@graphql-codegen/plugin-helpers'
import type { ParsedConfig } from '@graphql-codegen/visitor-plugin-common'
import type { GraphQLSchema, OperationDefinitionNode } from 'graphql'

import {
  BaseVisitor,
  buildScalarsFromConfig,
  getConfigValue,
} from '@graphql-codegen/visitor-plugin-common'
import autoBind from 'auto-bind'
import { pascalCase } from 'change-case-all'
import path from 'path'

import type { FetchPluginRawConfig } from './index'

interface Operation {
  node: OperationDefinitionNode
  name: string
  type: string
  resultType: string
  variablesTypes: string
}
export interface FetchVisitorConfig extends ParsedConfig {
  gqlFn: string
  gqlFnPath: string
}

export class FetchVisitor extends BaseVisitor<
  FetchPluginRawConfig,
  FetchVisitorConfig
> {
  private _operations: Array<Operation> = []

  private _outputFile?: string

  constructor(
    schema: GraphQLSchema,
    rawConfig: FetchPluginRawConfig,
    _: Array<Types.DocumentFile>,
    info?: { outputFile?: string },
  ) {
    super(rawConfig, {
      gqlFn: getConfigValue(rawConfig.gqlFn, ''),
      gqlFnPath: getConfigValue(rawConfig.gqlFnPath, ''),
      scalars: buildScalarsFromConfig(schema, rawConfig),
    })

    this._operations = []
    this._outputFile = path.basename(info?.outputFile || '')
    autoBind(this)
  }

  getImports() {
    const documentImports = this._operations
      .map((operation) => `${operation.name}Document`)
      .join(', ')

    return [
      `import { ${this.config.gqlFn} } from '${this.config.gqlFnPath}'`,
      "import { GraphQLClient } from 'graphql-request'",
      `import { ${documentImports} } from '@codelab/shared/infra/gqlgen'\n`,
    ]
  }

  public OperationDefinition(node: OperationDefinitionNode): string {
    const name = this.convertName(node)
    const type: string = pascalCase(node.operation)
    const typeSuffix: string = this.getOperationSuffix(node, type)
    const resultType: string = this.convertName(node)

    const variablesTypes: string = this.convertName(node, {
      suffix: `${typeSuffix} Variables`,
    })

    this._operations.push({
      name,
      node,
      resultType,
      type,
      variablesTypes,
    })

    return this._operations.map((o) => o.name).join('\n')
  }

  public get content(): string {
    const graphqlOperations = this._operations.map((o) => {
      const operationName = o.node.name?.value

      if (!operationName) {
        throw new Error('Missing operation name')
      }

      const pascalCaseName =
        operationName.charAt(0).toUpperCase() + operationName.slice(1)

      const operationBody = `${this.config.gqlFn}(client, ${o.name}Document.toString(), variables)`
      const operationArgs = [`variables: Types.${o.variablesTypes}`].join(' ,')

      // server actions must be exported individually
      return `${pascalCaseName} : (${operationArgs}) => ${operationBody}`
    })

    const operations =
      graphqlOperations.length > 1
        ? `\n\t${graphqlOperations.join(',\n\t')}\n`
        : graphqlOperations[0]

    return `export const getSdk = (client: GraphQLClient) => ({${operations}})`
  }
}
