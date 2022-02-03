import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { assertIsDefined } from '@codelab/shared/utils'
import { useCallback } from 'react'
import { FieldFragment } from '../../../graphql/fragments/Field.fragment.v2.graphql.gen'
import { useFieldDispatch, useFieldState } from '../../../hooks'
import { useUpdateFieldMutation } from '../../../store'
import { CreateFieldInput } from '../create-field'

export const useUpdateFieldForm: UseEntityUseCaseForm<
  CreateFieldInput,
  CRUDActionType,
  FieldFragment,
  unknown,
  string
> = (interfaceId) => {
  const { entity, actionType } = useFieldState()
  const { resetModal } = useFieldDispatch()

  assertIsDefined(interfaceId)

  const [mutate, { isLoading }] = useUpdateFieldMutation({
    selectFromResult: (r) => ({
      element: r.data?.upsertFieldEdge,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    async ({ name, existingTypeId, description, key }: CreateFieldInput) => {
      return mutate({
        variables: {
          input: {
            key,
            description,
            name,
            interfaceTypeId: interfaceId,
            targetTypeId: existingTypeId,
          },
        },
      }).unwrap()
    },
    [mutate, interfaceId],
  )

  return {
    model: entity
      ? ({
          name: entity.name,
          key: entity.key,
          existingTypeId: entity.node.id ?? '',
          description: entity.description,
        } as any)
      : undefined,
    onSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while updating field',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    isLoading,
    reset: resetModal,
    actionType,
    entity,
  }
}
