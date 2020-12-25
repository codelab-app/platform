import { gql } from '@apollo/client'
import { getApolloClient } from '@codelab/alpha/ui/hoc'

const GraphByLabelDocument = gql`
  query graphByLabel($label: String) {
    graph(where: { label: { _eq: $label } }) {
      id
      label
      vertices {
        id
        type
        props
      }
      edges {
        id
        source
        target
        props
      }
    }
  }
`

export const queryGraph = async (graphLabel: string) => {
  const apolloClient = getApolloClient()

  return {
    data: await apolloClient
      .query({
        query: GraphByLabelDocument,
        variables: { label: graphLabel },
        context: { clientName: 'hasura' },
      })
      .then((reponse) => {
        return reponse.data
      }),
  }
}
