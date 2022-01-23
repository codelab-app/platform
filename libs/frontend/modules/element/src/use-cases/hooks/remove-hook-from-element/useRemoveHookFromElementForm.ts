import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { EmptyJsonSchemaType } from '@codelab/frontend/view/components'
import { useCallback } from 'react'
import { HookFragment } from '../../../graphql'
import { useHookDispatch, useHookState } from '../../../hooks'
import { useRemoveHookFromElementMutation } from '../../../store'

export const useRemoveHookFromElementForm: UseEntityUseCaseForm<
  EmptyJsonSchemaType,
  CRUDActionType,
  HookFragment,
  string
> = (elementId) => {
  const { deleteIds, entity, actionType } = useHookState()
  const { resetModal } = useHookDispatch()

  const [mutate, { isLoading }] = useRemoveHookFromElementMutation({
    selectFromResult: (r) => ({
      hook: r.data?.removeHookFromElement,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(() => {
    if (!elementId) {
      throw new Error('Missing elementId')
    }

    return mutate({
      variables: { input: { elementId, hookId: deleteIds[0] } },
    }).unwrap()
  }, [mutate, elementId, deleteIds])

  return {
    onSubmit: handleSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while deleting hook',
      }),
    ],
    model: {},
    actionType,
    entity,
    onSubmitSuccess: [() => resetModal()],
    isLoading,
    reset: resetModal,
  }
}
