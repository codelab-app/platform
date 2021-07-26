import { registerAs } from '@nestjs/config'
import * as path from 'path'
import { GraphqlSchemaTokens } from './graphql-schema.tokens'

export interface GraphqlSchemaConfig {
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

const apiGraphqlSchemaFile = path.resolve(process.cwd(), 'schema.api.graphql')

export const graphqlSchemaConfig = registerAs<() => GraphqlSchemaConfig>(
  GraphqlSchemaTokens.GraphqlSchemaConfig.toString(),
  () => {
    return {
      dgraphGraphqlSchemaFile: path.resolve(
        process.cwd(),
        // '/home/artonio/DEV/upwork/codelab.ai/',
        'schema.dgraph.graphql',
      ),
      dgraphCodegenOutputFile: path.resolve(
        process.cwd(),
        // '/home/artonio/DEV/upwork/codelab.ai/',
        'libs/codegen/dgraph/src/graphql-client-dgraph.generated.ts',
      ),
      apiGraphqlSchemaFile,
      apiCodegenOutputFile: path.resolve(
        process.cwd(),
        // '/home/artonio/DEV/upwork/codelab.ai/',
        'libs/codegen/graphql/src/graphql-client-api.generated.ts',
      ),
    }
  },
)
