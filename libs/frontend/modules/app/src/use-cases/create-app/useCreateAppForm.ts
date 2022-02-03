import { AppActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { API_ENV } from '@codelab/frontend/model/infra/redux'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useAppDispatch, useAppState } from '../../hooks'
import { useCreateAppsMutation } from '../../store'
import { CreateAppInput } from './types'

export const useCreateAppForm: UseUseCaseForm<
  CreateAppInput,
  AppActionType
> = () => {
  const { resetModal } = useAppDispatch()
  const { actionType } = useAppState()

  const [mutate, { isLoading }] = useCreateAppsMutation({
    selectFromResult: (r) => ({
      hook: r.data?.createApps,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: CreateAppInput) => {
      return mutate({
        variables: { input },
      }).unwrap()
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
