import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { CreateTagInput } from '@codelab/shared/abstract/codegen'
import { useCallback } from 'react'
import { useTagDispatch, useTagState } from '../../hooks'
import { useCreateTagMutation } from '../../store'

export const useCreateTagForm: UseUseCaseForm<
  CreateTagInput,
  CRUDActionType,
  string
> = (parentTagId) => {
  const { resetModal } = useTagDispatch()
  const { actionType } = useTagState()

  const [mutate, { isLoading }] = useCreateTagMutation({
    selectFromResult: (r) => ({
      hook: r.data?.createTag,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    (input: CreateTagInput) => {
      return mutate({ variables: { input } }).unwrap()
    },
    [mutate],
  )

  return {
    onSubmit: handleSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while creating tag',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    model: { parentTagId },
    isLoading,
    actionType,
    reset: resetModal,
  }
}
