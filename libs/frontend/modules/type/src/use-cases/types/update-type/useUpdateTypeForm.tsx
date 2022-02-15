import { useUser } from '@auth0/nextjs-auth0'
import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseEntityUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { TypeKind } from '@codelab/shared/abstract/core'
import { useCallback } from 'react'
import { TypeFragment } from '../../../graphql'
import { useTypeDispatch, useTypeState } from '../../../hooks'
import { useUpdateType } from '../../../hooks/useUpdateType'
import { useLazyIsTypeDescendantOfQuery } from '../../../store'
import {
  mapUpdateTypeSchemaToTypeInput,
  UpdateTypeSchema,
} from './updateTypeSchema'

const getInnerTypeIds = (submitData: UpdateTypeSchema) => [
  ...(submitData.typeIdsOfUnionType ?? []),
]

const useValidateNonRecursive = () => {
  const [isTypeDescendantOf] = useLazyIsTypeDescendantOfQuery()

  // Check if the updated type is not a descendant of any of the inner types
  // because this would cause a circular dependency between them and
  const validateNonRecursive = useCallback(
    async (updateId: string, submitData: UpdateTypeSchema) => {
      const innerTypes = getInnerTypeIds(submitData)

      if (innerTypes.length > 0) {
        const results = await Promise.all(
          innerTypes.map((innerTypeId) =>
            isTypeDescendantOf({
              variables: {
                descendantTypeId: updateId,
                parentTypeId: innerTypeId,
              },
            }),
          ),
        )

        if (results.some((result) => !!result?.data?.isTypeDescendantOf)) {
          throw new Error(
            'Cannot update type because it will cause a circular dependency',
          )
        }
      }
    },
    [isTypeDescendantOf],
  )

  return { validateNonRecursive }
}

export const useUpdateTypeForm: UseEntityUseCaseForm<
  UpdateTypeSchema,
  CRUDActionType,
  TypeFragment
> = () => {
  const { entity, updateId, actionType } = useTypeState()
  const { resetModal } = useTypeDispatch()
  const updateMutations = useUpdateType()
  const { validateNonRecursive } = useValidateNonRecursive()
  const isLoading = Object.values(updateMutations).some((v) => v[1].isLoading)
  const { user } = useUser()

  const handleSubmit = useCallback(
    async (submitData: UpdateTypeSchema) => {
      if (!entity) {
        throw new Error(
          'Entity not set for useUpdateTypeForm. Set it when calling typeActions.openUpdateModal',
        )
      }

      await validateNonRecursive(updateId, submitData)

      const input = mapUpdateTypeSchemaToTypeInput(
        submitData,
        entity,
        user?.sub,
      )

      const mutator =
        updateMutations[entity.typeKind as keyof typeof updateMutations][0]

      return mutator({ variables: { update: input, where: { id: updateId } } })
    },
    [entity, updateId, updateMutations, user?.sub, validateNonRecursive],
  )

  const model = {
    name: entity?.name,
    primitiveKind:
      entity?.typeKind === TypeKind.PrimitiveType
        ? entity?.primitiveKind
        : undefined,
    allowedValues:
      entity?.typeKind === TypeKind.EnumType
        ? entity?.allowedValues ?? undefined
        : undefined,
    typeIdsOfUnionType:
      entity?.typeKind === TypeKind.UnionType
        ? entity?.typesOfUnionType?.map((t) => t.id) ?? []
        : undefined,
  }

  return {
    model: model,
    onSubmit: handleSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while updating type',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    reset: resetModal,
    isLoading,
    actionType,
    entity,
  }
}
