import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useAppDispatch, useAppState } from '../../hooks'
import { useUpdateAppMutation } from '../../store'
import { UpdateAppFormProps, UpdateAppMutationInput } from './types'

export const useUpdateAppForm = () => {
  const { updateId, entity } = useAppState()
  const { resetModal } = useAppDispatch()

  const [mutate, state] = useUpdateAppMutation({
    selectFromResult: (r) => ({
      hook: r.data?.updateApp,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (data: UpdateAppMutationInput) => {
      return mutate({
        variables: { input: { data, id: updateId } },
      })
    },
    [mutate, updateId],
  )

  const onSubmitError = createNotificationHandler({
    title: 'Error while updateing app',
  })

  const onSubmitSuccess = () => resetModal()

  const formProps: UpdateAppFormProps = {
    onSubmit,
    onSubmitError,
    onSubmitSuccess,
    model: {
      name: entity?.name,
    },
  }

  return {
    formProps,
    state,
    reset: resetModal,
  }
}
