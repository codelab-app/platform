import { AppActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/types'
import { API_ENV } from '@codelab/frontend/model/infra/redux'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DeleteAppInput } from '@codelab/shared/abstract/codegen'
import { useCallback } from 'react'
import { AppFragment } from '../../graphql/App.fragment.v2.graphql.gen'
import { useAppDispatch, useAppState } from '../../hooks'
import { useDeleteAppsMutation } from '../../store'

export const useDeleteAppForm: UseEntityUseCaseForm<
  DeleteAppInput,
  AppActionType,
  AppFragment
> = () => {
  const { resetModal } = useAppDispatch()
  const { deleteIds, entity, actionType } = useAppState()

  const [mutate, { isLoading }] = useDeleteAppsMutation({
    selectFromResult: (r) => ({
      hook: r.data?.deleteApps,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: DeleteAppInput) =>
      mutate({
        variables: {
          where: {
            id: input.appId,
          },
        },
      }).unwrap(),
    [mutate],
  )

  return {
    onSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while deleting app',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    model: { appId: deleteIds[0] },
    entity,
    isLoading,
    reset: resetModal,
    actionType,
  }
}
