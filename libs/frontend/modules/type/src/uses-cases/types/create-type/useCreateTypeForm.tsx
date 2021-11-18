import {
  CreateTypeSchema,
  mapCreateTypeSchemaToTypeInput,
  typeActions,
} from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useCreateTypeMutation } from '../../../store/typeEndpoints'

export const useCreateTypeForm = () => {
  const dispatch = useDispatch()

  const [mutate, state] = useCreateTypeMutation({
    selectFromResult: (r) => ({
      element: r.data?.createType,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const reset = () => dispatch(typeActions.resetModal())

  const handleSubmit = useCallback(
    (submitData: CreateTypeSchema) => {
      const input = mapCreateTypeSchemaToTypeInput(submitData)

      return mutate({ variables: { input } })
    },
    [mutate],
  )

  return {
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while creating type',
      }),
      onSubmitSuccess: () => reset(),
    },
    state,
  }
}
