import type { Types } from '@graphql-codegen/plugin-helpers'
import type { ParsedConfig } from '@graphql-codegen/visitor-plugin-common'

import {
  BaseVisitor,
  getConfigValue,
} from '@graphql-codegen/visitor-plugin-common'
import autoBind from 'auto-bind'
import { pascalCase } from 'change-case-all'
import { Kind, type OperationDefinitionNode } from 'graphql'

import type { ServerFetchPluginRawConfig } from './index'

interface Operation {
  name: string
  node: OperationDefinitionNode
  resultType: string
  type: string
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
  public get content(): string {
    const graphqlOperations = this._operations.map((operation) => {
      const operationName = operation.node.name?.value

      if (!operationName) {
        throw new Error('Missing operation name')
      }

      const pascalCaseName =
        operationName.charAt(0).toUpperCase() + operationName.slice(1)

      const exportedOperationName = `export const ${pascalCaseName}`
      const operationBody = `${this.config.gqlFn}(${operation.name}.toString(), variables, next)`

      const operationArgs = [
        `variables: Types.${operation.variablesTypes}`,
        'next?: NextFetchOptions',
      ]
        .join(', ')
        .trim()

      // server actions must be exported individually
      return `${exportedOperationName} = (${operationArgs}) => ${operationBody}`
    })

    return `${graphqlOperations.join('\n')}\n`
  }

  getImports() {
    const documentImports = this._operations
      .map((operation) => operation.name)
      .join(', ')

    return [
      "import type { NextFetchOptions } from '@codelab/shared-abstract-types'",
      `import { ${this.config.gqlFn} } from '${this.config.gqlFnPath}'`,
      `import { ${documentImports} } from '${this.config.graphqlPath}'\n`,
    ]
  }

  private _operations: Array<Operation> = []

  constructor(
    documents: Array<Types.DocumentFile>,
    rawConfig: ServerFetchPluginRawConfig,
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
        const name = this.convertName(node, {
          suffix: 'Document',
        })

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
}
