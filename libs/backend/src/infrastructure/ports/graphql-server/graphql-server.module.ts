import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphqlOptions } from './config/graphql-options'
import { graphqlServerConfig } from './config/graphql-server.config'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [ConfigModule.forFeature(graphqlServerConfig)],
      useClass: GraphqlOptions,
    }),
  ],
})
export class GraphqlServerModule {}
