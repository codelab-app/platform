import { ApolloLink } from '@apollo/client'
import { getAuthLink } from './authLink'
import { codelabLink } from './codelabLink'
import { errorLink } from './errorLink'
// import { graphcmsLink } from './graphcmsLink'

// export const combinedLink = ApolloLink.from([errorLink]).split(
//   (operation) => operation.getContext().clientName === 'hasura',
//   hasuraLink,
//   graphcmsLink,
// )

export const getCombinedLink = (token: string | undefined) =>
  ApolloLink.from([errorLink, getAuthLink(token), codelabLink])
