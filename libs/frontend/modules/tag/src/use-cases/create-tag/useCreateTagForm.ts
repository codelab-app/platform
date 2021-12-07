import { CreateTagInput } from '@codelab/frontend/abstract/codegen'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useTagDispatch } from '../../hooks'
import { useCreateTagMutation } from '../../store'

export const useCreateTagForm = (parentTagId?: string) => {
  const { resetModal } = useTagDispatch()

  const [mutate, state] = useCreateTagMutation({
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
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while creating tag',
      }),
      onSubmitSuccess: () => resetModal(),
      model: { parentTagId },
    },
    state,
    reset: resetModal,
  }
}
