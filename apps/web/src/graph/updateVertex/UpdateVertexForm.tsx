import React from 'react'
import { ApolloForm } from '@codelab/frontend'
import {
  GetVertexGql,
  UpdateVertexInput,
  UpdateVertexInputSchema,
  UpdateVertexMutationVariables,
  VertexFragmentsFragment,
  useUpdateVertexMutation,
} from '@codelab/generated'

interface UpdateVertexFormProps {
  vertex: VertexFragmentsFragment
}

export const UpdateVertexForm = ({ vertex }: UpdateVertexFormProps) => {
  const updateVertexMutation = useUpdateVertexMutation({
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
    <ApolloForm<UpdateVertexInput, UpdateVertexMutationVariables>
      hideSubmitButton={false}
      mutation={updateVertexMutation}
      schema={UpdateVertexInputSchema}
      formData={{ vertexId: vertex.id, type: vertex.type ?? '' }}
    />
  )
}
