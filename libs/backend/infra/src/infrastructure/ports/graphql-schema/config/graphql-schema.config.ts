import { registerAs } from '@nestjs/config'
import * as path from 'path'
import { GraphqlSchemaTokens } from './graphql-schema.tokens'

export interface GraphqlSchemaConfig {
  /**
   * Codegen related
   */

  // Api
  apiGraphqlSchemaFile: string
  apiCodegenOutputFile: string
}

const apiGraphqlSchemaFile = path.resolve(process.cwd(), 'schema.api.graphql')

export const graphqlSchemaConfig = registerAs<GraphqlSchemaConfig>(
  GraphqlSchemaTokens.GraphqlSchemaConfig.toString(),
  () => {
    return {
      apiGraphqlSchemaFile,
      apiCodegenOutputFile: path.resolve(
        process.cwd(),
        // '/home/artonio/DEV/upwork/codelab.ai/',
        'libs/codegen/graphql/src/graphql-client-api.generated.ts',
      ),
    }
  },
)
