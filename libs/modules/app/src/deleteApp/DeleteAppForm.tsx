import {
  refetchGetAppsListQuery,
  useDeleteAppMutation,
  useGetAppItemQuery,
} from '@codelab/dgraph'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'
import { DeleteAppInput, DeleteAppSchema } from './deleteAppSchema'

type DeleteAppFormProps = UniFormUseCaseProps<DeleteAppInput>

export const DeleteAppForm = (props: DeleteAppFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.App)
  const { deleteIds: appDeleteIds } = state

  const [mutate, { loading: deleting }] = useDeleteAppMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetAppsListQuery()],
  })

  useEffect(() => {
    setLoading(deleting)
  }, [deleting])

  const { data, loading } = useGetAppItemQuery({
    variables: {
      appId: appDeleteIds[0],
    },
  })

  const app = data?.getApp

  if (loading) {
    return <Spin />
  }

  const onSubmit = () => {
    return mutate({
      variables: {
        id: appDeleteIds[0],
      },
    })
  }

  return (
    <FormUniforms<DeleteAppInput>
      onSubmit={onSubmit}
      schema={DeleteAppSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting app',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete app "{app?.name}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
