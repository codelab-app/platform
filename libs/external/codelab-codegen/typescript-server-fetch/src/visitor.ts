import type { ParsedConfig } from '@graphql-codegen/visitor-plugin-common'
import type { GraphQLSchema, OperationDefinitionNode } from 'graphql'

import {
  BaseVisitor,
  buildScalarsFromConfig,
  getConfigValue,
} from '@graphql-codegen/visitor-plugin-common'
import autoBind from 'auto-bind'
import { pascalCase } from 'change-case-all'

import type { ServerFetchPluginRawConfig } from './index'

interface Operation {
  node: OperationDefinitionNode
  name: string
  type: string
  resultType: string
  variablesTypes: string
}
export interface ServerFetchVisitorConfig extends ParsedConfig {
  gqlFn: string
  gqlFnPath: string
  graphqlPath: string
}

export class ServerFetchVisitor extends BaseVisitor<
  ServerFetchPluginRawConfig,
  ServerFetchVisitorConfig
> {
  private _operations: Array<Operation> = []

  constructor(schema: GraphQLSchema, rawConfig: ServerFetchPluginRawConfig) {
    super(rawConfig, {
      gqlFn: getConfigValue(rawConfig.gqlFn, ''),
      gqlFnPath: getConfigValue(rawConfig.gqlFnPath, ''),
      graphqlPath: getConfigValue(rawConfig.graphqlPath, ''),
      scalars: buildScalarsFromConfig(schema, rawConfig),
    })

    this._operations = []
    autoBind(this)
  }

  getImports() {
    const documentImports = this._operations
      .map((operation) => operation.name)
      .join(', ')

    return [
      `import { ${this.config.gqlFn} } from '${this.config.gqlFnPath}'`,
      `import { ${documentImports} } from '@codelab/shared/infra/gqlgen'\n`,
      '\n',
    ]
  }

  /**
   * The entry point for the visitor
   * this will be called for each operation
   * @param node
   * @returns
   */
  public OperationDefinition(node: OperationDefinitionNode): string {
    const name = this.convertName(node, {
      suffix: 'Document',
    })

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

      const exportedOperationName = `export const ${pascalCaseName}`
      const operationBody = `${this.config.gqlFn}(${o.name}.toString(), variables, next)`

      const operationArgs = [
        `variables: Types.${o.variablesTypes}`,
        'next?: NextFetchRequestConfig & { revalidateTag?: string }',
      ].join(' ,')

      // server actions must be exported individually
      return `${exportedOperationName} = (${operationArgs}) => ${operationBody}`
    })

    return graphqlOperations.join('\n')
  }
}
