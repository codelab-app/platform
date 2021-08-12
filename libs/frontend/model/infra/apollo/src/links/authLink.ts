import { ApolloLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getAuthToken } from '@codelab/frontend/shared/utils'

/**
 * Manages the ```Authorization``` header.
 * Gets it from two places:
 *  - authToken property in the request context
 *  - If authToken context is not set -> from the cookie stored in the client side (```document.cookie```), if we're on the client
 */
// Do we even need this? Doesn't nextjs-auth0 handle our authentication?
export const authLink: ApolloLink = setContext(
  (req, { authToken: authTokenFromContext, headers }) => {
    // get the authentication token from local cookie if it exists
    const token = authTokenFromContext || getAuthToken()

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        // authorization: token ? `Bearer ${token}` : '', i guess we don't need this
      },
    }
  },
)
