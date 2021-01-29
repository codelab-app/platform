import React from 'react'
import { ApolloForm } from '@codelab/frontend'
import {
  GetVertexGql,
  UpdateNodeInput,
  UpdateNodeInputSchema,
  UpdateNodeMutationVariables,
  VertexFragmentsFragment,
  useUpdateNodeMutation,
} from '@codelab/generated'

interface UpdateVertexFormProps {
  vertex: VertexFragmentsFragment
}

export const UpdateVertexForm = ({ vertex }: UpdateVertexFormProps) => {
  const updateNodeMutation = useUpdateNodeMutation({
    refetchQueries: [
      {
        query: GetVertexGql,
        variables: {
          input: {
            id: vertex.id,
          },
        },
      },
    ],
  })

  return (
    <ApolloForm<UpdateNodeInput, UpdateNodeMutationVariables>
      hideSubmitButton={false}
      mutation={updateNodeMutation}
      schema={UpdateNodeInputSchema}
      formData={{ vertexId: vertex.id, type: vertex.type }}
    />
  )
}
