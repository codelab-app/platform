/**
 * Source from https://github.com/correttojs/graphql-codegen-apollo-next-ssr
 */
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React from 'react'
import { httpLink } from './useApollo'

export const getApolloClient = (
  ctx?: any,
  initialState?: NormalizedCacheObject,
) => {
  const cache = new InMemoryCache().restore(initialState || {})

  return new ApolloClient({
    link: httpLink,
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
