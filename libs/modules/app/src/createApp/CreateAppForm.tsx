import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { DeepPartial } from 'uniforms'
import { GetAppsListGql, useCreateAppMutation } from '@codelab/hasura'
import { appState } from '../state'
import { CreateAppInput, createAppSchema } from './createAppSchema'
import {
  FormUniforms,
  UniFormUseCaseProps,
  createNotificationHandler,
} from '@codelab/frontend/shared'
import { useUser } from '@auth0/nextjs-auth0'

export const CreateAppForm = (props: UniFormUseCaseProps<CreateAppInput>) => {
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
    setAppState((current) => ({ ...current, loading }))
  }, [loading, setAppState])

  const userId = useUser().user?.sub

  const onSubmit = (submitData: DeepPartial<CreateAppInput>) => {
    return mutate({
      variables: {
        input: {
          user_id: userId,
          ...(submitData as any),
          pages: {
            data: [
              {
                owner_id: userId,
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
      {...props}
    />
  )
}
