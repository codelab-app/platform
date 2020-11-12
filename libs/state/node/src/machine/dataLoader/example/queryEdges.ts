import { ApolloClient, gql } from '@apollo/client'
import { createQueryObservable } from '../createQueryObservable'

const QueryDocument = gql`
  query edges {
    edges {
      id
    }
  }
`

const mapper = (q: any) => {
  return q.edges
}

export const queryEdges = (apolloClient: ApolloClient<any>) => () => {
  return createQueryObservable(apolloClient)({ query: QueryDocument }, mapper)
}
