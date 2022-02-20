import { CRUDActionType, IElement } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DeleteElementInput } from '@codelab/shared/abstract/codegen'
import { ElementTree } from '@codelab/shared/core'
import { useCallback } from 'react'
import { useElementDispatch, useElementState } from '../../../hooks'
import { useDeleteElementsSubgraphMutation } from '../../../store'

export const useDeleteElementForm: UseEntityUseCaseForm<
  DeleteElementInput,
  CRUDActionType,
  IElement,
  any,
  ElementTree
> = (tree) => {
  const { resetModal } = useElementDispatch()
  const { deleteIds, entity, actionType } = useElementState()

  const [mutate, { isLoading }] = useDeleteElementsSubgraphMutation({
    selectFromResult: (r) => ({
      element: r.data?.deleteElementsSubgraph.deletedIds,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    ({ elementId }: DeleteElementInput) =>
      mutate({ variables: { where: { id_IN: [elementId] } } }).unwrap(),
    [mutate],
  )

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
    model: { elementId: deleteIds[0] },
    actionType,
    reset: resetModal,
  }
}
