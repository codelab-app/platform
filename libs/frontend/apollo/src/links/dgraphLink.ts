import { HttpLink } from '@apollo/client'
import { fetch } from 'cross-fetch'

/**
 * Pass in graphqlUri to context
 */
export const dgraphLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/dgraphql`,
  credentials: 'same-origin',
  fetch,
})
