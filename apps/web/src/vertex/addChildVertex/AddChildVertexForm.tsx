import React from 'react'
import { AddChildVertexInputSchema } from '../../../../../libs/generated/src/json-schema.generated'
import { ApolloForm } from '@codelab/frontend'
import {
  AddChildVertexInput,
  GetVertexGql,
  NodeType,
  UpdateVertexMutationVariables,
  VertexFragmentsFragment,
  useAddChildVertexMutation,
} from '@codelab/generated'

export interface AddChildVertexFormProps {
  vertex: VertexFragmentsFragment
  parentVertexId: string
}

export const AddChildVertexForm = ({
  vertex,
  parentVertexId,
  ...props
}: AddChildVertexFormProps) => {
  const addChildVertexMutation = useAddChildVertexMutation({
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
    <ApolloForm<AddChildVertexInput, UpdateVertexMutationVariables>
      hideSubmitButton
      mutation={addChildVertexMutation}
      schema={AddChildVertexInputSchema}
      formData={{
        parentVertexId,
        vertex: { type: NodeType.ReactAffix, props: {} },
      }}
      rjsfFormProps={{
        uiSchema: {
          parentVertexId: {
            'ui:disabled': 'parentVertexId',
          },
        },
      }}
      {...props}
    />
  )
}
