import { CreateTagInput } from '@codelab/frontend/abstract/codegen'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useCreateTagMutation } from '../../store/tagEndpoints'
import { tagActions } from '../../store/tagState'

export const useCreateTagForm = (parentTagId?: string) => {
  const dispatch = useDispatch()

  const [mutate, state] = useCreateTagMutation({
    selectFromResult: (r) => ({
      hook: r.data?.createTag,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const reset = () => dispatch(tagActions.resetModal())

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
      onSubmitSuccess: () => reset(),
      model: { parentTagId },
    },
    state,
    reset,
  }
}
