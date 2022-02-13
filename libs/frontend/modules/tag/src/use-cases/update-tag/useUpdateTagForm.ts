import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { UpdateTagInput } from '@codelab/shared/abstract/codegen'
import { TagUpdateInput } from '@codelab/shared/abstract/codegen-v2'
import { useCallback } from 'react'
import { TagFragment } from '../../graphql/Tag.fragment.graphql.gen'
import { useTagDispatch, useTagState } from '../../hooks'
import { useUpdateTagsMutation } from '../../store'

export const useUpdateTagForm: UseEntityUseCaseForm<
  UpdateTagInput,
  CRUDActionType,
  TagFragment
> = () => {
  const { resetModal } = useTagDispatch()
  const { entity, actionType } = useTagState()

  const [mutate, { isLoading }] = useUpdateTagsMutation({
    selectFromResult: (r) => ({
      hook: r.data?.updateTags,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    (input: UpdateTagInput) => {
      const tagUpdateInput: TagUpdateInput = {
        name: input.data?.name,
      }

      return mutate({
        variables: {
          where: {
            id: input.id,
          },
          update: tagUpdateInput,
        },
      }).unwrap()
    },
    [mutate],
  )

  return {
    onSubmit: handleSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while updating tag',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    model: {},
    entity,
    isLoading,
    actionType,
    reset: resetModal,
  }
}
