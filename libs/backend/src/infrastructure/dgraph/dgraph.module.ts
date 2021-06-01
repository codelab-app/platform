import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { dgraphConfig } from './config/dgraph.config'
import { DgraphTokens } from './config/dgraph.tokens'
import { dgraphClientProvider } from './dgraph.provider'

@Global()
@Module({
  imports: [ConfigModule.forFeature(dgraphConfig)],
  providers: [dgraphClientProvider],
  exports: [DgraphTokens.DgraphProvider],
})
export class DGraphModule {}
