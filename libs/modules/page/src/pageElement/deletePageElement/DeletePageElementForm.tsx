import {
  AppContext,
  createNotificationHandler,
  emptyJsonSchema,
  EmptyJsonSchemaType,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  GetAppGql,
  useDeletePageElementMutation,
  useGetPageElementQuery,
} from '@codelab/hasura'
import { Spin } from 'antd'
import React, { useContext, useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'

type DeletePageElementFormProps = UniFormUseCaseProps<EmptyJsonSchemaType>

export const DeletePageElementForm = (props: DeletePageElementFormProps) => {
  const {
    reset,
    setLoading,
    state: { deleteIds: deletePageElementIds },
  } = useCRUDModalForm(EntityType.PageElement)

  const { pageId, appId } = useContext(AppContext)

  const [mutate, { loading: deleting }] = useDeletePageElementMutation({
    refetchQueries: [
      {
        query: GetAppGql,
        variables: {
          pageId,
          appId,
        },
      },
    ],
  })

  useEffect(() => {
    setLoading(deleting)
  }, [deleting, setLoading])

  const { data, loading } = useGetPageElementQuery({
    variables: {
      pageElementId: deletePageElementIds[0],
    },
  })

  const element = data?.page_element_by_pk

  if (loading) {
    return <Spin />
  }

  const onSubmit = () => {
    return mutate({
      variables: {
        pageElementId: deletePageElementIds[0],
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
