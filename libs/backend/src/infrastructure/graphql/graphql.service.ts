import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import fs from 'fs'
import { print } from 'graphql'
import path from 'path'
import { DgraphConfig, DgraphTokens } from '../dgraph'
import { GraphqlConfig } from './config/graphql.config'
import { GraphqlTokens } from './config/graphql.tokens'

@Injectable()
export class GraphqlService {
  constructor(private readonly configService: ConfigService) {}

  getMergedSchema() {
    const graphqlConfig = this.configService.get<GraphqlConfig>(
      GraphqlTokens.GraphqlConfig.toString(),
    )

    const dgraphConfig = this.configService.get<DgraphConfig>(
      DgraphTokens.DgraphConfig.toString(),
    )

    if (!graphqlConfig) {
      throw new Error('Missing GraphqlConfig')
    }

    if (!dgraphConfig) {
      throw new Error('Missing DgraphConfig')
    }

    const dgraphSchema = this.loadGraphqlSchema(dgraphConfig?.schemaFile)
    const apiSchema = this.loadGraphqlSchema(graphqlConfig.apiGraphqlSchemaFile)
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
