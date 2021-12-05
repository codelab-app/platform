import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useAtomDispatch, useAtomState } from '../../hooks'
import { useDeleteAtomMutation } from '../../store'
import { DeleteAtomMutationInput, DeleteAtomsFormProps } from './types'

export const useDeleteAtomForm = () => {
  const { deleteIds, entity } = useAtomState()
  const { resetModal } = useAtomDispatch()

  const [mutate, state] = useDeleteAtomMutation({
    selectFromResult: (r) => ({
      hook: r.data?.deleteAtom,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: DeleteAtomMutationInput) =>
      mutate({ variables: { input } }).unwrap(),
    [mutate],
  )

  const onSubmitError = createNotificationHandler({
    title: 'Error while deleting atom',
  })

  const onSubmitSuccess = () => resetModal()

  const formProps: DeleteAtomsFormProps = {
    onSubmit,
    onSubmitError,
    onSubmitSuccess,
    model: { atomId: deleteIds[0] },
    name: entity?.name,
  }

  return {
    formProps,
    state,
    reset: resetModal,
  }
}
