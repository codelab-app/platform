import { ApolloClient, gql } from '@apollo/client'
import { handleQueryResult } from './handleResult'

const QueryDocument = gql`
  mutation nodeCreate($type: NodeType!) {
    CreateNode(type: $type) {
      id
      type
    }
  }
`

export const queryVertices = (apolloClient: ApolloClient<any>) => () => {
  const query = apolloClient.watchQuery<any>({
    query: QueryDocument,
  })

  return handleQueryResult(query, (q: any) => {
    return q.vertices
  })
}
