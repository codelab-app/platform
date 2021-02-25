import React from 'react'
import { UpdateEdgeInput } from '../../../../../../libs/modules/graph/src/core/application/useCases/updateEdge/UpdateEdgeInput'
import { ApolloForm } from '@codelab/frontend'
import {
  UpdateEdgeInputSchema,
  UpdateEdgeMutationVariables,
  useUpdateEdgeMutation,
} from '@codelab/generated'

export const UpdateEdgeForm = () => {
  const [mutate] = useUpdateEdgeMutation({
    refetchQueries: [
      // {
      //   query: GetPageGql,
      //   variables: {
      //     input: {
      //       pageId,
      //     },
      //   },
      // },
    ],
  })

  return (
    <ApolloForm<UpdateEdgeInput, UpdateEdgeMutationVariables>
      mutate={mutate}
      schema={UpdateEdgeInputSchema}
      initialFormData={{ id: '' }}
      uiSchema={{
        parentVertexId: {
          'ui:disabled': 'parentVertexId',
        },
      }}
    />
  )
}
