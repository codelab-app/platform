import {
  RelayNetworkLayer,
  cacheMiddleware,
  urlMiddleware,
} from 'react-relay-network-modern/node8'
import RelaySSR from 'react-relay-network-modern-ssr/node8/client'
import { Environment, RecordSource, Store } from 'relay-runtime'
import { SSRCache } from 'react-relay-network-modern-ssr/node8/server'

const source = new RecordSource()
const store = new Store(source)

let storeEnvironment: Environment

const relayEndpoint = process.env.NEXT_PUBLIC_URL_PROXY_RELAY

if (!relayEndpoint) {
  throw new Error('Missing NEXT_PUBLIC_URL_PROXY_RELAY')
}

export default {
  createEnvironment: (relayData: SSRCache) => {
    if (storeEnvironment) return storeEnvironment

    storeEnvironment = new Environment({
      store,
      network: new RelayNetworkLayer([
        cacheMiddleware({
          size: 100,
          ttl: 60 * 1000,
        }),
        new RelaySSR(relayData).getMiddleware({
          lookup: false,
        }),
        urlMiddleware({
          url: (req) => relayEndpoint,
        }),
      ]),
    })

    return storeEnvironment
  },
}
