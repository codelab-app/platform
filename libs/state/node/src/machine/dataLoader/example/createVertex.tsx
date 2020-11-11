import { ApolloClient, gql } from '@apollo/client'
import { createMutation } from '../createMutation'

const createVertexMutateDocument = gql`
  mutation createVetex($data: VertexCreateInput!) {
    createVertex(data: $data) {
      id
    }
  }
`
const publishVertexMutateDocument = gql`
  mutation publishVertex($id: ID) {
    publishVertex(where: { id: $id }) {
      id
    }
  }
`

type Vertex = {
  label: string
  createdAt: string
  updatedAt: string
}
const createVertexMapper = (q: any) => q.data.createVertex.id
const publishVertexMapper = (q: any) => {
  console.log('publishVertexMapper', q)

  return q
}

export const createVertexMutation = (apolloClient: ApolloClient<any>) => (
  data: any,
) => {
  const createMutationLinkedToApollo = createMutation(apolloClient)

  return createMutationLinkedToApollo(
    {
      mutation: createVertexMutateDocument,
      variables: { data },
    },
    createVertexMapper,
  ).then((id) =>
    createMutationLinkedToApollo(
      {
        mutation: publishVertexMutateDocument,
        variables: { id },
        refetchQueries: ['vertices'],
      },
      publishVertexMapper,
    ),
  )
}
