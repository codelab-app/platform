import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { EmptyJsonSchemaType } from '@codelab/frontend/view/components'
import { useCallback } from 'react'
import { FieldFragment } from '../../../graphql/Field.fragment.graphql.gen'
import { useFieldDispatch, useFieldState } from '../../../hooks'
import { useDeleteFieldMutation } from '../../../store'

export interface UseDeleteFieldFormInput {
  interfaceId: string
}

export const useDeleteFieldForm: UseEntityUseCaseForm<
  EmptyJsonSchemaType,
  CRUDActionType,
  FieldFragment,
  UseDeleteFieldFormInput
> = ({ interfaceId }) => {
  const { deleteIds, entity, actionType } = useFieldState()
  const { resetModal } = useFieldDispatch()

  const [mutate, { isLoading }] = useDeleteFieldMutation({
    selectFromResult: (r) => ({
      element: r.data?.deleteField,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (_: EmptyJsonSchemaType) => {
      return mutate({
        variables: { input: { fieldId: deleteIds[0], interfaceId } },
      }).unwrap()
    },
    [deleteIds, interfaceId, mutate],
  )

  return {
    onSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while deleting field',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    isLoading,
    model: {},
    actionType,
    reset: resetModal,
    entity,
  }
}
