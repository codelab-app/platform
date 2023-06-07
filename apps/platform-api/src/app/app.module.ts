import { neoSchema } from '@codelab/backend/infra/adapter/graphql'
import { getDriver } from '@codelab/backend/infra/adapter/neo4j'
import type { ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloDriver } from '@nestjs/apollo'
import { Inject, Module } from '@nestjs/common'
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import type { BaseValidationOptions } from 'joi'
import Joi from 'joi'
import type { Driver } from 'neo4j-driver'
import { driver } from 'neo4j-driver'
import { Neo4jModule } from 'nest-neo4j'
import { join } from 'path'
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

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      load: [neo4jConfig],
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   // autoSchemaFile: 'schema.gql',
    //   driver: Neo4jDriver,
    //   schema: await neoSchema.getSchema(),
    // }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [neo4jConfig.KEY],
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
        playground: true,
        schema: await neoSchema.getSchema(),
      }),
    }),
    // Neo4jModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [neo4jConfig.KEY],
    //   useFactory: async (
    //     neo4jConfigService: ConfigType<typeof neo4jConfig>,
    //   ) => ({
    //     host: neo4jConfigService.uri.host,
    //     password: neo4jConfigService.password,
    //     port: neo4jConfigService.uri.port,
    //     scheme: neo4jConfigService.uri.protocol,
    //     username: neo4jConfigService.user,
    //   }),
    // }),
    // Neo4jModule.forRoot({
    //   host: 'localhost',
    //   password: 'neo',
    //   port: 7687,
    //   scheme: 'neo4j',
    //   username: 'neo4j',
    // }),
  ],
  providers: [AppService],
})
export class AppModule {
  constructor(
    @Inject(neo4jConfig.KEY)
    private neo4j: ConfigType<typeof neo4jConfig>,
  ) {
    console.log(neo4j)
  }
}
