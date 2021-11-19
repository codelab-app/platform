import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { usePropMapBindingDispatch } from '../../../hooks'
import {
  selectPropMapBinding,
  useUpdatePropMapBindingMutation,
} from '../../../store'
import { UpdatePropMapBindingSchema } from './updatePropMapBindingSchema'

export const useUpdatePropMapBindingForm = () => {
  const { resetModal } = usePropMapBindingDispatch()
  const { updateId, entity } = useSelector(selectPropMapBinding)

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
      onSubmitSuccess: () => resetModal(),
      model: entity,
    },
    state,
    reset: resetModal,
  }
}
