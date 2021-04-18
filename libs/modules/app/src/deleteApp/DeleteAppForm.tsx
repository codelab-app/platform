import React, { useEffect } from 'react'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
} from '@codelab/frontend/shared'
import { useDeleteAppMutation, GetAppsListGql } from '@codelab/hasura'
import { useCRUDModalForm } from '@codelab/frontend/shared'
import { Spin } from 'antd'
import { AutoFields } from 'uniforms-antd'
import { DeleteAppInput, DeleteAppSchema } from './deleteAppSchema'
import { useGetAppQuery } from '@codelab/hasura'

type DeleteAppFormProps = UniFormUseCaseProps<DeleteAppInput>

export const DeleteAppForm = (props: DeleteAppFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.App)
  const { id: appId } = state

  const [mutate, { loading: deleting }] = useDeleteAppMutation({
    refetchQueries: [
      {
        query: GetAppsListGql,
      },
    ],
  })
  useEffect(() => {
    setLoading(deleting)
  }, [deleting])

  const { data, loading } = useGetAppQuery({
    variables: {
      appId,
    },
  })

  const app = data?.app_by_pk

  if (loading) {
    return <Spin />
  }

  const onSubmit = () => {
    return mutate({
      variables: {
        id: appId,
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
