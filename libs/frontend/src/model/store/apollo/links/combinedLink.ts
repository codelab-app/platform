import { ApolloLink } from '@apollo/client'
import { authLink } from './authLink'
import { codelabLink } from './codelabLink'
import { errorLink } from './errorLink'
// import { graphcmsLink } from './graphcmsLink'

// export const combinedLink = ApolloLink.from([errorLink]).split(
//   (operation) => operation.getContext().clientName === 'hasura',
//   hasuraLink,
//   graphcmsLink,
// )

export const combinedLink = ApolloLink.from([errorLink, authLink, codelabLink])
