import { ApolloLink } from '@apollo/client'
import { errorLink } from './errorLink'
import { graphcmsLink } from './graphcmsLink'
import { hasuraLink } from './hasuraLink'

export const combinedLink = ApolloLink.from([errorLink]).split(
  (operation) => operation.getContext().clientName === 'hasura',
  hasuraLink,
  graphcmsLink,
)
