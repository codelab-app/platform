// it's permitted to use this hoocks inside decorators
import { gql } from '@apollo/client'
import { useArgs, useParameter } from '@storybook/client-api'
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

export const useApollo = (Story) => {
  const apolloClient = getApolloClient()
  const [args, updateArgs] = useArgs()
  const graphLabel = useParameter('graphLabel', null)

  if (!args.fetched && graphLabel !== null) {
    apolloClient
      .query({
        query: GraphByLabelDocument,
        variables: { label: graphLabel },
        context: { clientName: 'hasura' },
      })
      .then((reponse) => {
        updateArgs({ graphLabel, data: reponse.data, fetched: true })
      })
  }

  return Story()
}
