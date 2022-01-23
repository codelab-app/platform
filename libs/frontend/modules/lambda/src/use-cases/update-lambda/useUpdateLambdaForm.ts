import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { UpdateLambdaInput } from '@codelab/shared/abstract/codegen'
import { useCallback } from 'react'
import { LambdaFragment } from '../../graphql/Lambda.fragment.graphql.gen'
import { useLambdaDispatch, useLambdaState } from '../../hooks'
import { useUpdateLambdaMutation } from '../../store'

export const useUpdateLambdaForm: UseEntityUseCaseForm<
  UpdateLambdaInput,
  CRUDActionType,
  LambdaFragment
> = () => {
  const { updateId, entity, actionType } = useLambdaState()
  const { resetModal } = useLambdaDispatch()

  const [mutate, { isLoading }] = useUpdateLambdaMutation({
    selectFromResult: (r) => ({
      hook: r.data?.updateLambda,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: UpdateLambdaInput) => mutate({ variables: { input } }).unwrap(),
    [mutate, updateId],
  )

  return {
    onSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while updating lambda',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    model: {
      name: entity?.name,
      body: entity?.body,
      id: entity?.id,
    },
    entity,
    isLoading,
    reset: resetModal,
    actionType,
  }
}
