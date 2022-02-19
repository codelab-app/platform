import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { UpdatePropMapBindingData } from '@codelab/shared/abstract/codegen'
import { assertIsDefined } from '@codelab/shared/utils'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import {
  usePropMapBindingDispatch,
  usePropMapBindingState,
} from '../../../hooks'
import {
  selectPropMapBinding,
  useUpdatePropMapBindingsMutation,
} from '../../../store'

export const useUpdatePropMapBindingForm: UseUseCaseForm<
  UpdatePropMapBindingData,
  CRUDActionType,
  unknown,
  string
> = (elementId) => {
  const { resetModal } = usePropMapBindingDispatch()
  const { updateId, entity } = useSelector(selectPropMapBinding)
  const { actionType } = usePropMapBindingState()

  assertIsDefined(elementId)

  const [mutate, { isLoading }] = useUpdatePropMapBindingsMutation({
    selectFromResult: (r) => ({
      hook: r.data?.updatePropMapBindings,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    ({ sourceKey, targetKey, targetElementId }: UpdatePropMapBindingData) => {
      if (!elementId) {
        throw new Error('Missing elementId')
      }

      return mutate({
        variables: {
          update: {
            sourceKey: sourceKey.trim(),
            targetKey: targetKey.trim(),
            targetElement: {
              connect: { where: { node: { id: targetElementId } } },
            },
          },
          where: { id: updateId },
        },
      }).unwrap()
    },
    [elementId, mutate, updateId],
  )

  return {
    onSubmit: handleSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while updating prop binding',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    model: { ...entity },
    isLoading,
    reset: resetModal,
    actionType,
  }
}
