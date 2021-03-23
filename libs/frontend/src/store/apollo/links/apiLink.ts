import { ApolloLink, HttpLink } from '@apollo/client'
import { fetch } from 'cross-fetch'

/**
 * Pass in graphqlUri to context
 */
export const apiLink = ApolloLink.split(
  ({ getContext }) => getContext().hasura,
  new HttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin',
    fetch,
  }) as ApolloLink,
  new HttpLink({
    uri: (operation) => operation.getContext()?.graphqlUri,
    credentials: 'same-origin',
    fetch,
  }) as ApolloLink,
)
