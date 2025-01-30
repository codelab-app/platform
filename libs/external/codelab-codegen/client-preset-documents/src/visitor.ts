import type { Types } from '@graphql-codegen/plugin-helpers'
import type { ParsedConfig } from '@graphql-codegen/visitor-plugin-common'
import type { GraphQLSchema, OperationDefinitionNode } from 'graphql'

import { BaseVisitor } from '@graphql-codegen/visitor-plugin-common'
import autoBind from 'auto-bind'
import { pascalCase } from 'change-case-all'
import { print } from 'graphql'

import type { ClientPresetPluginRawConfig } from './index'

interface Operation {
  node: OperationDefinitionNode
  name: string
  type: string
  resultType: string
  variablesTypes: string
}
export type ClientPresetVisitorConfig = ParsedConfig

export class ClientPresetVisitor extends BaseVisitor<
  ClientPresetPluginRawConfig,
  ClientPresetVisitorConfig
> {
  private _operations: Array<Operation> = []

  constructor(
    schema: GraphQLSchema,
    rawConfig: ClientPresetPluginRawConfig,
    documents: Array<Types.DocumentFile>,
    info?: { outputFile?: string },
  ) {
    super(rawConfig, {})
    this._operations = []
    autoBind(this)
  }

  getImports() {
    return ["import { graphql } from '@codelab/shared/infra/gqlgen'"]
  }

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
      return `export const ${o.name} = graphql(\`${print(o.node)}\`)`
    })

    return `\n${graphqlOperations.join('\n')}\n`
  }
}
