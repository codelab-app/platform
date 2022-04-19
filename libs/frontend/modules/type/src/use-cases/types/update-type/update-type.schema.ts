import { MonacoLanguage } from '@codelab/shared/abstract/codegen'
import {
  ElementTypeKind,
  ITypeKind,
  IUpdateTypeDTO,
  PrimitiveTypeKind,
} from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'
import { TypeSelect } from '../../../shared'

export const updateTypeSchema: JSONSchemaType<IUpdateTypeDTO> = {
  title: 'Update Type Input',
  type: 'object',
  properties: {
    // Base types
    id: {
      type: 'string',
      disabled: true,
    },
    name: {
      type: 'string',
      autoFocus: true,
    },
    kind: { type: 'string', enum: Object.values(ITypeKind) },
    unionTypeIds: {
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
        required: ['id', 'value'],
      },
    },
    // ...baseTypeSchemaProperties,
    // ...typeSchemaProperties,
    arrayTypeId: { type: 'string', nullable: true },
  },
  required: ['name'],
}
