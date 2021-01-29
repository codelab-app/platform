import React from 'react'
import { AddChildNodeInputSchema } from '../../../../../libs/generated/src/json-schema.generated'
import { ApolloForm } from '@codelab/frontend'
import {
  AddChildNodeInput,
  GetVertexGql,
  NodeType,
  UpdateNodeMutationVariables,
  VertexFragmentsFragment,
  useAddChildNodeMutation,
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
  const addChildVertexMutation = useAddChildNodeMutation({
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
    <ApolloForm<AddChildNodeInput, UpdateNodeMutationVariables>
      hideSubmitButton
      mutation={addChildVertexMutation}
      schema={AddChildNodeInputSchema}
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
