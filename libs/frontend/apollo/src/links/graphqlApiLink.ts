import { HttpLink } from '@apollo/client'
import { fetch } from 'cross-fetch'

export const graphqlApiLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/graphql`,
  credentials: 'same-origin',
  fetch,
})
