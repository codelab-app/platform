import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DgraphClient, DgraphClientStub } from 'dgraph-js-http'
import { DgraphConfiguration } from './config/dgraph.config'
import { DgraphTokens } from './config/dgraph.tokens'

export type DgraphProvider = {
  client: DgraphClient
  /** Drops just the data, without the schema */
  resetDb: () => Promise<any>
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
      resetDb: () =>
        dgraphClient.alter({
          schema: '{"drop_op": "DATA"}',
        }),
    }
  },
  inject: [ConfigService],
}
