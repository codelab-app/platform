import { HttpLink } from '@apollo/client'
import { fetch } from 'cross-fetch'

/**
 * Pass in graphqlUri to context
 */
export const apiLink = new HttpLink({
  uri: (operation) => operation.getContext()?.graphqlUri,
  credentials: 'same-origin',
  fetch,
})
