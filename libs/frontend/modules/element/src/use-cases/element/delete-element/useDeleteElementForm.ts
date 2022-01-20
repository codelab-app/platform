import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/props'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DeleteElementInput } from '@codelab/shared/abstract/codegen'
import { useCallback } from 'react'
import { ElementFragment } from '../../../graphql'
import { useElementDispatch, useElementState } from '../../../hooks'
import { useDeleteElementMutation } from '../../../store'

export const useDeleteElementForm: UseEntityUseCaseForm<
  DeleteElementInput,
  CRUDActionType,
  ElementFragment
> = () => {
  const { resetModal } = useElementDispatch()
  const { deleteIds, entity, actionType } = useElementState()

  const [mutate, { isLoading }] = useDeleteElementMutation({
    selectFromResult: (r) => ({
      element: r.data?.deleteElement,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(() => {
    return mutate({
      variables: { input: { elementId: deleteIds[0] } },
    }).unwrap()
  }, [mutate, deleteIds])

  return {
    onSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while deleting element',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    isLoading,
    entity,
    model: {},
    actionType,
    reset: resetModal,
  }
}
