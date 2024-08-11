import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import * as env from 'env-var'
import { createClient } from 'graphql-ws'
import WebSocket from 'ws'

const httpLink = new HttpLink({
  uri: `http://127.0.0.1:${env
    .get('NEXT_PUBLIC_API_PORT')
    .required()
    .asPortNumber()}/api/v1/graphql`,
})

export const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://127.0.0.1:${env
      .get('NEXT_PUBLIC_API_PORT')
      .required()
      .asPortNumber()}/api/v1/graphql`,
    webSocketImpl: WebSocket,
  }),
)

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
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

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
})
