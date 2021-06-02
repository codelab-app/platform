import { DynamicModule, Module } from '@nestjs/common'
import { ConfigFactory, ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphqlConfig, GraphqlOptions } from './config/graphql.config'

@Module({})
export class GraphqlModule {
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
