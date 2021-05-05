import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  refetchGetAppsListQuery,
  useEditAppMutation,
  useGetAppItemQuery,
} from '@codelab/hasura'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { DeepPartial } from 'uniforms'
import { AutoFields } from 'uniforms-antd'
import { appState } from '../state'
import { UpdateAppInput, updateAppSchema } from './updateAppSchema'

export const UpdateAppForm = (props: UniFormUseCaseProps<UpdateAppInput>) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.App)
  const { updateId: updateAppId } = state
  const [, setAppState] = useRecoilState(appState)

  const [mutate, { loading: updateAppLoading }] = useEditAppMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetAppsListQuery()],
  })

  const { data, loading } = useGetAppItemQuery({
    variables: {
      appId: updateAppId,
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
    if (!app?.id) {
      throw new Error('Missing appId')
    }

    return mutate({
      variables: {
        input: {
          name: submitData.name,
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
