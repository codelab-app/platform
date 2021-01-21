/**
 * Source from https://github.com/correttojs/graphql-codegen-apollo-next-ssr
 */
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { NextPage } from 'next'
import React from 'react'
import { isServer } from '../../../config'
import { getCombinedLink } from './links/combinedLink'

export const getApolloClient = (
  ctx?: any,
  initialState?: NormalizedCacheObject,
  token?: string | undefined,
) => {
  const cache = new InMemoryCache().restore(initialState || {})

  return new ApolloClient({
    link: getCombinedLink(token),
    cache,
    ssrMode: isServer, // Disables forceFetch on the server (so queries are only run once)
  })
}

export const withApollo = (Comp: NextPage<any, any>) => ({
  apolloState,
  ...pageProps
}: {
  apolloState?: any
}) => {
  return (
    <ApolloProvider client={getApolloClient(null, apolloState)}>
      <Comp {...pageProps} />
    </ApolloProvider>
  )
}
