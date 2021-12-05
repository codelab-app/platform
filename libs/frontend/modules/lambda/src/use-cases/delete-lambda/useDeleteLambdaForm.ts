import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useLambdaDispatch, useLambdaState } from '../../hooks'
import { useDeleteLambdaMutation } from '../../store'
import { DeleteLambdaFormProps, DeleteLambdaMutationInput } from './types'

export const useDeleteLambdaForm = () => {
  const { deleteIds, entity } = useLambdaState()
  const { resetModal } = useLambdaDispatch()

  const [mutate, state] = useDeleteLambdaMutation({
    selectFromResult: (r) => ({
      hook: r.data?.deleteLambda,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: DeleteLambdaMutationInput) => mutate({ variables: { input } }),
    [mutate],
  )

  const onSubmitError = createNotificationHandler({
    title: 'Error while deleting lambda',
  })

  const onSubmitSuccess = () => resetModal()

  const formProps: DeleteLambdaFormProps = {
    onSubmit,
    onSubmitError,
    onSubmitSuccess,
    model: { lambdaId: deleteIds[0] },
    name: entity?.name,
  }

  return {
    formProps,
    state,
    resetModal,
  }
}
