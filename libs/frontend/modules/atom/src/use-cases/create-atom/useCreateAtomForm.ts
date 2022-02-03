import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useAtomDispatch, useAtomState } from '../../hooks'
import { useCreateAtomsMutation } from '../../store'
import { CreateAtomInput } from './createAtomSchema'

export const useCreateAtomForm: UseUseCaseForm<
  CreateAtomInput,
  CRUDActionType
> = () => {
  const { resetModal } = useAtomDispatch()
  const { actionType } = useAtomState()

  const [mutate, { isLoading }] = useCreateAtomsMutation({
    selectFromResult: (r) => ({
      atom: r.data?.createAtoms.atoms[0],
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: CreateAtomInput) => {
      return mutate({ variables: { input: [input] } }).unwrap()
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
