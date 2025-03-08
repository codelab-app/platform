import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { env } from '@codelab/shared/config/env'
import { createClient } from 'graphql-ws'

export const createApolloClient = () => {
  // Move port getter to a function to avoid early evaluation
  const getApiPort = () =>
    env.get('NEXT_PUBLIC_API_PORT').required().asPortNumber()

  const httpLink = new HttpLink({
    uri: `http://127.0.0.1:${getApiPort()}/api/v1/graphql`,
  })

  const wsLink = new GraphQLWsLink(
    createClient({
      url: `ws://127.0.0.1:${getApiPort()}/api/v1/graphql`,
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
export const browserApolloClient = () => createApolloClient()
