import { ApolloLink } from '@apollo/client'
import { codelabLink } from './codelabLink'
import { errorLink } from './errorLink'
// import { graphcmsLink } from './graphcmsLink'

// export const combinedLink = ApolloLink.from([errorLink]).split(
//   (operation) => operation.getContext().clientName === 'hasura',
//   hasuraLink,
//   graphcmsLink,
// )

export const combinedLink = ApolloLink.from([errorLink, codelabLink])
