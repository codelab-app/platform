import {
  refetchGetPagesListQuery,
  useDeletePageMutation,
  useGetPageQuery,
} from '@codelab/dgraph'
import {
  AppContext,
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Spin } from 'antd'
import React, { useContext, useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'
import { DeletePageInput, DeletePageSchema } from './deletePageSchema'

type DeletePageFormProps = UniFormUseCaseProps<DeletePageInput>

export const DeletePageForm = (props: DeletePageFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Page)
  const { deleteIds: deletePageIds } = state
  const { app } = useContext(AppContext)

  const [mutate, { loading: deleting }] = useDeletePageMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetPagesListQuery({ appId: app.id })],
  })

  useEffect(() => {
    setLoading(deleting)
  }, [deleting])

  const { data, loading } = useGetPageQuery({
    variables: {
      pageId: deletePageIds[0],
    },
  })

  const page = data?.page

  if (loading) {
    return <Spin />
  }

  const onSubmit = () => {
    return mutate({
      variables: {
        pageId: deletePageIds[0],
      },
    })
  }

  return (
    <FormUniforms<DeletePageInput>
      onSubmit={onSubmit}
      schema={DeletePageSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting page',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete page "{page?.title}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
