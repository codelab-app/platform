import { neoSchema } from '@codelab/backend/infra/adapter/graphql'
import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import { getDriver, neo4jConfig } from '@codelab/backend/infra/adapter/neo4j'
import { OpenTelemetryModuleConfig } from '@codelab/backend/infra/adapter/otel'
import { ApolloDriver } from '@nestjs/apollo'
import { BullModule } from '@nestjs/bull'
import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import type { GraphQLError } from 'graphql'
import type { Driver } from 'neo4j-driver'
import { graphqlConfig } from '../graphql.config'

export interface GqlContextPayload {
  exp: string
  iat: string
  tokenVersion: number
  username: string
}

export interface GqlContext {
  connection: unknown
  driver: Driver
  payload?: GqlContextPayload
  req: Request
  res: Response
}

@Global()
@Module({
  // controllers: [AppController],
  imports: [
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
      load: [neo4jConfig, graphqlConfig],
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({
        // bodyParserConfig: false,
        context: ({ connection, payload, req, res }: GqlContext) =>
          ({
            connection,
            driver: getDriver(),
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
        schema: await neoSchema.getSchema(),
      }),
    }),
  ],
  // providers: [CommandHandlerService],
})
export class AppModule {
  constructor() {
    // private neo4j: ConfigType<typeof neo4jConfig>, // @Inject(neo4jConfig.KEY)
    // console.log(neo4j)
  }
}
