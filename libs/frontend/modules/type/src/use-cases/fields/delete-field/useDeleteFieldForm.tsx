import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { EmptyJsonSchemaType } from '@codelab/frontend/view/components'
import { assertIsDefined } from '@codelab/shared/utils'
import { useCallback } from 'react'
import { FieldFragment } from '../../../graphql/fragments/Field.fragment.v2.graphql.gen'
import { useFieldDispatch, useFieldState } from '../../../hooks'
import { useDeleteFieldMutation } from '../../../store'

export const useDeleteFieldForm: UseEntityUseCaseForm<
  EmptyJsonSchemaType,
  CRUDActionType,
  FieldFragment,
  unknown,
  string
> = (interfaceId) => {
  const { entity, actionType } = useFieldState()
  const { resetModal } = useFieldDispatch()

  assertIsDefined(interfaceId)

  const [mutate, { isLoading }] = useDeleteFieldMutation({
    selectFromResult: (r) => ({
      deletedEdgesCount: r.data?.deleteFieldEdge.deletedEdgesCount,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    async (_: EmptyJsonSchemaType) => {
      if (!entity?.key) {
        throw new Error('useDeleteFieldForm: Field key is not defined')
      }

      return mutate({
        variables: { input: { key: entity.key, interfaceId } },
      }).unwrap()
    },
    [entity?.key, interfaceId, mutate],
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
