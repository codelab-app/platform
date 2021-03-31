import { useMemo } from 'react'
import {
  Environment,
  FetchFunction,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime'
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes'

let relayEnvironment: Environment

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise
const fetchQuery: FetchFunction = (
  operation,
  variables,
  cacheConfig,
  uploadables,
) => {
  const relayEndpoint = process.env.NEXT_PUBLIC_URL_PROXY_RELAY

  if (!relayEndpoint) {
    throw new Error('Missing NEXT_PUBLIC_URL_PROXY_RELAY')
  }

  return fetch(relayEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }, // Add authentication and other headers here
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then((response) => response.json())
}

const createEnvironment = (initialRecords?: RecordMap) => {
  return new Environment({
    // Create a network layer from the fetch function
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
  })
}

export const initEnvironment = (initialRecords?: RecordMap) => {
  // Create a network layer from the fetch function
  const environment = relayEnvironment ?? createEnvironment(initialRecords)

  // If your page has Next.js data fetching methods that use Relay, the initial records
  // will get hydrated here
  if (initialRecords) {
    environment.getStore().publish(new RecordSource(initialRecords))
  }

  // For SSG and SSR always create a new Relay environment
  if (typeof window === 'undefined') return environment

  // Create the Relay environment once in the client
  if (!relayEnvironment) relayEnvironment = environment

  return relayEnvironment
}

export const useEnvironment = (initialRecords: RecordMap) => {
  const store = useMemo(() => initEnvironment(initialRecords), [initialRecords])

  return store
}
