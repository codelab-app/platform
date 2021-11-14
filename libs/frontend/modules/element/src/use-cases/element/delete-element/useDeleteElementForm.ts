import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  elementActions,
  selectElement,
  useDeleteElementMutation,
} from '../../../store'

export const useDeleteElementForm = () => {
  const dispatch = useDispatch()
  const reset = () => dispatch(elementActions.resetModal())
  const { deleteIds } = useSelector(selectElement)

  const [mutate, state] = useDeleteElementMutation({
    selectFromResult: (r) => ({
      element: r.data?.deleteElement,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(() => {
    return mutate({ variables: { input: { elementId: deleteIds[0] } } })
  }, [mutate, deleteIds])

  return {
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while deleting element',
      }),
      onSubmitSuccess: () => reset(),
    },
    state,
  }
}
