import * as cg from '@codelab/shared/abstract/codegen-v2'
import { TypeKind } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { groupItemsByArrayDiff } from '@codelab/shared/utils'
import { JSONSchemaType } from 'ajv'
import { v4 } from 'uuid'
import { TypeFragment } from '../../../graphql'
import {
  BaseTypeMutationSchema,
  baseTypeMutationSchemaProperties,
} from '../../../shared'

export type UpdateTypeSchema = BaseTypeMutationSchema

export const updateTypeSchema: JSONSchemaType<UpdateTypeSchema> = {
  title: 'Update Type Input',
  type: 'object',
  properties: {
    ...(baseTypeMutationSchemaProperties as any),
  },
  required: ['name'],
}

type AnyTypeUpdateInput =
  | cg.AppTypeUpdateInput
  | cg.ArrayTypeUpdateInput
  | cg.ElementTypeUpdateInput
  | cg.EnumTypeUpdateInput
  | cg.InterfaceTypeUpdateInput
  | cg.LambdaTypeUpdateInput
  | cg.MonacoTypeUpdateInput
  | cg.PageTypeUpdateInput
  | cg.PrimitiveTypeUpdateInput
  | cg.ReactNodeTypeUpdateInput
  | cg.RenderPropsTypeUpdateInput
  | cg.UnionTypeUpdateInput

// This is similar to the one for create, but has a couple of important differences (we don't assign uuids, we diff the old and new enum values, etc.),
// so it's not a good candidate for a generic function.
export const mapUpdateTypeSchemaToTypeInput = (
  formData: UpdateTypeSchema,
  originalType: TypeFragment,
  currentUserId: Nullish<string>,
): AnyTypeUpdateInput => {
  const common = {
    name: formData.name,
    owner: { connect: { where: { node: { auth0Id: currentUserId } } } },
  }

  const kind = originalType.typeKind

  switch (kind) {
    case TypeKind.UnionType:
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
            })),
          },
        ],
      } as cg.UnionTypeUpdateInput

    case TypeKind.InterfaceType:
      return { ...common }

    case TypeKind.EnumType: {
      if (!formData.allowedValues) {
        throw new Error('Invalid form input')
      }

      const { toUpdate, toDelete, toCreate } = groupItemsByArrayDiff(
        formData.allowedValues ?? [],
        originalType.allowedValues ?? [],
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
