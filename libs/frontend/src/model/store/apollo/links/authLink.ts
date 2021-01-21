import { ApolloLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getAuthToken, isServer } from '@codelab/frontend'

export const getAuthLink: (token: string | undefined) => ApolloLink = (token) =>
  setContext((req, { headers }) => {
    // get the authentication token from local storage if it exists
    const tokenToUse = token || (isServer ? undefined : getAuthToken())

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: tokenToUse ? `Bearer ${tokenToUse}` : '',
      },
    }
  })
