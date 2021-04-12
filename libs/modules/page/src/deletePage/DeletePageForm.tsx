import React, { useContext, useEffect } from 'react'
import {
  AppContext,
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
} from '@codelab/frontend/shared'
import { DeletePageInput, DeletePageSchema } from './deletePageSchema'
import {
  useDeletePageMutation,
  GetPagesListGql,
  useGetPageQuery,
} from '@codelab/hasura'
import { useCRUDModalForm } from '@codelab/frontend/shared'
import { Spin } from 'antd'
import { AutoFields } from 'uniforms-antd'
type DeletePageFormProps = UniFormUseCaseProps<DeletePageInput>

export const DeletePageForm = (props: DeletePageFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Page)
  const { id: pageId } = state
  const { appId } = useContext(AppContext)

  const [mutate, { loading: deleting }] = useDeletePageMutation({
    refetchQueries: [
      {
        query: GetPagesListGql,
        variables: {
          appId,
        },
      },
    ],
  })
  useEffect(() => {
    setLoading(deleting)
  }, [deleting])

  const { data, loading } = useGetPageQuery({
    variables: {
      pageId,
    },
  })

  const page = data?.page_by_pk

  if (loading) {
    return <Spin />
  }

  const onSubmit = () => {
    return mutate({
      variables: {
        pageId,
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
