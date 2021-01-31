import React from 'react'
import {
  UpdateEdgeMutationVariables,
  useUpdateEdgeMutation,
} from '../../../../../libs/generated/src/graphql.generated'
import { UpdateEdgeInput } from '../../../../../libs/modules/graph/src/core/application/useCases/updateEdge/UpdateEdgeInput'
import { ApolloForm } from '@codelab/frontend'
import { UpdateEdgeInputSchema } from '@codelab/generated'

export const UpdateEdgeForm = () => {
  const updateEdgeMutation = useUpdateEdgeMutation({
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
      mutation={updateEdgeMutation}
      schema={UpdateEdgeInputSchema}
      formData={{ id: '' }}
      rjsfFormProps={{
        uiSchema: {
          parentVertexId: {
            'ui:disabled': 'parentVertexId',
          },
        },
      }}
    />
  )
}
