import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DeleteElementInput } from '@codelab/shared/abstract/codegen'
import { ElementTree } from '@codelab/shared/core'
import { useCallback } from 'react'
import { ElementBaseFragment } from '../../../graphql'
import { useElementDispatch, useElementState } from '../../../hooks'
import { useDeleteElementsMutation } from '../../../store'

export const useDeleteElementForm: UseEntityUseCaseForm<
  DeleteElementInput,
  CRUDActionType,
  ElementBaseFragment,
  any,
  ElementTree
> = (tree) => {
  const { resetModal } = useElementDispatch()
  const { deleteIds, entity, actionType } = useElementState()

  const [mutate, { isLoading }] = useDeleteElementsMutation({
    selectFromResult: (r) => ({
      element: r.data?.deleteElements,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    ({ elementId }: DeleteElementInput) => {
      const elementDescendantsIds =
        tree?.getDescendants(elementId).map((x) => x.id) || []

      return mutate({
        variables: {
          where: { id_IN: [elementId, ...elementDescendantsIds] },
          delete: { componentTag: { where: {} } },
        },
      }).unwrap()
    },
    [mutate, tree],
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
