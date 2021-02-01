import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { getNotificationHandler } from '../../../../../libs/frontend/src/utils/getNotificationHandler'
import { CreateAppInput } from '../../../../../libs/modules/app/src/core/application/useCases/createApp/CreateAppInput'
import { appState } from '../state'
import { ApolloForm, ApolloFormUseCaseProps } from '@codelab/frontend'
import {
  CreateAppInputSchema,
  CreateAppMutationVariables,
  GetAppsGql,
  useCreateAppMutation,
} from '@codelab/generated'

export const CreateAppForm = (
  props: ApolloFormUseCaseProps<CreateAppInput>,
) => {
  const [mutate, { loading }] = useCreateAppMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetAppsGql,
      },
    ],
  })

  const [, setAppState] = useRecoilState(appState)

  useEffect(() => {
    // Keep the loading state in recoil, so we can use it other components, like loading buttons, etc.
    setAppState((current) => ({ ...current, loading }))
  }, [loading, setAppState])

  return (
    <ApolloForm<CreateAppInput, CreateAppMutationVariables>
      schema={CreateAppInputSchema}
      initialFormData={{ title: '' }}
      mutate={mutate}
      onSubmitFailed={getNotificationHandler({
        title: 'Error while registering',
      })}
      {...props}
    />
  )
}
