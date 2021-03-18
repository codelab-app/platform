import React from 'react'
import {
  filterAddChildVertexInputSchema,
} from '@codelab/frontend'
import {
  AddChildVertexInput,
  AddChildVertexInputSchema,
  // AddChildVertexInputSchema,
  GetPageGql,
  UpdateVertexMutationVariables,
  VertexFragmentsFragment,
  useAddChildVertexMutation,
} from '@codelab/generated'
import { ApolloForm, PropsWithIds } from '@codelab/frontend/shared'

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
      schema={filterAddChildVertexInputSchema(
        vertex.type,
        AddChildVertexInputSchema,
      )}
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
