import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { DeepPartial } from 'uniforms'
import {
  GetAppsListGql,
  useCreateAppMutation,
} from '../../../../../../libs/generated/src/graphql-client-hasura.generated'
import { appState } from '../state'
import { CreateAppInput, createAppSchema } from './createAppSchema'
import {
  JsonSchemaUniForm,
  UniFormUseCaseProps,
  createNotificationHandler,
} from '@codelab/frontend'

export const CreateAppForm = (props: UniFormUseCaseProps<CreateAppInput>) => {
  const [mutate, { loading }] = useCreateAppMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetAppsListGql,
        context: {
          hasura: true,
        },
      },
    ],
    context: {
      hasura: true,
    },
  })

  const [, setAppState] = useRecoilState(appState)

  useEffect(() => {
    // Keep the loading state in recoil, so we can use it other components, like loading buttons, etc.
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
    <JsonSchemaUniForm<CreateAppInput>
      onSubmit={onSubmit}
      schema={createAppSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating app',
      })}
      {...props}
    />
  )
}
