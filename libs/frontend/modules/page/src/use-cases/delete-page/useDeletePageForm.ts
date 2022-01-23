import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DeletePageInput } from '@codelab/shared/abstract/codegen'
import { useCallback } from 'react'
import { PageBaseFragment } from '../../graphql/PageBase.fragment.graphql.gen'
import { usePageDispatch, usePageState } from '../../hooks'
import { useDeletePageMutation } from '../../store'

export const useDeletePageForm: UseEntityUseCaseForm<
  DeletePageInput,
  CRUDActionType,
  PageBaseFragment
> = () => {
  const { deleteIds, entity, actionType } = usePageState()
  const { resetModal } = usePageDispatch()

  const [mutate, { isLoading }] = useDeletePageMutation({
    selectFromResult: (r) => ({
      hook: r.data?.deletePage,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: DeletePageInput) => mutate({ variables: { input } }).unwrap(),
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
