import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DeleteTagsInput } from '@codelab/shared/abstract/codegen'
import { useCallback } from 'react'
import { TagFragment } from '../../graphql/Tag.fragment.graphql.gen'
import { useTagDispatch, useTagState, useTagTree } from '../../hooks'
import { useDeleteTagsMutation, useGetTagGraphsQuery } from '../../store'

export const useDeleteTagForm: UseEntityUseCaseForm<
  DeleteTagsInput,
  CRUDActionType,
  TagFragment
> = () => {
  const { deleteIds, entity, actionType, selectedTag } = useTagState()
  const { resetModal, resetSelection } = useTagDispatch()
  const { data } = useGetTagGraphsQuery()
  const tagTree = useTagTree(data?.tagGraphs)

  const [mutate, { isLoading }] = useDeleteTagsMutation({
    selectFromResult: (r) => ({
      hook: r.data?.deleteTags,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(() => {
    const delIds: Array<string> = []

    if (deleteIds.length > 0) {
      deleteIds.forEach((nId) => {
        tagTree.getSubgraph(nId).vertices.forEach((item) => {
          if (delIds.findIndex((x) => x === item.id) === -1) {
            delIds.push(item.id)
          }
        })
      })
    }

    return mutate({ variables: { where: { id_IN: delIds } } }).unwrap()
  }, [mutate, deleteIds, tagTree])

  return {
    onSubmit: handleSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while deleting tags',
      }),
    ],
    onSubmitSuccess: [
      () => {
        resetModal()
        resetSelection({ keys: selectedTag ? [selectedTag] : [] })
      },
    ],
    model: { ids: deleteIds },
    entity,
    isLoading,
    reset: resetModal,
    actionType,
  }
}
