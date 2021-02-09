import React from 'react'
import { ApolloForm, PropsWithIds } from '@codelab/frontend'
import {
  AddChildVertexInput,
  // AddChildVertexInputSchema,
  GetPageGql,
  UpdateVertexMutationVariables,
  VertexFragmentsFragment,
  useAddChildVertexMutation,
} from '@codelab/generated'

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
      schema={{}}
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
