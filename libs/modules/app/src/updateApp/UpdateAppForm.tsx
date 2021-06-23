import {
  refetchGetAppsQuery,
  UpdateAppData,
  useGetAppQuery,
  useUpdateAppMutation,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { AutoFields } from 'uniforms-antd'
import { appState } from '../state'
import { updateAppSchema } from './updateAppSchema'

export const UpdateAppForm = (props: UniFormUseCaseProps<UpdateAppData>) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.App)
  const { updateId: updateAppId } = state
  const [, setAppState] = useRecoilState(appState)

  const [mutate, { loading: updateAppLoading }] = useUpdateAppMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetAppsQuery()],
  })

  const { data, loading } = useGetAppQuery({
    variables: {
      input: {
        appId: updateAppId,
      },
    },
  })

  useEffect(() => {
    setLoading(updateAppLoading)
    setAppState((current) => ({ ...current, updateAppLoading }))
  }, [updateAppLoading])

  const app = data?.app

  if (loading) {
    return <Spin />
  }

  const onSubmit = (submitData: UpdateAppData) => {
    if (!app?.id) {
      throw new Error('Missing appId')
    }

    return mutate({
      variables: {
        input: {
          data: {
            ...submitData,
          },
          id: app.id,
        },
      },
    })
  }

  return (
    <FormUniforms<UpdateAppData>
      onSubmit={onSubmit}
      schema={updateAppSchema}
      model={{
        name: app?.name,
      }}
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
