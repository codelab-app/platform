import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { PageFragment } from '../../graphql'
import { usePageDispatch, usePageState } from '../../hooks'
import { useDeletePagesMutation } from '../../store'
import { DeletePageInput } from './types'

export const useDeletePageForm: UseEntityUseCaseForm<
  DeletePageInput,
  CRUDActionType,
  PageFragment
> = () => {
  const { deleteIds, entity, actionType } = usePageState()
  const { resetModal } = usePageDispatch()

  const [mutate, { isLoading }] = useDeletePagesMutation({
    selectFromResult: (r) => ({
      hook: r.data?.deletePages,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    ({ pageId }: DeletePageInput) =>
      mutate({ variables: { where: { id: pageId } } }).unwrap(),
    [mutate],
  )

  return {
    onSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while deleting page',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    model: { pageId: deleteIds[0] },
    entity,
    isLoading,
    reset: resetModal,
    actionType,
  }
}
