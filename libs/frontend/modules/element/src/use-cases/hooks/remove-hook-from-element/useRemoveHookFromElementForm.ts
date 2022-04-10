import { createNotificationHandler } from '@codelab/frontend/shared/utils'

export const useRemoveHookFromElementForm = (elementId: string) => {
  // const { deleteIds, entity, actionType } = useHookState()
  // const { resetModal } = useHookDispatch()
  //
  // const [mutate, { isLoading }] = useDeleteHooksMutation({
  //   selectFromResult: (r) => ({
  //     hook: r.data?.deleteHooks,
  //     isLoading: r.isLoading,
  //     error: r.error,
  //   }),
  // })
  //
  // const handleSubmit = useCallback(
  //   () => mutate({ variables: { where: { id_IN: deleteIds } } }).unwrap(),
  //   [mutate, deleteIds],
  // )

  return {
    onSubmit: () => Promise.reject('Not implemented'),
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while deleting hook',
      }),
    ],
    model: {},
    actionType: 'DELETE',
    entity: {} as any,
    onSubmitSuccess: () => {
      //
    }, // [() => resetModal()],
    isLoading: false,
    reset: () => {
      //
    },
  }
}
