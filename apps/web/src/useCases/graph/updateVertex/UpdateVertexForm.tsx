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
  console.log(vertex, vertex.type)

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

  // const transformFromData = (formData: any) => {
  //   const { type } = formData.props
  //   const { props } = formData.props

  //   return {
  //     vertexId: formData.vertexId,
  //     type,
  //     props: {
  //       ...props,
  //     },
  //   } as UpdateVertexInput
  // }

  const formCtx = {
    specifiedPropsKeys: [],
  }

  const filterOptions = ({ formData }: any, e: any) => {
    if (Array.isArray(formData.props)) {
      formCtx.specifiedPropsKeys = formData?.props.map((p: any) => p.key)
      console.log(formData, e)
    }
  }

  return (
    <ApolloForm<UpdateVertexInput, UpdateVertexMutationVariables>
      key={vertex.id}
      mutate={mutate}
      schema={UpdateVertexInputSchema}
      onChange={filterOptions}
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
