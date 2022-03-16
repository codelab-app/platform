// import { useExecuteCommandMutation } from '../../store'

export const useExecuteCommandForm = () => {
  return {}
  // const { openExecuteCommandModal, resetModal } = useAdminDispatch()
  // const { actionType } = useAdminState()

  // const [mutate, { isLoading }] = useExecuteCommandMutation({
  //   selectFromResult: (r) => ({
  //     hook: r.data?.executeCommand,
  //     isLoading: r.isLoading,
  //     error: r.error,
  //   }),
  // })

  // const onSubmit = useCallback(
  //   (input: ExecuteCommandInput) => {
  //     createNotificationHandler({
  //       title: 'Executing Command',
  //       type: 'info',
  //       content: input.command,
  //     })()

  //     return mutate({ variables: { input } }).unwrap()
  //   },
  //   [mutate],
  // )

  // return {
  // onSubmit,
  // onSubmitError: [
  //   createNotificationHandler({
  //     title: 'Error while creating atom',
  //     type: 'error',
  //   }),
  // ],
  // onSubmitSuccess: [
  //   () => resetModal(),
  //   (data) => {
  //     createNotificationHandler({
  //       title: 'Command Executed',
  //       type: 'success',
  //       content: data.executeCommand.payload,
  //     })()
  //   },
  // ],
  // model: {},
  // entity: undefined,
  // isLoading: false,
  // reset: resetModal,
  // actionType,
  // }
}
