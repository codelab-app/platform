import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useAtomDispatch, useAtomState } from '../../hooks'
import { useUpdateAtomMutation } from '../../store'
import { UpdateAtomFormProps, UpdateAtomMutationInput } from './types'

export const useUpdateAtomForm = () => {
  const { updateId, entity } = useAtomState()
  const { reset } = useAtomDispatch()

  const [mutate, state] = useUpdateAtomMutation({
    selectFromResult: (r) => ({
      hook: r.data?.updateAtom,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (data: UpdateAtomMutationInput) => {
      return mutate({
        variables: { input: { data, id: updateId } },
      })
    },
    [mutate, updateId],
  )

  const onSubmitError = createNotificationHandler({
    title: 'Error while updateing atom',
  })

  const onSubmitSuccess = () => reset()

  const formProps: UpdateAtomFormProps = {
    onSubmit,
    onSubmitError,
    onSubmitSuccess,
    model: {
      name: entity?.name,
      type: entity?.type,
    },
  }

  return {
    formProps,
    state,
    reset,
  }
}
