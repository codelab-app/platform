import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { CreateLambdaInput } from '@codelab/shared/abstract/codegen'
import { useCallback } from 'react'
import { useLambdaDispatch, useLambdaState } from '../../hooks'
import { useCreateLambdaMutation } from '../../store'
import { defaultLambdaBody } from './defaultLambdBody'

export const useCreateLambdaForm: UseUseCaseForm<
  CreateLambdaInput,
  CRUDActionType
> = () => {
  const { resetModal } = useLambdaDispatch()
  const { actionType } = useLambdaState()

  const [mutate, { isLoading }] = useCreateLambdaMutation({
    selectFromResult: (r) => ({
      hook: r.data?.createLambda,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: CreateLambdaInput) => mutate({ variables: { input } }).unwrap(),
    [mutate],
  )

  return {
    onSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while creating lambda',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    model: {
      body: defaultLambdaBody,
    },
    isLoading,
    actionType,
    reset: resetModal,
  }
}
