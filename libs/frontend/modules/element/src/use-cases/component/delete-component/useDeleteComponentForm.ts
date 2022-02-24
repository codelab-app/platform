import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { IComponent } from '@codelab/shared/abstract/core'
import { useCallback } from 'react'
import { useComponentDispatch, useComponentState } from '../../../hooks'
import { useDeleteComponentsMutation } from '../../../store'
import { DeleteComponentInput } from './types'

export const useDeleteComponentForm: UseEntityUseCaseForm<
  DeleteComponentInput,
  CRUDActionType,
  IComponent
> = () => {
  const { deleteIds, entity, actionType } = useComponentState()
  const { resetModal } = useComponentDispatch()

  const [mutate, { isLoading }] = useDeleteComponentsMutation({
    selectFromResult: (r) => ({
      hook: r.data?.deleteComponents,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    ({ componentId }: DeleteComponentInput) =>
      mutate({ variables: { where: { id: componentId } } }).unwrap(),
    [mutate],
  )

  return {
    onSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while deleting component',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    model: { componentId: deleteIds[0] },
    entity,
    isLoading,
    reset: resetModal,
    actionType,
  }
}
