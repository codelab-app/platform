import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/props'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DeleteTagsInput } from '@codelab/shared/abstract/codegen'
import { useCallback } from 'react'
import { TagFragment } from '../../graphql/Tag.fragment.graphql.gen'
import { useTagDispatch, useTagState } from '../../hooks'
import { useDeleteTagsMutation } from '../../store'

export const useDeleteTagForm: UseEntityUseCaseForm<
  DeleteTagsInput,
  CRUDActionType,
  TagFragment
> = () => {
  const { deleteIds, entity, actionType, selectedTag } = useTagState()
  const { resetModal, resetSelection } = useTagDispatch()

  const [mutate, { isLoading }] = useDeleteTagsMutation({
    selectFromResult: (r) => ({
      hook: r.data?.deleteTags,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    ({ ids }: DeleteTagsInput) =>
      mutate({ variables: { input: { ids } } }).unwrap(),
    [mutate],
  )

  return {
    onSubmit: handleSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while deleting tags',
      }),
    ],
    onSubmitSuccess: () => {
      resetModal()
      resetSelection({ keys: selectedTag ? [selectedTag] : [] })
    },
    model: { ids: deleteIds },
    entity,
    isLoading,
    reset: resetModal,
    actionType,
  }
}
