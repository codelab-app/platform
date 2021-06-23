import {
  refetchGetPageQuery,
  useDeletePageElementMutation,
  useGetPageElementQuery,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  emptyJsonSchema,
  EmptyJsonSchemaType,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Spin } from 'antd'
import React, { useContext, useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'
import { PageContext } from '../../providers'

export type DeletePageElementFormProps =
  UniFormUseCaseProps<EmptyJsonSchemaType>

export const DeletePageElementForm = ({
  onSubmitError,
  onSubmitSuccess,
  ...props
}: DeletePageElementFormProps) => {
  const {
    reset,
    setLoading,
    state: { deleteIds: deletePageElementIds },
  } = useCRUDModalForm(EntityType.PageElement)

  const { pageId } = useContext(PageContext)

  const [mutate, { loading: deleting }] = useDeletePageElementMutation({
    refetchQueries: [refetchGetPageQuery({ input: { pageId: pageId || '' } })],
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
      onSubmitSuccess={[
        () => reset(),
        ...(Array.isArray(onSubmitSuccess)
          ? onSubmitSuccess
          : [onSubmitSuccess]),
      ]}
      {...props}
    >
      <h4>Are you sure you want to delete page element "{element?.name}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
