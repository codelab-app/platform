import { Types } from '@graphql-codegen/plugin-helpers'
import {
  ClientSideBasePluginConfig,
  ClientSideBaseVisitor,
  LoadedFragment,
} from '@graphql-codegen/visitor-plugin-common'
import {
  GraphQLSchema,
  Kind,
  OperationDefinitionNode,
  concatAST,
  visit,
} from 'graphql'

export type GraphQLCodegenPluginConfig = ClientSideBasePluginConfig

class GraphQLVisitor extends ClientSideBaseVisitor<
  {},
  GraphQLCodegenPluginConfig
> {
  constructor(
    schema: GraphQLSchema,
    fragments: Array<LoadedFragment>,
    rawConfig: GraphQLCodegenPluginConfig,
  ) {
    super(schema, fragments, rawConfig, {
      gqlImport: `@apollo/client#gql`,
    })
    this._additionalImports.push(
      this.getApolloClientImport(),
      this.getCodelabOperationsImport(),
      this.getApolloClientTypesImport(),
    )
  }

  getApolloClientTypesImport(): string {
    return `import { WatchQueryOptions, MutationOptions } from '@apollo/client'`
  }

  getCodelabOperationsImport(): string {
    return `import { watchQuery, mutate } from '@codelab/alpha/shared/utils'`
  }

  getApolloClientImport(): string {
    return `import { getApolloClient} from '@codelab/alpha/ui/hoc';`
  }

  buildMutation(
    node: OperationDefinitionNode,
    documentVariableName: string,
    operationResultType: string,
    operationVariablesTypes: string,
  ) {
    return `
export const ${node?.name?.value}Mutate = (options: MutationOptions<${operationResultType}, ${operationVariablesTypes}> = {}) => {
  return mutate<${operationResultType}, ${operationVariablesTypes}>(getApolloClient(), {
    query: ${documentVariableName},
    context: {
      clientName: 'hasura',
    },
    ...options
  })
}`
  }

  buildWatchQuery(
    node: OperationDefinitionNode,
    documentVariableName: string,
    operationResultType: string,
    operationVariablesTypes: string,
  ): string {
    return `
export const ${node?.name?.value}WatchQuery = (options: WatchQueryOptions<${operationVariablesTypes}, ${operationResultType}> = {}) => {
  return watchQuery<${operationResultType}, ${operationVariablesTypes}>(getApolloClient(), {
    query: ${documentVariableName},
    context: {
      clientName: 'hasura',
    },
    ...options
  })
}`
  }

  buildOperation(
    node: OperationDefinitionNode,
    documentVariableName: string,
    operationType: string,
    operationResultType: string,
    operationVariablesTypes: string,
  ): string {
    switch (operationType) {
      case 'Mutation':
        return `${this.buildMutation(
          node,
          documentVariableName,
          operationResultType,
          operationVariablesTypes,
        )}`
      case 'Query':
        return `${this.buildWatchQuery(
          node,
          documentVariableName,
          operationResultType,
          operationVariablesTypes,
        )}`
      default:
        return ''
    }
  }
}

const plugin = (
  schema: GraphQLSchema,
  documents: Array<Types.DocumentFile>,
  config: GraphQLCodegenPluginConfig,
) => {
  const allAst = concatAST(documents.map((v: any) => v.document))
  const allFragments = [
    ...allAst.definitions
      .filter((d: any) => d.kind === Kind.FRAGMENT_DEFINITION)
      .map((fragmentDef: any) => ({
        node: fragmentDef,
        name: fragmentDef.name.value,
        onType: fragmentDef.typeCondition.name.value,
        isExternal: false,
      })),
    ...(config.externalFragments || []),
  ]
  const visitor = new GraphQLVisitor(schema, allFragments, config)
  const visitorResult = visit(allAst, { leave: visitor })

  return {
    prepend: [
      '/* eslint-disable camelcase */',
      '/* eslint-disable import/no-duplicates */',
      ...visitor.getImports(),
    ],
    content: [
      visitor.fragments,
      ...visitorResult.definitions.filter((t: any) => typeof t === 'string'),
    ].join('\n'),
  }
}

export { plugin }
