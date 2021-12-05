import { CreatePageInput } from '@codelab/frontend/abstract/codegen'
import { useAppState } from '@codelab/frontend/modules/app'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { usePageDispatch } from '../../hooks'
import { useCreatePageMutation } from '../../store'
import { CreatePageFormProps } from './types'

export const useCreatePageForm = () => {
  const { currentApp } = useAppState()
  const { resetModal } = usePageDispatch()

  const [mutate, state] = useCreatePageMutation({
    selectFromResult: (r) => ({
      hook: r.data?.createPage,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: CreatePageInput) => mutate({ variables: { input } }).unwrap(),
    [mutate],
  )

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating page',
  })

  const onSubmitSuccess = () => resetModal()

  const formProps: CreatePageFormProps = {
    onSubmit,
    onSubmitError,
    onSubmitSuccess,
    model: { appId: currentApp?.id },
  }

  return {
    formProps,
    state,
    reset: resetModal,
  }
}
