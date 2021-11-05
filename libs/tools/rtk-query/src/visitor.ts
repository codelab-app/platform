import { Types } from '@graphql-codegen/plugin-helpers'
import {
  ClientSideBaseVisitor,
  getConfigValue,
  LoadedFragment,
} from '@graphql-codegen/visitor-plugin-common'
import autoBind from 'auto-bind'
import { pascalCase } from 'change-case-all'
import { GraphQLSchema, OperationDefinitionNode } from 'graphql'
import { RTKQueryPluginConfig, RTKQueryRawPluginConfig } from './config'

export class RTKQueryVisitor extends ClientSideBaseVisitor<
  RTKQueryRawPluginConfig,
  RTKQueryPluginConfig
> {
  private _externalImportPrefix: string

  private _endpoints: Array<string> = []

  private _hooks: Array<string> = []

  constructor(
    schema: GraphQLSchema,
    fragments: Array<LoadedFragment>,
    protected rawConfig: RTKQueryRawPluginConfig,
    documents: Array<Types.DocumentFile>,
  ) {
    super(schema, fragments, rawConfig, {
      exportHooks: getConfigValue(rawConfig.exportHooks, false),
      importBaseApiFrom: getConfigValue(rawConfig.importBaseApiFrom, ''),
      overrideExisting: getConfigValue(rawConfig.overrideExisting, ''),
    })
    this._externalImportPrefix = this.config.importOperationTypesFrom
      ? `${this.config.importOperationTypesFrom}.`
      : ''
    this._documents = documents

    autoBind(this)
  }

  public get imports(): Set<string> {
    return this._imports
  }

  public get hasOperations() {
    return this._collectedOperations.length > 0
  }

  public getImports(): Array<string> {
    const baseImports = super.getImports()

    if (!this.hasOperations) {
      return baseImports
    }

    return [
      ...baseImports,
      `import { api, GraphqlOperationOptions } from '${this.config.importBaseApiFrom}';`,
    ]
  }

  public getInjectCall() {
    if (this._endpoints.length === 0) {
      return
    }

    return (
      `
  const injectedRtkApi = api.injectEndpoints({
    ${
      !this.config.overrideExisting
        ? ''
        : `overrideExisting: ${this.config.overrideExisting},
    `
    }endpoints: (build) => ({${this._endpoints.join('')}
    }),
  });
  export { injectedRtkApi as api };
  ` +
      (this.config.exportHooks
        ? `export const { ${this._hooks.join(', ')} } = injectedRtkApi;`
        : '') +
      '\n\n'
    )
  }

  protected buildOperation(
    node: OperationDefinitionNode,
    documentVariableName: string,
    operationType: string,
    operationResultType: string,
    operationVariablesTypes: string,
    hasRequiredVariables: boolean,
  ): string {
    operationResultType = this._externalImportPrefix + operationResultType
    operationVariablesTypes =
      this._externalImportPrefix + operationVariablesTypes

    const operationName = node.name?.value

    if (!operationName) {
      return ''
    }

    const Generics = `${operationResultType}, GraphqlOperationOptions<${operationVariablesTypes}>${
      hasRequiredVariables ? '' : ' | void | undefined'
    }`

    if (operationType === 'Query') {
      this._endpoints.push(`
      ${operationName}: build.query<${Generics}>({
        query: (options) => ({ document: ${documentVariableName}, options: options ?? undefined })
      }),`)

      if (this.config.exportHooks) {
        this._hooks.push(`use${pascalCase(operationName)}Query`)
        this._hooks.push(`useLazy${pascalCase(operationName)}Query`)
      }
    } else if (operationType === 'Mutation') {
      this._endpoints.push(`
      ${operationName}: build.mutation<${Generics}>({
        query: (options) => ({ document: ${documentVariableName}, options: options ?? undefined })
      }),`)

      if (this.config.exportHooks) {
        this._hooks.push(`use${pascalCase(operationName)}Mutation`)
      }
    } else if (operationType === 'Subscription') {
      // eslint-disable-next-line no-console
      console.warn(
        `Plugin "typescript-rtk-query" does not support GraphQL Subscriptions at the moment! Skipping "${node.name?.value}"...`,
      )
    }

    return ''
  }
}
