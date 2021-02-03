import { FetchResult } from 'apollo-link'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { RegisterUserInput } from '../../../../../../libs/modules/user/src/core/application/useCases/registerUser/RegisterUserInput'
import { userState } from '../state'
import {
  ApolloForm,
  ApolloFormUseCaseProps,
  ArrayOfCallbacks,
  createCallbackHandler,
  createNotificationHandler,
  storeAuthToken,
} from '@codelab/frontend'
import {
  RegisterUserInputSchema,
  RegisterUserMutation,
  RegisterUserMutationVariables,
  useRegisterUserMutation,
} from '@codelab/generated'

export const RegisterUserForm = ({
  onSubmitSuccess,
  onSubmitError,
  ...props
}: ApolloFormUseCaseProps<RegisterUserInput>) => {
  const [mutate, { loading }] = useRegisterUserMutation()

  const [, setState] = useRecoilState(userState)

  const notifySuccessfulRegister = createNotificationHandler<
    FetchResult<RegisterUserMutation>
  >({
    title: (e) =>
      e?.data?.registerUser?.email
        ? `Welcome, ${e?.data?.registerUser?.email}`
        : 'Welcome',
    type: 'success',
  })

  const notifyFailedRegister = createNotificationHandler({
    title: 'Error while registering',
    type: 'error',
  })

  useEffect(() => {
    // Keep the loading state in recoil, so we can use it other components, like loading buttons, etc.
    setState((current) => ({ ...current, loading }))
  }, [loading, setState])

  const submitFailedHandlers = [
    notifyFailedRegister,
    createCallbackHandler(onSubmitError), // Pass the event up
  ]

  const submitSuccessHandlers: ArrayOfCallbacks<
    FetchResult<RegisterUserMutation>
  > = [
    ({ data }) => {
      if (data?.registerUser?.accessToken) {
        storeAuthToken(data?.registerUser?.accessToken)
      }

      setState((s) => ({ ...s, currentUser: data?.registerUser }))
    },
    notifySuccessfulRegister,
    createCallbackHandler(onSubmitSuccess), // Pass the event up
  ]

  return (
    <ApolloForm<RegisterUserInput, RegisterUserMutationVariables>
      schema={RegisterUserInputSchema}
      initialFormData={{ email: '', password: '' }}
      mutate={mutate}
      onSubmitError={submitFailedHandlers}
      rjsfFormProps={{
        uiSchema: {
          password: {
            'ui:widget': 'password',
          },
        },
      }}
      onSubmitSuccess={submitSuccessHandlers}
      {...props}
    />
  )
}
