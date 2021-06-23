import {
  refetchGetPagesQuery,
  useDeletePageMutation,
  useGetPageQuery,
} from '@codelab/codegen/graphql'
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
import { Spin } from 'antd'
import React, { useContext, useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'

type DeletePageFormProps = UniFormUseCaseProps<EmptyJsonSchemaType>

export const DeletePageForm = (props: DeletePageFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Page)
  const { deleteIds: deletePageIds } = state
  const { app } = useContext(AppContext)

  const [mutate, { loading: deleting }] = useDeletePageMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetPagesQuery({ input: { appId: app.id } })],
  })

  useEffect(() => {
    setLoading(deleting)
  }, [deleting])

  const { data, loading } = useGetPageQuery({
    variables: {
      input: { pageId: deletePageIds[0] },
    },
  })

  const page = data?.page

  if (loading) {
    return <Spin />
  }

  const onSubmit = () => {
    return mutate({
      variables: {
        input: { pageId: deletePageIds[0] },
      },
    })
  }

  return (
    <FormUniforms<EmptyJsonSchemaType>
      onSubmit={onSubmit}
      schema={emptyJsonSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting page',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete page "{page?.name}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
