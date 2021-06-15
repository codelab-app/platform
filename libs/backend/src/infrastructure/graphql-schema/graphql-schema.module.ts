import { DynamicModule, Module } from '@nestjs/common'
import { ConfigFactory, ConfigModule } from '@nestjs/config'
import { DgraphConfig } from '../dgraph'
import { GraphqlServerConfig } from '../graphql-server'
import { GraphqlSchemaService } from './graphql-schema.service'

@Module({})
export class GraphqlSchemaModule {
  static register(dgraphConfig: ConfigFactory<DgraphConfig>): DynamicModule {
    return {
      providers: [GraphqlSchemaService],
      exports: [GraphqlSchemaService],
      imports: [ConfigModule.forFeature(dgraphConfig)],
      module: GraphqlSchemaModule,
    }
  }
}
