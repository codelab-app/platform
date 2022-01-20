import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/props'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { EmptyJsonSchemaType } from '@codelab/frontend/view/components'
import { useCallback } from 'react'
import { TypeFragment } from '../../../graphql/Type.fragment.graphql.gen'
import { useTypeDispatch, useTypeState } from '../../../hooks'
import { useDeleteTypeMutation } from '../../../store'

export const useDeleteTypeForm: UseEntityUseCaseForm<
  EmptyJsonSchemaType,
  CRUDActionType,
  TypeFragment
> = () => {
  const { resetModal } = useTypeDispatch()
  const { deleteIds, entity, actionType } = useTypeState()
  const typeId = deleteIds?.[0]

  const [mutate, { isLoading }] = useDeleteTypeMutation({
    selectFromResult: (r) => ({
      element: r.data?.deleteType,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(() => {
    return mutate({ variables: { input: { typeId } } }).unwrap()
  }, [mutate, typeId])

  return {
    onSubmit: handleSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while deleting type',
      }),
    ],
    model: { ...entity },
    actionType,
    onSubmitSuccess: [() => resetModal()],
    isLoading,
    entity,
    reset: resetModal,
  }
}
