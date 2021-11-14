import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  hookActions,
  selectHook,
  useRemoveHookFromElementMutation,
} from '../../../store'

export const useRemoveHookFromElementForm = (elementId: string) => {
  const dispatch = useDispatch()
  const { deleteIds } = useSelector(selectHook)

  const [mutate, state] = useRemoveHookFromElementMutation({
    selectFromResult: (r) => ({
      hook: r.data?.removeHookFromElement,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const reset = () => dispatch(hookActions.resetModal())

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
      onSubmitSuccess: () => reset(),
    },
    state,
    reset,
  }
}
