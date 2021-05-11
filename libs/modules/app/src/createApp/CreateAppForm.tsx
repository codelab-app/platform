import { useUser } from '@auth0/nextjs-auth0'
import { refetchGetAppsListQuery, useCreateAppMutation } from '@codelab/dgraph'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { AutoFields } from 'uniforms-antd'
import { appState } from '../state'
import { CreateAppInput, createAppSchema } from './createAppSchema'

export const CreateAppForm = (props: UniFormUseCaseProps<CreateAppInput>) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.App)
  const { user } = useUser()

  const [mutate, { loading }] = useCreateAppMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetAppsListQuery()],
  })

  const [, setAppState] = useRecoilState(appState)

  useEffect(() => {
    // Keep the loading state in recoil, so we can use it other components, like loading buttons, etc.
    setLoading(loading)
    setAppState((current) => ({ ...current, loading }))
  }, [loading, setAppState])

  const onSubmit = (submitData: CreateAppInput) => {
    return mutate({
      variables: {
        input: {
          ...submitData,
          owner: {
            email: user?.email,
          },
          // pages: [
          //   {
          //     title: 'Default Page',
          //   },
          // ],
        },
      },
    })
  }

  return (
    <FormUniforms<CreateAppInput>
      // model={{
      //   owner: {
      //     email: user?.email ?? null,
      //   },
      // }}
      onSubmit={onSubmit}
      schema={createAppSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating app',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
