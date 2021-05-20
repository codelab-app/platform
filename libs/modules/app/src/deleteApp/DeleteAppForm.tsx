import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { refetchGetAppsQuery, useDeleteAppMutation } from '@codelab/graphql'
import React, { useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'
import { DeleteAppInput, DeleteAppSchema } from './deleteAppSchema'

type DeleteAppFormProps = UniFormUseCaseProps<DeleteAppInput>

export const DeleteAppForm = (props: DeleteAppFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.App)
  const { deleteIds: appDeleteIds, metadata } = state

  const [mutate, { loading: deleting }] = useDeleteAppMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetAppsQuery()],
  })

  useEffect(() => {
    setLoading(deleting)
  }, [deleting])

  const onSubmit = () => {
    return mutate({
      variables: {
        input: {
          appId: appDeleteIds[0],
        },
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
      <h4>Are you sure you want to delete app "{metadata?.name}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
