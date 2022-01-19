import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/props'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DeleteAtomInput } from '@codelab/shared/abstract/codegen'
import { assertIsDefined } from '@codelab/shared/utils'
import { useCallback } from 'react'
import { AtomBaseFragment } from '../../graphql/Atom.fragment.graphql.gen'
import { useAtomDispatch, useAtomState } from '../../hooks'
import { useDeleteAtomMutation } from '../../store'

export const useDeleteAtomForm: UseEntityUseCaseForm<
  DeleteAtomInput,
  CRUDActionType,
  AtomBaseFragment
> = () => {
  const { deleteIds, entity, actionType } = useAtomState()
  const { resetModal } = useAtomDispatch()

  assertIsDefined(entity)

  const [mutate, { isLoading }] = useDeleteAtomMutation({
    selectFromResult: (r) => ({
      hook: r.data?.deleteAtom,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: DeleteAtomInput) => mutate({ variables: { input } }).unwrap(),
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
