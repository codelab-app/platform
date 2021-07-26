import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { print } from 'graphql'
import { DgraphConfig, DgraphTokens } from '../dgraph'
import { GraphqlSchemaConfig } from './config/graphql-schema.config'
import { GraphqlSchemaTokens } from './config/graphql-schema.tokens'

@Injectable()
export class GraphqlSchemaService {
  constructor(
    @Inject(GraphqlSchemaTokens.GraphqlSchemaConfig)
    private readonly graphqlSchemaConfig: ConfigType<() => GraphqlSchemaConfig>,
    @Inject(DgraphTokens.DgraphConfig)
    private readonly dgraphConfig: ConfigType<() => DgraphConfig>,
  ) {}

  getMergedSchema() {
    const dgraphSchema = this.loadGraphqlSchema(this.dgraphConfig?.schemaFile)

    const apiSchema = this.loadGraphqlSchema(
      this.graphqlSchemaConfig.apiGraphqlSchemaFile,
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
