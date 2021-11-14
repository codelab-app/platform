import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { DeleteAppMutationVariables } from '../../graphql/App.endpoints.graphql.gen'
import { useAppDispatch, useAppState } from '../../hooks'
import { useDeleteAppMutation } from '../../store'
import { DeleteAppFormProps, DeleteAppMutationInput } from './types'

export const useDeleteAppForm = () => {
  const { deleteIds, entity } = useAppState()
  const { reset } = useAppDispatch()

  const [mutate, state] = useDeleteAppMutation({
    selectFromResult: (r) => ({
      hook: r.data?.deleteApp,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (modal: DeleteAppMutationInput) => {
      const input = modal as DeleteAppMutationVariables['input']

      return mutate({ variables: { input: { appId: input.appId } } })
    },
    [mutate],
  )

  const onSubmitError = createNotificationHandler({
    title: 'Error while deleting app',
  })

  const onSubmitSuccess = () => reset()

  const formProps: DeleteAppFormProps = {
    onSubmit,
    onSubmitError,
    onSubmitSuccess,
    model: {
      appId: deleteIds[0],
    },
    name: entity?.name,
  }

  return {
    formProps,
    state,
    reset,
  }
}
