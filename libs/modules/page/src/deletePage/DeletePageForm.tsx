import {
  AppContext,
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  refetchGetPagesListQuery,
  useDeletePageMutation,
  useGetPageQuery,
} from '@codelab/hasura'
import { Spin } from 'antd'
import React, { useContext, useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'
import { DeletePageInput, DeletePageSchema } from './deletePageSchema'

type DeletePageFormProps = UniFormUseCaseProps<DeletePageInput>

export const DeletePageForm = (props: DeletePageFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Page)
  const { deleteIds: deletePageIds } = state
  const { appId } = useContext(AppContext)

  const [mutate, { loading: deleting }] = useDeletePageMutation({
    refetchQueries: [refetchGetPagesListQuery({ appId })],
  })

  useEffect(() => {
    setLoading(deleting)
  }, [deleting])

  const { data, loading } = useGetPageQuery({
    variables: {
      pageId: deletePageIds[0],
    },
  })

  const page = data?.page_by_pk

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
      <h4>Are you sure you want to delete page "{page?.name}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
