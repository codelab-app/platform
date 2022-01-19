import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/props'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { CRUDActions } from '@codelab/frontend/view/components'
import { DeleteLambdaInput } from '@codelab/shared/abstract/codegen'
import { assertIsDefined } from '@codelab/shared/utils'
import { useCallback } from 'react'
import { LambdaFragment } from '../../graphql/Lambda.fragment.graphql.gen'
import { useLambdaDispatch, useLambdaState } from '../../hooks'
import { useDeleteLambdaMutation } from '../../store'

export const useDeleteLambdaForm: UseEntityUseCaseForm<
  DeleteLambdaInput,
  CRUDActionType,
  LambdaFragment
> = () => {
  const { deleteIds, entity, actionType } = useLambdaState()
  const { resetModal } = useLambdaDispatch()

  assertIsDefined(entity)

  const [mutate, { isLoading }] = useDeleteLambdaMutation({
    selectFromResult: (r) => ({
      hook: r.data?.deleteLambda,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: DeleteLambdaInput) => mutate({ variables: { input } }).unwrap(),
    [mutate],
  )

  return {
    onSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while deleting lambda',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    model: { lambdaId: deleteIds[0] },
    entity,
    isLoading,
    reset: resetModal,
    actionType,
  }
}
