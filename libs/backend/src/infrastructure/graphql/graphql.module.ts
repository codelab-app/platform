import { DynamicModule, Module } from '@nestjs/common'
import { ConfigFactory, ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { dgraphConfig, DGraphModule } from '../dgraph'
import { GraphqlConfig, graphqlConfig } from './config/graphql.config'
import { GraphqlOptions } from './config/graphql-options'
import { GraphqlService } from './graphql.service'

@Module({
  imports: [
    ConfigModule.forFeature(dgraphConfig),
    ConfigModule.forFeature(graphqlConfig),
  ],
  providers: [GraphqlService],
  exports: [GraphqlService],
})
export class GraphqlModule {
  /**
   * Use `register` when starting GraphQL server, if only using GraphqlService without needing server, don't register.
   */
  static register(config: ConfigFactory<GraphqlConfig>): DynamicModule {
    return {
      imports: [
        GraphQLModule.forRootAsync({
          imports: [ConfigModule.forFeature(config)],
          useClass: GraphqlOptions,
          inject: [ConfigService],
        }),
      ],
      module: GraphqlModule,
    }
  }
}
