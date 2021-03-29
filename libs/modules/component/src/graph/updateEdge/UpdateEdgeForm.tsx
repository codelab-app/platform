import React from 'react'
import { ApolloForm } from '@codelab/frontend/shared'
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
    <ApolloForm<any, UpdateEdgeMutationVariables>
      mutate={mutate}
      schema={UpdateEdgeInputSchema}
      initialFormData={{ id: '' }}
      uiSchema={{
        parentVertexId: {
          'ui:disabled': 'parentVertexId',
        },
      }}
      idPrefix="update_edge"
    />
  )
}
