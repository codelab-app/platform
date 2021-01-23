import { ApolloLink } from '@apollo/client'
import { testCodelabLink } from '../../../../../../frontend/src/model/store/apollo/links/testCodelabLink'
import { testAuthLink } from './testAuthLink'
import { testErrorLink } from './testErrorLink'

export const testCombinedLink = (url: string, token?: string): ApolloLink => {
  return token
    ? ApolloLink.from([
        // testWsLink(url, token),
        testAuthLink(token),
        testErrorLink,
        testCodelabLink(url),
      ])
    : ApolloLink.from([testErrorLink, testCodelabLink(url)])
}
