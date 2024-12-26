/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  GqlContext,
  ISchemaService,
} from '@codelab/backend/abstract/types'
import type { ApolloDriverConfig } from '@nestjs/apollo'
import type {
  DynamicModule,
  ModuleMetadata,
  OnModuleDestroy,
} from '@nestjs/common'
import type { GraphQLFormattedError, GraphQLSchema } from 'graphql'

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { RequestContextModule } from '@codelab/backend/infra/adapter/request-context'
import { endpointConfig } from '@codelab/backend/infra/core'
import {
  neo4jConfig,
  Neo4jModule,
} from '@codelab/backend-infra-adapter/neo4j-driver'
import { GraphQLSchemaModule } from '@codelab/backend-infra-adapter/neo4j-schema'
import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, type ConfigType } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { GraphQLModule } from '@nestjs/graphql'

import { GraphqlService } from './graphql.service'

/**
 * GraphQL request is not triggering the global guard
 *
 * https://github.com/nestjs/graphql/issues/3024
 *
 */
@Module({})
export class GraphqlModule {
  /**
   * Decouple the schema service from the module
   */
  static forRootAsync({
    imports = [],
    inject,
  }: {
    imports: ModuleMetadata['imports']
    inject: Array<any>
  }): DynamicModule {
    return {
      imports: [
        // DevtoolsModule.register({
        //   http: process.env.NODE_ENV !== 'production',
        //   port: 4000,
        // }),
        ...imports,
        GraphQLSchemaModule,
        EventEmitterModule.forRoot(),
        RequestContextModule,
        ConfigModule.forRoot({
          ignoreEnvVars: true,
          isGlobal: true,
          load: [neo4jConfig, endpointConfig],
        }),
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
          driver: ApolloDriver,
          imports: [...imports],
          inject: [endpointConfig.KEY, ...inject],
          useFactory: async (
            endpoint: ConfigType<typeof endpointConfig>,
            schemaService: ISchemaService,
          ) => {
            return {
              // bodyParserConfig: false,
              context: async ({ req, res }: GqlContext) => {
                // starting from neo4j/graphql v5 - token is required in order to allow
                // @authentication/@authorization in neo4j schema files, see migration guide:
                // https://neo4j.com/docs/graphql/current/migration/4.0.0/authorization
                const token = req?.headers['authorization']

                return { req, res, token } as GqlContext
              },
              cors: true,
              debug: true,
              formatError: (formattedError: GraphQLFormattedError) => {
                console.error(formattedError)

                return formattedError
              },
              formatResponse: (response: unknown) => {
                // console.log(response)

                return response
              },
              introspection: true,
              path: `${endpoint.baseApiPath}/graphql`,
              // In favor of apollo studio
              playground: false,
              plugins: [
                ApolloServerPluginLandingPageLocalDefault(),
                // hiveApollo({
                //   debug: true,
                //   enabled: true,
                //   token: '',
                //   usage: true,
                // }),
              ],
              schema: await schemaService.createSchema(),
              subscriptions: {
                'graphql-ws': true,
              },
            }
          },
        }),
      ],
      module: GraphqlModule,
      providers: [GraphqlService],
    }
  }
}
