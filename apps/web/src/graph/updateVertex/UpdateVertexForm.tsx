import { merge } from 'lodash'
import React from 'react'
import { ApolloForm } from '@codelab/frontend'
import {
  GetVertexGql,
  ReactGridResponsiveLayoutSchema,
  UpdateVertexInput,
  UpdateVertexInputSchema,
  UpdateVertexMutationVariables,
  VertexFragmentsFragment,
  useUpdateVertexMutation,
} from '@codelab/generated'

interface UpdateVertexFormProps {
  vertex: VertexFragmentsFragment
}

export const UpdateVertexForm = ({ vertex }: UpdateVertexFormProps) => {
  const [mutate, { loading }] = useUpdateVertexMutation({
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

  const schema = {
    ...merge(UpdateVertexInputSchema, {
      properties: {
        ...ReactGridResponsiveLayoutSchema.properties,
      },
    }),
  }

  console.log(schema)

  return (
    <ApolloForm<UpdateVertexInput, UpdateVertexMutationVariables>
      hideSubmitButton={false}
      mutate={mutate}
      schema={schema}
      initialFormData={{ vertexId: vertex.id, type: vertex.type ?? '' }}
    />
  )
}
