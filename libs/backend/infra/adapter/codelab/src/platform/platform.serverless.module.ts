import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import {
  GRAPHQL_SCHEMA_PROVIDER,
  GraphQLSchemaModule,
  neo4jConfig,
} from '@codelab/backend/infra/adapter/neo4j'
import { RequestContextModule } from '@codelab/backend/infra/adapter/request-context'
import type { ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import type { GraphQLFormattedError, GraphQLSchema } from 'graphql'
import { endpointConfig } from './endpoint.config'

export interface GqlContextPayload {
  exp: string
  iat: string
  tokenVersion: number
  username: string
}

export interface GqlContext {
  // connection: unknown
  // driver: Driver
  payload?: GqlContextPayload
  req: Request
  res: Response
}

@Module({
  imports: [
    // DevtoolsModule.register({
    //   http: process.env.NODE_ENV !== 'production',
    //   port: 4000,
    // }),
    RequestContextModule,
    CodelabLoggerModule,
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
          context: ({ payload, req, res }: GqlContext) => {
            // console.log(req['user'])

            return {
              // connection,
              // driver,
              payload,
              req,
              res,
            } as GqlContext
          },
          cors: false,
          debug: true,
          formatError: (
            formattedError: GraphQLFormattedError,
            error: unknown,
          ) => {
            console.log(formattedError)

            return formattedError
          },
          formatResponse: (response: unknown) => {
            console.log(response)

            return response
          },
          // installSubscriptionHandlers: true,
          introspection: true,
          path: 'api/graphql',
          playground: false,
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          schema: graphqlSchema,
        }
      },
    }),
  ],
})
export class PlatformServerlessModule {}
