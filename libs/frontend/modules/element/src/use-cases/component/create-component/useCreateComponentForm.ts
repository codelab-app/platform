import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  CreateComponentInput,
  CreateElementInput,
} from '@codelab/shared/abstract/codegen'
import { useCallback } from 'react'
import { useComponentDispatch, useComponentState } from '../../../hooks'
import { useCreateComponentMutation } from '../../../store'

export const useCreateComponentForm: UseUseCaseForm<
  CreateComponentInput,
  CRUDActionType
> = () => {
  const { resetModal } = useComponentDispatch()
  const { actionType } = useComponentState()

  const [mutate, { isLoading }] = useCreateComponentMutation({
    selectFromResult: (r) => ({
      component: r.data?.createComponent,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    (input: CreateComponentInput) => {
      return mutate({ variables: { input } }).unwrap()
    },
    [mutate],
  )

  return {
    model: {},
    reset: resetModal,
    onSubmit: handleSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while creating component',
      }),
    ],
    actionType,
    onSubmitSuccess: [() => resetModal()],
    isLoading,
  }
}
