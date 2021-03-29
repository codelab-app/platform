import React from 'react'
import {
  GetVertexGql,
  UpdateVertexInput,
  UpdateVertexInputSchema,
  UpdateVertexMutationVariables,
  VertexFragmentsFragment,
  useUpdateVertexMutation,
} from '@codelab/generated'
import { ApolloForm } from '@codelab/frontend/shared'

type UpdateVertexFormProps = {
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
      key={vertex.id}
      mutate={mutate}
      schema={UpdateVertexInputSchema}
      uiSchema={{
        type: {
          'ui:disabled': 'type',
        },
      }}
      hideSubmitButton
      saveOnChange
      initialFormData={{
        vertexId: vertex.id,
        type: vertex.type ?? '',
        props: vertex.props,
      }}
      idPrefix="update_vertex"
    />
  )
}
