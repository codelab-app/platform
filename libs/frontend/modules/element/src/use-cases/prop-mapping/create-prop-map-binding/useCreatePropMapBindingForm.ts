import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { CreatePropMapBindingInput } from '@codelab/shared/abstract/codegen'
import { useCallback } from 'react'
import {
  usePropMapBindingDispatch,
  usePropMapBindingState,
} from '../../../hooks'
import { useCreatePropMapBindingMutation } from '../../../store'

export const useCreatePropMapBindingForm = () => {
  const [mutate, { isLoading }] = useCreatePropMapBindingMutation({
    selectFromResult: (r) => ({
      hook: r.data?.createPropMapBinding,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const { actionType } = usePropMapBindingState()
  const { resetModal } = usePropMapBindingDispatch()

  const handleSubmit = useCallback(
    ({
      sourceKey,
      targetKey,
      targetElementId,
      elementId,
    }: CreatePropMapBindingInput) => {
      return mutate({
        variables: {
          input: {
            sourceKey: sourceKey.trim(),
            targetKey: targetKey.trim(),
            targetElementId,
            elementId,
          },
        },
      }).unwrap()
    },
    [mutate],
  )

  return {
    onSubmit: handleSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while creating prop binding',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    isLoading,
    reset: resetModal,
    actionType,
  }
}
