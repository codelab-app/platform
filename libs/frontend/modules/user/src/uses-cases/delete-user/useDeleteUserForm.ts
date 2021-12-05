import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDeleteUserMutation } from '../../store/userEndpoints'
import { selectUser, userActions } from '../../store/userState'

export const useDeleteUserForm = () => {
  const dispatch = useDispatch()
  const deleteIds = useSelector((state) => selectUser(state).deleteIds)

  const [mutate, state] = useDeleteUserMutation({
    selectFromResult: (r) => ({
      user: r.data?.deleteUser,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const reset = () => dispatch(userActions.resetModal())

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
