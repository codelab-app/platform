import { merge } from 'lodash'
import React from 'react'
import { ApolloForm, PropsWithIds } from '@codelab/frontend'
import {
  GetPageGql,
  ReactGridItemSchema,
  UpdateVertexInput,
  UpdateVertexInputSchema,
  UpdateVertexMutationVariables,
  VertexFragmentsFragment,
  useUpdateVertexMutation,
} from '@codelab/generated'

type UpdateVertexFormProps = {
  vertex: VertexFragmentsFragment
} & PropsWithIds<'pageId'>

export const UpdateVertexForm = ({ vertex, pageId }: UpdateVertexFormProps) => {
  const [mutate] = useUpdateVertexMutation({
    awaitRefetchQueries: true,
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

  const schema = {
    ...merge(UpdateVertexInputSchema, {
      properties: {
        ...ReactGridItemSchema.properties,
      },
    }),
  }

  return (
    <ApolloForm<UpdateVertexInput, UpdateVertexMutationVariables>
      hideSubmitButton={false}
      mutate={mutate}
      schema={schema}
      initialFormData={{
        vertexId: vertex.id,
        type: vertex.type ?? '',
        props: vertex.props,
      }}
    />
  )
}
