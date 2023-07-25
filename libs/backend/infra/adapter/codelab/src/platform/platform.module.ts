import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import {
  GRAPHQL_SCHEMA_PROVIDER,
  GraphQLSchemaModule,
  neo4jConfig,
} from '@codelab/backend/infra/adapter/neo4j'
import { OpenTelemetryModuleConfig } from '@codelab/backend/infra/adapter/otel'
import { ApolloDriver } from '@nestjs/apollo'
import { BullModule } from '@nestjs/bull'
import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DevtoolsModule } from '@nestjs/devtools-integration'
import { GraphQLModule } from '@nestjs/graphql'
import type { GraphQLError, GraphQLSchema } from 'graphql'
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
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
      port: 4000,
    }),
    CodelabLoggerModule,
    OpenTelemetryModuleConfig,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'import-admin-data',
    }),
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      isGlobal: true,
      load: [neo4jConfig, endpointConfig],
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [GraphQLSchemaModule],
      inject: [GRAPHQL_SCHEMA_PROVIDER],
      useFactory: async (graphqlSchema: GraphQLSchema) => {
        return {
          // bodyParserConfig: false,
          context: ({ payload, req, res }: GqlContext) =>
            ({
              // connection,
              // driver,
              payload,
              req,
              res,
            } as GqlContext),
          cors: false,
          debug: true,
          formatError: (error: GraphQLError) => {
            console.log(error)

            return error
          },
          formatResponse: (response: unknown) => {
            console.log(response)

            return response
          },
          // installSubscriptionHandlers: true,
          introspection: true,
          path: 'api/graphql',
          playground: true,
          schema: graphqlSchema,
        }
      },
    }),
  ],
})
export class PlatformModule {}
