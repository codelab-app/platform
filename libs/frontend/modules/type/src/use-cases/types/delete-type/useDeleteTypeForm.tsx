import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useTypeDispatch, useTypeState } from '../../../hooks'
import { useDeleteTypeMutation } from '../../../store/typeEndpoints'

export const useDeleteTypeForm = () => {
  const { resetModal } = useTypeDispatch()
  const { deleteIds } = useTypeState()
  const typeId = deleteIds?.[0]

  const [mutate, state] = useDeleteTypeMutation({
    selectFromResult: (r) => ({
      element: r.data?.deleteType,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(() => {
    return mutate({ variables: { input: { typeId } } })
  }, [mutate, typeId])

  return {
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while deleting type',
      }),
      onSubmitSuccess: () => resetModal(),
    },
    state,
  }
}
