import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { EmptyJsonSchemaType } from '@codelab/frontend/view/components'
import { IHook } from '@codelab/shared/abstract/core'
import { useCallback } from 'react'
import { useDeleteHooksMutation } from '../../../graphql/hook.endpoints.v2.graphql.gen'
import { useHookDispatch, useHookState } from '../../../hooks'

export const useRemoveHookFromElementForm: UseEntityUseCaseForm<
  EmptyJsonSchemaType,
  CRUDActionType,
  IHook,
  unknown,
  string
> = (elementId) => {
  const { deleteIds, entity, actionType } = useHookState()
  const { resetModal } = useHookDispatch()

  const [mutate, { isLoading }] = useDeleteHooksMutation({
    selectFromResult: (r) => ({
      hook: r.data?.deleteHooks,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    () => mutate({ variables: { where: { id_IN: deleteIds } } }).unwrap(),
    [mutate, deleteIds],
  )

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
