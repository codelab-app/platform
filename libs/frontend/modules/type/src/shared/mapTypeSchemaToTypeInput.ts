import {
  ElementTypeKind,
  IEnumTypeValue,
  PrimitiveTypeKind,
} from '@codelab/shared/abstract/core'
import { PrimitiveKind } from '@codelab/shared/codegen/graphql'
import { TypeSelect } from './TypeSelect'

export interface BaseTypeMutationSchema {
  name: string
  primitiveKind?: PrimitiveTypeKind
  elementKind: ElementTypeKind
  allowedValues?: Array<IEnumTypeValue>
  typeIdsOfUnionType?: Array<string>
}

export const baseTypeMutationSchemaProperties = {
  typeIdsOfUnionType: {
    type: 'array',
    nullable: true,
    label: 'Types',
    isUnionTypeInput: true,
    items: {
      type: 'string',
      isUnionTypeInput: true,
    },
    uniforms: { component: TypeSelect, isUnionTypeInput: true },
  },
  name: {
    type: 'string',
    autoFocus: true,
  },
  primitiveKind: {
    type: 'string',
    nullable: true,
    enum: Object.values(PrimitiveKind),
  },
  elementKind: {
    type: 'string',
    nullable: true,
    enum: Object.values(ElementTypeKind),
  },
  allowedValues: {
    type: 'array',
    nullable: true,
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          nullable: true,
          uniforms: {
            component: () => null,
          },
        },
        name: { type: 'string', nullable: true },
        value: { type: 'string' },
      },
      required: ['value'],
    },
  },
}
