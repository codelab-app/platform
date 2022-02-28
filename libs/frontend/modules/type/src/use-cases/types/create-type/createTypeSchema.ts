import * as cg from '@codelab/shared/abstract/codegen-v2'
import { TypeKind } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { JSONSchemaType } from 'ajv'
import { v4 } from 'uuid'
import {
  BaseTypeMutationSchema,
  baseTypeMutationSchemaProperties,
} from '../../../shared'

export interface CreateTypeSchema extends BaseTypeMutationSchema {
  kind: TypeKind
  typeIdsOfUnionType?: Array<string>
  arrayItemTypeId?: string
  typesOfUnionType?: string
}

export const createTypeSchema: JSONSchemaType<CreateTypeSchema> = {
  title: 'Create Type Input',
  type: 'object',
  properties: {
    kind: { type: 'string', enum: Object.values(TypeKind) },
    arrayItemTypeId: { type: 'string', nullable: true },
    ...(baseTypeMutationSchemaProperties as any),
  },
  required: ['name', 'kind'],
}

type AnyTypeCreateInput =
  | cg.AppTypeCreateInput
  | cg.ArrayTypeCreateInput
  | cg.ElementTypeCreateInput
  | cg.EnumTypeCreateInput
  | cg.InterfaceTypeCreateInput
  | cg.LambdaTypeCreateInput
  | cg.MonacoTypeCreateInput
  | cg.PageTypeCreateInput
  | cg.PrimitiveTypeCreateInput
  | cg.ReactNodeTypeCreateInput
  | cg.RenderPropsTypeCreateInput
  | cg.UnionTypeCreateInput

export const mapCreateTypeSchemaToTypeInput = (
  formData: CreateTypeSchema,
  currentUserId: Nullish<string>,
): AnyTypeCreateInput => {
  const common = {
    name: formData.name,
    owner: { connect: { where: { node: { auth0Id: currentUserId } } } },
  }

  switch (formData.kind) {
    case TypeKind.UnionType:
      if (
        !(formData.typeIdsOfUnionType && formData.typeIdsOfUnionType.length > 0)
      ) {
        throw new Error('Union item types not set')
      }

      return {
        ...common,
        typesOfUnionType: {
          connect: formData.typeIdsOfUnionType.map((id) => ({
            where: { node: { id } },
          })),
        },
      } as cg.UnionTypeCreateInput
    case TypeKind.ArrayType:
      if (!formData.arrayItemTypeId) {
        throw new Error('Array item type not set')
      }

      return {
        ...common,
        itemType: {
          connect: [{ where: { node: { id: formData.arrayItemTypeId } } }],
        },
      }
    case TypeKind.InterfaceType:
      return { ...common }
    case TypeKind.EnumType:
      if (!formData.allowedValues) {
        throw new Error('Invalid form input')
      }

      return {
        ...common,
        allowedValues: {
          create: formData.allowedValues?.map((v) => ({
            node: { id: v4(), name: v.name, value: v.value },
          })),
        },
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
    case TypeKind.RenderPropsType:
      return { ...common }
    case TypeKind.ReactNodeType:
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
    default:
      throw new Error('Invalid create form type')
  }
}
