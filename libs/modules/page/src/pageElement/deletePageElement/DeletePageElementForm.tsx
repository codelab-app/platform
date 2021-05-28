import {
  createNotificationHandler,
  emptyJsonSchema,
  EmptyJsonSchemaType,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  useDeletePageElementMutation,
  useGetPageElementQuery,
} from '@codelab/graphql'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'

type DeletePageElementFormProps = UniFormUseCaseProps<EmptyJsonSchemaType>

export const DeletePageElementForm = (props: DeletePageElementFormProps) => {
  const {
    reset,
    setLoading,
    state: { deleteIds: deletePageElementIds },
  } = useCRUDModalForm(EntityType.PageElement)

  const [mutate, { loading: deleting }] = useDeletePageElementMutation({
    //Not sure what to refetch here either
    // refetchQueries: [refetchGetAppPageQuery({ appId, pageId })],
  })

  useEffect(() => {
    setLoading(deleting)
  }, [deleting, setLoading])

  const { data, loading } = useGetPageElementQuery({
    variables: {
      input: {
        pageElementId: deletePageElementIds[0],
      },
    },
  })

  const element = data?.getPageElement

  if (loading) {
    return <Spin />
  }

  const onSubmit = () => {
    return mutate({
      variables: {
        input: { pageElementId: deletePageElementIds[0] },
      },
    })
  }

  return (
    <FormUniforms<EmptyJsonSchemaType>
      data-testid="delete-component-element-form"
      id="delete-component-element-form"
      onSubmit={onSubmit}
      schema={emptyJsonSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting component element',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete page element "{element?.name}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
