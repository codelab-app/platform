import { CreateLambdaInput } from '@codelab/frontend/abstract/codegen'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useLambdaDispatch } from '../../hooks'
import { useCreateLambdaMutation } from '../../store'
import { defaultLambdaBody } from './defaultLambdBody'
import { CreateLambdaFormProps } from './types'

export const useCreateLambdaForm = () => {
  const { resetModal } = useLambdaDispatch()

  const [mutate, state] = useCreateLambdaMutation({
    selectFromResult: (r) => ({
      hook: r.data?.createLambda,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: CreateLambdaInput) => {
      return mutate({ variables: { input } })
    },
    [mutate],
  )

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating lambda',
  })

  const onSubmitSuccess = () => resetModal()

  const formProps: CreateLambdaFormProps = {
    onSubmit,
    onSubmitError,
    onSubmitSuccess,
    model: {
      body: defaultLambdaBody,
    },
  }

  return {
    formProps,
    state,
    reset: resetModal,
  }
}
