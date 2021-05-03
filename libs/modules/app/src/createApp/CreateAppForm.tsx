import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { GetAppsListGql, useCreateAppMutation } from '@codelab/hasura'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { DeepPartial } from 'uniforms'
import { AutoFields } from 'uniforms-antd'
import { appState } from '../state'
import { CreateAppInput, createAppSchema } from './createAppSchema'

export const CreateAppForm = (props: UniFormUseCaseProps<CreateAppInput>) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.App)

  const [mutate, { loading }] = useCreateAppMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetAppsListGql,
      },
    ],
  })

  const [, setAppState] = useRecoilState(appState)

  useEffect(() => {
    // Keep the loading state in recoil, so we can use it other components, like loading buttons, etc.
    setLoading(loading)
    setAppState((current) => ({ ...current, loading }))
  }, [loading, setAppState])

  const onSubmit = (submitData: DeepPartial<CreateAppInput>) => {
    return mutate({
      variables: {
        input: {
          ...(submitData as any),
          pages: {
            data: [
              {
                name: 'Default page',
              },
            ],
          },
        },
      },
    })
  }

  return (
    <FormUniforms<CreateAppInput>
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
