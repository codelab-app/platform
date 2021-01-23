import { ApolloLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

export const testAuthLink = (token: string): ApolloLink => {
  return setContext((_, { headers }) => {
    return { headers: { ...headers, authorization: `Bearer ${token}` } }
  })
}
