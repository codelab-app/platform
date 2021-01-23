import { ApolloClient, InMemoryCache } from '@apollo/client'
import { testCombinedLink } from './links/testCombinedLink'

export const getApolloTestClient = (url: string, token?: string) => {
  return new ApolloClient({
    link: testCombinedLink(url, token),
    cache: new InMemoryCache({ addTypename: false }),
  })
}
