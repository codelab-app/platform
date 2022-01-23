import { AdminActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useAdminDispatch, useAdminState } from '../../hooks'
import { useExecuteCommandMutation } from '../../store'
import { ExecuteCommandInput } from './executeCommandSchema'

export const useExecuteCommandForm: UseUseCaseForm<
  ExecuteCommandInput,
  AdminActionType
> = () => {
  const { openExecuteCommandModal, resetModal } = useAdminDispatch()
  const { actionType } = useAdminState()

  const [mutate, { isLoading }] = useExecuteCommandMutation({
    selectFromResult: (r) => ({
      hook: r.data?.executeCommand,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: ExecuteCommandInput) => {
      console.log(input)

      return mutate({ variables: { input } }).unwrap()
    },
    [mutate],
  )

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating atom',
  })

  return {
    onSubmit,
    onSubmitError: [onSubmitError],
    onSubmitSuccess: [() => resetModal()],
    model: {},
    entity: undefined,
    isLoading: false,
    reset: resetModal,
    actionType,
  }
}
