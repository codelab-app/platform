import { CreateAtomInput } from '@codelab/frontend/abstract/codegen'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useAtomDispatch } from '../../hooks'
import { useCreateAtomMutation } from '../../store'
import { CreateAtomFormProps } from './types'

export const useCreateAtomForm = () => {
  const { resetModal } = useAtomDispatch()

  const [mutate, state] = useCreateAtomMutation({
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

  const onSubmitSuccess = () => resetModal()

  const formProps: CreateAtomFormProps = {
    onSubmit,
    onSubmitError,
    onSubmitSuccess,
    model: {},
  }

  return {
    formProps,
    state,
    reset: resetModal,
  }
}
