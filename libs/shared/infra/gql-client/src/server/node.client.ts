import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { env } from '@codelab/shared-config-env'
import { createClient } from 'graphql-ws'
import WebSocket from 'ws'

/**
 * Apollo client for Node.js environments with WebSocket support
 * This includes the 'ws' package which depends on Node.js modules
 */
export const createNodeApolloClient = () => {
  // Move port getter to a function to avoid early evaluation
  const getApiPort = () =>
    env.get('NEXT_PUBLIC_API_PORT').required().asPortNumber()

  const httpLink = new HttpLink({
    uri: `http://127.0.0.1:${getApiPort()}/api/v1/graphql`,
  })

  const wsLink = new GraphQLWsLink(
    createClient({
      url: `ws://127.0.0.1:${getApiPort()}/api/v1/graphql`,
      webSocketImpl: WebSocket,
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

// Lazy-loaded client instance
let nodeClient: ApolloClient<any> | null = null

export const getNodeApolloClient = () => {
  if (!nodeClient) {
    nodeClient = createNodeApolloClient()
  }

  return nodeClient
}
