import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useTypeDispatch } from '../../../hooks'
import { useCreateTypeMutation } from '../../../store/typeEndpoints'
import {
  CreateTypeSchema,
  mapCreateTypeSchemaToTypeInput,
} from './createTypeSchema'

export const useCreateTypeForm = () => {
  const { resetModal } = useTypeDispatch()

  const [mutate, state] = useCreateTypeMutation({
    selectFromResult: (r) => ({
      element: r.data?.createType,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    (submitData: CreateTypeSchema) => {
      const input = mapCreateTypeSchemaToTypeInput(submitData)

      return mutate({ variables: { input } }).unwrap()
    },
    [mutate],
  )

  return {
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while creating type',
      }),
      onSubmitSuccess: () => resetModal(),
    },
    state,
  }
}
