import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import {
  usePropMapBindingDispatch,
  usePropMapBindingState,
} from '../../../hooks'
import { useDeletePropMapBindingMutation } from '../../../store'

export const useDeletePropMapBindingForm = () => {
  const { deleteIds } = usePropMapBindingState()
  const { resetModal } = usePropMapBindingDispatch()

  const [mutate, state] = useDeletePropMapBindingMutation({
    selectFromResult: (r) => ({
      hook: r.data?.deletePropMapBinding,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(() => {
    return mutate({
      variables: {
        input: { propMapBindingIds: deleteIds },
      },
    })
  }, [mutate, deleteIds])

  return {
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while deleting prop map binding',
      }),
      onSubmitSuccess: () => resetModal(),
    },
    state,
    reset: resetModal,
  }
}
