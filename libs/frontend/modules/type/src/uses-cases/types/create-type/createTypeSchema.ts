import { TypeKind } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'
import {
  BaseTypeMutationSchema,
  baseTypeMutationSchemaProperties,
} from '../../../shared'
import { CreateTypeMutationVariables } from './CreateType.web.graphql.gen'

type CreateTypeInput = CreateTypeMutationVariables['input']

export interface CreateTypeSchema extends BaseTypeMutationSchema {
  kind: TypeKind
  arrayItemTypeId?: string
}

export const createTypeSchema: JSONSchemaType<CreateTypeSchema> = {
  title: 'Create Type Input',
  type: 'object',
  properties: {
    kind: {
      type: 'string',
      enum: Object.values(TypeKind),
    },
    arrayItemTypeId: {
      type: 'string',
      nullable: true,
    },
    ...(baseTypeMutationSchemaProperties as any),
  },
  required: ['name', 'kind'],
}

export const mapCreateTypeSchemaToTypeInput = (
  formData: CreateTypeSchema,
): CreateTypeInput => {
  const baseCreateTypeInput = {
    name: formData.name,
    typeKind: formData.kind,
  }

  switch (formData.kind) {
    case TypeKind.ArrayType:
      if (!formData.arrayItemTypeId) {
        throw new Error('Array item type not set')
      }

      return {
        ...baseCreateTypeInput,
        arrayType: {
          itemTypeId: formData.arrayItemTypeId,
        },
      }
    case TypeKind.InterfaceType:
      return {
        ...baseCreateTypeInput,
      }
    case TypeKind.EnumType:
      if (!formData.allowedValues) {
        throw new Error('Invalid form input')
      }

      return {
        ...baseCreateTypeInput,
        enumType: {
          allowedValues: formData.allowedValues,
        },
      }
    case TypeKind.PrimitiveType:
      if (!formData.primitiveKind) {
        throw new Error('Invalid form input')
      }

      return {
        ...baseCreateTypeInput,
        primitiveType: {
          primitiveKind: formData.primitiveKind,
        },
      }
    case TypeKind.LambdaType:
      return {
        ...baseCreateTypeInput,
      }
    case TypeKind.ComponentType:
      return {
        ...baseCreateTypeInput,
      }
    case TypeKind.ElementType:
      return {
        ...baseCreateTypeInput,
        elementType: {
          ...baseCreateTypeInput,
          kind: formData.elementKind,
        },
      }
    default:
      throw new Error('Invalid create form type')
  }
}
