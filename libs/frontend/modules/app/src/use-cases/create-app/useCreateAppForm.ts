import { CreateAppInput } from '@codelab/frontend/abstract/codegen'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useAppDispatch } from '../../hooks'
import { useCreateAppMutation } from '../../store'
import { CreateAppFormProps } from './types'

export const useCreateAppForm = () => {
  const { resetModal } = useAppDispatch()

  const [mutate, state] = useCreateAppMutation({
    selectFromResult: (r) => ({
      hook: r.data?.createApp,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: CreateAppInput) => {
      return mutate({ variables: { input } }).unwrap()
    },
    [mutate],
  )

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating app',
  })

  const onSubmitSuccess = () => resetModal()

  const formProps: CreateAppFormProps = {
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
