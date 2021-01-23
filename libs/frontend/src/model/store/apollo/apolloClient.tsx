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
import { combinedLink } from './links/combinedLink'

export interface ApolloContext {
  authToken?: string
}

export const getApolloClient = (
  ctx?: ApolloContext | null,
  initialState?: NormalizedCacheObject,
) => {
  const cache = new InMemoryCache().restore(initialState || {})

  return new ApolloClient({
    link: combinedLink,
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
