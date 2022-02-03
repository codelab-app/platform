import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useFieldDispatch, useFieldState } from '../../../hooks'
import { useCreateFieldMutation } from '../../../store'
import { CreateFieldInput } from './createFieldSchema'

export interface UseCreateFieldFormInput {
  interfaceId: string
}

export const useCreateFieldForm: UseUseCaseForm<
  CreateFieldInput,
  CRUDActionType,
  unknown,
  UseCreateFieldFormInput
> = ({ interfaceId }) => {
  const { resetModal } = useFieldDispatch()
  const { actionType } = useFieldState()

  const [mutate, { isLoading }] = useCreateFieldMutation({
    selectFromResult: (r) => ({
      field: r.data?.upsertFieldEdge,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    async ({ key, description, name, existingTypeId }: CreateFieldInput) => {
      if (!existingTypeId) {
        throw new Error(
          'Existing type id is not defined, this will update all keys',
        )
      }

      return mutate({
        variables: {
          input: {
            key,
            description,
            name,
            interfaceTypeId: interfaceId,
            targetTypeId: existingTypeId,
          },
        },
      }).unwrap()
    },
    [interfaceId, mutate],
  )

  return {
    onSubmit: handleSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while creating field',
      }),
    ],
    model: {},
    onSubmitSuccess: [() => resetModal()],
    isLoading,
    actionType,
    reset: resetModal,
  }
}
