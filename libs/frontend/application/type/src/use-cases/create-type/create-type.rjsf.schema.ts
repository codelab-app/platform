import {
  interfaceTypeSchema,
  ITypeKind,
  primitiveTypeSelectionSchema,
} from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'
import { mergeDeep } from 'remeda'

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
        mergeDeep(primitiveTypeSelectionSchema, {
          properties: {
            typeSelection: { enum: [ITypeKind.PrimitiveType] },
          },
        }),
        mergeDeep(interfaceTypeSchema, {
          properties: {
            typeSelection: { enum: [ITypeKind.InterfaceType] },
          },
        }),
      ],
    },
  },
  required: ['typeSelection'],
}
