import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/props'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  CreateAppInput,
  CreatePageInput,
} from '@codelab/shared/abstract/codegen'
import { useCallback } from 'react'
import { usePageDispatch, usePageState } from '../../hooks'
import { useUpdatePageMutation } from '../../store'

export const useUpdatePageForm: UseUseCaseForm<
  CreatePageInput,
  CRUDActionType
> = () => {
  const { updateId, entity, actionType } = usePageState()
  const { resetModal } = usePageDispatch()

  const [mutate, { isLoading }] = useUpdatePageMutation({
    selectFromResult: (r) => ({
      hook: r.data?.updatePage,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (data: CreatePageInput) =>
      mutate({
        variables: { input: { updateData: data, pageId: updateId } },
      }).unwrap(),
    [mutate, updateId],
  )

  return {
    onSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while updating page',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    model: { name: entity?.name },
    isLoading,
    actionType,
    reset: resetModal,
  }
}
