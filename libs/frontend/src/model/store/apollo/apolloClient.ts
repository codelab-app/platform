/**
 * Source from https://github.com/correttojs/graphql-codegen-apollo-next-ssr
 */
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ApolloLink } from '@apollo/client/link/core'
import { apiLink } from './links/apiLink'
import { authLink } from './links/authLink'
import { errorLink } from './links/errorLink'

export interface ApolloContext {
  authToken?: string
  graphqlUri?: string
}

const defaultContext: ApolloContext = {
  graphqlUri: `${process.env.NEXT_PUBLIC_API_ORIGIN}/graphql`,
}

export const getApolloClient = (
  ctx: ApolloContext = {},
  initialState?: NormalizedCacheObject,
) => {
  const cache = new InMemoryCache().restore(initialState || {})

  const link = ApolloLink.from([
    setContext(() => ({ ...defaultContext, ...ctx })),
    errorLink,
    authLink,
    apiLink,
  ])

  return new ApolloClient({
    link,
    cache,
    // Disables forceFetch on the server (so queries are only run once)
    ssrMode: typeof window === 'undefined',
  })
}
