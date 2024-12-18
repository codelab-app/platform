import type { GqlContext } from '@codelab/backend/abstract/types'
import type { ApolloDriverConfig } from '@nestjs/apollo'
import type { GraphQLFormattedError, GraphQLSchema } from 'graphql'

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import {
  GRAPHQL_SCHEMA_PROVIDER,
  GraphQLSchemaModule,
  neo4jConfig,
} from '@codelab/backend/infra/adapter/neo4j'
import { RequestContextModule } from '@codelab/backend/infra/adapter/request-context'
import { endpointConfig } from '@codelab/backend/infra/core'
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
 */
@Module({
  imports: [
    // DevtoolsModule.register({
    //   http: process.env.NODE_ENV !== 'production',
    //   port: 4000,
    // }),
    EventEmitterModule.forRoot(),
    RequestContextModule,
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      isGlobal: true,
      load: [neo4jConfig, endpointConfig],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [GraphQLSchemaModule],
      inject: [GRAPHQL_SCHEMA_PROVIDER, endpointConfig.KEY],
      useFactory: async (
        graphqlSchema: GraphQLSchema,
        endpoint: ConfigType<typeof endpointConfig>,
      ) => {
        return {
          // bodyParserConfig: false,
          context: async ({ req, res }: GqlContext) => {
            // starting from neo4j/graphql v5 - token is required in order to allow
            // @authentication/@authorization in neo4j schema files, see migration guide:
            // https://neo4j.com/docs/graphql/current/migration/4.0.0/authorization
            const token = req?.headers['authorization']
            const context = { req, res, token } as GqlContext

            return context
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
          schema: graphqlSchema,
          subscriptions: {
            'graphql-ws': true,
          },
        }
      },
    }),
  ],
  providers: [GraphqlService],
})
export class GraphqlModule {}
