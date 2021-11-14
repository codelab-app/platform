import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  propMapBindingActions,
  selectPropMapBinding,
  useDeletePropMapBindingMutation,
} from '../../../store'

export const useDeletePropMapBindingForm = () => {
  const { deleteIds } = useSelector(selectPropMapBinding)
  const dispatch = useDispatch()

  const [mutate, state] = useDeletePropMapBindingMutation({
    selectFromResult: (r) => ({
      hook: r.data?.deletePropMapBinding,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const reset = () => dispatch(propMapBindingActions.resetModal())

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
      onSubmitSuccess: () => reset(),
    },
    state,
    reset,
  }
}
