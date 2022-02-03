import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useAtomDispatch, useAtomState } from '../../hooks'
import { useUpdateAtomsMutation } from '../../store'
import { CreateAtomInput } from '../create-atom'

export const useUpdateAtomForm: UseUseCaseForm<
  CreateAtomInput,
  CRUDActionType
> = () => {
  const { updateId, entity, actionType } = useAtomState()
  const { resetModal } = useAtomDispatch()

  const [mutate, { isLoading }] = useUpdateAtomsMutation({
    selectFromResult: (r) => ({
      atom: r.data?.updateAtoms.atoms[0],
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (data: CreateAtomInput) =>
      mutate({
        variables: { where: { id: updateId }, update: data },
      }).unwrap(),
    [mutate, updateId],
  )

  const onSubmitError = createNotificationHandler({
    title: 'Error while updating atom',
  })

  return {
    onSubmit,
    onSubmitError: [onSubmitError],
    onSubmitSuccess: [() => resetModal()],
    model: {
      name: entity?.name,
      type: entity?.type,
    },
    isLoading,
    actionType,
    reset: resetModal,
  }
}
