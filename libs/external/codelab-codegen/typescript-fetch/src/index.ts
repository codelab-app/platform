import type { PluginFunction, Types } from '@graphql-codegen/plugin-helpers'
import type { RawConfig } from '@graphql-codegen/visitor-plugin-common'
import type { GraphQLSchema } from 'graphql'

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
) => {
  const visitor = new FetchVisitor(documents, config)

  return {
    content: visitor.content,
    prepend: visitor.getImports(),
  }
}
