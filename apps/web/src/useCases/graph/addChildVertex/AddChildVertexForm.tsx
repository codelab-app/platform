import React from 'react'
import { ApolloForm, PropsWithIds } from '@codelab/frontend'
import {
  AddChildVertexInput,
  GetPageGql,
  UpdateVertexMutationVariables,
  VertexFragmentsFragment,
  useAddChildVertexMutation, AddChildVertexInputSchema,
} from '@codelab/generated'
import { JSONSchema7 } from 'json-schema';

export type AddChildVertexFormProps = {
  vertex: VertexFragmentsFragment
  parentVertexId: string
}

export const AddChildVertexForm = ({
  pageId,
  vertex,
  parentVertexId,
  ...props
}: AddChildVertexFormProps & PropsWithIds<'pageId'>) => {
  const [mutate] = useAddChildVertexMutation({
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
      mutate={mutate}
      schema={AddChildVertexInputSchema as unknown as JSONSchema7}
      initialFormData={{
        parentVertexId,
        vertex: { type: '', props: {} },
      }}
      uiSchema={{
        parentVertexId: {
          'ui:disabled': 'parentVertexId',
        },
      }}
      idPrefix="add_child_vertex"
      {...props}
    />
  )
}
