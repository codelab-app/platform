import { ApolloLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getAuthToken } from '@codelab/frontend/shared/utils'

/**
 * Manages the ```Authorization``` header.
 * Gets it from two places:
 *  - authToken property in the request context
 *  - If authToken context is not set -> from the cookie stored in the client side (```document.cookie```), if we're on the client
 */
// We use http-proxy-middleware to handle adding authorization code
export const authLink: ApolloLink = setContext(
  (req, { authToken: authTokenFromContext, headers }) => {
    // get the authentication token from local cookie if it exists
    const token = authTokenFromContext || getAuthToken()

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        // authorization: token ? `Bearer ${token}` : '',
      },
    }
  },
)
