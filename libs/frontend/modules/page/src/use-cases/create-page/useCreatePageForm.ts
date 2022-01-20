import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/props'
import { useAppState } from '@codelab/frontend/modules/app'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { CreatePageInput } from '@codelab/shared/abstract/codegen'
import { useCallback } from 'react'
import { usePageDispatch, usePageState } from '../../hooks'
import { useCreatePageMutation } from '../../store'

export const useCreatePageForm: UseUseCaseForm<
  CreatePageInput,
  CRUDActionType
> = () => {
  const { resetModal } = usePageDispatch()
  const { currentApp } = useAppState()
  const { actionType } = usePageState()

  const [mutate, { isLoading }] = useCreatePageMutation({
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

  return {
    onSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while creating page',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    model: { appId: currentApp?.id },
    isLoading,
    actionType,
    reset: resetModal,
  }
}
