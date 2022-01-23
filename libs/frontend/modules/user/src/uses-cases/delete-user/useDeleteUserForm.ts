import { CRUDActionType } from '@codelab/frontend/abstract/core'
import {
  UseEntityUseCaseForm,
  UseUseCaseForm,
} from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { EmptyJsonSchemaType } from '@codelab/frontend/view/components'
import { useCallback } from 'react'
import { useUserDispatch, useUserState } from '../../hooks'
import { useDeleteUserMutation } from '../../store'

export const useDeleteUserForm: UseUseCaseForm<
  EmptyJsonSchemaType,
  CRUDActionType
> = () => {
  const { resetModal } = useUserDispatch()
  const { deleteIds, actionType, entity } = useUserState()

  const [mutate, { isLoading }] = useDeleteUserMutation({
    selectFromResult: (r) => ({
      user: r.data?.deleteUser,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const reset = () => resetModal()

  const handleSubmit = useCallback(async () => {
    for (const id of deleteIds) {
      await mutate({
        variables: { input: { id } },
      }).unwrap()
    }
  }, [mutate])

  return {
    onSubmit: handleSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while deleting user',
      }),
    ],
    onSubmitSuccess: [() => reset()],
    isLoading,
    model: {},
    actionType,
    reset: resetModal,
  }
}
