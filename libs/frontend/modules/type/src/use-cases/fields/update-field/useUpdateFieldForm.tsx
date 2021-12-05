import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useFieldDispatch, useFieldState } from '../../../hooks'
import { useUpdateFieldMutation } from '../../../store/fieldEndpoints'
import { UpdateFieldSchema } from './updateFieldSchema'

export const useUpdateFieldForm = () => {
  const { updateId, entity } = useFieldState()
  const { resetModal } = useFieldDispatch()

  const [mutate, state] = useUpdateFieldMutation({
    selectFromResult: (r) => ({
      element: r.data?.updateField,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    (formData: UpdateFieldSchema) => {
      const input = {
        fieldId: updateId,
        updateData: {
          type: {
            existingTypeId: formData.typeId,
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
    formProps: {
      model: entity
        ? ({
            name: entity.name,
            key: entity.key,
            typeId: entity.typeId ?? '',
            description: entity.description,
          } as any)
        : undefined,
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while updating field',
      }),
      onSubmitSuccess: () => resetModal(),
    },
    state,
  }
}
