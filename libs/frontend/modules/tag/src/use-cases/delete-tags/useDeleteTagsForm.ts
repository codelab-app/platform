import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useTagDispatch, useTagState } from '../../hooks'
import { useDeleteTagsMutation } from '../../store/tagEndpoints'
import { DeleteTagsMutationInput } from './types'

export const useDeleteTagForm = () => {
  const { deleteIds } = useTagState()
  const { resetModal } = useTagDispatch()

  const [mutate, state] = useDeleteTagsMutation({
    selectFromResult: (r) => ({
      hook: r.data?.deleteTags,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    ({ ids }: DeleteTagsMutationInput) =>
      mutate({ variables: { input: { ids } } }).unwrap(),
    [mutate],
  )

  return {
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while deleting tags',
      }),
      onSubmitSuccess: () => resetModal(),
      model: { ids: deleteIds },
    },
    state,
    reset: resetModal,
  }
}
