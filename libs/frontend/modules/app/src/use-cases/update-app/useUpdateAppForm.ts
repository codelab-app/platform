import { AppActionType } from '@codelab/frontend/abstract/core'
import {
  UseEntityUseCaseForm,
  UseUseCaseForm,
} from '@codelab/frontend/abstract/props'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  CreateAppInput,
  UpdateAppInput,
} from '@codelab/shared/abstract/codegen'
import { assertIsDefined } from '@codelab/shared/utils'
import { useCallback } from 'react'
import { AppFragment } from '../../graphql/App.fragment.graphql.gen'
import { useAppDispatch, useAppState } from '../../hooks'
import { useUpdateAppMutation } from '../../store'

export const useUpdateAppForm: UseEntityUseCaseForm<
  CreateAppInput,
  AppActionType,
  AppFragment
> = () => {
  const { updateId, entity, actionType } = useAppState()
  const { resetModal } = useAppDispatch()

  assertIsDefined(entity)

  const [mutate, { isLoading }] = useUpdateAppMutation({
    selectFromResult: (r) => ({
      hook: r.data?.updateApp,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (data: CreateAppInput) => {
      return mutate({
        variables: { input: { data, id: updateId } },
      }).unwrap()
    },
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
