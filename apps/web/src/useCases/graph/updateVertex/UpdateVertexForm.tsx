import React from 'react'
import { ApolloForm } from '@codelab/frontend'
import {
  GetVertexGql,
  UpdateVertexInput,
  UpdateVertexInputFormProps,
  UpdateVertexInputSchema,
  UpdateVertexMutationVariables,
  VertexFragmentsFragment,
  useUpdateVertexMutation,
} from '@codelab/generated'

type UpdateVertexFormProps = {
  vertex: VertexFragmentsFragment
}

export const UpdateVertexForm = ({ vertex }: UpdateVertexFormProps) => {
  console.log(vertex)

  // const { pageId } = useContext(AppContext)
  const [mutate] = useUpdateVertexMutation({
    // awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetVertexGql,
        variables: {
          input: {
            id: vertex.id,
          },
        },
      },
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
    <ApolloForm<UpdateVertexInput, UpdateVertexMutationVariables>
      key={vertex.id}
      mutate={mutate}
      schema={UpdateVertexInputSchema}
      {...UpdateVertexInputFormProps}
      uiSchema={{
        type: {
          'ui:disabled': 'type',
        },
      }}
      hideSubmitButton
      saveOnChange
      initialFormData={{
        vertexId: vertex.id,
        props: {
          ...vertex.props,
          type: vertex.type ?? '',
        },
      }}
    />
  )
}
