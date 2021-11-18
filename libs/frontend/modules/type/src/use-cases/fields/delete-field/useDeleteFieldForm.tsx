import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useFieldDispatch, useFieldState } from '../../../hooks'
import { useDeleteFieldMutation } from '../../../store/fieldEndpoints'

export const useDeleteFieldForm = () => {
  const { deleteIds } = useFieldState()
  const { resetModal } = useFieldDispatch()

  const [mutate, state] = useDeleteFieldMutation({
    selectFromResult: (r) => ({
      element: r.data?.deleteField,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(() => {
    return mutate({ variables: { input: { fieldId: deleteIds[0] } } })
  }, [deleteIds, mutate])

  return {
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while deleting field',
      }),
      onSubmitSuccess: () => resetModal(),
    },
    state,
  }
}
