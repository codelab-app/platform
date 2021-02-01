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
  const [mutate] = useUpdateVertexMutation({
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
      mutate={mutate}
      schema={UpdateVertexInputSchema}
      initialFormData={{ vertexId: vertex.id, type: vertex.type ?? '' }}
    />
  )
}
