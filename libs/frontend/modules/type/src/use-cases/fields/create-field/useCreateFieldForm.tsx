import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback, useContext } from 'react'
import { useFieldDispatch } from '../../../hooks'
import { useCreateFieldMutation } from '../../../store/fieldEndpoints'
import { InterfaceContext } from '../../types/interface-provider'
import { CreateFieldSchema } from './createFieldSchema'

export const useCreateFieldForm = () => {
  const { resetModal } = useFieldDispatch()

  const {
    interface: { id: interfaceId },
  } = useContext(InterfaceContext)

  const [mutate, state] = useCreateFieldMutation({
    selectFromResult: (r) => ({
      element: r.data?.createField,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    (formData: CreateFieldSchema) => {
      const variables = {
        input: {
          interfaceId,
          type: {
            existingTypeId: formData.typeId,
          },
          name: formData.name,
          key: formData.key,
          description: formData.description,
        },
      }

      return mutate({ variables })
    },
    [interfaceId, mutate],
  )

  return {
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while creating field',
      }),
      onSubmitSuccess: () => resetModal(),
    },
    state,
  }
}
