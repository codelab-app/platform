import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  propMapBindingActions,
  selectPropMapBinding,
  useUpdatePropMapBindingMutation,
} from '../../../store'
import { UpdatePropMapBindingSchema } from './updatePropMapBindingSchema'

export const useUpdatePropMapBindingForm = () => {
  const dispatch = useDispatch()
  const { updateId, entity } = useSelector(selectPropMapBinding)
  const reset = () => dispatch(propMapBindingActions.resetModal())

  const [mutate, state] = useUpdatePropMapBindingMutation({
    selectFromResult: (r) => ({
      hook: r.data?.updatePropMapBinding,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    ({ sourceKey, targetKey, targetElementId }: UpdatePropMapBindingSchema) => {
      return mutate({
        variables: {
          input: {
            data: {
              sourceKey: sourceKey.trim(),
              targetKey: targetKey.trim(),
              targetElementId,
            },
            propMapBindingId: updateId,
          },
        },
      })
    },
    [mutate, updateId],
  )

  return {
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while updating prop binding',
      }),
      onSubmitSuccess: () => reset(),
      model: entity,
    },
    state,
    reset,
  }
}
