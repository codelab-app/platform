import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphqlOptions } from './config/graphql-options'
import { graphqlServerConfig } from './config/graphql-server.config'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [ConfigModule.forFeature(graphqlServerConfig)],
      useClass: GraphqlOptions,
      inject: [ConfigService],
    }),
  ],
})
export class GraphqlServerModule {}
