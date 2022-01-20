import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/props'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { CreateTagInput } from '@codelab/shared/abstract/codegen'
import { useCallback } from 'react'
import { TagFragment } from '../../graphql/Tag.fragment.graphql.gen'
import { useTagDispatch, useTagState } from '../../hooks'
import { useUpdateTagMutation } from '../../store'

export const useUpdateTagForm: UseEntityUseCaseForm<
  CreateTagInput,
  CRUDActionType,
  TagFragment
> = () => {
  const { resetModal } = useTagDispatch()
  const { updateId, entity, actionType } = useTagState()

  const [mutate, { isLoading }] = useUpdateTagMutation({
    selectFromResult: (r) => ({
      hook: r.data?.updateTag,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    ({ name }: CreateTagInput) => {
      return mutate({
        variables: { input: { data: { name }, id: updateId } },
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
    model: {},
    entity,
    isLoading,
    actionType,
    reset: resetModal,
  }
}
