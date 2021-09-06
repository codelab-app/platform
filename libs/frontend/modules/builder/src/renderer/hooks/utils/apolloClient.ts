import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const link = new HttpLink({
  uri: (op) => op.getContext().uri,
  fetch,
})

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  // Disables forceFetch on the server (so queries are only run once)
  ssrMode: typeof window === 'undefined',
})
