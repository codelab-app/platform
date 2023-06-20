import { neoSchema } from '@codelab/backend/infra/adapter/graphql'
import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import { getDriver } from '@codelab/backend/infra/adapter/neo4j'
import { OpenTelemetryModuleConfig } from '@codelab/backend/infra/adapter/otel'
import type { ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloDriver } from '@nestjs/apollo'
import { BullModule } from '@nestjs/bull'
import { Global, Inject, Module } from '@nestjs/common'
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import type { BaseValidationOptions } from 'joi'
import Joi from 'joi'
import type { Driver } from 'neo4j-driver'
import { driver } from 'neo4j-driver'
import { Neo4jModule } from 'nest-neo4j'
import { join } from 'path'
import { graphqlConfig } from '../graphql.config'
import { CommandHandlerService } from '../handlers/command-handler.service'
import { neo4jConfig } from '../neo4j.config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Neo4jDriver } from './neo4j.driver'

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
  controllers: [AppController],
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
        context: ({ connection, payload, req, res }: GqlContext) =>
          ({
            connection,
            driver: getDriver(),
            payload,
            req,
            res,
          } as GqlContext),
        debug: true,
        installSubscriptionHandlers: true,
        introspection: true,
        path: 'api',
        playground: true,
        schema: await neoSchema.getSchema(),
      }),
    }),
  ],
  providers: [AppService, CommandHandlerService],
})
export class AppModule {
  constructor(
    @Inject(neo4jConfig.KEY)
    private neo4j: ConfigType<typeof neo4jConfig>,
  ) {
    // console.log(neo4j)
  }
}
