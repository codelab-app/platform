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
import { combinedLink } from '../links/combinedLink'

export const getApolloClient = (
  ctx?: any,
  initialState?: NormalizedCacheObject,
) => {
  const cache = new InMemoryCache().restore(initialState || {})

  return new ApolloClient({
    link: combinedLink,
    cache,
  })
}

export const withApollo = (Comp: NextPage) => (props: any) => {
  return (
    <ApolloProvider client={getApolloClient(null, props.apolloState)}>
      <Comp />
    </ApolloProvider>
  )
}
