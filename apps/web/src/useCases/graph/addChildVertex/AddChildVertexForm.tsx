import React from 'react'
import { ApolloForm, PropsWithIds } from '@codelab/frontend'
import {
  AddChildVertexInput,
  AddChildVertexInputSchema,
  GetPageGql,
  UpdateVertexMutationVariables,
  VertexFragmentsFragment,
  useAddChildVertexMutation,
} from '@codelab/generated'

export type AddChildVertexFormProps = {
  vertex: VertexFragmentsFragment
  parentVertexId: string
} & PropsWithIds<'pageId'>

export const AddChildVertexForm = ({
  pageId,
  vertex,
  parentVertexId,
  ...props
}: AddChildVertexFormProps) => {
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
      schema={AddChildVertexInputSchema}
      initialFormData={{
        parentVertexId,
        vertex: { type: '', props: {} },
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
