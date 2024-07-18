import type {
  PluginFunction,
  PluginValidateFn,
  Types,
} from '@graphql-codegen/plugin-helpers'
import { oldVisit } from '@graphql-codegen/plugin-helpers'
import type {
  LoadedFragment,
  RawClientSideBasePluginConfig,
} from '@graphql-codegen/visitor-plugin-common'
import type { FragmentDefinitionNode, GraphQLSchema } from 'graphql'
import { concatAST, Kind } from 'graphql'
import { extname } from 'path'
import type { RawGraphQLRequestPluginConfig } from './config.js'
import { GraphQLRequestVisitor } from './visitor.js'

export const plugin: PluginFunction<RawGraphQLRequestPluginConfig> = (
  schema: GraphQLSchema,
  documents: Array<Types.DocumentFile>,
  config: RawGraphQLRequestPluginConfig,
) => {
  const allAst = concatAST(documents.map((v) => v.document!))

  const allFragments: Array<LoadedFragment> = [
    ...(
      allAst.definitions.filter(
        (d) => d.kind === Kind.FRAGMENT_DEFINITION,
      ) as Array<FragmentDefinitionNode>
    ).map((fragmentDef) => ({
      isExternal: false,
      name: fragmentDef.name.value,
      node: fragmentDef,
      onType: fragmentDef.typeCondition.name.value,
    })),
    ...(config.externalFragments || []),
  ]

  const visitor = new GraphQLRequestVisitor(schema, allFragments, config)
  const visitorResult = oldVisit(allAst, { leave: visitor })

  return {
    content: [
      visitor.fragments,
      ...visitorResult.definitions.filter((t) => typeof t === 'string'),
      visitor.sdkContent,
    ].join('\n'),
    prepend: visitor.getImports(),
  }
}

export const validate: PluginValidateFn<any> = async (
  schema: GraphQLSchema,
  documents: Array<Types.DocumentFile>,
  config: RawClientSideBasePluginConfig,
  outputFile: string,
) => {
  if (!['.ts', '.mts', '.cts'].includes(extname(outputFile))) {
    throw new Error(
      'Plugin "typescript-graphql-request" requires extension to be ".ts", ".mts" or ".cts"!',
    )
  }
}

export { GraphQLRequestVisitor }
