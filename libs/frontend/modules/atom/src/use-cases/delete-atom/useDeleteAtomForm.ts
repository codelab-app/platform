import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DeleteAtomInput } from '@codelab/shared/abstract/codegen'
import { IAtom } from '@codelab/shared/abstract/core'
import { useCallback } from 'react'
import { useAtomDispatch, useAtomState } from '../../hooks'
import { useDeleteAtomsMutation } from '../../store'

export const useDeleteAtomForm: UseEntityUseCaseForm<
  DeleteAtomInput,
  CRUDActionType,
  IAtom
> = () => {
  const { deleteIds, entity, actionType } = useAtomState()
  const { resetModal } = useAtomDispatch()

  const [mutate, { isLoading }] = useDeleteAtomsMutation({
    selectFromResult: (r) => ({
      nodesDeleted: r.data?.deleteAtoms.nodesDeleted,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: DeleteAtomInput) =>
      mutate({ variables: { where: { id: input.atomId } } }).unwrap(),
    [mutate],
  )

  const onSubmitError = createNotificationHandler({
    title: 'Error while deleting atom',
  })

  return {
    onSubmit,
    onSubmitError: [onSubmitError],
    onSubmitSuccess: [() => resetModal()],
    model: { atomId: deleteIds[0] },
    entity,
    reset: resetModal,
    isLoading,
    actionType,
  }
}
