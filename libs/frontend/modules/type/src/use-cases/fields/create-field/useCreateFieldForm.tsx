import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/props'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback, useContext } from 'react'
import { useFieldDispatch, useFieldState } from '../../../hooks'
import { useCreateFieldMutation } from '../../../store'
import { InterfaceContext } from '../../types'
import { CreateFieldInput } from './createFieldSchema'

export const useCreateFieldForm: UseUseCaseForm<
  CreateFieldInput,
  CRUDActionType
> = () => {
  const { resetModal } = useFieldDispatch()
  const { actionType } = useFieldState()

  const {
    interface: { id: interfaceId },
  } = useContext(InterfaceContext)

  const [mutate, { isLoading }] = useCreateFieldMutation({
    selectFromResult: (r) => ({
      element: r.data?.createField,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    (formData: CreateFieldInput) => {
      const variables = {
        input: {
          interfaceId,
          type: {
            existingTypeId: formData.existingTypeId,
          },
          name: formData.name,
          key: formData.key,
          description: formData.description,
        },
      }

      return mutate({ variables }).unwrap()
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
