import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useElementDispatch, useElementState } from '../../../hooks'
import { useDeleteElementMutation } from '../../../store'

export const useDeleteElementForm = () => {
  const { resetModal } = useElementDispatch()
  const { deleteIds } = useElementState()

  const [mutate, state] = useDeleteElementMutation({
    selectFromResult: (r) => ({
      element: r.data?.deleteElement,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(() => {
    return mutate({
      variables: { input: { elementId: deleteIds[0] } },
    }).unwrap()
  }, [mutate, deleteIds])

  return {
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while deleting element',
      }),
      onSubmitSuccess: () => resetModal(),
    },
    state,
  }
}
