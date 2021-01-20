import { ApolloLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getAuthToken } from '@codelab/frontend'

export const authLink: ApolloLink = setContext((req, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getAuthToken()

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})
