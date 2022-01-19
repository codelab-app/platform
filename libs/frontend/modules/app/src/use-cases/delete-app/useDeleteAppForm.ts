import { AppActionType } from '@codelab/frontend/abstract/core'
import {
  UseEntityUseCaseForm,
  UseUseCaseForm,
} from '@codelab/frontend/abstract/props'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DeleteAppInput } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { assertIsDefined } from '@codelab/shared/utils'
import { useCallback } from 'react'
import { AppFragment } from '../../graphql/App.fragment.graphql.gen'
import { useAppDispatch, useAppState } from '../../hooks'
import { useDeleteAppMutation } from '../../store'

export const useDeleteAppForm: UseEntityUseCaseForm<
  DeleteAppInput,
  AppActionType,
  AppFragment
> = () => {
  const { deleteIds, entity, actionType } = useAppState()
  const { resetModal } = useAppDispatch()

  assertIsDefined<Maybe<AppFragment>>(entity)

  const [mutate, { isLoading }] = useDeleteAppMutation({
    selectFromResult: (r) => ({
      hook: r.data?.deleteApp,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: DeleteAppInput) => mutate({ variables: { input } }).unwrap(),
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
