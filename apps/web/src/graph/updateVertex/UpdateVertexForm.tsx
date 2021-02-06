import { merge } from 'lodash'
import React from 'react'
import { ApolloForm } from '@codelab/frontend'
import {
  GetPageGql,
  ReactGridItemSchema,
  UpdateVertexInput,
  UpdateVertexInputSchema,
  UpdateVertexMutationVariables,
  VertexFragmentsFragment,
  useUpdateVertexMutation,
} from '@codelab/generated'

interface UpdateVertexFormProps {
  vertex: VertexFragmentsFragment
  pageId: string
}

export const UpdateVertexForm = ({ vertex, pageId }: UpdateVertexFormProps) => {
  const [mutate, { loading }] = useUpdateVertexMutation({
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
