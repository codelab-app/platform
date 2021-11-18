import { typeActions } from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDeleteTypeMutation } from '../../../store/typeEndpoints'

export const useDeleteTypeForm = () => {
  const dispatch = useDispatch()
  const typeId = useSelector((s) => s.type.deleteIds?.[0])

  const [mutate, state] = useDeleteTypeMutation({
    selectFromResult: (r) => ({
      element: r.data?.deleteType,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const reset = () => dispatch(typeActions.resetModal())

  const handleSubmit = useCallback(() => {
    return mutate({ variables: { input: { typeId } } })
  }, [mutate, typeId])

  return {
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while deleting type',
      }),
      onSubmitSuccess: () => reset(),
    },
    state,
  }
}
