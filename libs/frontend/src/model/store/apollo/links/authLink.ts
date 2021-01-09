import { ApolloLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getAuthTokenFromLocalStorage } from '@codelab/modules/user-stories'

export const authLink: ApolloLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getAuthTokenFromLocalStorage()

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})
