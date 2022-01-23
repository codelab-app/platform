import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { CreateAtomInput } from '@codelab/shared/abstract/codegen'
import { useCallback } from 'react'
import { useAtomDispatch, useAtomState } from '../../hooks'
import { useUpdateAtomMutation } from '../../store'

export const useUpdateAtomForm: UseUseCaseForm<
  CreateAtomInput,
  CRUDActionType
> = () => {
  const { updateId, entity, actionType } = useAtomState()
  const { resetModal } = useAtomDispatch()

  const [mutate, { isLoading }] = useUpdateAtomMutation({
    selectFromResult: (r) => ({
      hook: r.data?.updateAtom,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (data: CreateAtomInput) =>
      mutate({
        variables: { input: { data, id: updateId } },
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
