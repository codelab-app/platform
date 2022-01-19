import { CRUDActionType } from '@codelab/frontend/abstract/core'
import {
  UseEntityUseCaseForm,
  UseUseCaseForm,
} from '@codelab/frontend/abstract/props'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { EmptyJsonSchemaType } from '@codelab/frontend/view/components'
import { Maybe } from '@codelab/shared/abstract/types'
import { assertIsDefined } from '@codelab/shared/utils'
import { useCallback } from 'react'
import { PropMapBindingFragment } from '../../../graphql'
import {
  usePropMapBindingDispatch,
  usePropMapBindingState,
} from '../../../hooks'
import { useDeletePropMapBindingMutation } from '../../../store'

export const useDeletePropMapBindingForm: UseEntityUseCaseForm<
  EmptyJsonSchemaType,
  CRUDActionType,
  PropMapBindingFragment,
  string
> = (elementId) => {
  const { deleteIds, entity, actionType } = usePropMapBindingState()
  const { resetModal } = usePropMapBindingDispatch()

  assertIsDefined(entity)
  assertIsDefined(elementId)

  const [mutate, { isLoading }] = useDeletePropMapBindingMutation({
    selectFromResult: (r) => ({
      hook: r.data?.deletePropMapBinding,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(() => {
    return mutate({
      variables: {
        input: { elementId, propMapBindingIds: deleteIds },
      },
    }).unwrap()
  }, [mutate, deleteIds])

  return {
    onSubmit: handleSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while deleting prop map binding',
      }),
    ],
    model: {},
    onSubmitSuccess: [() => resetModal()],
    isLoading,
    entity,
    reset: resetModal,
    actionType,
  }
}
