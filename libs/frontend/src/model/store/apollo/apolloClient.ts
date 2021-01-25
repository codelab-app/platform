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
import { isServer } from '../../../config'
import { combinedLink } from './links/combinedLink'

export interface ApolloContext {
  authToken?: string
  graphqlUri?: string
}

const defaultContext: ApolloContext = {
  authToken: undefined,
  graphqlUri: `${process.env.NEXT_PUBLIC_API_ORIGIN}/graphql`,
}

export const getApolloClient = (
  ctx: ApolloContext | undefined = {},
  initialState: NormalizedCacheObject | undefined = undefined,
) => {
  const cache = new InMemoryCache().restore(initialState || {})

  // Combine the context we get from the parameter and add it to all requests
  const ctxLink = setContext(() => ({ ...defaultContext, ...ctx }))
  const linkWithContext = ApolloLink.from([ctxLink, combinedLink])

  return new ApolloClient({
    link: linkWithContext,
    cache,
    ssrMode: isServer, // Disables forceFetch on the server (so queries are only run once)
  })
}
