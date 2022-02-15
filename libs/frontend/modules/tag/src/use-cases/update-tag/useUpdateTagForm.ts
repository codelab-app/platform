import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { TagUpdateInput } from '@codelab/shared/abstract/codegen-v2'
import { useCallback } from 'react'
import { useGetTagGraphsQuery } from '../../graphql/tag.endpoints.v2.graphql.gen'
import { TagFragment } from '../../graphql/Tag.fragment.v2.graphql.gen'
import { useTagDispatch, useTagState, useTagTree } from '../../hooks'
import { useUpdateTagsMutation } from '../../store'
import { UpdateTagSchema } from './updateTagSchema'

export const useUpdateTagForm: UseEntityUseCaseForm<
  UpdateTagSchema,
  CRUDActionType,
  TagFragment
> = () => {
  const { resetModal } = useTagDispatch()
  const { updateId, actionType } = useTagState()
  const { data } = useGetTagGraphsQuery()
  const tagTree = useTagTree(data?.tagGraphs)
  const tagFragment: TagFragment | undefined = tagTree.getVertex(updateId)

  const [mutate, { isLoading }] = useUpdateTagsMutation({
    selectFromResult: (r) => ({
      hook: r.data?.updateTags,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    (input: UpdateTagSchema) => {
      const tagUpdateInput: TagUpdateInput = {
        name: input.name,
      }

      return mutate({
        variables: {
          where: {
            id: updateId,
          },
          update: tagUpdateInput,
        },
      }).unwrap()
    },
    [mutate, updateId],
  )

  return {
    onSubmit: handleSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while updating tag',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    model: { name: tagFragment?.name },
    isLoading,
    entity: tagFragment,
    actionType,
    reset: resetModal,
  }
}
