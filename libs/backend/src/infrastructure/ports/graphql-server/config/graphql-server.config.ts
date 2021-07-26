import { registerAs } from '@nestjs/config'
import { GqlModuleOptions } from '@nestjs/graphql'
import { get } from 'env-var'
import { graphqlSchemaConfig } from '../../graphql-schema/config/graphql-schema.config'
import { GraphqlServerTokens } from './graphql-server.tokens'

export interface GraphqlServerConfig {
  autoSchemaFile: GqlModuleOptions['autoSchemaFile']
  endpoint: string
}

export const graphqlServerConfig = registerAs<() => GraphqlServerConfig>(
  GraphqlServerTokens.GraphqlServerConfig.toString(),
  () => {
    return {
      endpoint: get('CODELAB_API_GRAPHQL_ENDPOINT').required().asUrlString(),
      autoSchemaFile:
        get('NODE_ENV').asEnum(['test', 'development', 'production']) === 'test'
          ? true
          : graphqlSchemaConfig().apiGraphqlSchemaFile,
    }
  },
)
