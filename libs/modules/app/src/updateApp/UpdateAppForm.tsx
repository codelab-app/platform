import React from 'react'
import { DeepPartial } from 'uniforms'
import { GetAppsListGql, useEditAppMutation } from '@codelab/hasura'
import { UpdateAppInput, updateAppSchema } from './updateAppSchema'
import {
  FormUniforms,
  UniFormUseCaseProps,
  createNotificationHandler,
  EntityType,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { useGetAppQuery } from '@codelab/hasura'
import { Spin } from 'antd'

export const UpdateAppForm = (props: UniFormUseCaseProps<UpdateAppInput>) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.App)
  const { id: appId } = state

  const [mutate] = useEditAppMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetAppsListGql,
      },
    ],
  })

  const { data, loading } = useGetAppQuery({
    variables: {
      appId,
    },
  })

  const app = data?.app_by_pk

  if (loading) {
    return <Spin />
  }

  const onSubmit = (submitData: DeepPartial<UpdateAppInput>) => {
    return mutate({
      variables: {
        input: {
          ...submitData,
        },
        id: app?.id,
      },
    })
  }

  return (
    <FormUniforms<UpdateAppInput>
      onSubmit={onSubmit}
      schema={updateAppSchema}
      model={{ ...app } as any}
      onSubmitError={createNotificationHandler({
        // title: `Error while updating app '${editingApp.name}'`,
      })}
      {...props}
    />
  )
}
