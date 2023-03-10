import type { IUpdateTypeData } from '@codelab/frontend/abstract/core'
import {
  hideField,
  nonEmptyString,
  ownerSchema,
} from '@codelab/frontend/view/components'
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
  properties: {
    allowedValues: {
      items: {
        properties: {
          id: {
            type: 'string',
            uniforms: {
              component: () => null,
            },
          },
          key: { type: 'string' },
          value: { type: 'string' },
        },
        required: ['key', 'value'],
        type: 'object',
      },
      nullable: true,
      type: 'array',
    },

    arrayTypeId: { nullable: true, type: 'string' },

    elementKind: {
      enum: Object.values(IElementTypeKind),
      nullable: true,
      type: 'string',
    },
    // Base types
    // ...idSchema,
    owner: {
      ...ownerSchema.owner,
      ...hideField,
    },
    id: {
      type: 'string',
      ...hideField,
      required: ['id'],
    },
    kind: { enum: Object.values(ITypeKind), type: 'string' },
    language: {
      enum: Object.values(ICodeMirrorLanguage),
      nullable: true,
      type: 'string',
    },
    name: {
      autoFocus: true,
      ...nonEmptyString,
    },
    primitiveKind: {
      enum: Object.values(IPrimitiveTypeKind),
      nullable: true,
      type: 'string',
    },
    unionTypeIds: {
      isUnionTypeInput: true,
      items: {
        isUnionTypeInput: true,
        type: 'string',
      },
      label: 'Types',
      nullable: true,
      type: 'array',
      uniforms: { component: TypeSelect, isUnionTypeInput: true },
    },
  },
  required: ['name'],
  title: 'Update Type Input',
  type: 'object',
}
