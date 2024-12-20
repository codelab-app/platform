import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import * as env from 'env-var'
import { createClient } from 'graphql-ws'
import WebSocket from 'ws'

/**
 * https://github.com/evanshortiss/env-var/issues/162
 */
const { get } = env.from({
  NEXT_PUBLIC_API_PORT: process.env['NEXT_PUBLIC_API_PORT'],
})

enum Environment {
  Browser = 'browser',
  Node = 'node',
}

interface CreateApolloClientOptions {
  environment?: Environment
}

export const createApolloClient = ({
  environment = Environment.Browser,
}: CreateApolloClientOptions = {}) => {
  // Move port getter to a function to avoid early evaluation
  const getApiPort = () => get('NEXT_PUBLIC_API_PORT').required().asPortNumber()

  const httpLink = new HttpLink({
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
