import { registerAs } from '@nestjs/config'
import { GqlModuleOptions } from '@nestjs/graphql'
import { get } from 'env-var'
import * as path from 'path'
import { GraphqlTokens } from './graphql.tokens'

export interface GraphqlConfig {
  autoSchemaFile: GqlModuleOptions['autoSchemaFile']
  endpoint: string

  /**
   * Codegen related
   */

  // Dgraph
  dgraphGraphqlSchemaFile: string
  dgraphCodegenOutputFile: string

  // Api
  apiGraphqlSchemaFile: string
  apiCodegenOutputFile: string
}

const baseGraphqlConfig = {
  dgraphGraphqlSchemaFile: path.resolve(process.cwd(), 'schema.dgraph.graphql'),
  dgraphCodegenOutputFile: path.resolve(
    process.cwd(),
    'libs/dgraph/src/graphql-client-dgraph.generated.ts',
  ),
  apiGraphqlSchemaFile: path.resolve(process.cwd(), 'schema.api.graphql'),
  apiCodegenOutputFile: path.resolve(
    process.cwd(),
    'libs/graphql/src/graphql-client-api.generated.ts',
  ),
}

export const graphqlConfig = registerAs<() => GraphqlConfig>(
  GraphqlTokens.GraphqlConfig.toString(),
  () => {
    return {
      ...baseGraphqlConfig,
      endpoint: get('CODELAB_API_GRAPHQL_ENDPOINT').required().asUrlString(),
      autoSchemaFile: baseGraphqlConfig.apiGraphqlSchemaFile,
    }
  },
)

export const graphqlTestConfig = registerAs<() => GraphqlConfig>(
  GraphqlTokens.GraphqlConfig.toString(),
  () => {
    return {
      ...baseGraphqlConfig,
      endpoint: get('CODELAB_API_GRAPHQL_ENDPOINT').required().asUrlString(),
      autoSchemaFile: true,
    }
  },
)
