import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import {
  propMapBindingActions,
  useCreatePropMapBindingMutation,
} from '../../../store'
import { CreatePropMapBindingSchema } from './createPropMapBindingSchema'

export const useCreatePropMapBindingForm = () => {
  const dispatch = useDispatch()

  const [mutate, state] = useCreatePropMapBindingMutation({
    selectFromResult: (r) => ({
      hook: r.data?.createPropMapBinding,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const reset = () => dispatch(propMapBindingActions.resetModal())

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
      onSubmitSuccess: () => reset(),
    },
    state,
    reset,
  }
}
