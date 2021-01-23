import { HttpLink } from '@apollo/client'
import { fetch } from 'cross-fetch'

export const testCodelabLink = (url: string) => {
  return new HttpLink({
    uri: url,
    fetch,
  })
}
