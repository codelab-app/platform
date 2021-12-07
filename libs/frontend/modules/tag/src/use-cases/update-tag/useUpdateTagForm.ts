import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useTagDispatch, useTagState } from '../../hooks'
import { useUpdateTagMutation } from '../../store/tagEndpoints'
import { UpdateTagMutationInput } from './types'

export const useUpdateTagForm = () => {
  const { resetModal } = useTagDispatch()
  const { updateId, entity } = useTagState()

  const [mutate, state] = useUpdateTagMutation({
    selectFromResult: (r) => ({
      hook: r.data?.updateTag,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const reset = () => resetModal()

  const handleSubmit = useCallback(
    ({ name }: UpdateTagMutationInput) => {
      return mutate({
        variables: { input: { data: { name }, id: updateId } },
      }).unwrap()
    },
    [mutate, updateId],
  )

  return {
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while updating tag',
      }),
      onSubmitSuccess: () => reset(),
      model: entity,
    },
    state,
    reset,
  }
}
