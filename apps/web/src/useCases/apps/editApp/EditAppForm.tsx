import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { appState } from '../state'
import {
  ApolloForm,
  FormUseCaseProps,
  createNotificationHandler,
} from '@codelab/frontend'
import {
  GetAppsGql,
  UpdateAppInput,
  UpdateAppInputSchema,
  UpdateAppMutationVariables,
  useUpdateAppMutation,
} from '@codelab/generated'

export const EditAppForm = (props: FormUseCaseProps<UpdateAppInput> & {}) => {
  const [mutate, { loading }] = useUpdateAppMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetAppsGql,
      },
    ],
  })

  const [{ editingApp }, setAppState] = useRecoilState(appState)

  useEffect(() => {
    // Keep the loading state in recoil, so we can use it other components, like loading buttons, etc.
    setAppState((current) => ({ ...current, loading }))
  }, [loading, setAppState])

  if (!editingApp) {
    return null
  }

  return (
    <ApolloForm<UpdateAppInput, UpdateAppMutationVariables>
      schema={UpdateAppInputSchema}
      initialFormData={{ title: editingApp.title, id: editingApp.id }}
      mutate={mutate}
      uiSchema={{
        id: {
          'ui:widget': 'hidden',
        },
      }}
      onSubmitError={createNotificationHandler({
        title: `Error while updating app '${editingApp.title}'`,
      })}
      {...props}
    />
  )
}
