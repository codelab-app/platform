import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { TypeKind } from '@codelab/shared/abstract/core'
import { useCallback } from 'react'
import { useTypeDispatch, useTypeState } from '../../../hooks'
import { typenameToTypeKind } from '../../../shared'
import { TypeModels } from '../../../shared/TypeModels'
import {
  useUpdateEnumTypeMutation,
  useUpdatePrimitiveTypeMutation,
  useUpdateTypeMutation,
  useUpdateUnionTypeMutation,
} from '../../../store/typeEndpoints'
import { UpdateTypeSchema } from './updateTypeSchema'

export const useUpdateTypeForm = () => {
  const { entity, updateId } = useTypeState()
  const { resetModal } = useTypeDispatch()
  const [mutateUnion, unionMutationData] = useUpdateUnionTypeMutation()
  const [mutateEnum, enumMutationData] = useUpdateEnumTypeMutation()
  const [mutateType, typeMutationData] = useUpdateTypeMutation()

  const [mutatePrimitive, primitiveMutationData] =
    useUpdatePrimitiveTypeMutation()

  const isLoading =
    primitiveMutationData.isLoading ||
    enumMutationData.isLoading ||
    typeMutationData.isLoading ||
    unionMutationData.isLoading

  const handleSubmit = useCallback(
    (submitData: UpdateTypeSchema) => {
      if (!entity) {
        throw new Error(
          'Entity not set for useUpdateTypeForm. Set it when calling typeActions.openUpdateModal',
        )
      }

      const kind = typenameToTypeKind(entity?.__typename)

      switch (kind) {
        case TypeKind.UnionType:
          if (
            submitData.typeIdsOfUnionType &&
            submitData.typeIdsOfUnionType.length > 0
          ) {
            return mutateUnion({
              variables: {
                input: {
                  typeId: updateId,
                  updateData: {
                    name: submitData.name,
                    typeIdsOfUnionType: submitData.typeIdsOfUnionType,
                  },
                },
              },
            })
          }

          throw new Error('Union item types not set')

        case TypeKind.PrimitiveType:
          if (!submitData.primitiveKind) {
            throw new Error('Primitive type not set')
          }

          return mutatePrimitive({
            variables: {
              input: {
                typeId: updateId,
                updateData: {
                  name: submitData.name,
                  primitiveKind: submitData.primitiveKind,
                },
              },
            },
          })
        case TypeKind.EnumType:
          if (!submitData.allowedValues) {
            throw new Error('Allowed values not set')
          }

          return mutateEnum({
            variables: {
              input: {
                typeId: updateId,
                updateData: {
                  name: submitData.name,
                  allowedValues: submitData.allowedValues.map((av) => ({
                    value: av.value,
                    name: av.name || undefined,
                  })),
                },
              },
            },
          })
        default:
          return mutateType({
            variables: {
              input: {
                typeId: updateId,
                updateData: {
                  name: submitData.name,
                },
              },
            },
          })
      }
    },
    [entity, mutatePrimitive, updateId, mutateEnum, mutateType, mutateUnion],
  )

  const model = {
    name: entity?.name,
    primitiveKind:
      entity?.__typename === TypeModels.PrimitiveType
        ? entity?.primitiveKind
        : undefined,
    allowedValues:
      entity?.__typename === TypeModels.EnumType
        ? entity?.allowedValues
        : undefined,
    typeIdsOfUnionType:
      entity?.__typename === TypeModels.UnionType
        ? entity?.typeIdsOfUnionType
        : undefined,
  }

  return {
    formProps: {
      model: model,
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while updating type',
      }),
      onSubmitSuccess: () => resetModal(),
    },
    isLoading,
  }
}
