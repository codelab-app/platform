import { ApolloProvider } from '@apollo/client'
import { NextPage } from 'next'
import React from 'react'
import { getApolloClient } from './apolloClient'

export const withApollo = (Comp: NextPage<any, any>) => ({
  apolloState,
  ...pageProps
}: {
  apolloState?: any
}) => {
  return (
    <ApolloProvider client={getApolloClient({}, apolloState)}>
      <Comp {...pageProps} />
    </ApolloProvider>
  )
}
