import { AdminActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ExecuteCommandInput } from '@codelab/shared/abstract/codegen'
import { useCallback } from 'react'
import { useAdminDispatch, useAdminState } from '../../hooks'
// import { useExecuteCommandMutation } from '../../store'
import { ExecuteCommandResponse } from './types'

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
