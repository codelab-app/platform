import React from 'react'
import { GetPageGql } from '../../../../../libs/generated/src/graphql.generated'
import { AddChildVertexInputSchema } from '../../../../../libs/generated/src/json-schema.generated'
import { ApolloForm } from '@codelab/frontend'
import {
  AddChildVertexInput,
  NodeType,
  UpdateVertexMutationVariables,
  VertexFragmentsFragment,
  useAddChildVertexMutation,
} from '@codelab/generated'

export interface AddChildVertexFormProps {
  vertex: VertexFragmentsFragment
  parentVertexId: string
  pageId: string
}

export const AddChildVertexForm = ({
  pageId,
  vertex,
  parentVertexId,
  ...props
}: AddChildVertexFormProps) => {
  const addChildVertexMutation = useAddChildVertexMutation({
    refetchQueries: [
      {
        query: GetPageGql,
        variables: {
          input: {
            pageId,
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
