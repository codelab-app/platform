import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { Inject, Injectable } from '@nestjs/common'
import { print } from 'graphql'
import { DgraphConfig, dgraphConfig } from '../dgraph'
import {
  GraphqlSchemaConfig,
  graphqlSchemaConfig,
} from './config/graphql-schema.config'

@Injectable()
export class GraphqlSchemaService {
  constructor(
    @Inject(dgraphConfig.KEY) private readonly _dgraphConfig: DgraphConfig,
    @Inject(graphqlSchemaConfig.KEY)
    private readonly _graphqlSchemaConfig: GraphqlSchemaConfig,
  ) {}

  getMergedSchema() {
    const dgraphSchema = this.loadGraphqlSchema(this._dgraphConfig.schemaFile)

    const apiSchema = this.loadGraphqlSchema(
      this._graphqlSchemaConfig.apiGraphqlSchemaFile,
    )

    const enumType = this.getEnumTypeDef('AtomType', apiSchema[0])
    /**
     * Merge schemas together
     */
    const mergedTypeDefs = mergeTypeDefs([enumType, ...dgraphSchema])

    return print(mergedTypeDefs)
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
