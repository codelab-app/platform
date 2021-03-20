import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { DeepPartial } from 'uniforms'
import {
  GetAppsListGql,
  useEditAppMutation,
} from '../../../../../../libs/generated/src/graphql-client-hasura.generated'
import { appState } from '../state'
import { EditAppInput, editAppSchema } from './editAppSchema'
import {
  JsonSchemaUniForm,
  UniFormUseCaseProps,
  createNotificationHandler,
} from '@codelab/frontend'
import { UpdateAppInput } from '@codelab/generated'

export const EditAppForm = (
  props: UniFormUseCaseProps<UpdateAppInput> & {},
) => {
  const [mutate, { loading }] = useEditAppMutation({
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

  const [{ editingApp }, setAppState] = useRecoilState(appState)

  useEffect(() => {
    // Keep the loading state in recoil, so we can use it other components, like loading buttons, etc.
    setAppState((current) => ({ ...current, loading }))
  }, [loading, setAppState])

  if (!editingApp) {
    return null
  }

  const onSubmit = (submitData: DeepPartial<EditAppInput>) => {
    return mutate({
      variables: {
        input: {
          ...(submitData as any),
        },
        id: editingApp.id,
      },
    })
  }

  return (
    <JsonSchemaUniForm<EditAppInput>
      onSubmit={onSubmit}
      schema={editAppSchema}
      model={{ name: editingApp.name }}
      onSubmitError={createNotificationHandler({
        title: `Error while updating app '${editingApp.name}'`,
      })}
      {...props}
    />
  )
}
