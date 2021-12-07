import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useUserDispatch, useUserState } from '../../hooks'
import { useDeleteUserMutation } from '../../store/userEndpoints'

export const useDeleteUserForm = () => {
  const { resetModal } = useUserDispatch()
  const { deleteIds } = useUserState()

  const [mutate, state] = useDeleteUserMutation({
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
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while deleting user',
      }),
      onSubmitSuccess: () => reset(),
    },
    state,
  }
}
