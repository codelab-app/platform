import { ApolloLink, HttpLink } from '@apollo/client'
import { fetch } from 'cross-fetch'

const defaultGraphqlUri = `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/graphql`

/**
 * Pass in graphqlUri to context
 */
export const apiLink = new HttpLink({
  uri: (operation) => operation.getContext()?.graphqlUri || defaultGraphqlUri,
  credentials: 'same-origin',
  fetch,
}) as ApolloLink
