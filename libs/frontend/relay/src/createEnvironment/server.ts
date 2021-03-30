import {
  RelayNetworkLayer,
  urlMiddleware,
} from 'react-relay-network-modern/node8'
import RelaySSR, { SSRCache } from 'react-relay-network-modern-ssr/node8/server'
import { Network, Environment, RecordSource, Store } from 'relay-runtime'

const relayEndpoint = process.env.NEXT_PUBLIC_URL_PROXY_RELAY

if (!relayEndpoint) {
  throw new Error('Missing NEXT_PUBLIC_URL_PROXY_RELAY')
}

export default {
  initEnvironment: () => {
    const source = new RecordSource()
    const store = new Store(source)
    const relaySSR = new RelaySSR()

    return {
      relaySSR,
      environment: new Environment({
        store,
        network: new RelayNetworkLayer([
          urlMiddleware({
            url: (req) => relayEndpoint,
            // headers: {},
          }),
          relaySSR.getMiddleware(),
        ]),
      }),
    }
  },
  createEnvironment: (relayData: SSRCache) => {
    const source = new RecordSource()
    const store = new Store(source)

    return new Environment({
      store,
      network: Network.create(
        () => (relayData?.[0][1] as any) || Promise.resolve(),
      ),
    })
  },
}
