import { GraphqlServerConfig, GraphqlServerTokens } from '@codelab/backend'
import { DynamicModule, Module } from '@nestjs/common'
import { ConfigFactory } from '@nestjs/config'
import { ApiServerService } from './api-server.service'

@Module({})
export class ApiServerModule {
  static register(config: ConfigFactory<GraphqlServerConfig>): DynamicModule {
    return {
      providers: [
        ApiServerService,
        {
          provide: GraphqlServerTokens.GraphqlServerConfig,
          useValue: config(),
        },
      ],
      exports: [ApiServerService],
      module: ApiServerModule,
    }
  }
}
