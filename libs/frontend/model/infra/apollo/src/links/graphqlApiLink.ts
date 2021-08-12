import { HttpLink } from '@apollo/client'
import { fetch } from 'cross-fetch'

console.log(process.env.NEXT_PUBLIC_API_ORIGIN)

export const graphqlApiLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/graphql`,
  credentials: 'same-origin',
  fetch,
})
