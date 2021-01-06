import { HttpLink } from '@apollo/client'
import { fetch } from 'cross-fetch'

export const codelabLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_ORIGIN}/graphql`,
  credentials: 'same-origin',
  headers: {
    // Mocking for now
    authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT_TOKEN}`,
  },
  fetch,
})
