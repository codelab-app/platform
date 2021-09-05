import { loadFilesSync } from '@graphql-tools/load-files'
import { Inject, Injectable } from '@nestjs/common'
import type { DgraphConfig } from '../dgraph'
import { dgraphConfig } from '../dgraph'
import type { GraphqlSchemaConfig } from './config/graphql-schema.config'
import { graphqlSchemaConfig } from './config/graphql-schema.config'

@Injectable()
export class GraphqlSchemaService {
  constructor(
    @Inject(dgraphConfig.KEY) private readonly _dgraphConfig: DgraphConfig,
    @Inject(graphqlSchemaConfig.KEY)
    private readonly _graphqlSchemaConfig: GraphqlSchemaConfig,
  ) {}

  getMergedSchema() {
    // const dgraphSchema = this.loadGraphqlSchema(this.dgraphConfig?.schemaFile)
    //
    // const apiSchema = this.loadGraphqlSchema(
    //   this.graphqlSchemaConfig.apiGraphqlSchemaFile,
    // )
    //
    // const enumType = this.getEnumTypeDef('AtomType', apiSchema[0])
    // /**
    //  * Merge schemas together
    //  */
    // const mergedTypeDefs = mergeTypeDefs([enumType, ...dgraphSchema])
    //
    // return print(mergedTypeDefs)
  }

  getEnumTypeDef(enumType: string, schema: string) {
    // eslint-disable-next-line no-useless-escape
    const regex = new RegExp(`(?:enum)\\s${enumType}\\s(.+?)}`, 'gs')

    return schema.match(regex)?.[0] ?? ''
  }

  /**
   * Load *.graphql file as string
   */
  loadGraphqlSchema(schemaPath: string) {
    return loadFilesSync<string>(schemaPath, {
      extensions: ['graphql'],
    })
  }
}
