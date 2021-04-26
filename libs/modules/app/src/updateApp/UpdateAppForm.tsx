import React, { useEffect } from 'react'
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
import { AutoFields } from 'uniforms-antd'
import { useRecoilState } from 'recoil'
import { appState } from '../state'

export const UpdateAppForm = (props: UniFormUseCaseProps<UpdateAppInput>) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.App)
  const { id: appId } = state
  const [, setAppState] = useRecoilState(appState)

  const [mutate, { loading: updateAppLoading }] = useEditAppMutation({
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

  useEffect(() => {
    setLoading(updateAppLoading)
    setAppState((current) => ({ ...current, updateAppLoading }))
  }, [updateAppLoading])

  const app = data?.app_by_pk

  if (loading) {
    return <Spin />
  }

  const onSubmit = (submitData: DeepPartial<UpdateAppInput>) => {
    // Because fragments are used, useGetAppQuery returns some fields which cannot be passed to the update app mutation
    const editedData = { ...submitData } as any
    delete editedData['pages']
    delete editedData['__typename']
    delete editedData['user_id']
    delete editedData['id']

    return mutate({
      variables: {
        input: {
          // ...submitData,
          ...editedData,
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
        title: `Error while updating app '${app?.name}'`,
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
