import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/props'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { FieldFragment } from '../../../graphql/Field.fragment.graphql.gen'
import { useFieldDispatch, useFieldState } from '../../../hooks'
import { useUpdateFieldMutation } from '../../../store'
import { CreateFieldInput } from '../create-field'

export const useUpdateFieldForm: UseEntityUseCaseForm<
  CreateFieldInput,
  CRUDActionType,
  FieldFragment
> = () => {
  const { updateId, entity, actionType } = useFieldState()
  const { resetModal } = useFieldDispatch()

  const [mutate, { isLoading }] = useUpdateFieldMutation({
    selectFromResult: (r) => ({
      element: r.data?.updateField,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (formData: CreateFieldInput) => {
      const input = {
        fieldId: updateId,
        updateData: {
          type: {
            existingTypeId: formData.existingTypeId,
          },
          name: formData.name,
          key: formData.key,
          description: formData.description,
        },
      }

      return mutate({ variables: { input } }).unwrap()
    },
    [updateId, mutate],
  )

  return {
    model: entity
      ? ({
          name: entity.name,
          key: entity.key,
          typeId: entity.typeId ?? '',
          description: entity.description,
        } as any)
      : undefined,
    onSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while updating field',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    isLoading,
    reset: resetModal,
    actionType,
    entity,
  }
}
