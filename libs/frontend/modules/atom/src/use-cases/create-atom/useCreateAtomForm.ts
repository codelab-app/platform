import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/props'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { CreateAtomInput } from '@codelab/shared/abstract/codegen'
import { useCallback } from 'react'
import { useAtomDispatch, useAtomState } from '../../hooks'
import { useCreateAtomMutation } from '../../store'

export const useCreateAtomForm: UseUseCaseForm<
  CreateAtomInput,
  CRUDActionType
> = () => {
  const { resetModal } = useAtomDispatch()
  const { actionType } = useAtomState()

  const [mutate, { isLoading }] = useCreateAtomMutation({
    selectFromResult: (r) => ({
      hook: r.data?.createAtom,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: CreateAtomInput) => {
      return mutate({ variables: { input } }).unwrap()
    },
    [mutate],
  )

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating atom',
  })

  return {
    onSubmit,
    onSubmitError: [onSubmitError],
    onSubmitSuccess: [() => resetModal()],
    model: {},
    isLoading,
    reset: resetModal,
    actionType,
  }
}
