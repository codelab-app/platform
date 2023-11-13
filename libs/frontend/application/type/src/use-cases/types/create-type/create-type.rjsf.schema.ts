import {
  interfaceTypeSchema,
  type ITypeDTO,
  ITypeKind,
  primitiveTypeSchema,
} from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'
import merge from 'lodash/merge'

export const createRjsfTypeSchema: JSONSchemaType<{
  typeSelection: ITypeKind
}> = {
  type: 'object',
  properties: {
    typeSelection: {
      title: 'Select Type',
      type: 'string',
      enum: Object.values(ITypeKind),
      default: ITypeKind.PrimitiveType,
    },
  },
  dependencies: {
    typeSelection: {
      oneOf: [
        merge(primitiveTypeSchema, {
          properties: {
            typeSelection: { enum: [ITypeKind.PrimitiveType] },
          },
        }),
        merge(interfaceTypeSchema, {
          properties: {
            typeSelection: { enum: [ITypeKind.InterfaceType] },
          },
        }),
      ],
    },
  },
  required: ['typeSelection'],
}
