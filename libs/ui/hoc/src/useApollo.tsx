import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'
import { useMemo } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CacheShape {}

let apolloClient: ApolloClient<CacheShape>

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_API_ORIGIN}/graphql`,
      // Additional fetch() options like `credentials` or `headers`
      credentials: 'same-origin',
    }),
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
