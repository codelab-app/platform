import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { usePageDispatch, usePageState } from '../../hooks'
import { useUpdatePagesMutation } from '../../store'
import { UpdatePageInput } from './types'

export const useUpdatePageForm: UseUseCaseForm<
  UpdatePageInput,
  CRUDActionType
> = () => {
  const { updateId, entity, actionType } = usePageState()
  const { resetModal } = usePageDispatch()

  const [mutate, { isLoading }] = useUpdatePagesMutation({
    selectFromResult: (r) => ({
      hook: r.data?.updatePages,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (update: UpdatePageInput) =>
      mutate({
        variables: {
          where: { id: updateId },
          update,
        },
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
