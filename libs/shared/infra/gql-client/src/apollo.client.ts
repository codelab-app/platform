import { ApolloClient, InMemoryCache, split } from '@apollo/client'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { env } from '@codelab/shared-config-env'
import { createClient } from 'graphql-ws'
import WebSocket from 'ws'

enum Environment {
  Browser = 'browser',
  Node = 'node',
}

interface CreateApolloClientOptions {
  environment?: Environment
}

/**
 * Only used here because of subscriptions support, otherwise we use fetch
 */
export const createApolloClient = ({
  environment = Environment.Browser,
}: CreateApolloClientOptions = {}) => {
  // Move port getter to a function to avoid early evaluation
  const getApiPort = () =>
    env.get('NEXT_PUBLIC_API_PORT').required().asPortNumber()

  // Maximum number of operations to batch
  // Wait up to 20ms to batch operations
  // Debounce batching to wait for more operations
  const httpLink = new BatchHttpLink({
    batchDebounce: true,
    batchInterval: 20,
    batchMax: 10,
    uri: `http://127.0.0.1:${getApiPort()}/api/v1/graphql`,
  })

  const wsLink = new GraphQLWsLink(
    createClient({
      url: `ws://127.0.0.1:${getApiPort()}/api/v1/graphql`,
      webSocketImpl: environment === Environment.Node ? WebSocket : undefined,
    }),
  )

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)

      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    httpLink,
  )

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
  })
}

/**
 * Lazy load so we create the client when the environment is known
 */
export const nodeApolloClient = () =>
  createApolloClient({
    environment: Environment.Node,
  })

export const browserApolloClient = () =>
  createApolloClient({
    environment: Environment.Browser,
  })
