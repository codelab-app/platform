import { AppActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/props'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { CreateAppInput } from '@codelab/shared/abstract/codegen'
import { useCallback } from 'react'
import { useAppDispatch, useAppState } from '../../hooks'
import { useCreateAppMutation } from '../../store'

export const useCreateAppForm: UseUseCaseForm<
  CreateAppInput,
  AppActionType
> = () => {
  const { resetModal } = useAppDispatch()
  const { actionType } = useAppState()

  const [mutate, { isLoading }] = useCreateAppMutation({
    selectFromResult: (r) => ({
      hook: r.data?.createApp,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: CreateAppInput) => {
      return mutate({ variables: { input } }).unwrap()
    },
    [mutate],
  )

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating app',
  })

  return {
    onSubmit,
    onSubmitSuccess: [() => resetModal()],
    onSubmitError: [onSubmitError],
    model: {},
    isLoading,
    reset: resetModal,
    actionType: actionType,
  }
}
