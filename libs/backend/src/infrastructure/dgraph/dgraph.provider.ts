import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DgraphClient, DgraphClientStub } from 'dgraph-js-http'
import { DgraphConfiguration } from './config/dgraph.config'
import { DgraphTokens } from './config/dgraph.tokens'

export type DgraphProvider = {
  client: DgraphClient
  resetDb: ReturnType<DgraphClient['alter']>
}

export const dgraphClientProvider: Provider<DgraphProvider> = {
  provide: DgraphTokens.DgraphProvider,
  useFactory: (configService: ConfigService) => {
    const config = configService.get<DgraphConfiguration>(
      DgraphTokens.DgraphConfig.toString(),
    )

    const clientStub = new DgraphClientStub(config?.endpoint)
    const dgraphClient = new DgraphClient(clientStub)

    return {
      client: dgraphClient,
      resetDb: dgraphClient.alter({ dropAll: true }),
    }
  },
  inject: [ConfigService],
}
