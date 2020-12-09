import { HttpLink } from '@apollo/client'
import fetch from 'cross-fetch'

export const graphcmsLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT}`,
  // Additional fetch() options like `credentials` or `headers`
  credentials: 'same-origin',
  fetch,
})
