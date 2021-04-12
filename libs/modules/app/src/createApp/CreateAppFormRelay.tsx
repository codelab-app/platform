import React from 'react'
import { useRecoilState } from 'recoil'
import { DeepPartial } from 'uniforms'
import { appState } from '../state'
import { CreateAppInput, createAppSchema } from './createAppSchema'
import {
  FormUniforms,
  UniFormUseCaseProps,
  createNotificationHandler,
} from '@codelab/frontend/shared'
import { useMutation } from 'react-relay'
import { CreateAppMutation } from './CreateApp'
import { CreateApp_Mutation } from './__generated__/CreateApp_Mutation.graphql'

export const CreateAppFormRelay = (
  props: UniFormUseCaseProps<CreateAppInput>,
) => {
  const [, setAppState] = useRecoilState(appState)
  const [commit, loading] = useMutation<CreateApp_Mutation>(CreateAppMutation)

  // useEffect(() => {
  //   // Keep the loading state in recoil, so we can use it other components, like loading buttons, etc.
  //   setAppState((current) => ({ ...current, loading }))
  // }, [loading, setAppState])

  const onSubmit = (data: DeepPartial<CreateAppInput>): any => {
    return commit({
      variables: {
        data: {
          ...data,
          pages: {
            data: [
              {
                name: 'Default Page',
              },
            ],
          },
        },
      },
      onError: (err) => {
        console.log(err)
      },
      onCompleted: (data) => {
        console.log(data)
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
