import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { env } from '@codelab/shared-config-env'

/**
 * Apollo client for browser environments without WebSocket dependencies
 * This avoids the 'net' and 'tls' Node.js module issues in the browser
 */
export const createBrowserApolloClient = () => {
  // Move port getter to a function to avoid early evaluation
  const getApiPort = () =>
    env.get('NEXT_PUBLIC_API_PORT').required().asPortNumber()

  const httpLink = new HttpLink({
    uri: `http://127.0.0.1:${getApiPort()}/api/v1/graphql`,
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  })
}

// Lazy-loaded client instance
let browserClient: ApolloClient<any> | null = null

export const getBrowserApolloClient = () => {
  if (!browserClient) {
    browserClient = createBrowserApolloClient()
  }

  return browserClient
}
