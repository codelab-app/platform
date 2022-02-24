import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useComponentDispatch, useComponentState } from '../../../hooks'
import { useUpdateComponentsMutation } from '../../../store'
import { UpdateComponentInput } from './types'

export const useUpdateComponentForm: UseUseCaseForm<
  UpdateComponentInput,
  CRUDActionType
> = () => {
  const { resetModal } = useComponentDispatch()
  const { actionType, updateId, entity } = useComponentState()

  const [mutate, { isLoading }] = useUpdateComponentsMutation({
    selectFromResult: (r) => ({
      component: r.data?.updateComponents,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    ({ name }: UpdateComponentInput) =>
      mutate({
        variables: { where: { id: updateId }, update: { name } },
      }).unwrap(),
    [mutate, updateId],
  )

  return {
    model: {
      name: entity?.name,
    },
    reset: resetModal,
    onSubmit: handleSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while creating component',
      }),
    ],
    actionType,
    onSubmitSuccess: [() => resetModal()],
    isLoading,
  }
}
