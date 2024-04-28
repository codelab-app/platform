import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { JwtAuthGuard } from '@codelab/backend/application/auth'
import type { GqlContext } from '@codelab/backend/infra/adapter/graphql'
import {
  GRAPHQL_SCHEMA_PROVIDER,
  GraphQLSchemaModule,
  neo4jConfig,
} from '@codelab/backend/infra/adapter/neo4j'
import { RequestContextModule } from '@codelab/backend/infra/adapter/request-context'
import type { ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloDriver } from '@nestjs/apollo'
import { Module, UnauthorizedException } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'
import { GraphQLModule } from '@nestjs/graphql'
import type { GraphQLFormattedError, GraphQLSchema } from 'graphql'
import { endpointConfig } from './endpoint.config'

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
    RequestContextModule,
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      isGlobal: true,
      load: [neo4jConfig, endpointConfig],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [GraphQLSchemaModule],
      inject: [GRAPHQL_SCHEMA_PROVIDER],
      useFactory: async (graphqlSchema: GraphQLSchema) => {
        return {
          // bodyParserConfig: false,
          context: async ({ req, res }: GqlContext) => {
            // starting from neo4j/graphql v5 - token is required in order to allow
            // @authentication/@authorization in neo4j schema files, see migration guide:
            // https://neo4j.com/docs/graphql/current/migration/4.0.0/authorization
            const token = req.headers['authorization']
            const context = { req, res, token } as GqlContext

            return context
          },
          cors: true,
          debug: true,
          formatError: (formattedError: GraphQLFormattedError) => {
            // console.error(formattedError)

            return formattedError
          },
          formatResponse: (response: unknown) => {
            // console.log(response)

            return response
          },
          // installSubscriptionHandlers: true,
          introspection: true,
          /**
           * GraphQL in NestJS is handled through a single route and processed internally by the Apollo Server
           */
          path: 'api/graphql',
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
        }
      },
    }),
  ],
})
export class GraphqlModule {}
