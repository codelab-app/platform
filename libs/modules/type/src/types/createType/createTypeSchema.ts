import { CreateTypeInput } from '@codelab/codegen/graphql'
import { TypeKind } from '@codelab/ddd/types'
import { JSONSchemaType } from 'ajv'
import {
  BaseTypeMutationSchema,
  baseTypeMutationSchemaProperties,
  mapTypeSchemaToTypeInput,
} from '../../shared'

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
  kind: TypeKind,
  typeSchema: CreateTypeSchema,
): CreateTypeInput => {
  const common: Pick<CreateTypeInput, 'name'> = { name: typeSchema.name }

  switch (kind) {
    case TypeKind.ArrayType:
      if (!typeSchema.arrayItemTypeId) {
        throw new Error('Array item type not set')
      }

      return {
        ...common,
        arrayType: { itemTypeId: typeSchema.arrayItemTypeId },
      }
    default:
      return mapTypeSchemaToTypeInput(kind, typeSchema)
  }
}
