import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useHookDispatch } from '../../../hooks/useHookDispatch'
import { useHookState } from '../../../hooks/useHookState'
import { useRemoveHookFromElementMutation } from '../../../store'

export const useRemoveHookFromElementForm = (elementId: string) => {
  const { deleteIds } = useHookState()
  const { resetModal } = useHookDispatch()

  const [mutate, state] = useRemoveHookFromElementMutation({
    selectFromResult: (r) => ({
      hook: r.data?.removeHookFromElement,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(() => {
    return mutate({
      variables: { input: { elementId, hookId: deleteIds[0] } },
    })
  }, [mutate, elementId, deleteIds])

  return {
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while deleting hook',
      }),
      onSubmitSuccess: () => resetModal(),
    },
    state,
    reset: resetModal,
  }
}
