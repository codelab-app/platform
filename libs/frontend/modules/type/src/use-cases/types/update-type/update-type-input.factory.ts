import { TypeKind } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { groupItemsByArrayDiff } from '@codelab/shared/utils'
import { JSONSchemaType } from 'ajv'
import { getSnapshot } from 'mobx-keystone'
import { v4 } from 'uuid'
import {
  BaseTypeMutationSchema,
  baseTypeMutationSchemaProperties,
} from '../../../shared'
import { AnyType, UpdateTypeInput } from '../../../store'

export type UpdateTypeInputFactory = BaseTypeMutationSchema

export const updateTypeSchema: JSONSchemaType<UpdateTypeInputFactory> = {
  title: 'Update Type Input',
  type: 'object',
  properties: {
    ...(baseTypeMutationSchemaProperties as any),
  },
  required: ['name'],
}

/**
 * This is similar to the one for create, but has a couple of important differences (we don't assign uuids, we diff the old and new enum values, etc.), so it's not a good candidate for a generic function.
 */
export const mapUpdateTypeSchemaToInput = (
  formData: UpdateTypeInputFactory,
  originalType: AnyType,
  currentUserId: Nullish<string>,
): UpdateTypeInput => {
  const common: Partial<UpdateTypeInput> = {
    name: formData.name,
    owner: [
      {
        where: {
          node: {
            auth0Id: currentUserId,
          },
        },
      },
    ],
  }

  const kind = originalType.typeKind

  switch (kind) {
    case TypeKind.UnionType: {
      if (
        !(formData.typeIdsOfUnionType && formData.typeIdsOfUnionType.length > 0)
      ) {
        throw new Error('Union item types not set')
      }

      return {
        ...common,
        typesOfUnionType: [
          {
            connect: formData.typeIdsOfUnionType.map((id) => ({
              where: { node: { id } },
              edge: { id: v4() },
            })),
          },
        ],
      }
    }

    case TypeKind.InterfaceType:
      return { ...common }

    case TypeKind.EnumType: {
      if (!formData.allowedValues) {
        throw new Error('Invalid form input')
      }

      const { toUpdate, toDelete, toCreate } = groupItemsByArrayDiff(
        formData.allowedValues ?? [],
        getSnapshot(originalType.allowedValues) ?? [],
      )

      // Create all new values, update existing ones and delete old ones
      return {
        ...common,
        allowedValues: [
          ...toCreate.map((v) => ({
            create: [{ node: v, edge: { id: v4() } }],
          })),
          ...toUpdate.map(([newV, oldV]) => ({
            update: { node: { id: newV.id } },
          })),
          ...toDelete.map((v) => ({
            delete: [{ where: { node: { id: v.id } } }],
          })),
        ],
      }
    }

    case TypeKind.PrimitiveType:
      if (!formData.primitiveKind) {
        throw new Error('Primitive kind is required')
      }

      return { ...common, primitiveKind: formData.primitiveKind }
    case TypeKind.LambdaType:
      return { ...common }
    case TypeKind.AppType:
      return { ...common }
    case TypeKind.PageType:
      return { ...common }
    case TypeKind.MonacoType:
      if (!formData.language) {
        throw new Error('Language is required')
      }

      return { ...common, language: formData.language }
    case TypeKind.ElementType:
      if (!formData.elementKind) {
        throw new Error('Element kind is required')
      }

      return { ...common, elementKind: formData.elementKind }
    case TypeKind.ArrayType:
      return { ...common }
    default:
      throw new Error('Invalid Update form type')
  }
}
