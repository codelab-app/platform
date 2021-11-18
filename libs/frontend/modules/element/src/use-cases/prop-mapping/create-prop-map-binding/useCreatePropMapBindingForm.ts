import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { usePropMapBindingDispatch } from '../../../hooks'
import { useCreatePropMapBindingMutation } from '../../../store'
import { CreatePropMapBindingSchema } from './createPropMapBindingSchema'

export const useCreatePropMapBindingForm = () => {
  const [mutate, state] = useCreatePropMapBindingMutation({
    selectFromResult: (r) => ({
      hook: r.data?.createPropMapBinding,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const { resetModal } = usePropMapBindingDispatch()

  const handleSubmit = useCallback(
    ({
      sourceKey,
      targetKey,
      targetElementId,
      elementId,
    }: CreatePropMapBindingSchema) => {
      return mutate({
        variables: {
          input: {
            sourceKey: sourceKey.trim(),
            targetKey: targetKey.trim(),
            targetElementId,
            elementId,
          },
        },
      })
    },
    [mutate],
  )

  return {
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while creating prop binding',
      }),
      onSubmitSuccess: () => resetModal(),
    },
    state,
    reset: resetModal,
  }
}
