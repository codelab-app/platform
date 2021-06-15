import { DynamicModule, Global, Module } from '@nestjs/common'
import { ConfigFactory, ConfigModule } from '@nestjs/config'
import { DgraphConfig } from './config/dgraph.config'
import { DgraphTokens } from './config/dgraph.tokens'
import { dgraphClientProvider } from './dgraph.provider'

@Global()
@Module({})
export class DGraphModule {
  static register(config: ConfigFactory<DgraphConfig>): DynamicModule {
    return {
      imports: [ConfigModule.forFeature(config)],
      module: DGraphModule,
      providers: [dgraphClientProvider],
      exports: [DgraphTokens.DgraphProvider],
    }
  }
}
