import { DynamicModule, Global, Module } from '@nestjs/common'
import { ConfigFactory } from '@nestjs/config'
import { DgraphConfig } from './config/dgraph.config'
import { DgraphTokens } from './config/dgraph.tokens'
import { dgraphClientProvider } from './dgraph.provider'

@Global()
@Module({})
export class DgraphModule {
  static register(config: ConfigFactory<DgraphConfig>): DynamicModule {
    console.log(config())

    return {
      module: DgraphModule,
      providers: [
        { provide: DgraphTokens.DgraphConfig, useValue: config() },
        dgraphClientProvider,
      ],
      exports: [DgraphTokens.DgraphProvider],
    }
  }
}
