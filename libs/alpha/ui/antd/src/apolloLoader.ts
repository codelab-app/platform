import { DocumentNode } from 'graphql'
import { getApolloClient } from '@codelab/alpha/ui/hoc'

export const queryGraph = async (graphQlQuery: DocumentNode) => {
  const apolloClient = getApolloClient()

  return {
    data: await apolloClient
      .query({
        query: graphQlQuery,
        context: { clientName: 'hasura' },
      })
      .then((reponse) => {
        return reponse.data
      }),
  }
}
