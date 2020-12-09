import { HttpLink } from '@apollo/client'

export const hasuraLink = new HttpLink({
  uri: `http://localhost:${process.env.API_PORT_GRAPH}/graphql`,
  credentials: 'same-origin',
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT_TOKEN}`,
  },
})
