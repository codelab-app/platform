import React from 'react'
import { ApolloForm } from '@codelab/frontend'
import {
  GetVertexGql,
  UpdateVertexInput,
  UpdateVertexInputFormProps,
  UpdateVertexInputSchema,
  UpdateVertexMutationVariables,
  VertexFragmentsFragment,
  useUpdateVertexMutation,
} from '@codelab/generated'

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
      {...UpdateVertexInputFormProps}
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
