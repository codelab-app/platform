import type { RawConfig } from '@graphql-codegen/visitor-plugin-common'
import type { GraphQLSchema } from 'graphql'

import {
  type PluginFunction,
  type Types,
} from '@graphql-codegen/plugin-helpers'

import { ServerFetchVisitor } from './visitor'

export interface ServerFetchPluginRawConfig extends RawConfig {
  gqlFn: string
  gqlFnPath: string
  graphqlPath: string
}

export const plugin: PluginFunction<ServerFetchPluginRawConfig> = (
  schema: GraphQLSchema,
  documents: Array<Types.DocumentFile>,
  config,
) => {
  const visitor = new ServerFetchVisitor(documents, config)

  return {
    content: visitor.content,
    prepend: visitor.getImports(),
  }
}
