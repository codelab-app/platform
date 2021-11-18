import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { CreateComponentMutationVariables } from '../../../graphql/component.endpoints.graphql.gen'
import { useComponentDispatch } from '../../../hooks/useComponentDispatch'
import { useCreateComponentMutation } from '../../../store/componentEndpoints'
import { CreateComponentSchemaType } from './createComponentSchema'

const mapVariables = (
  submitData: CreateComponentSchemaType,
): CreateComponentMutationVariables => ({
  input: { ...submitData },
})

export const useCreateComponentForm = () => {
  const { resetModal } = useComponentDispatch()

  const [mutate, state] = useCreateComponentMutation({
    selectFromResult: (r) => ({
      component: r.data?.createComponent,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    (submitData: CreateComponentSchemaType) => {
      const variables = mapVariables(submitData)

      return mutate({ variables })
    },
    [mutate],
  )

  return {
    reset: resetModal,
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while creating component',
      }),
      onSubmitSuccess: () => resetModal(),
    },
    state,
  }
}
