import { HttpLink } from '@apollo/client'
import { fetch } from 'cross-fetch'

/**
 * Pass in graphqlUri to context
 */
export const hasuraLink = new HttpLink({
  // uri: (operation) => operation.getContext()?.graphqlUri,
  uri: `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/graphql`,
  credentials: 'same-origin',
  fetch,
})
