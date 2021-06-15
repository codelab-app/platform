import { GraphqlServerConfig } from '@codelab/backend'
import { DynamicModule, Module } from '@nestjs/common'
import { ConfigFactory, ConfigModule } from '@nestjs/config'
import { ApiServerService } from './api-server.service'

@Module({})
export class ApiServerModule {
  static register(
    graphqlServerConfig: ConfigFactory<GraphqlServerConfig>,
  ): DynamicModule {
    return {
      providers: [ApiServerService],
      exports: [ApiServerService],
      imports: [ConfigModule.forFeature(graphqlServerConfig)],
      module: ApiServerModule,
    }
  }
}
