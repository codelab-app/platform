import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useLambdaDispatch, useLambdaState } from '../../hooks'
import { useUpdateLambdaMutation } from '../../store'
import { UpdateLambdaFormProps, UpdateLambdaMutationInput } from './types'

export const useUpdateLambdaForm = () => {
  const { updateId, entity } = useLambdaState()
  const { reset } = useLambdaDispatch()

  const [mutate, state] = useUpdateLambdaMutation({
    selectFromResult: (r) => ({
      hook: r.data?.updateLambda,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: UpdateLambdaMutationInput) => {
      return mutate({
        variables: { input },
      })
    },
    [mutate, updateId],
  )

  const onSubmitError = createNotificationHandler({
    title: 'Error while updateing lambda',
  })

  const onSubmitSuccess = () => reset()

  const formProps: UpdateLambdaFormProps = {
    onSubmit,
    onSubmitError,
    onSubmitSuccess,
    model: {
      name: entity?.name,
      body: entity?.body,
      id: entity?.id,
    },
  }

  return {
    formProps,
    state,
    reset,
  }
}
