import { HttpLink } from '@apollo/client'
import { fetch } from 'cross-fetch'

/**
 * Pass in graphqlUri to context
 */
export const codelabLink = new HttpLink({
  uri: (o) => o.getContext()?.graphqlUri,
  credentials: 'same-origin',
  fetch,
})
