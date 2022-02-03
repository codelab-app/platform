import { AppActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/types'
import { API_ENV } from '@codelab/frontend/model/infra/redux'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { AppFragment } from '../../graphql/App.fragment.v2.graphql.gen'
import { useAppDispatch, useAppState } from '../../hooks'
import { useUpdateAppsMutation } from '../../store'
import { CreateAppInput } from '../create-app'

export const useUpdateAppForm: UseEntityUseCaseForm<
  CreateAppInput,
  AppActionType,
  AppFragment
> = () => {
  const { updateId, entity, actionType } = useAppState()
  const { resetModal } = useAppDispatch()

  const [mutate, { isLoading }] = useUpdateAppsMutation({
    selectFromResult: (r) => ({
      hook: r.data?.updateApps,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (data: CreateAppInput) =>
      mutate({
        variables: {
          where: { id: updateId },
          update: {
            ...data,
          },
        },
      }).unwrap(),
    [mutate, updateId],
  )

  return {
    onSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while updating app',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    model: {
      name: entity?.name,
    },
    entity,
    isLoading,
    reset: resetModal,
    actionType,
  }
}
