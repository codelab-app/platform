import {
  refetchGetAppsQuery,
  useDeleteAppMutation,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalForm,
} from '@codelab/frontend/shared'
import React, { useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'
import { DeleteAppInput, DeleteAppSchema } from './deleteAppSchema'

type DeleteAppFormProps = UniFormUseCaseProps<DeleteAppInput>

export const DeleteAppForm = (props: DeleteAppFormProps) => {
  const { reset, setLoading, state } = useCrudModalForm(EntityType.App)
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
