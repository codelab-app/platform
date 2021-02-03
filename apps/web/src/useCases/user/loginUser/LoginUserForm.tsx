import { FetchResult } from 'apollo-link'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { LoginUserInput } from '../../../../../../libs/modules/user/src/core/application/useCases/loginUser/LoginUserInput'
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
  LoginUserInputSchema,
  LoginUserMutation,
  LoginUserMutationVariables,
  useLoginUserMutation,
} from '@codelab/generated'

export const LoginUserForm = ({
  onSubmitFailed,
  onSubmitSuccessfully,
  ...props
}: ApolloFormUseCaseProps<LoginUserInput>) => {
  const [mutate, { loading }] = useLoginUserMutation()

  const [, setState] = useRecoilState(userState)

  const notifySuccessfulLogin = createNotificationHandler<
    FetchResult<LoginUserMutation>
  >({
    title: (e) =>
      e?.data?.loginUser?.email
        ? `Welcome back, ${e?.data?.loginUser?.email}`
        : 'Welcome back',
    type: 'success',
  })

  const notifyFailedLogin = createNotificationHandler({
    title: 'Error while logging in',
    type: 'error',
  })

  useEffect(() => {
    // Keep the loading state in recoil, so we can use it other components, like loading buttons, etc.
    setState((current) => ({ ...current, loading }))
  }, [loading, setState])

  const submitFailedHandlers = [
    notifyFailedLogin,
    createCallbackHandler(onSubmitFailed), // Pass the event up
  ]

  const submitSuccessHandlers: ArrayOfCallbacks<
    FetchResult<LoginUserMutation>
  > = [
    ({ data }) => {
      if (data?.loginUser?.accessToken) {
        storeAuthToken(data?.loginUser?.accessToken)
      }

      setState((s) => ({ ...s, currentUser: data?.loginUser }))
    },
    notifySuccessfulLogin,
    createCallbackHandler(onSubmitSuccessfully), // Pass the event up
  ]

  return (
    <ApolloForm<LoginUserInput, LoginUserMutationVariables>
      schema={LoginUserInputSchema}
      initialFormData={{ email: '', password: '' }}
      mutate={mutate}
      onSubmitFailed={submitFailedHandlers}
      rjsfFormProps={{
        uiSchema: {
          password: {
            'ui:widget': 'password',
          },
        },
      }}
      onSubmitSuccessfully={submitSuccessHandlers}
      {...props}
    />
  )
}
