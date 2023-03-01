import type { IUpdateTypeData } from '@codelab/frontend/abstract/core'
import { idSchema } from '@codelab/frontend/shared/domain'
import { hideField, nonEmptyString } from '@codelab/frontend/shared/utils'
import {
  ICodeMirrorLanguage,
  IElementTypeKind,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'
import { TypeSelect } from '../../../shared'

export const updateTypeSchema: JSONSchemaType<
  Omit<IUpdateTypeData, 'defaultValue'>
> = {
  title: 'Update Type Input',
  type: 'object',
  properties: {
    // Base types
    // ...idSchema,
    id: {
      type: 'string',
      ...hideField,
      required: ['id'],
    },
    name: {
      autoFocus: true,
      ...nonEmptyString,
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
      enum: Object.values(IPrimitiveTypeKind),
    },
    elementKind: {
      type: 'string',
      nullable: true,
      enum: Object.values(IElementTypeKind),
    },
    language: {
      type: 'string',
      nullable: true,
      enum: Object.values(ICodeMirrorLanguage),
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
          key: { type: 'string' },
          value: { type: 'string' },
        },
        required: ['key', 'value'],
      },
    },
    arrayTypeId: { type: 'string', nullable: true },
  },
  required: ['name'],
}
