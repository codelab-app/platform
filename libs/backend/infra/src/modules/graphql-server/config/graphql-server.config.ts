import { registerAs } from '@nestjs/config'
import { GqlModuleOptions } from '@nestjs/graphql'
import { get } from 'env-var'
import { join } from 'path'
import { graphqlSchemaConfig } from '../../graphql-schema'
import { GraphqlServerTokens } from './graphql-server.tokens'

export interface GraphqlServerConfig {
  autoSchemaFile: GqlModuleOptions['autoSchemaFile']
  endpoint: string
}

export const graphqlServerConfig = registerAs<GraphqlServerConfig>(
  GraphqlServerTokens.GraphqlServerConfig.toString(),
  async () => ({
    endpoint: new URL(
      'graphql',
      get('CODELAB_API_ENDPOINT').required().asUrlString(),
    ).toString(),
    autoSchemaFile:
      get('NODE_ENV').asEnum(['test', 'development', 'production']) === 'test'
        ? true
        : (await graphqlSchemaConfig()).apiGraphqlSchemaFile,
  }),
)
