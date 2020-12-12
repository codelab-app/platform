import { ApolloClient, gql } from '@apollo/client'
import { createMutation } from '../createMutation'

const createEdgeMutateDocument = gql`
  mutation createEdge($data: EdgeCreateInput!) {
    createEdge(data: $data) {
      id
    }
  }
`
const publishEdgeMutateDocument = gql`
  mutation publishEdge($id: ID) {
    publishEdge(where: { id: $id }) {
      id
    }
  }
`

type Edge = {
  createdAt: string
  updatedAt: string
  source: string
  target: string
  label: string
}
const createEdgeMapper = (q: any) => q.data.createEdge.id
const publishEdgeMapper = (q: any) => {
  console.log('publishEdgeMapper', q)

  return q
}

export const createEdgeMutation = (apolloClient: ApolloClient<any>) => (
  data: any,
) => {
  const createMutationLinkedToApollo = createMutation(apolloClient)

  return createMutationLinkedToApollo(
    {
      mutation: createEdgeMutateDocument,
      variables: { data },
    },
    createEdgeMapper,
  ).then((id) =>
    createMutationLinkedToApollo(
      {
        mutation: publishEdgeMutateDocument,
        variables: { id },
        refetchQueries: ['edges'],
      },
      publishEdgeMapper,
    ),
  )
}
