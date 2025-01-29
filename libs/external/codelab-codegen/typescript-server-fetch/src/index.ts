import type {
  LoadedFragment,
  RawClientSideBasePluginConfig,
  RawConfig,
} from '@graphql-codegen/visitor-plugin-common'
import type {
  concatAST,
  FragmentDefinitionNode,
  type GraphQLSchema,
  Kind,
} from 'graphql'

import {
  oldVisit,
  type PluginFunction,
  type PluginValidateFn,
  type Types,
} from '@graphql-codegen/plugin-helpers'
import { extname } from 'path'

import { ServerFetchVisitor } from './server-fetch-visitor'

export interface ServerFetchPluginRawConfig extends RawConfig {
  gqlFn: string
  gqlFnPath: string
}

export const plugin: PluginFunction<ServerFetchPluginRawConfig> = (
  schema: GraphQLSchema,
  documents: Array<Types.DocumentFile>,
  config,
  info,
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

  const visitor = new ServerFetchVisitor(schema, config, documents, info)
  const visitorResult = oldVisit(allAst, { leave: visitor })

  return {
    content: visitor.content,
    prepend: visitor.getImports(),
  }
}

export const validate: PluginValidateFn<any> = async (
  schema: GraphQLSchema,
  documents: Array<Types.DocumentFile>,
  config: RawClientSideBasePluginConfig,
  outputFile: string,
) => {
  if (!['.ts'].includes(extname(outputFile))) {
    throw new Error('Plugin "typescript-fetch" requires extension to be ".ts"!')
  }
}
