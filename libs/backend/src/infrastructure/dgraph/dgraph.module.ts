import { Global, Module } from '@nestjs/common'
import { ConfigFactory, ConfigModule } from '@nestjs/config'
import { DgraphConfiguration } from './config/dgraph.config'
import { DgraphTokens } from './config/dgraph.tokens'
import { dgraphClientProvider } from './dgraph.provider'

@Global()
@Module({})
export class DGraphModule {
  static register(config: ConfigFactory<DgraphConfiguration>) {
    return {
      imports: [ConfigModule.forFeature(config)],
      module: DGraphModule,
      providers: [dgraphClientProvider],
      exports: [DgraphTokens.DgraphProvider],
    }
  }
}
