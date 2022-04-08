import {
  MonacoLanguage,
  PrimitiveTypeKind,
} from '@codelab/shared/abstract/codegen'
import { ElementTypeKind, IEnumTypeValue } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'
import { TypeSelect } from './TypeSelect'

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
    enum: Object.values(PrimitiveTypeKind),
  },
  elementKind: {
    type: 'string',
    nullable: true,
    enum: Object.values(ElementTypeKind),
  },
  language: {
    type: 'string',
    nullable: true,
    enum: Object.values(MonacoLanguage),
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
