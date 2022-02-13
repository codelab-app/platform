import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { TagCreateInput } from '@codelab/shared/abstract/codegen-v2'
import { useCallback } from 'react'
import { useTagDispatch, useTagState } from '../../hooks'
import { useCreateTagsMutation } from '../../store'
import { CreateTagInput } from './types'

export const useCreateTagForm: UseUseCaseForm<
  TagCreateInput,
  CRUDActionType,
  unknown,
  string
> = (parentTagId) => {
  const { resetModal } = useTagDispatch()
  const { actionType } = useTagState()

  const [mutate, { isLoading }] = useCreateTagsMutation({
    selectFromResult: (r) => ({
      hook: r.data?.createTags,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: CreateTagInput) => {
      const tagCreateInput: TagCreateInput = {
        name: input.name,
        parent: input.parentTagId
          ? {
              connect: {
                where: {
                  node: {
                    id: input.parentTagId,
                  },
                },
              },
            }
          : undefined,
        isRoot: input.parentTagId ? false : true,
      }

      return mutate({ variables: { input: [tagCreateInput] } }).unwrap()
    },
    [mutate],
  )

  return {
    onSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while creating tag',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    model: { parentTagId },
    isLoading,
    actionType,
    reset: resetModal,
  }
}
