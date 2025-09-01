'use client'

import type { ITypeUpdateDto } from '@codelab/frontend-abstract-domain'
import type { JSONSchemaType } from 'ajv'

import {
  idSchema,
  nonEmptyString,
} from '@codelab/frontend-presentation-components-form/schema'
import {
  ICodeMirrorLanguage,
  IElementTypeKind,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared-abstract-core'

import { TypeSelect } from '../select-types/TypeSelect'

export const updateTypeSchema: JSONSchemaType<
  Omit<ITypeUpdateDto, 'defaultValue'>
> = {
  properties: {
    ...idSchema(),
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
    arrayItemTypeId: { nullable: true, type: 'string' },
    elementKind: {
      enum: Object.values(IElementTypeKind),
      nullable: true,
      label: 'Element Kind',
      type: 'string',
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
