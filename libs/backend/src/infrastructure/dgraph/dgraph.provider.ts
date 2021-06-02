import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import { DgraphClient, DgraphClientStub } from 'dgraph-js-http'
import { DgraphConfiguration } from './config/dgraph.config'
import { DgraphTokens } from './config/dgraph.tokens'

export type DgraphProvider = {
  client: DgraphClient
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
        axios
          .post('http://127.0.0.1:8082/alter', { drop_op: 'DATA' })
          .then((res) => {
            console.log(res)
          }),
      // dgraphClient.alter({
      //   // dropAll: true,
      // }),
    }
  },
  inject: [ConfigService],
}
