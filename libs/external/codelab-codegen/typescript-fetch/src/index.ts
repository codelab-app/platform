import type {
  RawClientSideBasePluginConfig,
  RawConfig,
} from '@graphql-codegen/visitor-plugin-common'
import type { GraphQLSchema } from 'graphql'

import {
  oldVisit,
  type PluginFunction,
  type PluginValidateFn,
  type Types,
} from '@graphql-codegen/plugin-helpers'
import { concatAST } from 'graphql'
import { extname } from 'path'

import { FetchVisitor } from './visitor'

export interface FetchPluginRawConfig extends RawConfig {
  gqlFn: string
  gqlFnPath: string
  graphqlPath: string
}

export const plugin: PluginFunction<FetchPluginRawConfig> = (
  schema: GraphQLSchema,
  documents: Array<Types.DocumentFile>,
  config,
  info,
) => {
  const allAst = concatAST(documents.map((v) => v.document!))
  const visitor = new FetchVisitor(schema, config)

  // visit all ast
  oldVisit(allAst, { leave: visitor })

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
