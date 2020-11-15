import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { concatPagination } from '@apollo/client/utilities'
import { useMemo } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CacheShape {}

let apolloClient: ApolloClient<CacheShape>

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export const graphcmsLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT}`,
  // Additional fetch() options like `credentials` or `headers`
  credentials: 'same-origin',
})

export const hasuraLink = new HttpLink({
  uri: `http://localhost:${process.env.API_PORT_GRAPH}/graphql`,
  credentials: 'same-origin',
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT_TOKEN}`,
  },
})

export const link = ApolloLink.from([errorLink]).split(
  (operation) => operation.getContext().clientName === 'hasura',
  hasuraLink,
  graphcmsLink,
)

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  })
}

export const initializeApollo = (initialState: CacheShape = {}) => {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data

    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export const useApollo = (initialState: CacheShape) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState])

  return store
}
