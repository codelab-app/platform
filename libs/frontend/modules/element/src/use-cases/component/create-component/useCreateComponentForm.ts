import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { CreateComponentMutationVariables } from '../../../graphql/component.endpoints.graphql.gen'
import { useCreateComponentMutation } from '../../../store/componentEndpoints'
import { componentActions } from '../../../store/componentState'
import { CreateComponentSchemaType } from './createComponentSchema'

const mapVariables = (
  submitData: CreateComponentSchemaType,
): CreateComponentMutationVariables => ({
  input: { ...submitData },
})

export const useCreateComponentForm = () => {
  const dispatch = useDispatch()
  const reset = () => dispatch(componentActions.resetModal())

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
    reset,
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while creating component',
      }),
      onSubmitSuccess: () => reset(),
    },
    state,
  }
}
