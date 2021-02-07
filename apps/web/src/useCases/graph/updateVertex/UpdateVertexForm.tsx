import { merge } from 'lodash'
import React, { useContext } from 'react'
import { AppContext } from '../../apps/AppProvider'
import { ApolloForm } from '@codelab/frontend'
import {
  GetPageGql,
  ReactGridItemSchema,
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
  const { pageId } = useContext(AppContext)
  const [mutate] = useUpdateVertexMutation({
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
      {...UpdateVertexInputFormProps}
      initialFormData={{
        vertexId: vertex.id,
        type: vertex.type ?? '',
        props: vertex.props,
      }}
    />
  )
}
