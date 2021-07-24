import {
  GraphqlServerConfig,
  GraphqlServerTokens,
  serverConfig,
  ServerTokens,
} from '@codelab/backend'
import { DynamicModule, Module } from '@nestjs/common'
import { ConfigFactory } from '@nestjs/config'
import { ServerService } from './server.service'

@Module({})
export class ServerModule {
  static register(config: ConfigFactory<GraphqlServerConfig>): DynamicModule {
    return {
      providers: [
        ServerService,
        {
          provide: GraphqlServerTokens.GraphqlServerConfig,
          useValue: config(),
        },
        {
          provide: ServerTokens.ServerConfig,
          useValue: serverConfig(),
        },
      ],
      exports: [ServerService],
      module: ServerModule,
    }
  }
}
