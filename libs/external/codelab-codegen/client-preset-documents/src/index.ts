import type {
  LoadedFragment,
  RawClientSideBasePluginConfig,
  RawConfig,
} from '@graphql-codegen/visitor-plugin-common'
import type { FragmentDefinitionNode, GraphQLSchema } from 'graphql'

import {
  oldVisit,
  type PluginFunction,
  type PluginValidateFn,
  type Types,
} from '@graphql-codegen/plugin-helpers'
import { concatAST, Kind } from 'graphql'
import { extname } from 'path'

import { ClientPresetVisitor } from './visitor'

export type ClientPresetPluginRawConfig = RawConfig

export const plugin: PluginFunction<ClientPresetPluginRawConfig> = (
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

  const visitor = new ClientPresetVisitor(schema, config, documents, info)
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
